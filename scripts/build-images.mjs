/**
 * Gera as versões estáticas das imagens do site.
 *
 * O site não usa o Image Optimization da Vercel (cada combinação de imagem,
 * largura e formato pedida por um visitante conta no limite do plano). Em vez
 * disso, este script cria, uma vez, cópias AVIF e WebP de cada imagem em
 * larguras fixas, em `public/_img/`, e `src/components/image.tsx` as entrega
 * num `<picture>` — AVIF para quem suporta, WebP para o resto. São arquivos
 * estáticos, servidos pela CDN.
 *
 * Determinístico e incremental: o hash de cada original fica em
 * `public/_img/manifest.json`. Só é convertido o que é novo ou mudou; versões
 * de originais apagados são removidas. Com tudo em dia, roda em segundos —
 * por isso pode ficar no `prebuild` sem refazer o trabalho a cada deploy.
 *
 * Uso: `npm run images` (também roda antes de `npm run build`).
 */

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";

import sharp from "sharp";

/**
 * Larguras geradas. Precisam ser as mesmas de `deviceSizes` + `imageSizes`
 * em `next.config.ts`: o `next/image` só monta `srcset` com elas.
 *
 * 160  — miniaturas da galeria e fundos desfocados
 * 384  — cards em desktop e logo
 * 640  — cards e tiles em telas médias
 * 750  — galeria e hero no celular de densidade ~1,75x
 * 828  — galeria, hero e cards no celular (densidade ~2x)
 * 1200 — os mesmos no celular de densidade 3x e no desktop comum
 * 1600 — galeria e hero em telas retina (o maior tamanho dos originais)
 *
 * Espelham a escolha que o Next fazia antes (750/828/1200/1920), para que o
 * navegador baixe o mesmo tamanho de antes — só que em arquivo estático.
 */
export const WIDTHS = [160, 384, 640, 750, 828, 1200, 1600];

/**
 * Mesma receita do otimizador do Next que o site usava (quality 75): WebP 75
 * e AVIF com a qualidade reescalada para 47 (75 × 50/80), a equivalência
 * visual que o próprio Next calibrou. O visual e o peso ficam iguais aos de
 * antes.
 */
const WEBP_QUALITY = 75;
const AVIF_QUALITY = 47;
const FORMATS = ["avif", "webp"];
const ROOT = new URL("..", import.meta.url).pathname;
const PUBLIC = join(ROOT, "public");
const OUT = join(PUBLIC, "_img");
const MANIFEST = join(OUT, "manifest.json");
const SOURCES = ["imagens", "brand"];
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
// Este script é a versão de "como converter": mudou aqui, refaz tudo.
const RECIPE = `avif-q${AVIF_QUALITY}-e4+webp-q${WEBP_QUALITY}-${WIDTHS.join(",")}`;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

/** `/imagens/a/b.jpg` → `public/_img/imagens/a/b-640.webp` (ou `.avif`) */
function variantPath(publicPath, width, format) {
  const base = publicPath.slice(0, -extname(publicPath).length);
  return join(OUT, `${base}-${width}.${format}`);
}

const variants = (publicPath) =>
  WIDTHS.flatMap((width) =>
    FORMATS.map((format) => variantPath(publicPath, width, format)),
  );

async function main() {
  const previous = existsSync(MANIFEST)
    ? JSON.parse(await readFile(MANIFEST, "utf8"))
    : { recipe: "", files: {} };
  const recipeChanged = previous.recipe !== RECIPE;

  const sources = (
    await Promise.all(SOURCES.map((dir) => walk(join(PUBLIC, dir))))
  )
    .flat()
    .filter((file) => EXTENSIONS.has(extname(file).toLowerCase()))
    .sort();

  const files = {};
  let converted = 0;

  for (const file of sources) {
    const publicPath = relative(PUBLIC, file).split(sep).join("/");
    const buffer = await readFile(file);
    const hash = createHash("sha1").update(buffer).digest("hex").slice(0, 12);
    files[publicPath] = hash;

    const upToDate =
      !recipeChanged &&
      previous.files[publicPath] === hash &&
      variants(publicPath).every((path) => existsSync(path));
    if (upToDate) continue;

    for (const width of WIDTHS) {
      // Nunca amplia: num original menor que a largura, a versão sai no
      // tamanho do original — o navegador só a escala, como antes.
      const resized = sharp(buffer)
        .rotate()
        .resize({ width, withoutEnlargement: true });
      const avif = variantPath(publicPath, width, "avif");
      await mkdir(dirname(avif), { recursive: true });
      await resized.clone().avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(avif);
      await resized
        .clone()
        .webp({ quality: WEBP_QUALITY })
        .toFile(variantPath(publicPath, width, "webp"));
    }
    converted += 1;
  }

  // Remove versões de originais que não existem mais.
  let removed = 0;
  for (const publicPath of Object.keys(previous.files)) {
    if (files[publicPath]) continue;
    await Promise.all(
      variants(publicPath).map((path) => rm(path, { force: true })),
    );
    removed += 1;
  }

  await writeFile(
    MANIFEST,
    `${JSON.stringify({ recipe: RECIPE, files }, null, 2)}\n`,
  );
  console.log(
    `imagens: ${sources.length} originais, ${converted} convertidas, ${removed} removidas`,
  );
}

await main();

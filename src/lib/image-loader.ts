/**
 * Loaders do `next/image`: apontam para as versões pré-geradas em
 * `public/_img/` (ver `scripts/build-images.mjs`), em vez do `/_next/image`.
 *
 * Assim nenhuma imagem passa pelo Image Optimization da Vercel — são arquivos
 * estáticos, servidos pela CDN — e o `srcset` responsivo continua o mesmo.
 * A qualidade é fixada na geração; o parâmetro `quality` é ignorado.
 *
 * As larguras precisam bater com `WIDTHS` do script e com `deviceSizes` +
 * `imageSizes` em `next.config.ts`.
 */
const WIDTHS = [160, 384, 640, 750, 828, 1200, 1600];

type LoaderParams = { src: string; width: number; quality?: number };

function variant(src: string, width: number, format: "webp" | "avif") {
  // Só imagens locais (`/imagens/…`, `/brand/…`) têm versões pré-geradas.
  if (!src.startsWith("/")) return src;
  const size = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/_img${src.replace(/\.(jpe?g|png)$/i, "")}-${size}.${format}`;
}

/** Padrão (`loaderFile`): WebP, o formato que todo navegador abre. */
export default function webpLoader({ src, width }: LoaderParams): string {
  return variant(src, width, "webp");
}

/** AVIF, oferecido antes do WebP no `<picture>` de `components/image.tsx`. */
export function avifLoader({ src, width }: LoaderParams): string {
  return variant(src, width, "avif");
}

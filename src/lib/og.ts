import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Base das imagens de compartilhamento (Open Graph).
 *
 * São geradas no build, uma para a marca e uma por veículo — é o que aparece
 * quando alguém cola o link no WhatsApp. Só tipografia e dados do registro: as
 * fotos do estoque ainda são ilustrativas e, numa prévia pequena, sem a nota
 * de aviso, pareceriam a unidade anunciada.
 */

export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  background: "#05080f",
  surface: "#0c1420",
  foreground: "#f5f7fa",
  muted: "#a3b0c4",
  subtle: "#7f8ea6",
  border: "#27374f",
  brand: "#1460f2",
  brandBright: "#3d83ff",
} as const;

export async function wordmarkDataUrl(): Promise<string> {
  const file = await readFile(
    join(process.cwd(), "public/brand/autosflow-wordmark-inverse.png"),
  );
  return `data:image/png;base64,${file.toString("base64")}`;
}

/**
 * Archivo, a fonte display do site. Se o Google Fonts não responder no build,
 * a imagem sai com a fonte padrão em vez de derrubar o deploy.
 */
export async function archivoFonts() {
  const weights = [500, 700] as const;
  try {
    return await Promise.all(
      weights.map(async (weight) => ({
        name: "Archivo",
        weight,
        style: "normal" as const,
        data: await loadGoogleFont("Archivo", weight),
      })),
    );
  } catch {
    return undefined;
  }
}

async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
  ).then((response) => response.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!url) throw new Error(`Fonte ${family} ${weight} não encontrada`);
  return fetch(url[1]).then((response) => response.arrayBuffer());
}

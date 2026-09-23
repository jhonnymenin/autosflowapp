import { ImageResponse } from "next/og";

import { brand } from "@/data/brand";
import { vehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import { archivoFonts, ogColors, ogSize, wordmarkDataUrl } from "@/lib/og";
import { priceRange } from "@/lib/stock";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [wordmark, fonts] = await Promise.all([
    wordmarkDataUrl(),
    archivoFonts(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: ogColors.background,
          color: ogColors.foreground,
          fontFamily: "Archivo",
          borderBottom: `12px solid ${ogColors.brand}`,
        }}
      >
        <img src={wordmark} width={379} height={64} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.02,
            }}
          >
            {brand.tagline}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              fontWeight: 500,
              color: ogColors.muted,
            }}
          >
            {brand.descriptor}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 28,
            fontWeight: 500,
            color: ogColors.subtle,
          }}
        >
          <span style={{ color: ogColors.foreground }}>
            {`${vehicles.length} veículos em estoque`}
          </span>
          <span>·</span>
          <span>{`a partir de ${formatPrice(priceRange.min)}`}</span>
          <span>·</span>
          <span>São Paulo</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

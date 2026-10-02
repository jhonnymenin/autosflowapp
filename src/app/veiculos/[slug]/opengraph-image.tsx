import { ImageResponse } from "next/og";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { hasRealPhotos, imagesFor } from "@/data/vehicle-images";
import { vehicles } from "@/data/vehicles";
import { formatKm, formatPrice } from "@/lib/format";
import { archivoFonts, ogColors, ogSize, wordmarkDataUrl } from "@/lib/og";
import { fullName, getVehicle, stockRef } from "@/lib/stock";

export const alt = "Veículo em estoque na AutosFlow";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export default async function VehicleOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const [wordmark, fonts] = await Promise.all([
    wordmarkDataUrl(),
    archivoFonts(),
  ]);

  if (!vehicle) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: ogColors.background,
        }}
      >
        <img src={wordmark} width={474} height={80} alt="" />
      </div>,
      { ...size, fonts },
    );
  }

  // Com foto real da unidade, ela ocupa a direita da prévia. Imagens de
  // referência do modelo ficam de fora: sem a nota de aviso, enganariam.
  const cover = hasRealPhotos(vehicle) ? imagesFor(vehicle)[0] : undefined;
  const photo = cover
    ? `data:image/jpeg;base64,${(
        await readFile(join(process.cwd(), "public", cover.src))
      ).toString("base64")}`
    : undefined;
  const textWidth = photo ? 700 : ogSize.width;

  const facts = [
    vehicle.year,
    formatKm(vehicle.km),
    vehicle.fuel,
    vehicle.color,
  ];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: ogColors.background,
        color: ogColors.foreground,
        fontFamily: "Archivo",
        borderBottom: `12px solid ${ogColors.brand}`,
      }}
    >
      <div
        style={{
          width: textWidth,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: photo ? 60 : 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={wordmark} width={284} height={48} alt="" />
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 3,
              color: ogColors.subtle,
            }}
          >
            {`REF. ${stockRef(vehicle)}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ogColors.brandBright,
            }}
          >
            {vehicle.make}
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: photo ? 58 : fullName(vehicle).length > 32 ? 68 : 84,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.02,
            }}
          >
            {`${vehicle.model} ${vehicle.version}`.trim()}
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 28,
              fontSize: photo ? 26 : 32,
              fontWeight: 500,
              color: ogColors.muted,
            }}
          >
            {facts.map((fact, index) => (
              <span key={fact} style={{ display: "flex", gap: 18 }}>
                {index > 0 ? (
                  <span style={{ color: ogColors.border }}>·</span>
                ) : null}
                {fact}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: photo ? 64 : 76,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {formatPrice(vehicle.price)}
          </div>
          <div
            style={{ fontSize: 26, fontWeight: 500, color: ogColors.subtle }}
          >
            autosflow.com.br
          </div>
        </div>
      </div>
      {photo ? (
        <img
          src={photo}
          width={ogSize.width - textWidth}
          height={ogSize.height - 12}
          alt=""
          style={{ objectFit: "cover" }}
        />
      ) : null}
    </div>,
    { ...size, fonts },
  );
}

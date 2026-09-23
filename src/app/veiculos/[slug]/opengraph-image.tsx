import { ImageResponse } from "next/og";

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
      (
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
        </div>
      ),
      { ...size, fonts },
    );
  }

  const facts = [
    vehicle.year,
    formatKm(vehicle.km),
    vehicle.fuel,
    vehicle.color,
  ];

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
              fontSize: fullName(vehicle).length > 32 ? 68 : 84,
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
              fontSize: 32,
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
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
            {formatPrice(vehicle.price)}
          </div>
          <div style={{ fontSize: 26, fontWeight: 500, color: ogColors.subtle }}>
            autosflow.com.br
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

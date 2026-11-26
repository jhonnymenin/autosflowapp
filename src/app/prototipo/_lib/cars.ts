/**
 * Protótipo — dados dos carros para a nova home.
 *
 * Só para componentes de SERVIDOR: lê `data/vehicles.ts` (que tem a placa)
 * e devolve `ProtoCar`, um objeto sem placa, seguro para ir ao cliente.
 * Nunca importe este arquivo num componente "use client".
 */
import { bodyLabels, bodyOf, type BodyType } from "@/data/body-types";
import { imagesFor } from "@/data/vehicle-images";
import { professionalPhotos } from "@/data/vehicle-photos";
import { vehicles } from "@/data/vehicles";
import { formatKmShort, priceLabel } from "@/lib/format";
import { stockRef } from "@/lib/stock";
import type { Vehicle } from "@/types/vehicle";

import type { BadgeKey, ProtoCar } from "./types";

/** Modelos automáticos cuja versão na planilha não diz "AT"/"CVT". */
const AUTOMATIC_MODELS = new Set([
  "Corolla Cross",
  "X1",
  "Q3",
  "Nivus",
  "Compass",
]);

function gearboxOf(vehicle: Vehicle): ProtoCar["gearbox"] {
  const source = `${vehicle.version} ${vehicle.sourceName}`.toUpperCase();
  if (/\b(MT|MANUAL)\b/.test(source)) return "Manual";
  if (/\b(AT|CVT|AUT|DCT)\b/.test(source)) return "Automático";
  return AUTOMATIC_MODELS.has(vehicle.model) ? "Automático" : "Manual";
}

/**
 * Selos de EXEMPLO (FE-04): as regras reais — quantos % abaixo da FIPE, qual
 * o limite de km por ano — ainda estão em aberto. "Baixa km" já é calculado.
 */
const SAMPLE_BADGES: Record<string, BadgeKey[]> = {
  "hyundai-creta-16a-attitude": ["abaixo-fipe"],
  "audi-q3-1-4-tfsi": ["abaixo-fipe"],
  "fiat-argo-1-0-mt": ["super-preco"],
  "hyundai-hb20-1-0-mt": ["super-preco"],
  "kia-picanto-1-0-at": ["super-preco"],
  "bmw-x1-s20i-active-flex": ["abaixo-fipe"],
};

const SAMPLE_VERIFIED = new Set([
  ...professionalPhotos,
  "jeep-compass-limited-t270",
  "toyota-corolla-cross-xre-2-0",
  "toyota-corolla-cross-xrx-hybrid",
]);

const CURRENT_YEAR = 2026;

function badgesOf(vehicle: Vehicle): BadgeKey[] {
  const badges: BadgeKey[] = [];
  if (SAMPLE_VERIFIED.has(vehicle.slug)) badges.push("verified");
  const age = Math.max(1, CURRENT_YEAR - vehicle.yearSort + 1);
  if (vehicle.km > 0 && vehicle.km / age <= 10000) badges.push("baixa-km");
  badges.push(...(SAMPLE_BADGES[vehicle.slug] ?? []));
  if (vehicle.fuel === "Híbrido") badges.push("hibrido");
  if (vehicle.origin === "assistida") badges.push("assistida");
  return badges;
}

function toProtoCar(vehicle: Vehicle): ProtoCar {
  const body = bodyOf(vehicle);
  return {
    slug: vehicle.slug,
    ref: stockRef(vehicle),
    make: vehicle.make,
    model: vehicle.model,
    version: vehicle.version,
    year: vehicle.year,
    yearSort: vehicle.yearSort,
    km: vehicle.km,
    kmLabel: formatKmShort(vehicle.km),
    price: vehicle.price,
    priceLabel: priceLabel(vehicle.price),
    fuel: vehicle.fuel,
    color: vehicle.color,
    body,
    bodyLabel: body ? bodyLabels[body].label : undefined,
    gearbox: gearboxOf(vehicle),
    photos: imagesFor(vehicle)
      .slice(0, 3)
      .map((image) => ({
        src: image.src,
        width: image.width ?? 1600,
        height: image.height ?? 1200,
      })),
    badges: badgesOf(vehicle),
    location:
      vehicle.origin === "assistida"
        ? "Com o proprietário · São Paulo"
        : "Loja Ipiranga · São Paulo",
  };
}

export const protoCars: ProtoCar[] = vehicles
  .filter((vehicle) => imagesFor(vehicle).length > 0)
  .map(toProtoCar);

export function carsByBody(): {
  body: BodyType;
  plural: string;
  count: number;
  cover: ProtoCar;
}[] {
  return (Object.keys(bodyLabels) as BodyType[])
    .map((body) => {
      const list = protoCars.filter((car) => car.body === body);
      return { body, plural: bodyLabels[body].plural, count: list.length, cover: list[0] };
    })
    .filter((entry) => entry.count > 0 && entry.cover);
}

export const stockStats = {
  count: protoCars.length,
  makes: new Set(protoCars.map((car) => car.make)).size,
  minPrice: Math.min(...protoCars.filter((c) => c.price > 0).map((c) => c.price)),
  maxPrice: Math.max(...protoCars.map((c) => c.price)),
  withPhotos: protoCars.filter((car) => car.photos.length > 0).length,
};

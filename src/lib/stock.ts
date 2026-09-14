import { vehicles } from "@/data/vehicles";
import type { Vehicle } from "@/types/vehicle";

export type SortKey = "preco-asc" | "preco-desc" | "ano-desc" | "km-asc";

export interface StockQuery {
  make?: string;
  fuel?: string;
  origin?: string;
  sort?: SortKey;
}

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "ano-desc", label: "Mais novos" },
  { value: "km-asc", label: "Menor quilometragem" },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function fullName(vehicle: Vehicle): string {
  return [vehicle.make, vehicle.model, vehicle.version]
    .filter(Boolean)
    .join(" ");
}

/** Distinct makes, alphabetical, with a count for each. */
export function makesWithCounts(): { make: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const vehicle of vehicles) {
    counts.set(vehicle.make, (counts.get(vehicle.make) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => a.make.localeCompare(b.make, "pt-BR"));
}

export function fuelsWithCounts(): { fuel: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const vehicle of vehicles) {
    counts.set(vehicle.fuel, (counts.get(vehicle.fuel) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([fuel, count]) => ({ fuel, count }))
    .sort((a, b) => b.count - a.count);
}

export const originCounts = {
  loja: vehicles.filter((vehicle) => vehicle.origin === "loja").length,
  consignado: vehicles.filter((vehicle) => vehicle.origin === "consignado")
    .length,
};

const comparators: Record<SortKey, (a: Vehicle, b: Vehicle) => number> = {
  "preco-asc": (a, b) => a.price - b.price,
  "preco-desc": (a, b) => b.price - a.price,
  "ano-desc": (a, b) => b.yearSort - a.yearSort || a.price - b.price,
  "km-asc": (a, b) => a.km - b.km || a.price - b.price,
};

export function isSortKey(value: string | undefined): value is SortKey {
  return sortOptions.some((option) => option.value === value);
}

export function filterStock({ make, fuel, origin, sort }: StockQuery): Vehicle[] {
  const result = vehicles.filter((vehicle) => {
    if (make && vehicle.make !== make) return false;
    if (fuel && vehicle.fuel !== fuel) return false;
    if (origin && vehicle.origin !== origin) return false;
    return true;
  });

  return result.sort(comparators[sort && isSortKey(sort) ? sort : "preco-asc"]);
}

/** Featured vehicles for the home page, most expensive first. */
export function featuredVehicles(): Vehicle[] {
  return vehicles
    .filter((vehicle) => vehicle.featured)
    .sort((a, b) => b.price - a.price);
}

/** Other stock to show at the foot of a vehicle page. */
export function relatedVehicles(vehicle: Vehicle, limit = 3): Vehicle[] {
  const sameMake = vehicles.filter(
    (other) => other.slug !== vehicle.slug && other.make === vehicle.make,
  );
  const nearestPrice = vehicles
    .filter(
      (other) => other.slug !== vehicle.slug && !sameMake.includes(other),
    )
    .sort(
      (a, b) =>
        Math.abs(a.price - vehicle.price) - Math.abs(b.price - vehicle.price),
    );
  return [...sameMake, ...nearestPrice].slice(0, limit);
}

export const priceRange = {
  min: Math.min(...vehicles.map((vehicle) => vehicle.price)),
  max: Math.max(...vehicles.map((vehicle) => vehicle.price)),
};

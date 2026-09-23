import { vehicles } from "@/data/vehicles";
import type { Vehicle } from "@/types/vehicle";

export type SortKey = "preco-asc" | "preco-desc" | "ano-desc" | "km-asc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "ano-desc", label: "Mais novos" },
  { value: "km-asc", label: "Menor quilometragem" },
];

/* -------------------------------------------------------------------------
   Faixas

   Definidas a partir do estoque real (R$ 45.990 a R$ 142.990) e não de
   valores genéricos, para que nenhuma faixa apareça vazia.
   ---------------------------------------------------------------------- */

export interface Band {
  value: string;
  label: string;
  min?: number;
  max?: number;
}

export const priceBands: Band[] = [
  { value: "ate-50", label: "Até R$ 50 mil", max: 50000 },
  { value: "50-80", label: "R$ 50 a 80 mil", min: 50000, max: 80000 },
  { value: "80-110", label: "R$ 80 a 110 mil", min: 80000, max: 110000 },
  { value: "110-mais", label: "Acima de R$ 110 mil", min: 110000 },
];

export const yearBands: Band[] = [
  { value: "2023-mais", label: "2023 ou mais novo", min: 2023 },
  { value: "2020-2022", label: "2020 a 2022", min: 2020, max: 2022 },
  { value: "2016-2019", label: "2016 a 2019", min: 2016, max: 2019 },
  { value: "ate-2015", label: "Até 2015", max: 2015 },
];

export const kmBands: Band[] = [
  { value: "ate-40", label: "Até 40 mil km", max: 40000 },
  { value: "40-90", label: "40 a 90 mil km", min: 40000, max: 90000 },
  { value: "90-mais", label: "Acima de 90 mil km", min: 90000 },
];

function inBand(value: number, band: Band | undefined): boolean {
  if (!band) return true;
  if (band.min !== undefined && value < band.min) return false;
  if (band.max !== undefined && value > band.max) return false;
  return true;
}

const findBand = (bands: Band[], value?: string) =>
  value ? bands.find((band) => band.value === value) : undefined;

/* -------------------------------------------------------------------------
   Referência de estoque

   Identificador público do anúncio, usado no lugar da placa nas conversas e
   nas páginas. Derivado do slug, então é estável entre builds e não muda se a
   ordem do estoque mudar.
   ---------------------------------------------------------------------- */

export function stockRef(vehicle: Vehicle): string {
  let hash = 0;
  for (const char of vehicle.slug) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return `AF-${String((hash % 9000) + 1000)}`;
}

/**
 * Placa parcialmente ocultada.
 *
 * A placa completa identifica veículo e proprietário em consultas públicas,
 * então o site publica apenas o prefixo. A identificação comercial passa a
 * ser feita pela referência de estoque.
 */
export function maskedPlate(plate: string): string {
  return `${plate.slice(0, -2)}••`;
}

/* -------------------------------------------------------------------------
   Consulta
   ---------------------------------------------------------------------- */

export interface StockQuery {
  q?: string;
  make?: string;
  fuel?: string;
  origin?: string;
  price?: string;
  year?: string;
  km?: string;
  sort?: SortKey;
}

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function fullName(vehicle: Vehicle): string {
  return [vehicle.make, vehicle.model, vehicle.version]
    .filter(Boolean)
    .join(" ");
}

/** Sem acentos e em caixa baixa, para a busca livre. */
function normalise(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function matchesSearch(vehicle: Vehicle, query: string): boolean {
  const haystack = normalise(
    [
      vehicle.make,
      vehicle.model,
      vehicle.version,
      vehicle.sourceName,
      vehicle.year,
      vehicle.color,
      vehicle.fuel,
      stockRef(vehicle),
    ].join(" "),
  );
  return normalise(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

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

/** Quantos veículos cada faixa devolve, para mostrar no filtro. */
export function countInBand(kind: "price" | "year" | "km", band: Band): number {
  return vehicles.filter((vehicle) => {
    const value =
      kind === "price"
        ? vehicle.price
        : kind === "year"
          ? vehicle.yearSort
          : vehicle.km;
    return inBand(value, band);
  }).length;
}

const comparators: Record<SortKey, (a: Vehicle, b: Vehicle) => number> = {
  "preco-asc": (a, b) => a.price - b.price,
  "preco-desc": (a, b) => b.price - a.price,
  "ano-desc": (a, b) => b.yearSort - a.yearSort || a.price - b.price,
  "km-asc": (a, b) => a.km - b.km || a.price - b.price,
};

export function isSortKey(value: string | undefined): value is SortKey {
  return sortOptions.some((option) => option.value === value);
}

export function filterStock(query: StockQuery): Vehicle[] {
  const price = findBand(priceBands, query.price);
  const year = findBand(yearBands, query.year);
  const km = findBand(kmBands, query.km);

  const result = vehicles.filter((vehicle) => {
    if (query.make && vehicle.make !== query.make) return false;
    if (query.fuel && vehicle.fuel !== query.fuel) return false;
    if (query.origin && vehicle.origin !== query.origin) return false;
    if (!inBand(vehicle.price, price)) return false;
    if (!inBand(vehicle.yearSort, year)) return false;
    if (!inBand(vehicle.km, km)) return false;
    if (query.q && !matchesSearch(vehicle, query.q)) return false;
    return true;
  });

  return result.sort(
    comparators[query.sort && isSortKey(query.sort) ? query.sort : "preco-asc"],
  );
}

/** Destaques da home, do mais caro para o mais barato. */
export function featuredVehicles(): Vehicle[] {
  return vehicles
    .filter((vehicle) => vehicle.featured)
    .sort((a, b) => b.price - a.price);
}

/** Vitrine da home: destaques primeiro, depois os mais novos. */
export function showcaseVehicles(limit = 6): Vehicle[] {
  const featured = featuredVehicles();
  const rest = vehicles
    .filter((vehicle) => !vehicle.featured)
    .sort((a, b) => b.yearSort - a.yearSort || a.km - b.km);
  return [...featured, ...rest].slice(0, limit);
}

export function relatedVehicles(vehicle: Vehicle, limit = 3): Vehicle[] {
  const sameMake = vehicles.filter(
    (other) => other.slug !== vehicle.slug && other.make === vehicle.make,
  );
  const nearestPrice = vehicles
    .filter((other) => other.slug !== vehicle.slug && !sameMake.includes(other))
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

/**
 * FE-02 — busca em linguagem natural (versão de protótipo, sem IA).
 *
 * Lê frases como "SUV automático até 130 mil" ou "Onix 2024 por menos de 80
 * mil em São Paulo" e devolve filtros. No produto, a mesma interface pode ser
 * atendida por um modelo de IA pequeno (decisão em aberto no FE-02); este
 * parser mostra a experiência com o estoque real, sem custo.
 */
import type { BodyType } from "@/data/body-types";

import type { ProtoCar } from "./types";

export interface Parsed {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  body?: BodyType;
  fuel?: string;
  gearbox?: "Automático" | "Manual";
  maxKm?: number;
  city?: string;
}

export type ParsedKey = keyof Parsed;

export interface Chip {
  key: ParsedKey;
  label: string;
}

export const norm = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

const BRL = new Intl.NumberFormat("pt-BR");

const MAKE_ALIASES: Record<string, string> = {
  vw: "Volkswagen",
  volks: "Volkswagen",
  chevy: "Chevrolet",
  gm: "Chevrolet",
};

const BODY_WORDS: [RegExp, BodyType][] = [
  [/\b(suvs?|utilitarios?|crossover)\b/, "suv"],
  [/\b(hatch|hatches|hatchback|compacto)\b/, "hatch"],
  [/\b(seda|sedas|sedan|sedans)\b/, "sedan"],
  [/\b(picapes?|pickups?|caminhonetes?)\b/, "picape"],
];

const CITIES = ["sao paulo", "campinas", "santos", "guarulhos", "osasco", "abc"];

function toNumber(raw: string, unit?: string): number {
  let value = Number(raw.replace(/\./g, "").replace(",", "."));
  if (unit || value < 1000) value *= 1000;
  return Math.round(value);
}

export function parseQuery(text: string, cars: ProtoCar[]): Parsed {
  const t = ` ${norm(text)} `;
  const parsed: Parsed = {};
  if (!t.trim()) return parsed;

  // Modelo primeiro, do nome mais longo ao mais curto ("corolla cross" antes de "corolla").
  const models = [...new Set(cars.map((car) => car.model))].sort(
    (a, b) => b.length - a.length,
  );
  const model = models.find((m) => t.includes(` ${norm(m)} `) || t.includes(` ${norm(m)}`));
  if (model) {
    parsed.model = model;
    parsed.make = cars.find((car) => car.model === model)?.make;
  }
  if (!parsed.make) {
    const make = [...new Set(cars.map((car) => car.make))].find((m) =>
      t.includes(` ${norm(m)} `),
    );
    const alias = Object.entries(MAKE_ALIASES).find(([word]) =>
      t.includes(` ${word} `),
    )?.[1];
    if (make ?? alias) parsed.make = make ?? alias;
  }

  // Preço: "até 80 mil", "por menos de 100 mil", "entre 50 e 80 mil", "acima de 100 mil".
  const between = t.match(/entre\s*(?:r\$\s*)?(\d[\d.,]*)\s*(mil|k)?\s*e\s*(?:r\$\s*)?(\d[\d.,]*)\s*(mil|k)?/);
  if (between) {
    parsed.minPrice = toNumber(between[1], between[2] ?? between[4]);
    parsed.maxPrice = toNumber(between[3], between[4]);
  } else {
    const max = t.match(
      /(?:ate|menos de|abaixo de|no maximo|maximo|max)\s*(?:r\$\s*)?(\d[\d.,]*)\s*(mil|k)?(?!\s*km)/,
    );
    if (max && !(Number(max[1]) >= 1990 && Number(max[1]) <= 2030 && !max[2])) {
      parsed.maxPrice = toNumber(max[1], max[2]);
    }
    const min = t.match(/(?:acima de|mais de|a partir de)\s*(?:r\$\s*)?(\d[\d.,]*)\s*(mil|k)(?!\s*km)/);
    if (min) parsed.minPrice = toNumber(min[1], min[2]);
  }

  // Ano: "2020", "2020 ou mais", "a partir de 2020".
  const year = t.match(/\b(19[89]\d|20[0-3]\d)\b/);
  if (year) parsed.minYear = Number(year[1]);

  for (const [pattern, body] of BODY_WORDS) {
    if (pattern.test(t)) {
      parsed.body = body;
      break;
    }
  }

  if (/\bhibrid[oa]s?\b/.test(t)) parsed.fuel = "Híbrido";
  else if (/\bdiesel\b/.test(t)) parsed.fuel = "Diesel";
  else if (/\bflex\b/.test(t)) parsed.fuel = "Flex";

  if (/\b(automatic[oa]s?|cambio automatico|cvt)\b/.test(t)) parsed.gearbox = "Automático";
  else if (/\bmanua(l|is)\b/.test(t)) parsed.gearbox = "Manual";

  const km = t.match(/(?:ate|menos de|abaixo de)\s*(\d[\d.,]*)\s*(mil)?\s*km/);
  if (km) parsed.maxKm = toNumber(km[1], km[2]);
  else if (/\b(baixa km|baixa quilometragem|pouco rodado|seminovo)\b/.test(t)) parsed.maxKm = 60000;

  const city = CITIES.find((c) => t.includes(` ${c}`));
  if (city) parsed.city = city === "abc" ? "ABC" : city.replace(/\b\w/g, (c) => c.toUpperCase()).replace("Sao", "São");

  return parsed;
}

const BODY_LABEL: Record<BodyType, string> = {
  suv: "SUV",
  hatch: "Hatch",
  sedan: "Sedã",
  picape: "Picape",
};

export function chipsOf(parsed: Parsed): Chip[] {
  const chips: Chip[] = [];
  if (parsed.make) chips.push({ key: "make", label: parsed.make });
  if (parsed.model) chips.push({ key: "model", label: parsed.model });
  if (parsed.body) chips.push({ key: "body", label: BODY_LABEL[parsed.body] });
  if (parsed.minPrice && parsed.maxPrice)
    chips.push({ key: "maxPrice", label: `R$ ${BRL.format(parsed.minPrice / 1000)} a ${BRL.format(parsed.maxPrice / 1000)} mil` });
  else if (parsed.maxPrice) chips.push({ key: "maxPrice", label: `até R$ ${BRL.format(parsed.maxPrice / 1000)} mil` });
  else if (parsed.minPrice) chips.push({ key: "minPrice", label: `acima de R$ ${BRL.format(parsed.minPrice / 1000)} mil` });
  if (parsed.minYear) chips.push({ key: "minYear", label: `${parsed.minYear} ou mais novo` });
  if (parsed.gearbox) chips.push({ key: "gearbox", label: parsed.gearbox });
  if (parsed.fuel) chips.push({ key: "fuel", label: parsed.fuel });
  if (parsed.maxKm) chips.push({ key: "maxKm", label: `até ${BRL.format(parsed.maxKm)} km` });
  if (parsed.city) chips.push({ key: "city", label: parsed.city });
  return chips;
}

export function removeKey(parsed: Parsed, key: ParsedKey): Parsed {
  const next = { ...parsed };
  delete next[key];
  if (key === "maxPrice") delete next.minPrice;
  if (key === "make") delete next.model;
  return next;
}

export function filterCars(cars: ProtoCar[], p: Parsed): ProtoCar[] {
  return cars.filter((car) => {
    if (p.make && car.make !== p.make) return false;
    if (p.model && car.model !== p.model) return false;
    if (p.body && car.body !== p.body) return false;
    if (p.maxPrice && car.price > p.maxPrice) return false;
    if (p.minPrice && car.price < p.minPrice) return false;
    if (p.minYear && car.yearSort < p.minYear) return false;
    if (p.gearbox && car.gearbox !== p.gearbox) return false;
    if (p.fuel && car.fuel !== p.fuel) return false;
    if (p.maxKm && (car.km <= 0 || car.km > p.maxKm)) return false;
    // Cidade: todo o estoque de hoje está em São Paulo, então não exclui.
    return true;
  });
}

/** Leva os filtros para o catálogo real (/veiculos), que trabalha por faixas. */
export function catalogHref(p: Parsed): string {
  const qs = new URLSearchParams();
  if (p.make) qs.set("make", p.make);
  if (p.model) qs.set("q", p.model);
  if (p.body) qs.set("body", p.body);
  if (p.fuel) qs.set("fuel", p.fuel);
  if (p.maxPrice) {
    qs.set(
      "price",
      p.maxPrice <= 50000 ? "ate-50" : p.maxPrice <= 80000 ? "50-80" : p.maxPrice <= 110000 ? "80-110" : "110-mais",
    );
  }
  if (p.minYear) qs.set("year", p.minYear >= 2023 ? "2023-mais" : p.minYear >= 2020 ? "2020-2022" : "ate-2019");
  const query = qs.toString();
  return `/veiculos${query ? `?${query}` : ""}`;
}

export function hasFilters(p: Parsed): boolean {
  return Object.values(p).some((value) => value !== undefined);
}

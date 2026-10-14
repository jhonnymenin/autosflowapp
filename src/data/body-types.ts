import type { Vehicle } from "@/types/vehicle";

/**
 * Carroceria por modelo.
 *
 * A tabela de estoque não traz carroceria; ela é uma característica do modelo,
 * não da unidade, então fica aqui, em um só lugar, e vale para toda unidade
 * daquele modelo. Ao entrar um modelo novo, acrescente-o — um modelo sem
 * carroceria simplesmente não aparece nos atalhos e filtros por perfil.
 */
export type BodyType = "suv" | "hatch" | "sedan" | "picape";

export const bodyLabels: Record<BodyType, { label: string; plural: string }> = {
  suv: { label: "SUV", plural: "SUVs" },
  hatch: { label: "Hatch", plural: "Hatches" },
  sedan: { label: "Sedã", plural: "Sedãs" },
  picape: { label: "Picape", plural: "Picapes" },
};

const byModel: Record<string, BodyType> = {
  Q3: "suv",
  X1: "suv",
  "HR-V": "suv",
  Creta: "suv",
  "Eclipse Cross": "suv",
  Kicks: "suv",
  "T-Cross": "suv",
  Territory: "suv",
  "Corolla Cross": "suv",
  EcoSport: "suv",
  Nivus: "suv",
  Tracker: "suv",
  Onix: "hatch",
  Sonic: "hatch",
  "PT Cruiser": "hatch",
  Fiesta: "hatch",
  Kwid: "hatch",
  Argo: "hatch",
  HB20: "hatch",
  Picanto: "hatch",
  City: "sedan",
  Cerato: "sedan",
  Strada: "picape",
};

export function bodyOf(vehicle: Vehicle): BodyType | undefined {
  return byModel[vehicle.model];
}

export function isBodyType(value: string | undefined): value is BodyType {
  return value !== undefined && value in bodyLabels;
}

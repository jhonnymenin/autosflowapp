import type { BodyType } from "@/data/body-types";

export type BadgeKey =
  | "verified"
  | "baixa-km"
  | "abaixo-fipe"
  | "super-preco"
  | "hibrido"
  | "assistida";

export const badgeLabels: Record<BadgeKey, string> = {
  verified: "Verified",
  "baixa-km": "Baixa km",
  "abaixo-fipe": "Abaixo da FIPE",
  "super-preco": "Super preço",
  hibrido: "Híbrido",
  assistida: "Venda assistida",
};

/** Carro sem placa: o único formato que pode ir para componentes de cliente. */
export interface ProtoCar {
  slug: string;
  ref: string;
  make: string;
  model: string;
  version: string;
  year: string;
  yearSort: number;
  km: number;
  kmLabel: string;
  price: number;
  priceLabel: string;
  fuel: string;
  color: string;
  body?: BodyType;
  bodyLabel?: string;
  gearbox: "Automático" | "Manual";
  photos: { src: string; width: number; height: number }[];
  badges: BadgeKey[];
  location: string;
}

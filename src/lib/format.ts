const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const decimal = new Intl.NumberFormat("pt-BR");

/** R$ 94.990 — the source table carries whole-real prices only. */
export function formatPrice(value: number): string {
  return brl.format(value);
}

/** 92.014 km, or "Não informada" when the source records no reading. */
export function formatKm(value: number): string {
  if (value <= 0) return "Não informada";
  return `${decimal.format(value)} km`;
}

/** Compact odometer for dense data rows. */
export function formatKmShort(value: number): string {
  if (value <= 0) return "—";
  return `${decimal.format(value)} km`;
}

export function formatNumber(value: number): string {
  return decimal.format(value);
}

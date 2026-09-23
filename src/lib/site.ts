import { contact } from "@/data/brand";
import { formatKm, formatPrice } from "@/lib/format";
import { fullName, stockRef } from "@/lib/stock";
import type { Vehicle } from "@/types/vehicle";

/**
 * Canonical origin. Vercel exposes the deployment host at build time; the
 * production domain can be pinned with NEXT_PUBLIC_SITE_URL once it is live.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const nav = [
  { href: "/veiculos", label: "Veículos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

/** Opens WhatsApp with a prefilled message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.phoneE164}?text=${encodeURIComponent(message)}`;
}

export const whatsappGeneral = whatsappUrl(
  "Olá! Vim pelo site da AutosFlow e gostaria de falar com um especialista.",
);

export const whatsappSell = whatsappUrl(
  "Olá! Quero vender meu carro com a AutosFlow e gostaria de uma avaliação.",
);

/* -------------------------------------------------------------------------
   Mensagens por veículo

   A conversa chega ao atendimento com o anúncio já identificado — encurta o
   atendimento e permite medir depois quais veículos geram interesse. A
   identificação é feita pela referência de estoque, não pela placa.
   ---------------------------------------------------------------------- */

export interface LeadOptions {
  /** Entrada em reais, quando o cliente informa. */
  downPayment?: number;
  /** Número de parcelas pretendido. */
  instalments?: number;
  /** Cliente tem veículo para dar na troca. */
  tradeIn?: boolean;
  /** Cliente quer agendar visita ou test-drive. */
  visit?: boolean;
}

/** Bloco com os dados do anúncio, comum a todas as mensagens. */
function vehicleBlock(vehicle: Vehicle): string {
  return [
    `*${fullName(vehicle)}*`,
    `Ref. ${stockRef(vehicle)}`,
    `Ano ${vehicle.year} · ${formatKm(vehicle.km)} · ${vehicle.fuel} · ${vehicle.color}`,
    `Valor ${formatPrice(vehicle.price)}`,
  ].join("\n");
}

export function whatsappForVehicle(
  vehicle: Vehicle,
  options: LeadOptions = {},
): string {
  const lines = [
    "Olá! Tenho interesse neste veículo do site da AutosFlow:",
    "",
    vehicleBlock(vehicle),
  ];

  const wants: string[] = [];
  if (options.downPayment && options.downPayment > 0) {
    wants.push(`Entrada de ${formatPrice(options.downPayment)}`);
  }
  if (options.instalments) {
    wants.push(`Parcelamento em ${options.instalments}x`);
  }
  if (options.tradeIn) wants.push("Tenho um veículo para dar na troca");
  if (options.visit) wants.push("Gostaria de agendar uma visita ou test-drive");

  if (wants.length > 0) {
    lines.push("", ...wants.map((item) => `• ${item}`));
  }

  return whatsappUrl(lines.join("\n"));
}

/** Agendamento de visita para um veículo específico. */
export function whatsappVisit(vehicle: Vehicle): string {
  return whatsappUrl(
    [
      "Olá! Gostaria de agendar uma visita para ver este veículo:",
      "",
      vehicleBlock(vehicle),
    ].join("\n"),
  );
}

import { contact } from "@/data/brand";

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

export function whatsappForVehicle(name: string, plate: string): string {
  return whatsappUrl(
    `Olá! Tenho interesse no ${name} (placa ${plate}) que vi no site da AutosFlow.`,
  );
}

export const whatsappSell = whatsappUrl(
  "Olá! Quero vender meu carro com a AutosFlow e gostaria de uma avaliação.",
);

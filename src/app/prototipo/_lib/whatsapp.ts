/**
 * Links de WhatsApp seguros para componentes de cliente.
 *
 * `@/lib/site` importa `@/lib/stock`, que carrega `data/vehicles` (com as
 * placas completas) no JavaScript do navegador. Aqui só entra `data/brand`.
 */
import { contact } from "@/data/brand";

export function waUrl(message: string): string {
  return `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export const waGeneral = waUrl("Olá! Vim pelo site da AutosFlow e gostaria de falar com um especialista.");

export const waSell = waUrl("Olá! Quero vender meu carro com a AutosFlow e gostaria de uma avaliação.");

export type Fuel = "Flex" | "Gasolina" | "Híbrido" | "Diesel";

/**
 * loja: estoque próprio. consignado: carro de proprietário, na loja.
 * assistida: venda assistida — carro de terceiro que fica com o proprietário;
 * a AutosFlow anuncia e conduz a negociação (código AO-### na planilha).
 */
export type Origin = "loja" | "consignado" | "assistida";

export interface Vehicle {
  /** Código da planilha (AF-### no estoque físico, AO-### na venda assistida), usado como referência pública. */
  ref?: string;
  /** URL segment, unique across the stock. */
  slug: string;
  /** Manufacturer, exactly as grouped in the source price table. */
  make: string;
  /** Model, normalised for display. */
  model: string;
  /** Version/trim as printed in the source, normalised for spacing and case. */
  version: string;
  /**
   * The description string exactly as it appears in the source price table.
   * Kept verbatim so the published table never drifts from the document.
   */
  sourceName: string;
  /** Manufacture/model year, e.g. "17/17" in the source. */
  yearShort: string;
  /** Same value expanded to four digits, e.g. "2017/2017". */
  year: string;
  /** First of the two years, used for sorting and filtering. */
  yearSort: number;
  fuel: Fuel;
  color: string;
  /** Odometer in kilometres. */
  km: number;
  /** Ausente quando o registro ainda não chegou. */
  plate?: string;
  /** Asking price in BRL. */
  price: number;
  /** Estoque próprio, consignado (marcado "*" na fonte) ou venda assistida. */
  origin?: Origin;
  featured: boolean;
  /**
   * Conjunto de imagens de REFERÊNCIA em `data/vehicle-images.ts`, usado só
   * enquanto a unidade não tem fotos reais em `data/vehicle-photos.ts`.
   */
  imageSet?: string;
  /** Rotates a shared image set so two units of a model differ. */
  imageOffset?: number;
}

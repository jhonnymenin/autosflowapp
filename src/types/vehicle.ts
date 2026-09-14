export type Fuel = "Flex" | "Gasolina";

export type Origin = "loja" | "consignado";

export interface Vehicle {
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
  plate: string;
  /** Asking price in BRL. */
  price: number;
  /** Stock vehicle or vehicle listed on consignment (marked "*" in the source). */
  origin: Origin;
  featured: boolean;
  /**
   * Key into the placeholder image sets in `data/vehicle-images.ts`.
   * Not part of the source record — see that file before changing it.
   */
  imageSet: string;
  /** Rotates a shared image set so two units of a model differ. */
  imageOffset?: number;
}

import { vehicles } from "@/data/vehicles";
import {
  professionalPhotos,
  showroomPhotos,
  vehiclePhotos,
} from "@/data/vehicle-photos";
import type { Vehicle } from "@/types/vehicle";

/**
 * Imagens do catálogo.
 *
 * Cada veículo usa, nesta ordem:
 *
 * 1. As FOTOS REAIS da unidade, em `data/vehicle-photos.ts`.
 * 2. Na falta delas, um conjunto PROVISÓRIO de referência do MODELO (abaixo):
 *    cor, ano e estado não batem com o anúncio, e a galeria mostra a nota de
 *    imagem ilustrativa. São Creative Commons ou domínio público, do Wikimedia
 *    Commons, creditadas em /creditos.
 *
 * Quando um veículo ganha fotos reais, o conjunto provisório dele pode sair
 * daqui (e os arquivos de public/imagens/veiculos/) se nenhum outro o usar.
 */

export const ILLUSTRATIVE_NOTE =
  "Imagem de referência do modelo — não é a unidade anunciada. Fotos reais deste veículo sob consulta.";

export interface VehicleImage {
  src: string;
  /** Dimensões do arquivo, quando conhecidas (fotos reais). */
  width?: number;
  height?: number;
  /** Só nas imagens de referência: crédito da licença. */
  author?: string;
  licence?: string;
  source?: string;
}

// Vazio de propósito desde 10/11/2026: um cliente viu o Eclipse Cross com
// fotos de referência, cada uma de um carro diferente, e achou que era a
// unidade. Só entra no site carro com fotos da própria unidade.
const imageSets: Record<string, VehicleImage[]> = {};

/**
 * Qualidade da apresentação: 0 = fotos profissionais, 1 = fotos no showroom
 * da AutosFlow, 2 = outras fotos da própria unidade, 3 = referência do modelo.
 */
export function photoTier(vehicle: Vehicle): number {
  if (!hasRealPhotos(vehicle)) return 3;
  if (professionalPhotos.has(vehicle.slug)) return 0;
  return showroomPhotos.has(vehicle.slug) ? 1 : 2;
}

/** A unidade anunciada tem fotos próprias? */
export function hasRealPhotos(vehicle: Vehicle): boolean {
  return (vehiclePhotos[vehicle.slug]?.length ?? 0) > 0;
}

/**
 * Imagens de um veículo: as fotos reais, ou o conjunto de referência do
 * modelo. Conjuntos compartilhados giram para que duas unidades do mesmo
 * modelo não abram com o mesmo quadro.
 */
export function imagesFor(vehicle: Vehicle): VehicleImage[] {
  const real = vehiclePhotos[vehicle.slug];
  if (real && real.length > 0) return real;

  const set = vehicle.imageSet ? imageSets[vehicle.imageSet] : undefined;
  if (!set || set.length === 0) return [];
  const offset = vehicle.imageOffset ?? 0;
  if (offset === 0) return set;
  return [
    ...set.slice(offset % set.length),
    ...set.slice(0, offset % set.length),
  ];
}

/** Créditos das imagens de referência ainda em uso, sem repetição. */
export function allImageCredits(): VehicleImage[] {
  const seen = new Set<string>();
  const out: VehicleImage[] = [];
  for (const vehicle of vehicles) {
    if (hasRealPhotos(vehicle)) continue;
    for (const image of imagesFor(vehicle)) {
      if (!image.author || seen.has(image.src)) continue;
      seen.add(image.src);
      out.push(image);
    }
  }
  return out;
}

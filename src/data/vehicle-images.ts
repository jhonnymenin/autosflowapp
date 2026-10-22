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

const imageSets: Record<string, VehicleImage[]> = {
  "chevrolet-onix-hatch": [
    {
      src: "/imagens/veiculos/chevrolet-onix-hatch-1.jpg",
      author: "Jengtingchen",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Chevrolet_Onix_008.jpg",
    },
    {
      src: "/imagens/veiculos/chevrolet-onix-hatch-2.jpg",
      author: "Matti Blume",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:Chevrolet_Onix_20150814-DSC05650.JPG",
    },
    {
      src: "/imagens/veiculos/chevrolet-onix-hatch-3.jpg",
      author: "Jengtingchen",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Chevrolet_Onix_006.jpg",
    },
  ],
  "chevrolet-sonic": [
    {
      src: "/imagens/veiculos/chevrolet-sonic-1.jpg",
      author: "IFCAR",
      licence: "Public domain",
      source:
        "https://commons.wikimedia.org/wiki/File:2012_Chevrolet_Sonic_1LT_hatchback_--_10-19-2011_front_1.jpg",
    },
    {
      src: "/imagens/veiculos/chevrolet-sonic-2.jpg",
      author: "IFCAR",
      licence: "Public domain",
      source:
        "https://commons.wikimedia.org/wiki/File:2012_Chevrolet_Sonic_1LT_hatchback_--_10-19-2011_front_2.jpg",
    },
    {
      src: "/imagens/veiculos/chevrolet-sonic-3.jpg",
      author: "Elise240SX",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:2014_Chevrolet_Sonic_LS_Hatchback_in_Silver_Ice_Metallic,_Front_Right,_09-02-2023.jpg",
    },
  ],
  "honda-hr-v": [
    {
      src: "/imagens/veiculos/honda-hr-v-1.jpg",
      author: "LuvsMG481",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:2015_Honda_HR-V_1.8S_front.jpg",
    },
    {
      src: "/imagens/veiculos/honda-hr-v-2.jpg",
      author: "オーバードライブ83",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:2015_Honda_HR-V_1.8_Prestige_RU5_(20210922).jpg",
    },
    {
      src: "/imagens/veiculos/honda-hr-v-3.jpg",
      author: "Alex Neman",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:2015_Honda_HR-V_rear,_West_Surabaya.jpg",
    },
  ],
  "mitsubishi-eclipse-cross": [
    {
      src: "/imagens/veiculos/mitsubishi-eclipse-cross-1.jpg",
      author: "Tokumeigakarinoaoshima",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:Osaka_Auto_Messe_2019_(414)_-_Mitsubishi_ECLIPSE_CROSS_STREET_SPORT.jpg",
    },
    {
      src: "/imagens/veiculos/mitsubishi-eclipse-cross-2.jpg",
      author: "Alexander Migl",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:Mitsubishi_Eclipse_Cross_PHEV_1X7A6477.jpg",
    },
    {
      src: "/imagens/veiculos/mitsubishi-eclipse-cross-3.jpg",
      author: "Vauxford",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:2018_Mitsubishi_Eclipse_Cross_3_4X2_1.5_Front.jpg",
    },
  ],
  "nissan-kicks": [
    {
      src: "/imagens/veiculos/nissan-kicks-1.jpg",
      author: "TTTNIS",
      licence: "CC0",
      source:
        "https://commons.wikimedia.org/wiki/File:2024_Nissan_Kicks_X_Two-Tone_Interior_Edition.jpg",
    },
    {
      src: "/imagens/veiculos/nissan-kicks-2.jpg",
      author: "TTTNIS",
      licence: "CC0",
      source:
        "https://commons.wikimedia.org/wiki/File:2024_Nissan_Kicks_X_Two-Tone_Interior_Edition_rear.jpg",
    },
    {
      src: "/imagens/veiculos/nissan-kicks-3.jpg",
      author: "Dinkun Chen",
      licence: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:NISSAN_KICKS_China_(9).jpg",
    },
  ],
};

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

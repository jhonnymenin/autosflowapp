import { vehicles } from "@/data/vehicles";
import { vehiclePhotos } from "@/data/vehicle-photos";
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
  "chevrolet-onix": [
    {
      src: "/imagens/veiculos/chevrolet-onix-1.jpg",
      author: "Dinkun Chen",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:CHEVROLET_ONIX_China_(6).jpg",
    },
    {
      src: "/imagens/veiculos/chevrolet-onix-2.jpg",
      author: "Dinkun Chen",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:CHEVROLET_ONIX_China_(7).jpg",
    },
    {
      src: "/imagens/veiculos/chevrolet-onix-3.jpg",
      author: "Jengtingchen",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Chevrolet_Onix_012.jpg",
    },
  ],
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
      source: "https://commons.wikimedia.org/wiki/File:Chevrolet_Onix_20150814-DSC05650.JPG",
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
      source: "https://commons.wikimedia.org/wiki/File:2012_Chevrolet_Sonic_1LT_hatchback_--_10-19-2011_front_1.jpg",
    },
    {
      src: "/imagens/veiculos/chevrolet-sonic-2.jpg",
      author: "IFCAR",
      licence: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:2012_Chevrolet_Sonic_1LT_hatchback_--_10-19-2011_front_2.jpg",
    },
    {
      src: "/imagens/veiculos/chevrolet-sonic-3.jpg",
      author: "Elise240SX",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:2014_Chevrolet_Sonic_LS_Hatchback_in_Silver_Ice_Metallic,_Front_Right,_09-02-2023.jpg",
    },
  ],
  "chrysler-pt-cruiser": [
    {
      src: "/imagens/veiculos/chrysler-pt-cruiser-1.jpg",
      author: "Dinkun Chen",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:CHRYSLER_PT_CRUISER_China.jpg",
    },
    {
      src: "/imagens/veiculos/chrysler-pt-cruiser-2.jpg",
      author: "Rudolf Stricker",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Chrysler_PT_Cruiser_front_20071211.jpg",
    },
    {
      src: "/imagens/veiculos/chrysler-pt-cruiser-3.jpg",
      author: "IFCAR",
      licence: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:06-08_Chrysler_PT_Cruiser.jpg",
    },
  ],
  "fiat-strada": [
    {
      src: "/imagens/veiculos/fiat-strada-1.jpg",
      author: "NaBUru38",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Fiat_Strada_2020_Volcano_in_Montevideo_(front).jpg",
    },
    {
      src: "/imagens/veiculos/fiat-strada-2.jpg",
      author: "NaBUru38",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Fiat_Strada_2020_Volcano_in_Montevideo_(front)_(cropped).jpg",
    },
    {
      src: "/imagens/veiculos/fiat-strada-3.jpg",
      author: "NaBUru38",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Fiat_Strada_2020_Volcano_in_Montevideo_(back).jpg",
    },
  ],
  "ford-fiesta": [
    {
      src: "/imagens/veiculos/ford-fiesta-1.jpg",
      author: "MercurySable99",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:2018_Ford_Fiesta_SE_hatchback,_front_right,_09-28-2024.jpg",
    },
    {
      src: "/imagens/veiculos/ford-fiesta-2.jpg",
      author: "Dinkun Chen",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:FORD_FIESTA_5_DOOR_HATCHBACK_(B299)_China_(2).jpg",
    },
    {
      src: "/imagens/veiculos/ford-fiesta-3.jpg",
      author: "M 93",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Ford_Fiesta_(2008)_Mk6_Trend_5-door_front.jpg",
    },
  ],
  "honda-city": [
    {
      src: "/imagens/veiculos/honda-city-1.jpg",
      author: "Poramin",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:2017_Honda_City_GM4_29082022.jpg",
    },
    {
      src: "/imagens/veiculos/honda-city-2.jpg",
      author: "PA",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:2017_Honda_City_i-VTEC.jpg",
    },
    {
      src: "/imagens/veiculos/honda-city-3.jpg",
      author: "Captainmorlypogi1959",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Honda_City_1.5_S_2024_(2).jpg",
    },
  ],
  "honda-hr-v": [
    {
      src: "/imagens/veiculos/honda-hr-v-1.jpg",
      author: "LuvsMG481",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:2015_Honda_HR-V_1.8S_front.jpg",
    },
    {
      src: "/imagens/veiculos/honda-hr-v-2.jpg",
      author: "オーバードライブ83",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:2015_Honda_HR-V_1.8_Prestige_RU5_(20210922).jpg",
    },
    {
      src: "/imagens/veiculos/honda-hr-v-3.jpg",
      author: "Alex Neman",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:2015_Honda_HR-V_rear,_West_Surabaya.jpg",
    },
  ],
  "mitsubishi-eclipse-cross": [
    {
      src: "/imagens/veiculos/mitsubishi-eclipse-cross-1.jpg",
      author: "Tokumeigakarinoaoshima",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Osaka_Auto_Messe_2019_(414)_-_Mitsubishi_ECLIPSE_CROSS_STREET_SPORT.jpg",
    },
    {
      src: "/imagens/veiculos/mitsubishi-eclipse-cross-2.jpg",
      author: "Alexander Migl",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Mitsubishi_Eclipse_Cross_PHEV_1X7A6477.jpg",
    },
    {
      src: "/imagens/veiculos/mitsubishi-eclipse-cross-3.jpg",
      author: "Vauxford",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:2018_Mitsubishi_Eclipse_Cross_3_4X2_1.5_Front.jpg",
    },
  ],
  "nissan-kicks": [
    {
      src: "/imagens/veiculos/nissan-kicks-1.jpg",
      author: "TTTNIS",
      licence: "CC0",
      source: "https://commons.wikimedia.org/wiki/File:2024_Nissan_Kicks_X_Two-Tone_Interior_Edition.jpg",
    },
    {
      src: "/imagens/veiculos/nissan-kicks-2.jpg",
      author: "TTTNIS",
      licence: "CC0",
      source: "https://commons.wikimedia.org/wiki/File:2024_Nissan_Kicks_X_Two-Tone_Interior_Edition_rear.jpg",
    },
    {
      src: "/imagens/veiculos/nissan-kicks-3.jpg",
      author: "Dinkun Chen",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:NISSAN_KICKS_China_(9).jpg",
    },
  ],
  "renault-kwid": [
    {
      src: "/imagens/veiculos/renault-kwid-1.jpg",
      author: "NaBUru38",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Renault_Kwid_2017_in_Montevideo_(front).jpg",
    },
    {
      src: "/imagens/veiculos/renault-kwid-2.jpg",
      author: "NaBUru38",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Renault_Kwid_2017_in_Montevideo_(back).jpg",
    },
    {
      src: "/imagens/veiculos/renault-kwid-3.jpg",
      author: "Jason Lawrence from New York",
      licence: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Renault_Kwid_(53343921268).jpg",
    },
  ],
  "volkswagen-t-cross": [
    {
      src: "/imagens/veiculos/volkswagen-t-cross-1.jpg",
      author: "Alexander-93",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Volkswagen_T-Cross_(2023)_1X7A1967.jpg",
    },
    {
      src: "/imagens/veiculos/volkswagen-t-cross-2.jpg",
      author: "Alexander Migl",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Volkswagen_T-Cross_1X7A0366.jpg",
    },
    {
      src: "/imagens/veiculos/volkswagen-t-cross-3.jpg",
      author: "Alexander Migl",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Volkswagen_T-Cross_1X7A0363.jpg",
    },
  ],
};

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
  return [...set.slice(offset % set.length), ...set.slice(0, offset % set.length)];
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

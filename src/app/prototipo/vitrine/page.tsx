import type { Metadata } from "next";

import { Showroom, type StageCar } from "../_components/home/showroom";
import { protoCars } from "../_lib/cars";

export const metadata: Metadata = {
  title: "Vitrine (proposta extra)",
  description: "Proposta extra, fora do material de apoio: vitrine com os carros reais recortados.",
};

/** Recortes (fundo removido no Magnific) das fotos reais do estoque. */
const CUTOUTS: Record<string, [number, number]> = {
  "jeep-compass-limited-t270": [1051, 792],
  "ford-ranger-storm-xls-3-2-diesel": [1400, 952],
  "volkswagen-nivus-highline-tsi-2022": [1400, 957],
  "audi-q3-1-4-tfsi": [1395, 1021],
  "chevrolet-onix-lt-1-0-turbo-mt": [1050, 646],
  "fiat-argo-1-0-mt": [1369, 1020],
};

/**
 * PROPOSTA EXTRA, fora do esquema do time (não está entre os FE-01 a FE-13).
 * Fica numa página separada para a equipe avaliar se vale virar um item; a
 * home segue o material de apoio.
 */
export default function VitrinePage() {
  const items: StageCar[] = Object.entries(CUTOUTS)
    .map(([slug, [width, height]]) => {
      const car = protoCars.find((c) => c.slug === slug);
      return car ? { car, cutout: { src: `/prototipo/carros/${slug}.webp`, width, height } } : null;
    })
    .filter((item): item is StageCar => item !== null);

  return (
    <div className="pt-[4.75rem]">
      <Showroom items={items} />
    </div>
  );
}

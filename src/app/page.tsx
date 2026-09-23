import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { Hero } from "@/components/home/hero";
import { ShowcaseSection } from "@/components/home/showcase-section";
import { WhySection } from "@/components/home/why-section";
import { vehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import { priceRange } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Veículos selecionados em São Paulo",
  description: `${vehicles.length} veículos em estoque a partir de ${formatPrice(priceRange.min)}. Busque por modelo, marca, ano, preço ou quilometragem e fale direto com um especialista da AutosFlow.`,
  alternates: { canonical: "/" },
};

/**
 * Home.
 *
 * Ordem deliberada: hero curto com busca, estoque, e só depois a marca. O
 * institucional completo fica em /sobre — quem chega aqui está procurando
 * carro, não a nossa história.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ShowcaseSection />
      <WhySection />
      <CtaSection />
    </>
  );
}

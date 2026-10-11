import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { ProfileSection } from "@/components/home/profile-section";
import { SellSection } from "@/components/home/sell-section";
import { ShowcaseSection } from "@/components/home/showcase-section";
import { VisitSection } from "@/components/home/visit-section";
import { WhySection } from "@/components/home/why-section";
import { TrustSection } from "@/components/trust-section";
import { vehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import { priceRange } from "@/lib/stock";

export const metadata: Metadata = {
  // O template do layout não alcança a página da mesma pasta — a marca vai à mão.
  title: { absolute: "AutosFlow — Veículos selecionados em São Paulo" },
  description: `${vehicles.length} veículos em estoque a partir de ${formatPrice(priceRange.min)}. Busque por modelo, marca, ano, preço ou quilometragem e fale direto com um especialista da AutosFlow.`,
  alternates: { canonical: "/" },
};

/**
 * Home.
 *
 * Ordem pensada para quem chega querendo um carro, sem esconder quem quer
 * vender: abertura com os dois caminhos e busca rápida, vitrine, atalhos por
 * perfil, diferenciais, venda assistida, prova social e a loja de verdade.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ShowcaseSection />
      <ProfileSection />
      <WhySection />
      <SellSection />
      <TrustSection />
      <VisitSection />
    </>
  );
}

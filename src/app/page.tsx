import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { Hero } from "@/components/home/hero";
import { JourneySection } from "@/components/home/journey-section";
import { ManifestoSection } from "@/components/home/manifesto-section";
import { StockSection } from "@/components/home/stock-section";
import { VerifiedSection } from "@/components/home/verified-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoSection />
      <FeaturedSection />
      <StockSection />
      <JourneySection />
      <VerifiedSection />
      <CtaSection />
    </>
  );
}

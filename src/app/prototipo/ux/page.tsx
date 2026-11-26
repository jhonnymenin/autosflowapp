import type { Metadata } from "next";

import { testimonials } from "@/data/testimonials";

import { protoCars, stockStats } from "../_lib/cars";
import { services } from "../_data/services";
import { Journeys } from "./_components/journeys";
import {
  Blocks,
  Closing,
  Cover,
  Diagnosis,
  Funnels,
  Personas,
  Phases,
  Principles,
  Quality,
  SectionRail,
} from "./_components/sections";

export const metadata: Metadata = {
  title: "Análise de UX",
  description:
    "Como cada pessoa vai viver a nova AutosFlow: diagnóstico, personas, jornadas, bloco a bloco, princípios, métricas e decisões.",
};

/**
 * Análise de UX do protótipo: o material para o time e para quem investe.
 * Números do estoque e dos depoimentos são reais (lidos dos dados do site);
 * personas, jornadas e curvas de emoção são hipóteses a validar.
 */
export default function UxAnalysisPage() {
  const stats = {
    cars: protoCars.length,
    makes: stockStats.makes,
    testimonials: testimonials.length,
    services: services.length,
  };

  return (
    <>
      <SectionRail />
      <Cover stats={stats} />
      <Diagnosis />
      <Personas />
      <Journeys />
      <Blocks />
      <Principles />
      <Quality />
      <Funnels />
      <Phases />
      <Closing />
    </>
  );
}

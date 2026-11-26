import type { Metadata } from "next";

import { testimonials } from "@/data/testimonials";
import { priceBands, yearBands } from "@/lib/stock";

import { Hero } from "./_components/home/hero";
import { Profiles, type Shortcut } from "./_components/home/profiles";
import { QuickSearch } from "./_components/home/search";
import { Sell } from "./_components/home/sell";
import { Seo, type SeoGroup } from "./_components/home/seo";
import { ServicesStrip } from "./_components/home/services-strip";
import { Showcase } from "./_components/home/showcase";
import { Testimonials } from "./_components/home/testimonials";
import { Verified } from "./_components/home/verified";
import { Visit } from "./_components/home/visit";
import { Why } from "./_components/home/why";
import { carsByBody, protoCars, stockStats } from "./_lib/cars";
import type { ProtoCar } from "./_lib/types";

export const metadata: Metadata = {
  title: { absolute: "AutosFlow · Nova home (protótipo)" },
  description: "Protótipo da nova home da AutosFlow: comprar, vender, lojista e serviços.",
};

const BRL = new Intl.NumberFormat("pt-BR");

function count(filter: (car: ProtoCar) => boolean) {
  return protoCars.filter(filter).length;
}

function inBand(value: number, band: { min?: number; max?: number }) {
  if (value <= 0) return false;
  if (band.min !== undefined && value < band.min) return false;
  if (band.max !== undefined && value > band.max) return false;
  return true;
}


/**
 * Nova home (protótipo), bloco a bloco como no material de apoio de
 * 23/11/2026 (FE-01 a FE-11), com o visual da direção "Fluxo" (DESIGN.md).
 */
export default function PrototypeHome() {
  const tiles = carsByBody().map((entry) => ({
    body: entry.body,
    plural: entry.plural,
    count: entry.count,
    cover: entry.cover.photos[0].src,
  }));

  // A lista exata do material de apoio (FE-05), na mesma ordem.
  const shortcuts: Shortcut[] = [
    { label: "Até R$ 50 mil", href: "/veiculos?price=ate-50", count: count((c) => c.price > 0 && c.price <= 50000) },
    { label: "R$ 50 a 80 mil", href: "/veiculos?price=50-80", count: count((c) => c.price > 50000 && c.price <= 80000) },
    { label: "Baixa km", href: "/veiculos?km=ate-40", count: count((c) => c.km > 0 && c.km <= 40000) },
    { label: "2020 ou mais", href: "/veiculos?year=2020-2022", count: count((c) => c.yearSort >= 2020) },
    { label: "Automático", href: "/veiculos", count: count((c) => c.gearbox === "Automático") },
    { label: "Flex", href: "/veiculos?fuel=Flex", count: count((c) => c.fuel === "Flex") },
    { label: "Abaixo da FIPE", href: "/veiculos", count: count((c) => c.badges.includes("abaixo-fipe")) },
    { label: "Com laudo Verified", href: "/veiculos", count: count((c) => c.badges.includes("verified")) },
  ];

  const makes = [...new Set(protoCars.map((c) => c.make))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const seo: SeoGroup[] = [
    {
      title: "Buscar por faixa de preço",
      links: priceBands
        .map((band) => ({ label: band.label, href: `/veiculos?price=${band.value}`, count: count((c) => inBand(c.price, band)) }))
        .filter((l) => l.count > 0),
    },
    {
      title: "Buscar por marca",
      links: makes.map((make) => ({ label: make, href: `/veiculos?make=${encodeURIComponent(make)}`, count: count((c) => c.make === make) })),
    },
    {
      title: "Buscar por carroceria",
      links: carsByBody().map((entry) => ({ label: entry.plural, href: `/veiculos?body=${entry.body}`, count: entry.count })),
    },
    {
      title: "Buscar por ano",
      links: yearBands
        .map((band) => ({ label: band.label, href: `/veiculos?year=${band.value}`, count: count((c) => inBand(c.yearSort, band)) }))
        .filter((l) => l.count > 0),
    },
    {
      title: "Buscar por combustível",
      links: [...new Set(protoCars.map((c) => c.fuel))].map((fuel) => ({
        label: fuel,
        href: `/veiculos?fuel=${encodeURIComponent(fuel)}`,
        count: count((c) => c.fuel === fuel),
      })),
    },
    {
      title: "Buscar por câmbio",
      links: (["Automático", "Manual"] as const)
        .map((gearbox) => ({ label: gearbox, href: "/veiculos", count: count((c) => c.gearbox === gearbox) }))
        .filter((l) => l.count > 0),
    },
  ];

  const stats = [
    { value: String(stockStats.count), label: "carros à venda agora" },
    { value: String(stockStats.makes), label: "marcas no estoque" },
    { value: BRL.format(stockStats.minPrice), prefix: "R$ ", label: "é o carro mais em conta" },
    { value: "100", suffix: "%", label: "com fotos da própria unidade" },
  ];

  return (
    <>
      {/* Ordem do material de apoio (02 · Visão geral), itens 1 a 11; o 12 é o rodapé do site, sem mudanças. */}
      <Hero />
      <QuickSearch cars={protoCars} />
      <ServicesStrip />
      <Showcase cars={protoCars} />
      <Profiles tiles={tiles} shortcuts={shortcuts} />
      <Why stats={stats} />
      <Sell />
      <Testimonials items={testimonials} />
      <Verified />
      <Visit />
      <Seo groups={seo} initial={2} />
    </>
  );
}

import type { Metadata } from "next";

import { testimonials } from "@/data/testimonials";
import { STOCK_UPDATED_AT } from "@/data/vehicles";
import { priceBands, yearBands } from "@/lib/stock";

import { services } from "./_data/services";
import { Hero, type HeroFront } from "./_components/home/hero";
import { Profiles, type Shortcut } from "./_components/home/profiles";
import { QuickSearch } from "./_components/home/search";
import { Sell } from "./_components/home/sell";
import { Seo, type SeoGroup } from "./_components/home/seo";
import { ServicesStrip } from "./_components/home/services-strip";
import { Showcase } from "./_components/home/showcase";
import { Showroom, type StageCar } from "./_components/home/showroom";
import { Testimonials } from "./_components/home/testimonials";
import { Verified } from "./_components/home/verified";
import { Visit } from "./_components/home/visit";
import { Why } from "./_components/home/why";
import { VelocityMarquee } from "./_components/ui";
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

/** Recortes (fundo removido no Magnific) das fotos reais, para a vitrine. */
const CUTOUTS: Record<string, [number, number]> = {
  "jeep-compass-limited-t270": [1051, 792],
  "ford-ranger-storm-xls-3-2-diesel": [1400, 952],
  "volkswagen-nivus-highline-tsi-2022": [1400, 957],
  "audi-q3-1-4-tfsi": [1395, 1021],
  "chevrolet-onix-lt-1-0-turbo-mt": [1050, 646],
  "fiat-argo-1-0-mt": [1369, 1020],
};

/**
 * Nova home (protótipo v2 "Fluxo"), na ordem do material de apoio de
 * 23/11/2026: topo, busca, serviços, destaques, perfil, como funciona,
 * venda, depoimentos, selo Verified, loja e "continue sua busca".
 */
export default function PrototypeHome() {
  const fronts: HeroFront[] = [
    {
      key: "comprar",
      label: "Comprar",
      meta: `${stockStats.count} carros · desde R$ ${BRL.format(stockStats.minPrice)}`,
      sentence: "Carros selecionados com critério, com fotos da própria unidade e preço na mesa. Sem pressão, sem letras pequenas.",
      cta: "Ver a vitrine",
      poster: "/prototipo/hero-fluxo.jpg",
      video: "/prototipo/hero-fluxo.mp4",
      action: { href: "/prototipo#vitrine" },
    },
    {
      key: "vender",
      label: "Vender",
      meta: "Faixa de valor na hora",
      sentence: "Venda o seu com a gente cuidando de tudo: avaliação, fotos, anúncio, atendimento e documentação. Você acompanha.",
      cta: "Quanto vale meu carro?",
      poster: "/imagens/prototipo/hero-vender.jpg",
      action: { href: "/prototipo#vender" },
    },
    {
      key: "lojista",
      label: "Lojistas",
      meta: "Fase 2 · lista de espera aberta",
      sentence: "Sua frota na vitrine certa, com leads qualificados e atendimento integrado. O primeiro mês é por nossa conta.",
      cta: "Entrar na lista de espera",
      poster: "/imagens/prototipo/hero-lojista.jpg",
      video: "/prototipo/hero-lojista.mp4",
      action: { waitlist: "lojista" },
    },
    {
      key: "servicos",
      label: "Serviços",
      meta: `${services.length} serviços · 6 categorias`,
      sentence: "Revisão, lavagem, troca de óleo, débitos e blindagem, com parceiros avaliados pela AutosFlow e orçamento sem compromisso.",
      cta: "Ver serviços",
      poster: "/imagens/prototipo/hero-servicos.jpg",
      video: "/prototipo/hero-servicos.mp4",
      action: { href: "/prototipo/servicos" },
    },
  ];

  const stage: StageCar[] = Object.entries(CUTOUTS)
    .map(([slug, [width, height]]) => {
      const car = protoCars.find((c) => c.slug === slug);
      return car ? { car, cutout: { src: `/prototipo/carros/${slug}.webp`, width, height } } : null;
    })
    .filter((item): item is StageCar => item !== null);

  const tiles = carsByBody().map((entry) => ({
    body: entry.body,
    plural: entry.plural,
    count: entry.count,
    cover: entry.cover.photos[0].src,
  }));

  const shortcuts: Shortcut[] = [
    { label: "Até R$ 50 mil", href: "/veiculos?price=ate-50", count: count((c) => c.price > 0 && c.price <= 50000) },
    { label: "R$ 50 a 80 mil", href: "/veiculos?price=50-80", count: count((c) => c.price > 50000 && c.price <= 80000) },
    { label: "Baixa km", href: "/veiculos?km=ate-40", count: count((c) => c.km > 0 && c.km <= 40000) },
    { label: "2020 ou mais", href: "/veiculos?year=2020-2022", count: count((c) => c.yearSort >= 2020) },
    { label: "Automático", href: "/veiculos", count: count((c) => c.gearbox === "Automático") },
    { label: "Flex", href: "/veiculos?fuel=Flex", count: count((c) => c.fuel === "Flex") },
    { label: "Híbrido", href: "/veiculos?fuel=H%C3%ADbrido", count: count((c) => c.fuel === "Híbrido") },
    { label: "Diesel", href: "/veiculos?fuel=Diesel", count: count((c) => c.fuel === "Diesel") },
    { label: "Abaixo da FIPE", href: "/veiculos", count: count((c) => c.badges.includes("abaixo-fipe")) },
    { label: "Com laudo Verified", href: "/veiculos", count: count((c) => c.badges.includes("verified")) },
  ].filter((shortcut) => shortcut.count > 0);

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
      <Hero fronts={fronts} updatedAt={STOCK_UPDATED_AT} />
      <QuickSearch cars={protoCars} />
      <VelocityMarquee words={["Comprar", "Vender", "Cuidar", "AutosFlow"]} tone="night" />
      <ServicesStrip />
      <Showroom items={stage} />
      <Showcase cars={protoCars} />
      <Profiles tiles={tiles} shortcuts={shortcuts} />
      <Why stats={stats} />
      <Sell />
      <Testimonials items={testimonials} />
      <VelocityMarquee words={["Sem pressão", "Sem letras pequenas", "Sem surpresas"]} tone="night" baseSpeed={2.4} />
      <Verified />
      <Visit />
      <Seo groups={seo} initial={2} />
    </>
  );
}

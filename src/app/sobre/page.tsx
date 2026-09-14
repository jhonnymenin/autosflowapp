import type { Metadata } from "next";
import Image from "next/image";

import { CtaSection } from "@/components/cta-section";
import { Document } from "@/components/icons";
import { JourneyLine } from "@/components/journey-line";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import {
  audiences,
  brand,
  manifesto,
  painPoints,
  positioningPillars,
  serviceGroups,
  verified,
  vision,
} from "@/data/brand";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "O autoshopping digital do proprietário. O manifesto da AutosFlow, a jornada de venda assistida, os serviços conectados e o ecossistema que liga proprietários, compradores, lojistas e prestadores.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre — AutosFlow",
    description: "O autoshopping digital do proprietário.",
    url: "/sobre",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Opening statement */}
      <section className="border-b border-border pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pt-48">
        <div className="container-editorial">
          <Eyebrow>{brand.descriptor}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-display-lg font-semibold text-foreground">
            {manifesto.claim}
          </h1>
          <p className="mt-6 max-w-3xl font-display text-display-sm font-medium tracking-tight text-brand-bright">
            {manifesto.claimEcho}
          </p>
          <p className="text-lead mt-10 max-w-2xl text-foreground-muted">
            {manifesto.opening}
          </p>
        </div>
      </section>

      {/* Manifesto, set on light ground like the printed piece */}
      <section className="bg-bone-50 py-section text-navy" aria-labelledby="manifesto">
        <div className="container-editorial">
          <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
            <Reveal className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <Eyebrow tone="light">Manifesto</Eyebrow>
              <h2
                id="manifesto"
                className="mt-5 text-display-md font-semibold text-navy"
              >
                {brand.tagline}
              </h2>
              <a
                href="/documentos/autosflow-manifesto.pdf"
                className="mt-8 inline-flex items-center gap-2.5 text-sm text-navy/60 underline-offset-4 transition-colors duration-300 hover:text-brand hover:underline"
              >
                <Document className="h-4 w-4" />
                Manifesto em PDF
              </a>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal as="ul" className="border-t border-navy/12">
                {manifesto.criteria.map((line, index) => (
                  <li
                    key={line}
                    className="flex items-baseline gap-5 border-b border-navy/12 py-4 sm:gap-8"
                  >
                    <span className="tnum text-eyebrow font-medium tracking-[0.18em] text-navy/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base tracking-tight text-navy sm:text-lg">
                      {line}
                    </span>
                  </li>
                ))}
              </Reveal>

              <Reveal delay={80} className="mt-12 space-y-8">
                <p className="text-lead text-navy/75">{manifesto.trust}</p>
                <p className="text-display-sm font-display font-semibold tracking-tight text-navy">
                  {manifesto.promise}
                </p>
                <p className="text-lead text-navy/75">{manifesto.order}</p>
                <p className="text-lead text-navy/75">{manifesto.journey}</p>
                <p className="border-l-2 border-brand pl-5 text-lg leading-relaxed tracking-tight text-navy">
                  {manifesto.closing}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-section" aria-labelledby="desafio">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>O desafio</Eyebrow>
              <h2
                id="desafio"
                className="mt-5 text-display-md font-semibold text-foreground"
              >
                O problema não é anunciar o carro.
              </h2>
              <p className="text-lead mt-6 max-w-md text-foreground-muted">
                O desafio é vender bem, com segurança e sem perder dinheiro.
              </p>
            </Reveal>

            <Reveal delay={80} as="ul" className="lg:col-span-6 lg:col-start-7">
              {painPoints.map((point, index) => (
                <li
                  key={point}
                  className="flex items-baseline gap-5 border-b border-border py-5 first:border-t sm:gap-8"
                >
                  <span className="tnum text-eyebrow font-medium tracking-[0.18em] text-foreground-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base tracking-tight text-foreground sm:text-lg">
                    {point}
                  </span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section
        className="relative isolate overflow-hidden border-y border-border py-section"
        aria-labelledby="posicionamento"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/imagens/sedan-showroom-azul.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        </div>

        <div className="container-editorial">
          <Reveal className="max-w-3xl">
            <Eyebrow>O posicionamento</Eyebrow>
            <h2
              id="posicionamento"
              className="mt-5 text-display-md font-semibold text-foreground"
            >
              O autoshopping digital do proprietário.
            </h2>
            <p className="text-lead mt-6 max-w-2xl text-foreground-muted">
              Uma estrutura profissional para quem quer vender o carro sem
              entregar margem para uma loja.
            </p>
          </Reveal>

          <Reveal delay={60} as="ol" className="mt-14 sm:mt-20">
            {positioningPillars.map((pillar, index) => (
              <li
                key={pillar}
                className="flex flex-col gap-2 border-b border-border py-6 first:border-t sm:flex-row sm:items-baseline sm:gap-10 sm:py-7"
              >
                <span className="tnum w-10 shrink-0 text-eyebrow font-medium tracking-[0.18em] text-brand-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="max-w-3xl font-display text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
                  {pillar}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-section" aria-labelledby="ecossistema">
        <div className="container-editorial">
          <Reveal className="max-w-3xl">
            <Eyebrow>O ecossistema</Eyebrow>
            <h2
              id="ecossistema"
              className="mt-5 text-display-md font-semibold text-foreground"
            >
              Mais do que um site de carros.
            </h2>
            <p className="text-lead mt-6 max-w-2xl text-foreground-muted">
              Um ecossistema completo para compra, venda e serviços automotivos.
            </p>
          </Reveal>

          <Reveal
            delay={60}
            as="dl"
            className="mt-14 grid gap-x-10 gap-y-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
          >
            {audiences.map((audience) => (
              <div key={audience.title} className="border-t border-border pt-6">
                <dt className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {audience.title}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {audience.description}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section
        className="border-t border-border bg-surface py-section"
        aria-labelledby="jornada-sobre"
      >
        <div className="container-editorial">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>A jornada</Eyebrow>
              <h2
                id="jornada-sobre"
                className="mt-5 text-display-md font-semibold text-foreground"
              >
                Cuidamos do caminho.
              </h2>
            </div>
            <p className="text-lead max-w-xl text-foreground-muted lg:col-span-6 lg:col-start-7 lg:self-end">
              Do cadastro do veículo à transferência, o proprietário conta com
              uma jornada mais segura e profissional.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <JourneyLine />
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-section" aria-labelledby="servicos">
        <div className="container-editorial">
          <Reveal className="max-w-3xl">
            <Eyebrow>Serviços</Eyebrow>
            <h2
              id="servicos"
              className="mt-5 text-display-md font-semibold text-foreground"
            >
              Serviços conectados à jornada.
            </h2>
            <p className="text-lead mt-6 max-w-2xl text-foreground-muted">
              A plataforma pode recomendar soluções antes, durante e depois da
              negociação.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-16 gap-y-12 sm:mt-20 lg:grid-cols-3">
            {serviceGroups.map((group, index) => (
              <Reveal key={group.stage} delay={index * 70}>
                <h3 className="border-t border-border pt-5 text-eyebrow font-medium uppercase text-brand-bright">
                  {group.stage}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-base tracking-tight text-foreground-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Verification */}
      <section
        className="border-t border-border py-section"
        aria-labelledby="verificacao"
      >
        <div className="container-editorial">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <Eyebrow>Verificação</Eyebrow>
              <h2
                id="verificacao"
                className="mt-5 text-display-md font-semibold text-foreground"
              >
                Confiança como diferencial competitivo.
              </h2>
              <p className="text-lead mt-6 max-w-xl text-foreground-muted">
                {verified.note}
              </p>
              <ul className="mt-10 border-t border-border">
                {verified.criteria.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-5 border-b border-border py-3.5"
                  >
                    <span className="tnum text-eyebrow font-medium tracking-[0.18em] text-foreground-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm tracking-tight text-foreground sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-6">
              <div className="relative aspect-4/3 overflow-hidden lg:aspect-5/4">
                <Image
                  src="/imagens/interior-volante.jpg"
                  alt="Detalhe do interior de um veículo, com volante e painel iluminados."
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  quality={78}
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section
        className="border-t border-border py-section"
        aria-labelledby="visao"
      >
        <div className="container-editorial">
          <Reveal className="max-w-4xl">
            <Eyebrow>Visão de longo prazo</Eyebrow>
            <h2
              id="visao"
              className="mt-5 text-display-md font-semibold text-foreground"
            >
              {vision.lead}
            </h2>
            <p className="text-lead mt-8 max-w-2xl text-foreground-muted">
              {vision.detail}
            </p>
            <p className="mt-10 font-display text-display-sm font-semibold tracking-tight text-brand-bright">
              {vision.claim}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection image="/imagens/estrada-anoitecer.jpg" />
    </>
  );
}

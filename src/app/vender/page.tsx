import type { Metadata } from "next";
import Image from "next/image";

import { CtaSection } from "@/components/cta-section";
import { Check, Phone, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading, buttonClass } from "@/components/ui";
import {
  contact,
  journeySteps,
  painPoints,
  pitch,
  positioningPillars,
  serviceGroups,
} from "@/data/brand";
import { whatsappSell } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vender meu carro",
  description:
    "Venda seu carro com a AutosFlow: avaliação, fotos, anúncio, atendimento, negociação, financiamento do comprador e transferência — você acompanha, a gente cuida do processo.",
  alternates: { canonical: "/vender" },
  openGraph: {
    title: "Vender meu carro — AutosFlow",
    description: pitch.lead,
    url: "/vender",
  },
};

/**
 * Vender meu carro.
 *
 * A outra metade do negócio, com página própria: o que a venda particular tem
 * de difícil, as seis etapas da jornada assistida e os serviços que entram no
 * caminho. Todo o conteúdo vem da apresentação comercial (data/brand.ts).
 */
export default function SellPage() {
  const during = serviceGroups.find(
    (group) => group.stage === "Durante a venda",
  );
  const before = serviceGroups.find(
    (group) => group.stage === "Antes da venda",
  );

  return (
    <>
      <section className="pt-[4.75rem] lg:pt-[5.5rem]">
        <div className="container-editorial">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="py-6 lg:py-16">
              <p className="text-eyebrow font-semibold uppercase text-accent">
                Vender meu carro
              </p>
              <h1 className="mt-4 text-display-lg font-semibold text-foreground">
                Você acompanha. A AutosFlow cuida do processo.
              </h1>
              <p className="text-lead mt-5 max-w-xl text-foreground-muted">
                {pitch.lead}
              </p>
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={whatsappSell}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("primary", "lg")}
                >
                  <WhatsApp className="h-4.5 w-4.5" />
                  Pedir avaliação do meu carro
                </a>
                <a
                  href={`tel:+${contact.phoneE164}`}
                  className={buttonClass("outline", "lg")}
                >
                  <Phone className="h-4 w-4" />
                  <span className="tnum">{contact.phoneLabel}</span>
                </a>
              </div>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] lg:aspect-[5/6]">
              <Image
                src="/imagens/sedan-showroom-azul.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={78}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* O problema que a venda assistida resolve */}
      <section className="py-section" aria-labelledby="desafio">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="desafio"
              eyebrow="O desafio"
              title="O problema não é anunciar o carro."
              lead="É vender bem, com segurança e sem perder dinheiro. É isso que a gente resolve:"
            />
          </Reveal>
          <Reveal as="ul" delay={40} className="grid gap-3 lg:col-span-7">
            {painPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-4 rounded-card border border-border bg-surface p-5 shadow-card"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand/10 text-accent">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-[0.9375rem] font-medium text-foreground">
                  {point}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* As seis etapas */}
      <section
        className="theme-dark bg-background py-section"
        aria-labelledby="etapas"
      >
        <div className="container-editorial">
          <Reveal>
            <SectionHeading
              id="etapas"
              eyebrow="Como funciona"
              title="Seis etapas, do cadastro à transferência."
              lead="Do cadastro do veículo à transferência, o proprietário conta com uma jornada mais segura e profissional."
            />
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {journeySteps.map((step, index) => (
              <Reveal
                as="li"
                key={step}
                delay={index * 25}
                className="rounded-card border border-border bg-surface p-6 sm:p-7"
              >
                <span className="tnum font-display text-4xl font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
                  {step}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Por que vender com a AutosFlow */}
      <section className="py-section" aria-labelledby="diferenciais">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="diferenciais"
              eyebrow="Venda assistida"
              title="A estrutura de uma loja, sem entregar margem para uma loja."
            />
          </Reveal>
          <Reveal
            as="ul"
            delay={40}
            className="divide-y divide-border lg:col-span-7"
          >
            {positioningPillars.map((pillar, index) => (
              <li key={pillar} className="flex gap-5 py-5 first:pt-0">
                <span className="tnum w-8 flex-none font-display text-lg font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium leading-snug tracking-tight text-foreground">
                  {pillar}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Serviços no caminho */}
      {before && during ? (
        <section
          className="border-y border-border bg-surface py-section"
          aria-labelledby="servicos-venda"
        >
          <div className="container-editorial">
            <Reveal>
              <SectionHeading
                id="servicos-venda"
                eyebrow="Serviços"
                title="O que pode entrar na sua venda."
              />
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[before, during].map((group) => (
                <Reveal
                  key={group.stage}
                  className="rounded-card border border-border bg-background p-6 sm:p-8"
                >
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {group.stage}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground"
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
      ) : null}

      <CtaSection
        image="/imagens/estrada-anoitecer.jpg"
        title="Vamos avaliar o seu carro?"
      />
    </>
  );
}

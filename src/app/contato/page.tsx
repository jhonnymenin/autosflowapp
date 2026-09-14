import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, MapPin, Phone, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { addressOneLine, contact, manifesto } from "@/data/brand";
import { whatsappGeneral, whatsappSell, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a AutosFlow pelo WhatsApp ou por telefone (${contact.phoneLabel}). ${addressOneLine}.`,
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato — AutosFlow",
    description: "Primeiro entendemos você. Depois falamos de carro.",
    url: "/contato",
  },
};

const paths = [
  {
    title: "Quero comprar",
    description:
      "Conte o que procura e faixa de valor. Retornamos com o que temos em estoque e com opções que podemos buscar.",
    action: "Falar sobre um veículo",
    href: whatsappUrl(
      "Olá! Estou procurando um carro e gostaria de ajuda da AutosFlow.",
    ),
  },
  {
    title: "Quero vender",
    description:
      "Avaliação, precificação, apresentação e negociação assistida — com o veículo sempre sob o seu controle.",
    action: "Solicitar avaliação",
    href: whatsappSell,
  },
  {
    title: "Sou lojista",
    description:
      "Anuncie seu estoque na plataforma e receba leads qualificados dentro da jornada AutosFlow.",
    action: "Falar sobre parceria",
    href: whatsappUrl(
      "Olá! Sou lojista e quero saber mais sobre anunciar na AutosFlow.",
    ),
  },
];

const mapsQuery = encodeURIComponent(
  `${contact.address.street}, ${contact.address.district}, ${contact.address.city} - ${contact.address.state}, ${contact.address.postalCode}`,
);

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pt-48">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/imagens/showroom-traseira.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/90 to-background" />
        </div>

        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Contato</Eyebrow>
              <h1 className="mt-6 text-display-lg font-semibold text-foreground">
                Primeiro entendemos você.
              </h1>
              <p className="text-lead mt-6 max-w-xl text-foreground-muted">
                Depois falamos de carro. {manifesto.promise}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-sm font-medium tracking-tight text-white transition-colors duration-300 hover:bg-brand-bright sm:h-14 sm:px-9"
                >
                  <WhatsApp className="h-4.5 w-4.5" />
                  Falar no WhatsApp
                </a>
                <a
                  href={`tel:+${contact.phoneE164}`}
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full border border-border-strong px-7 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright sm:h-14 sm:px-9"
                >
                  <Phone className="h-4 w-4" />
                  <span className="tnum">{contact.phoneLabel}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <h2 className="text-eyebrow font-medium uppercase text-foreground-subtle">
                Endereço
              </h2>
              <address className="mt-5 not-italic leading-relaxed text-foreground">
                {contact.address.street}
                <br />
                {contact.address.district}
                <br />
                {contact.address.city} — {contact.address.state}
                <br />
                <span className="tnum">CEP {contact.address.postalCode}</span>
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-6 inline-flex items-center gap-2.5 border-b border-border-strong pb-1 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright"
              >
                <MapPin className="h-4 w-4" />
                Ver no mapa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Three ways in, so the right conversation starts straight away */}
      <section className="py-section" aria-labelledby="caminhos">
        <div className="container-editorial">
          <h2 id="caminhos" className="sr-only">
            Como podemos ajudar
          </h2>
          <div className="grid gap-x-8 border-t border-border lg:grid-cols-3">
            {paths.map((path, index) => (
              <Reveal
                key={path.title}
                delay={index * 70}
                className="flex flex-col border-b border-border py-9 lg:py-10"
              >
                <p className="tnum text-eyebrow font-medium tracking-[0.18em] text-brand-bright">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {path.title}
                </h3>
                <p className="mt-4 max-w-sm grow text-sm leading-relaxed text-foreground-muted">
                  {path.description}
                </p>
                <a
                  href={path.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-8 inline-flex items-center gap-2.5 self-start border-b border-border-strong pb-1 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright"
                >
                  {path.action}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-16 max-w-2xl">
            <p className="text-lead text-foreground-muted">
              {manifesto.closing}
            </p>
            <Link
              href="/veiculos"
              className="group/link mt-8 inline-flex items-center gap-2.5 border-b border-border-strong pb-1 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright"
            >
              Ver o estoque
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

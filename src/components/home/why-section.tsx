import Link from "next/link";

import { Gauge, Handshake, Key, Shield } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ArrowLink, SectionHeading } from "@/components/ui";
import { manifesto } from "@/data/brand";

/**
 * Por que a AutosFlow — quatro diferenciais, cada um com algo que o cliente
 * pode conferir. Nada aqui é promessa que o atendimento teria de desfazer:
 * os textos saem do manifesto e dos compromissos que a empresa já assume.
 */
const pillars = [
  {
    icon: Shield,
    title: "O anúncio confere com o registro",
    body: "Ano, quilometragem, cor e valor saem da nossa tabela de estoque, publicada inteira para qualquer um conferir.",
    href: "/tabela-de-precos",
    hrefLabel: "Ver a tabela",
  },
  {
    icon: Handshake,
    title: "Sem pressão e sem letras pequenas",
    body: manifesto.trustDetail,
  },
  {
    icon: Gauge,
    title: "Laudo e histórico na mesa",
    body: "Laudo cautelar, histórico documental e inspeção mecânica fazem parte da verificação. Peça os do carro que te interessou.",
  },
  {
    icon: Key,
    title: "Com você até depois da entrega",
    body: "Documentação, transferência e financiamento seguem com a gente — inclusive nos veículos consignados.",
  },
];

export function WhySection() {
  return (
    <section className="py-section" aria-labelledby="por-que">
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            id="por-que"
            eyebrow="Por que a AutosFlow"
            title="Segurança em cada etapa, do anúncio à chave na mão."
            action={<ArrowLink href="/sobre">Conheça a AutosFlow</ArrowLink>}
          />
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {pillars.map((pillar, index) => (
            <Reveal
              as="li"
              key={pillar.title}
              delay={index * 30}
              className="flex flex-col rounded-card border border-border bg-surface p-6 shadow-card sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-accent">
                <pillar.icon className="h-5.5 w-5.5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {pillar.body}
              </p>
              {pillar.href ? (
                <Link
                  href={pillar.href}
                  className="mt-auto pt-4 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {pillar.hrefLabel}
                </Link>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

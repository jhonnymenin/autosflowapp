import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { manifesto, verified } from "@/data/brand";
import { sampleTestimonials, testimonials } from "@/data/testimonials";
import { vehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import { originCounts, priceRange } from "@/lib/stock";

/**
 * Prova social.
 *
 * Enquanto não há depoimento real cadastrado, a seção mostra a prova que já é
 * verdadeira: o que é checado em cada veículo, o que a AutosFlow assume por
 * escrito e os números do estoque. Assim que `data/testimonials.ts` receber o
 * primeiro depoimento, ele entra aqui automaticamente, acima dos demais.
 */

const commitments = [
  {
    title: "O que está no anúncio está no registro",
    body: "Ano, quilometragem, cor e valor saem da nossa tabela de estoque. A mesma tabela fica publicada, inteira, para qualquer um conferir.",
    href: "/tabela-de-precos",
    hrefLabel: "Ver a tabela completa",
  },
  {
    title: "Sem pressão, sem letras pequenas e sem surpresas",
    body: "Você entende cada etapa da negociação antes de decidir. Sem pressão para fechar e sem condição que aparece só na assinatura.",
  },
  {
    title: "A responsabilidade não termina na entrega",
    body: "Documentação, transferência e o que vier depois seguem com a gente — inclusive nos veículos consignados.",
    href: "/sobre",
    hrefLabel: "Como funciona a jornada",
  },
];

const figures = [
  { label: "Veículos em estoque", value: String(vehicles.length) },
  { label: "Da loja", value: String(originCounts.loja) },
  { label: "Consignados", value: String(originCounts.consignado) },
  { label: "A partir de", value: formatPrice(priceRange.min) },
];

export function TrustSection() {
  // Em dev, sem depoimento real, mostra os exemplos marcados para ver o layout.
  const isPreview =
    testimonials.length === 0 && process.env.NODE_ENV !== "production";
  const items = isPreview ? sampleTestimonials : testimonials;
  const hasTestimonials = items.length > 0;

  return (
    <section
      className="border-t border-border bg-surface py-section"
      aria-labelledby="confianca"
    >
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <Eyebrow>Confiança</Eyebrow>
          <h2
            id="confianca"
            className="mt-4 text-display-md font-semibold text-foreground"
          >
            Por que confiar no anúncio.
          </h2>
          <p className="mt-5 text-lead text-foreground-muted">
            {manifesto.trustDetail}
          </p>
        </Reveal>

        {/* Depoimentos reais, quando existirem */}
        {hasTestimonials ? (
          <Reveal
            delay={60}
            as="ul"
            className="mt-12 grid gap-x-10 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item) => (
              <li
                key={`${item.author}-${item.quote.slice(0, 24)}`}
                className="border-t border-border pt-6"
              >
                {isPreview ? (
                  <span className="mb-3 inline-block border border-dashed border-border px-2 py-0.5 text-eyebrow uppercase text-foreground-subtle">
                    Exemplo · só em dev
                  </span>
                ) : null}
                <blockquote className="font-display text-lg leading-snug tracking-tight text-foreground sm:text-xl">
                  “{item.quote}”
                </blockquote>
                <p className="mt-4 text-sm text-foreground-muted">
                  {item.author}
                  {item.context ? (
                    <span className="text-foreground-subtle">
                      {" "}
                      · {item.context}
                    </span>
                  ) : null}
                </p>
                {item.source ? (
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-foreground-subtle underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
                  >
                    Ver avaliação original
                  </a>
                ) : null}
              </li>
            ))}
          </Reveal>
        ) : null}

        {/* O que assumimos — vale com ou sem depoimento */}
        <Reveal
          delay={hasTestimonials ? 120 : 60}
          as="dl"
          className="mt-12 grid gap-x-10 gap-y-9 border-t border-border sm:mt-14 sm:grid-cols-3"
        >
          {commitments.map((item, index) => (
            <div key={item.title} className="pt-6">
              <dt>
                <span className="tnum block text-eyebrow font-medium tracking-[0.18em] text-brand-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 block font-display text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
                  {item.title}
                </span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {item.body}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group/link mt-3 flex w-fit items-center gap-2 text-foreground transition-colors duration-300 hover:text-brand-bright"
                  >
                    {item.hrefLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                ) : null}
              </dd>
            </div>
          ))}
        </Reveal>

        {/* Checagem e números, lado a lado */}
        <div className="mt-14 grid gap-12 border-t border-border pt-10 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h3 className="text-eyebrow font-medium uppercase text-foreground-subtle">
              O que é checado
            </h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {verified.criteria.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 text-sm text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 flex-none bg-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-foreground-subtle">
              {verified.note}
            </p>
          </Reveal>

          <Reveal delay={60} className="lg:col-span-5 lg:col-start-8">
            <h3 className="text-eyebrow font-medium uppercase text-foreground-subtle">
              O estoque hoje
            </h3>
            <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-6">
              {figures.map((figure) => (
                <div key={figure.label}>
                  <dt className="text-eyebrow font-medium uppercase text-foreground-subtle">
                    {figure.label}
                  </dt>
                  <dd className="tnum mt-1.5 font-display text-2xl font-semibold tracking-tight text-foreground">
                    {figure.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

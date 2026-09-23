import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { manifesto } from "@/data/brand";

/**
 * O institucional condensado.
 *
 * A história completa — manifesto, jornada, ecossistema, verificação — vive em
 * /sobre. Aqui fica só o que responde "por que comprar com vocês" em poucos
 * segundos, sem afastar o cliente do estoque.
 */
const pillars = [
  {
    title: "Selecionados com critério",
    body: "Avaliados com responsabilidade e apresentados com transparência — cada dado do anúncio sai do nosso registro de estoque.",
  },
  {
    title: "Sem letras pequenas",
    body: manifesto.trustDetail,
  },
  {
    title: "A jornada inteira",
    body: "Da avaliação à documentação, do financiamento à entrega — e também depois dela.",
  },
];

export function WhySection() {
  return (
    <section
      className="border-t border-border bg-surface py-section"
      aria-labelledby="por-que"
    >
      <div className="container-editorial">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
          <div className="max-w-2xl">
            <Eyebrow>Por que a AutosFlow</Eyebrow>
            <h2
              id="por-que"
              className="mt-4 text-display-md font-semibold text-foreground"
            >
              {manifesto.promise}
            </h2>
          </div>
          <Link
            href="/sobre"
            className="group/link inline-flex shrink-0 items-center gap-3 text-sm font-medium tracking-tight text-foreground-muted transition-colors duration-300 hover:text-brand-bright"
          >
            Conhecer a AutosFlow
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal
          delay={60}
          as="dl"
          className="mt-12 grid gap-x-10 gap-y-9 border-t border-border sm:mt-14 sm:grid-cols-3"
        >
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="pt-6">
              <dt>
                <span className="tnum block text-eyebrow font-medium tracking-[0.18em] text-brand-bright">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 block font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {pillar.title}
                </span>
              </dt>
              <dd className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-muted">
                {pillar.body}
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

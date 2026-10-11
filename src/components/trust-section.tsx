import { Reveal } from "@/components/reveal";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { SectionHeading } from "@/components/ui";
import { verified } from "@/data/brand";
import { sampleTestimonials, testimonials } from "@/data/testimonials";
import { Check } from "@/components/icons";

/**
 * Prova social.
 *
 * Depoimentos reais (recebidos por WhatsApp, com autorização — ver
 * data/testimonials.ts) num carrossel, e ao lado o que é checado em cada
 * veículo. Sem depoimento cadastrado, a seção mostra só a verificação.
 */
export function TrustSection() {
  // Em dev, sem depoimento real, mostra os exemplos marcados para ver o layout.
  const isPreview =
    testimonials.length === 0 && process.env.NODE_ENV !== "production";
  const items = isPreview ? sampleTestimonials : testimonials;

  return (
    <section
      className="border-y border-border bg-surface py-section"
      aria-labelledby="confianca"
    >
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            id="confianca"
            eyebrow="Quem já comprou"
            title="A experiência contada por quem viveu."
          />
        </Reveal>

        {items.length > 0 ? (
          <Reveal delay={40} className="mt-10 sm:mt-12">
            <TestimonialCarousel items={items} preview={isPreview} />
          </Reveal>
        ) : null}

        <Reveal
          delay={60}
          className="mt-12 grid gap-6 rounded-card bg-background p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10"
        >
          <div className="lg:col-span-4">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              O que é checado em cada veículo
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {verified.note}
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {verified.criteria.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm font-medium text-foreground"
              >
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand/10 text-accent">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

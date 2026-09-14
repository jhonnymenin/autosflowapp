import Image from "next/image";

import { Phone, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { contact, manifesto } from "@/data/brand";
import { whatsappGeneral } from "@/lib/site";

/**
 * Closing commercial block. Shared by the home page and the inner pages so the
 * site ends on one voice instead of a different CTA per template.
 */
export function CtaSection({
  image = "/imagens/estrada-por-do-sol.jpg",
  title = "Vamos encontrar o carro certo para você.",
}: {
  image?: string;
  title?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="cta">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          quality={74}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink-950/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/70" />
      </div>

      <div className="container-editorial py-section">
        <Reveal className="max-w-3xl">
          <Eyebrow>Atendimento</Eyebrow>
          <h2
            id="cta"
            className="mt-5 text-display-lg font-semibold text-foreground"
          >
            {title}
          </h2>
          <p className="text-lead mt-6 max-w-xl text-foreground-muted">
            {manifesto.order} {manifesto.closing}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-3 bg-brand px-8 text-sm font-medium tracking-tight text-white transition-colors duration-300 hover:bg-brand-bright sm:h-14 sm:px-10"
            >
              <WhatsApp className="h-4.5 w-4.5" />
              Falar com especialista
            </a>
            <a
              href={`tel:+${contact.phoneE164}`}
              className="inline-flex h-13 items-center justify-center gap-3 border border-white/30 px-8 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-ink-950 sm:h-14 sm:px-10"
            >
              <Phone className="h-4 w-4" />
              <span className="tnum">{contact.phoneLabel}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

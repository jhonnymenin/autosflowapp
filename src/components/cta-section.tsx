import Image from "next/image";

import { Phone, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { buttonClass } from "@/components/ui";
import { contact, manifesto } from "@/data/brand";
import { whatsappGeneral } from "@/lib/site";

/**
 * Bloco comercial de fechamento das páginas internas: um painel marinho com
 * foto, a mesma voz em todo o site.
 */
export function CtaSection({
  image = "/imagens/estrada-por-do-sol.jpg",
  title = "Vamos encontrar o carro certo para você.",
}: {
  image?: string;
  title?: string;
}) {
  return (
    <section className="py-section" aria-labelledby="cta">
      <div className="container-editorial">
        <div className="theme-dark relative isolate overflow-hidden rounded-[1.75rem] bg-background lg:rounded-[2rem]">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            quality={72}
            className="-z-10 object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/30" />

          <Reveal className="max-w-2xl px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <p className="text-eyebrow font-semibold uppercase text-accent">
              Atendimento
            </p>
            <h2
              id="cta"
              className="mt-3 text-display-md font-semibold text-foreground"
            >
              {title}
            </h2>
            <p className="text-lead mt-4 text-foreground-muted">
              {manifesto.order} {manifesto.closing}
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary", "lg")}
              >
                <WhatsApp className="h-4.5 w-4.5" />
                Falar no WhatsApp
              </a>
              <a
                href={`tel:+${contact.phoneE164}`}
                className={buttonClass("onDark", "lg")}
              >
                <Phone className="h-4 w-4" />
                <span className="tnum">{contact.phoneLabel}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

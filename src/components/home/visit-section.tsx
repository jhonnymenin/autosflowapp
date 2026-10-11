import Image from "next/image";

import { MapPin, Phone, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { buttonClass } from "@/components/ui";
import { contact, manifesto } from "@/data/brand";
import { whatsappUrl } from "@/lib/site";

const mapsQuery = encodeURIComponent(
  `${contact.address.street}, ${contact.address.district}, ${contact.address.city} - ${contact.address.state}, ${contact.address.postalCode}`,
);

/**
 * Quem está por trás: a loja de verdade, com endereço e um caminho direto para
 * agendar. A foto é do showroom da AutosFlow — não fotografia de banco.
 */
export function VisitSection() {
  return (
    <section className="py-section" aria-labelledby="visite">
      <div className="container-editorial">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-card">
            <Image
              src="/imagens/loja-showroom.jpg"
              alt="Showroom da AutosFlow, no Ipiranga, em São Paulo"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={78}
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={40}>
            <p className="text-eyebrow font-semibold uppercase text-accent">
              Visite a loja
            </p>
            <h2
              id="visite"
              className="mt-3 text-display-md font-semibold text-foreground"
            >
              Venha ver de perto. Primeiro entendemos você.
            </h2>
            <p className="text-lead mt-4 max-w-lg text-foreground-muted">
              Depois falamos de carro. {manifesto.closing}
            </p>

            <div className="mt-8 flex items-start gap-3 rounded-card border border-border bg-surface p-5">
              <MapPin className="mt-0.5 h-5 w-5 flex-none text-accent" />
              <address className="not-italic text-sm leading-relaxed text-foreground">
                <span className="font-semibold">{contact.address.street}</span>
                <br />
                {contact.address.district}, {contact.address.city} —{" "}
                {contact.address.state} · CEP {contact.address.postalCode}
                <br />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-semibold text-accent underline-offset-4 hover:underline"
                >
                  Como chegar
                </a>
              </address>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={whatsappUrl(
                  "Olá! Gostaria de agendar uma visita à loja da AutosFlow.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary", "lg")}
              >
                <WhatsApp className="h-4.5 w-4.5" />
                Agendar visita
              </a>
              <a
                href={`tel:+${contact.phoneE164}`}
                className={buttonClass("outline", "lg")}
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

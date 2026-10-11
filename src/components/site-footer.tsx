import Link from "next/link";

import { MapPin, Phone, WhatsApp } from "@/components/icons";
import { Logo } from "@/components/logo";
import { brand, contact } from "@/data/brand";
import { bodiesWithCounts } from "@/lib/stock";
import { nav, whatsappGeneral } from "@/lib/site";

const mapsQuery = encodeURIComponent(
  `${contact.address.street}, ${contact.address.district}, ${contact.address.city} - ${contact.address.state}, ${contact.address.postalCode}`,
);

export function SiteFooter() {
  const year = new Date().getFullYear();
  const bodies = bodiesWithCounts();

  return (
    <footer className="theme-dark bg-background">
      <div className="container-editorial py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo markClassName="h-8 w-auto" wordmarkClassName="h-6 w-auto" />
            <p className="mt-6 max-w-xs font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {brand.tagline}
            </p>
            <p className="mt-2 max-w-xs text-sm text-foreground-subtle">
              {brand.descriptor}
            </p>
            <a
              href={whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 items-center gap-2.5 rounded-control bg-brand px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              <WhatsApp className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>

          <nav
            aria-label="Rodapé"
            className="grid grid-cols-2 gap-8 lg:col-span-5"
          >
            <div>
              <h2 className="text-eyebrow font-semibold uppercase text-foreground-subtle">
                AutosFlow
              </h2>
              <ul className="mt-5 space-y-3">
                {[
                  ...nav,
                  { href: "/tabela-de-precos", label: "Tabela de preços" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground-muted transition-colors duration-300 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-eyebrow font-semibold uppercase text-foreground-subtle">
                Estoque
              </h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    href="/veiculos"
                    className="text-sm text-foreground-muted transition-colors duration-300 hover:text-foreground"
                  >
                    Todos os veículos
                  </Link>
                </li>
                {bodies.map((entry) => (
                  <li key={entry.body}>
                    <Link
                      href={`/veiculos?carroceria=${entry.body}`}
                      className="text-sm text-foreground-muted transition-colors duration-300 hover:text-foreground"
                    >
                      {entry.plural}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-eyebrow font-semibold uppercase text-foreground-subtle">
              Visite a loja
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-2.5 text-foreground-muted">
                <MapPin className="mt-0.5 h-4 w-4 flex-none" />
                <address className="not-italic leading-relaxed">
                  {contact.address.street}
                  <br />
                  {contact.address.district}, {contact.address.city} —{" "}
                  {contact.address.state}
                  <br />
                  <span className="tnum">CEP {contact.address.postalCode}</span>
                  <br />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    Como chegar
                  </a>
                </address>
              </li>
              <li>
                <a
                  href={`tel:+${contact.phoneE164}`}
                  className="inline-flex items-center gap-2.5 text-foreground-muted transition-colors duration-300 hover:text-foreground"
                >
                  <Phone className="h-4 w-4 flex-none" />
                  <span className="tnum">{contact.phoneLabel}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. Todos os direitos reservados.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            <span>
              Valores e disponibilidade sujeitos a alteração sem aviso prévio.
            </span>
            <Link
              href="/creditos"
              className="transition-colors duration-300 hover:text-foreground"
            >
              Créditos de imagem
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

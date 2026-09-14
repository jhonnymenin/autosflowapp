import Link from "next/link";

import { Document, MapPin, Phone, WhatsApp } from "@/components/icons";
import { Logo } from "@/components/logo";
import { brand, contact } from "@/data/brand";
import { nav, whatsappGeneral } from "@/lib/site";

const secondary = [
  { href: "/veiculos", label: "Estoque completo" },
  { href: "/tabela-de-precos", label: "Tabela de preços" },
  { href: "/sobre", label: "Manifesto" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-ink-950">
      <div className="container-editorial py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo
              markClassName="h-8 w-auto"
              wordmarkClassName="h-6 w-auto"
            />
            <p className="mt-6 max-w-xs text-lg leading-snug tracking-tight text-foreground">
              {brand.tagline}
            </p>
            <p className="mt-2 max-w-xs text-sm text-foreground-subtle">
              {brand.descriptor}
            </p>
          </div>

          <nav
            aria-label="Rodapé"
            className="grid grid-cols-2 gap-8 lg:col-span-4"
          >
            <div>
              <h2 className="text-eyebrow font-medium uppercase text-foreground-subtle">
                Navegação
              </h2>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
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
              <h2 className="text-eyebrow font-medium uppercase text-foreground-subtle">
                Estoque
              </h2>
              <ul className="mt-5 space-y-3">
                {secondary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground-muted transition-colors duration-300 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="/documentos/autosflow-tabela-de-precos.pdf"
                    className="inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors duration-300 hover:text-foreground"
                  >
                    <Document className="h-4 w-4" />
                    Tabela em PDF
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-eyebrow font-medium uppercase text-foreground-subtle">
              Contato
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={whatsappGeneral}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-foreground transition-colors duration-300 hover:text-brand-bright"
                >
                  <WhatsApp className="h-4 w-4 flex-none" />
                  WhatsApp
                </a>
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
              <li className="flex gap-2.5 text-foreground-muted">
                <MapPin className="mt-0.5 h-4 w-4 flex-none" />
                <address className="not-italic leading-relaxed">
                  {contact.address.street}
                  <br />
                  {contact.address.district}
                  <br />
                  {contact.address.city} — {contact.address.state}
                  <br />
                  <span className="tnum">CEP {contact.address.postalCode}</span>
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. Todos os direitos reservados.
          </p>
          <p className="max-w-md sm:text-right">
            Valores e disponibilidade sujeitos a alteração sem aviso prévio.
            Consulte as condições no atendimento.
          </p>
        </div>
      </div>
    </footer>
  );
}

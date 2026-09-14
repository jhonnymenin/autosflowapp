import Link from "next/link";

import { ArrowRight, Document } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { STOCK_ISSUED_AT, vehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import { makesWithCounts, originCounts, priceRange } from "@/lib/stock";

export function StockSection() {
  const makes = makesWithCounts();

  return (
    <section className="border-t border-border bg-background py-section" aria-labelledby="estoque">
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>O estoque</Eyebrow>
            <h2
              id="estoque"
              className="mt-6 text-display-md font-semibold text-foreground"
            >
              {vehicles.length} veículos,
              <br />
              {makes.length} marcas.
            </h2>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-border pt-8">
              <div>
                <dt className="text-eyebrow font-medium uppercase text-foreground-subtle">
                  Veículos da loja
                </dt>
                <dd className="tnum mt-2 text-data-xl font-display font-semibold text-foreground">
                  {originCounts.loja}
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow font-medium uppercase text-foreground-subtle">
                  Consignados
                </dt>
                <dd className="tnum mt-2 text-data-xl font-display font-semibold text-foreground">
                  {originCounts.consignado}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-eyebrow font-medium uppercase text-foreground-subtle">
                  Faixa de preço
                </dt>
                <dd className="tnum mt-2 text-data-xl font-display font-semibold text-foreground">
                  {formatPrice(priceRange.min)} — {formatPrice(priceRange.max)}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/veiculos"
                className="group/link inline-flex items-center gap-2.5 border-b border-border-strong pb-1 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright"
              >
                Explorar o estoque
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
              <Link
                href="/tabela-de-precos"
                className="inline-flex items-center gap-2.5 text-sm text-foreground-muted transition-colors duration-300 hover:text-foreground"
              >
                <Document className="h-4 w-4" />
                Tabela de preços completa
              </Link>
            </div>
          </Reveal>

          {/* Makes index — a plain, precise list beats a wall of logos. */}
          <Reveal delay={80} className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-border">
              {makes.map((entry) => (
                <li key={entry.make}>
                  <Link
                    href={`/veiculos?marca=${encodeURIComponent(entry.make)}`}
                    className="group/make flex items-baseline justify-between gap-6 border-b border-border py-4 transition-colors duration-300 hover:border-border-strong"
                  >
                    <span className="text-lg font-display font-medium tracking-tight text-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/make:translate-x-1.5 sm:text-xl">
                      {entry.make}
                    </span>
                    <span className="tnum text-sm text-foreground-subtle transition-colors duration-300 group-hover/make:text-brand-bright">
                      {String(entry.count).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-foreground-subtle">
              Estoque conforme tabela de preços de {STOCK_ISSUED_AT}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

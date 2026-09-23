import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { VehicleCard } from "@/components/vehicle-card";
import { Eyebrow } from "@/components/ui";
import { vehicles } from "@/data/vehicles";
import { priceBands, showcaseVehicles } from "@/lib/stock";

/**
 * A vitrine.
 *
 * Primeira seção depois do hero: o cliente chega aos carros sem ler nada
 * antes. Grade — e não trilho horizontal — porque uma grade é escaneável de
 * uma vez e não esconde metade do estoque fora da tela.
 */
export function ShowcaseSection() {
  const showcase = showcaseVehicles(6);

  return (
    <section
      className="border-t border-border bg-background pb-20 pt-14 sm:pb-24 sm:pt-16"
      aria-labelledby="vitrine"
    >
      <div className="container-editorial">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
          <div>
            <Eyebrow>Estoque</Eyebrow>
            <h2
              id="vitrine"
              className="mt-4 text-display-md font-semibold text-foreground"
            >
              Os carros certos.
            </h2>
          </div>
          <Link
            href="/veiculos"
            className="group/link inline-flex shrink-0 items-center gap-3 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-brand-bright"
          >
            Ver os {vehicles.length} veículos
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal
          delay={60}
          as="ul"
          className="mt-10 grid gap-x-8 border-t border-border sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10"
        >
          {showcase.map((vehicle) => (
            <li key={vehicle.slug} className="border-b border-border">
              <VehicleCard vehicle={vehicle} />
            </li>
          ))}
        </Reveal>

        {/* Atalhos por faixa — caminho mais curto para quem já tem orçamento */}
        <Reveal
          delay={100}
          className="mt-12 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-5"
        >
          <h3 className="text-eyebrow font-medium uppercase text-foreground-subtle">
            Por faixa de preço
          </h3>
          <div className="-mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 sm:flex-wrap">
              {priceBands.map((band) => (
                <Link
                  key={band.value}
                  href={`/veiculos?preco=${band.value}`}
                  className="inline-flex h-9 items-center whitespace-nowrap border border-border px-4 text-sm tracking-tight text-foreground-muted transition-colors duration-300 hover:border-border-strong hover:text-foreground"
                >
                  {band.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

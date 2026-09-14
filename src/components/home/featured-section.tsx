import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { VehicleCard } from "@/components/vehicle-card";
import { Eyebrow } from "@/components/ui";
import { featuredVehicles } from "@/lib/stock";

export function FeaturedSection() {
  const featured = featuredVehicles();

  return (
    <section
      className="bg-background pb-20 pt-section sm:pb-28"
      aria-labelledby="destaques"
    >
      <div className="container-editorial">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-baseline lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Eyebrow>Em destaque</Eyebrow>
            <h2
              id="destaques"
              className="mt-5 text-display-md font-semibold text-foreground"
            >
              Selecionados com critério.
            </h2>
          </div>
          <Link
            href="/veiculos"
            className="group/link inline-flex shrink-0 items-center gap-3 text-sm font-medium tracking-tight text-foreground-muted transition-colors duration-300 hover:text-brand-bright"
          >
            Ver todo o estoque
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      {/* A rail of plates divided by single rules — not a row of cards.
          Native scroll keeps each vehicle large instead of shrinking five of
          them into a grid, and works for touch and keyboard alike. */}
      <Reveal
        delay={60}
        className="mt-16 overflow-x-auto overscroll-x-contain sm:mt-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul
          className="flex snap-x snap-mandatory px-(--spacing-gutter)"
          style={{ scrollPaddingInline: "var(--spacing-gutter)" }}
        >
          {featured.map((vehicle, index) => (
            <li
              key={vehicle.slug}
              className="w-[72vw] max-w-xs shrink-0 snap-start border-r border-border pr-6 last:border-r-0 last:pr-0 sm:w-[40vw] sm:pr-10 lg:w-[23vw] xl:w-80"
            >
              <VehicleCard vehicle={vehicle} index={index} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

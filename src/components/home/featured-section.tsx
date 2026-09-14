import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { VehicleCard } from "@/components/vehicle-card";
import { Eyebrow } from "@/components/ui";
import { featuredVehicles } from "@/lib/stock";

export function FeaturedSection() {
  const featured = featuredVehicles();

  return (
    <section className="bg-background py-section" aria-labelledby="destaques">
      <div className="container-editorial">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Eyebrow>Em destaque</Eyebrow>
            <h2
              id="destaques"
              className="mt-6 text-display-md font-semibold text-foreground"
            >
              Selecionados com critério.
            </h2>
          </div>
          <Link
            href="/veiculos"
            className="group/link inline-flex shrink-0 items-center gap-2.5 border-b border-border-strong pb-1 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright lg:pb-2"
          >
            Ver todo o estoque
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      {/* Horizontal rail: it keeps each vehicle large instead of shrinking
          five of them into a grid. Native scroll — keyboard and touch both
          work without a carousel library. */}
      <Reveal
        delay={80}
        className="mt-12 overflow-x-auto overscroll-x-contain pb-4 sm:mt-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul
          className="flex snap-x snap-mandatory gap-px px-(--spacing-gutter)"
          style={{ scrollPaddingInline: "var(--spacing-gutter)" }}
        >
          {featured.map((vehicle, index) => (
            <li
              key={vehicle.slug}
              className="w-[78vw] max-w-sm shrink-0 snap-start sm:w-[46vw] lg:w-[27vw] xl:w-96"
            >
              <VehicleCard vehicle={vehicle} index={index} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

import Link from "next/link";

import { ArrowUpRight } from "@/components/icons";
import { Mark } from "@/components/logo";
import { formatKmShort, formatPrice } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

/**
 * Stock panel.
 *
 * The source price table carries no photography for these vehicles, so the
 * panel is built around the record itself: make, model, version and the
 * figures that matter, with the brand symbol standing in for the plate.
 */
export function VehicleCard({
  vehicle,
  index,
  className,
}: {
  vehicle: Vehicle;
  index?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/veiculos/${vehicle.slug}`}
      className={`group/card relative isolate flex h-full flex-col justify-between overflow-hidden border border-border bg-surface p-6 transition-colors duration-500 hover:border-border-strong sm:p-8 ${className ?? ""}`}
    >
      {/* Brand symbol as the visual field, not decoration on top of content. */}
      <Mark
        className="pointer-events-none absolute -right-10 top-1/2 -z-10 h-40 w-auto -translate-y-1/2 text-ink-800 transition-[color,transform] duration-700 group-hover/card:translate-x-1 group-hover/card:text-ink-700 sm:-right-14 sm:h-52"
      />

      <div>
        <div className="flex items-start justify-between gap-4">
          <p className="text-eyebrow font-medium uppercase text-brand-bright">
            {vehicle.make}
          </p>
          {typeof index === "number" ? (
            <span className="tnum text-eyebrow font-medium tracking-[0.18em] text-foreground-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-display-sm font-semibold tracking-tight text-foreground">
          {vehicle.model}
        </h3>
        <p className="mt-1.5 text-sm text-foreground-muted">{vehicle.version}</p>
      </div>

      <div className="mt-10">
        <dl className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-border pt-4 text-sm sm:gap-x-7">
          <div className="flex items-baseline gap-2">
            <dt className="sr-only">Ano</dt>
            <dd className="tnum text-foreground">{vehicle.year}</dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="sr-only">Quilometragem</dt>
            <dd className="tnum text-foreground-muted">
              {formatKmShort(vehicle.km)}
            </dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="sr-only">Combustível</dt>
            <dd className="text-foreground-muted">{vehicle.fuel}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-end justify-between gap-4">
          <p className="tnum text-data-xl font-display font-semibold text-foreground">
            {formatPrice(vehicle.price)}
          </p>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-border-strong text-foreground-muted transition-colors duration-500 group-hover/card:border-brand group-hover/card:bg-brand group-hover/card:text-white"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

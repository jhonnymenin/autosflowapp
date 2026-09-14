import Image from "next/image";
import Link from "next/link";

import { imagesFor } from "@/data/vehicle-images";
import { formatKmShort, formatPrice } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

/**
 * Stock plate.
 *
 * The source table carries no photography, so desirability has to come from
 * the record: model at display scale, price as the closing figure, and the
 * metadata set as a precise ruled line. No box, no badge, no arrow button —
 * the plate is separated from its neighbours by a single rule.
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
  const cover = imagesFor(vehicle)[0];

  return (
    <Link
      href={`/veiculos/${vehicle.slug}`}
      className={`group/card flex h-full flex-col justify-between pb-2 pt-6 ${className ?? ""}`}
    >
      <div>
        {cover ? (
          <div className="relative mb-7 aspect-16/10 w-full overflow-hidden bg-surface">
            <Image
              src={cover.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 320px, (min-width: 640px) 40vw, 72vw"
              quality={72}
              className="object-cover object-center transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-105"
            />
          </div>
        ) : null}

        <div className="flex items-baseline justify-between gap-4">
          <p className="text-eyebrow font-medium uppercase text-brand-bright">
            {vehicle.make}
          </p>
          {typeof index === "number" ? (
            <span className="tnum text-eyebrow font-medium tracking-[0.18em] text-foreground-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        <h3 className="mt-5 text-display-sm font-semibold tracking-tight text-foreground transition-colors duration-500 group-hover/card:text-brand-bright">
          {vehicle.model}
        </h3>
        <p className="mt-2 text-sm text-foreground-muted">{vehicle.version}</p>
      </div>

      <div className="mt-10">
        <dl className="tnum flex flex-wrap items-baseline gap-x-6 gap-y-1 text-xs text-foreground-subtle">
          <div className="whitespace-nowrap">
            <dt className="sr-only">Ano</dt>
            <dd>{vehicle.year}</dd>
          </div>
          <div className="whitespace-nowrap">
            <dt className="sr-only">Quilometragem</dt>
            <dd>{formatKmShort(vehicle.km)}</dd>
          </div>
          <div className="whitespace-nowrap">
            <dt className="sr-only">Combustível</dt>
            <dd>{vehicle.fuel}</dd>
          </div>
        </dl>

        {/* The rule grows on hover — the only motion the plate needs. */}
        <span
          aria-hidden="true"
          className="mt-4 block h-px w-full origin-left bg-border transition-colors duration-500 group-hover/card:bg-brand"
        />

        <p className="tnum mt-5 font-display text-data-xl font-semibold text-foreground">
          {formatPrice(vehicle.price)}
        </p>
      </div>
    </Link>
  );
}

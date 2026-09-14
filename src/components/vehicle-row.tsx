import Link from "next/link";

import { ArrowUpRight } from "@/components/icons";
import { formatKmShort, formatPrice } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

/**
 * Catalogue entry. A full-width editorial row rather than a card, so the
 * record reads at a glance and seventeen of them still scan quickly.
 */
export function VehicleRow({
  vehicle,
  index,
}: {
  vehicle: Vehicle;
  index: number;
}) {
  return (
    <li className="border-b border-border">
      <Link
        href={`/veiculos/${vehicle.slug}`}
        className="group/row relative grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-5 py-7 transition-colors duration-500 sm:gap-x-8 sm:py-9 lg:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1.6fr)_auto_2.75rem] lg:items-center lg:gap-x-10"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -inset-y-px -z-10 origin-top scale-y-0 bg-surface transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:scale-y-100"
        />

        <span className="tnum text-eyebrow font-medium tracking-[0.18em] text-foreground-subtle lg:text-sm lg:tracking-normal">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <p className="text-eyebrow font-medium uppercase text-brand-bright">
            {vehicle.make}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:translate-x-1 sm:text-3xl">
            {vehicle.model}
          </h3>
          <p className="mt-1 truncate text-sm text-foreground-muted">
            {vehicle.version}
          </p>
        </div>

        <dl className="col-span-2 flex flex-wrap gap-x-6 gap-y-2 text-sm lg:col-span-1 lg:gap-x-8">
          {[
            { label: "Ano", value: vehicle.year, numeric: true },
            { label: "Km", value: formatKmShort(vehicle.km), numeric: true },
            { label: "Combustível", value: vehicle.fuel, numeric: false },
            { label: "Cor", value: vehicle.color, numeric: false },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-eyebrow font-medium uppercase text-foreground-subtle">
                {item.label}
              </dt>
              <dd
                className={`mt-1 text-foreground-muted ${item.numeric ? "tnum" : ""}`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="col-span-2 flex items-center justify-between gap-4 lg:col-span-1 lg:block lg:text-right">
          {vehicle.origin === "consignado" ? (
            <p className="order-2 text-eyebrow font-medium uppercase text-foreground-subtle lg:order-none lg:mb-1.5">
              Consignado
            </p>
          ) : null}
          <p className="tnum font-display text-data-xl font-semibold text-foreground">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-border text-foreground-subtle transition-colors duration-500 group-hover/row:border-brand group-hover/row:bg-brand group-hover/row:text-white lg:flex"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </li>
  );
}

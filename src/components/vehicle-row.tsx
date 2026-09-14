import Link from "next/link";

import { formatKmShort, formatPrice } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

/** Shared column track, so the header and every row stay on one grid. */
const track =
  "grid grid-cols-[2rem_1fr] items-baseline gap-x-5 sm:gap-x-8 lg:grid-cols-[3rem_minmax(0,1.5fr)_5.5rem_7rem_5rem_6rem_minmax(0,1fr)] lg:items-center lg:gap-x-6";

/**
 * Column header for the catalogue.
 *
 * The labels are declared once here instead of repeating on all seventeen
 * rows, which is what turns the list from a stack of cards into a ledger.
 */
export function VehicleListHeader() {
  return (
    <div
      aria-hidden="true"
      className={`${track} hidden border-b border-border-strong pb-3 text-eyebrow font-medium uppercase text-foreground-subtle lg:grid`}
    >
      <span />
      <span>Veículo</span>
      <span>Ano</span>
      <span className="text-right">Quilometragem</span>
      <span>Comb.</span>
      <span>Cor</span>
      <span className="text-right">Valor</span>
    </div>
  );
}

/**
 * Catalogue entry — a full-width ledger line, not a card.
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
        className={`group/row relative ${track} py-6 sm:py-7`}
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
          <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-foreground transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:translate-x-1.5 sm:text-3xl lg:text-[2rem]">
            {vehicle.model}
          </h3>
          <p className="mt-1 truncate text-sm text-foreground-muted">
            {vehicle.version}
          </p>
        </div>

        {/* Below `lg` the row stacks, so each value carries its own label. */}
        <dl className="col-span-2 mt-1 flex flex-wrap gap-x-6 gap-y-2 text-sm lg:hidden">
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

        {/* From `lg` the values sit under the header declared once above. */}
        <span className="tnum hidden text-sm text-foreground-muted lg:block">
          {vehicle.year}
        </span>
        <span className="tnum hidden text-right text-sm text-foreground-muted lg:block">
          {formatKmShort(vehicle.km)}
        </span>
        <span className="hidden text-sm text-foreground-muted lg:block">
          {vehicle.fuel}
        </span>
        <span className="hidden text-sm text-foreground-muted lg:block">
          {vehicle.color}
        </span>

        <div className="col-span-2 mt-3 flex items-baseline justify-between gap-4 lg:col-span-1 lg:mt-0 lg:block lg:text-right">
          {vehicle.origin === "consignado" ? (
            <p className="order-2 text-eyebrow font-medium uppercase text-foreground-subtle lg:order-none lg:mb-1.5">
              Consignado
            </p>
          ) : null}
          <p className="tnum font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {formatPrice(vehicle.price)}
          </p>
        </div>
      </Link>
    </li>
  );
}

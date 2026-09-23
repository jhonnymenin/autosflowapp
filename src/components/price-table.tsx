import Link from "next/link";

import { STOCK_ISSUED_AT, vehicles } from "@/data/vehicles";
import { formatKmShort, formatNumber } from "@/lib/format";
import { originCounts, stockRef } from "@/lib/stock";
import type { Vehicle } from "@/types/vehicle";

/** Groups the stock by manufacturer, mirroring the source document. */
function groupByMake(): { make: string; rows: Vehicle[] }[] {
  const groups = new Map<string, Vehicle[]>();
  for (const vehicle of vehicles) {
    const existing = groups.get(vehicle.make);
    if (existing) existing.push(vehicle);
    else groups.set(vehicle.make, [vehicle]);
  }
  return [...groups.entries()]
    .map(([make, rows]) => ({ make, rows }))
    .sort((a, b) => a.make.localeCompare(b.make, "pt-BR"));
}

const cell = "px-4 py-4 align-middle first:pl-0 last:pr-0";

/**
 * The stock price table as real markup.
 *
 * Table semantics are kept intact at every width — on narrow screens the
 * table scrolls horizontally inside a labelled, keyboard-reachable region
 * with the vehicle column pinned, rather than being restacked into blocks.
 */
export function PriceTable() {
  const groups = groupByMake();

  return (
    <div
      role="region"
      aria-labelledby="tabela-titulo"
      tabIndex={0}
      className="-mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) lg:mx-0 lg:px-0"
    >
      <table className="w-full min-w-3xl border-collapse text-left text-sm">
        <caption className="sr-only" id="tabela-titulo">
          Tabela de preços dos veículos em estoque da AutosFlow, emitida em{" "}
          {STOCK_ISSUED_AT}. Sete colunas: veículo, ano, combustível, cor,
          quilometragem, referência e valor.
        </caption>

        <thead>
          <tr className="border-b border-border-strong">
            <th
              scope="col"
              className="sticky left-0 z-10 border-r border-border bg-background py-4 pr-4 text-eyebrow font-medium uppercase text-foreground-subtle lg:static lg:border-r-0"
            >
              Veículo
            </th>
            {["Ano", "Comb.", "Cor"].map((label) => (
              <th
                key={label}
                scope="col"
                className={`${cell} text-eyebrow font-medium uppercase text-foreground-subtle`}
              >
                {label}
              </th>
            ))}
            <th
              scope="col"
              className={`${cell} text-right text-eyebrow font-medium uppercase text-foreground-subtle`}
            >
              Km
            </th>
            <th
              scope="col"
              className={`${cell} text-eyebrow font-medium uppercase text-foreground-subtle`}
            >
              Ref.
            </th>
            <th
              scope="col"
              className={`${cell} text-right text-eyebrow font-medium uppercase text-foreground-subtle`}
            >
              Valor R$
            </th>
          </tr>
        </thead>

        {groups.map((group) => (
          <tbody key={group.make}>
            <tr>
              <th
                scope="colgroup"
                colSpan={7}
                className="sticky left-0 bg-background pb-3 pt-9 text-left text-eyebrow font-medium uppercase text-brand-bright lg:static"
              >
                {group.make}
              </th>
            </tr>
            {group.rows.map((vehicle) => (
              <tr
                key={vehicle.slug}
                className="group/tr border-b border-border transition-colors duration-300 hover:bg-surface"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-r border-border bg-background py-4 pr-4 font-normal group-hover/tr:bg-surface lg:static lg:border-r-0 lg:bg-transparent"
                >
                  <Link
                    href={`/veiculos/${vehicle.slug}`}
                    className="block max-w-[15rem] text-foreground transition-colors duration-300 hover:text-brand-bright lg:max-w-none"
                  >
                    {vehicle.origin === "consignado" ? (
                      <span
                        aria-hidden="true"
                        className="mr-1.5 text-foreground-subtle"
                      >
                        *
                      </span>
                    ) : null}
                    {vehicle.sourceName}
                    {vehicle.origin === "consignado" ? (
                      <span className="sr-only"> (consignado)</span>
                    ) : null}
                  </Link>
                </th>
                <td className={`${cell} tnum whitespace-nowrap text-foreground-muted`}>
                  {vehicle.yearShort}
                </td>
                <td className={`${cell} whitespace-nowrap text-foreground-muted`}>
                  {vehicle.fuel === "Gasolina" ? "GAS" : "FLEX"}
                </td>
                <td className={`${cell} whitespace-nowrap text-foreground-muted`}>
                  {vehicle.color}
                </td>
                <td
                  className={`${cell} tnum whitespace-nowrap text-right text-foreground-muted`}
                >
                  {vehicle.km > 0 ? formatKmShort(vehicle.km) : "0"}
                </td>
                <td className={`${cell} tnum whitespace-nowrap text-foreground-muted`}>
                  {stockRef(vehicle)}
                </td>
                <td
                  className={`${cell} tnum whitespace-nowrap text-right font-medium text-foreground`}
                >
                  {formatNumber(vehicle.price)}
                </td>
              </tr>
            ))}
          </tbody>
        ))}

        <tfoot>
          <tr>
            <th
              scope="row"
              className="sticky left-0 bg-background pr-4 pt-9 text-left font-normal text-foreground-muted lg:static"
            >
              Veículos da loja
            </th>
            <td colSpan={6} className="tnum px-4 pt-9 text-foreground">
              {originCounts.loja}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="sticky left-0 bg-background py-2 pr-4 text-left font-normal text-foreground-muted lg:static"
            >
              Veículos consignados (*)
            </th>
            <td colSpan={6} className="tnum px-4 py-2 text-foreground">
              {originCounts.consignado}
            </td>
          </tr>
          <tr className="border-t border-border-strong">
            <th
              scope="row"
              className="sticky left-0 bg-background py-4 pr-4 text-left font-medium text-foreground lg:static"
            >
              Total geral
            </th>
            <td colSpan={6} className="tnum px-4 py-4 font-medium text-foreground">
              {vehicles.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

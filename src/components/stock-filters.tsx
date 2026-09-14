import Link from "next/link";

import {
  fuelsWithCounts,
  makesWithCounts,
  originCounts,
  sortOptions,
  type SortKey,
} from "@/lib/stock";

export interface ActiveFilters {
  marca?: string;
  combustivel?: string;
  origem?: string;
  ordem?: SortKey;
}

/** Builds /veiculos?… keeping the other choices intact. */
function buildHref(active: ActiveFilters, patch: Partial<ActiveFilters>) {
  const next = { ...active, ...patch };
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(next)) {
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `/veiculos?${query}` : "/veiculos";
}

function Chip({
  href,
  selected,
  count,
  children,
}: {
  href: string;
  selected: boolean;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={selected ? "true" : undefined}
      className={`inline-flex h-9 items-center gap-2 whitespace-nowrap border px-4 text-sm tracking-tight transition-colors duration-300 ${
        selected
          ? "border-brand bg-brand text-white"
          : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
      }`}
    >
      {children}
      {typeof count === "number" ? (
        <span
          className={`tnum text-xs ${selected ? "text-white/90" : "text-foreground-subtle"}`}
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <h3 className="w-28 shrink-0 text-eyebrow font-medium uppercase text-foreground-subtle">
        {label}
      </h3>
      {/* Horizontal scroll keeps long option sets off a second line on phones */}
      <div className="-mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 sm:flex-wrap">{children}</div>
      </div>
    </div>
  );
}

/**
 * Filters are plain links over search params: they work without JavaScript,
 * survive a refresh and can be shared or bookmarked.
 */
export function StockFilters({
  active,
  total,
}: {
  active: ActiveFilters;
  total: number;
}) {
  const makes = makesWithCounts();
  const fuels = fuelsWithCounts();
  const hasFilters = Boolean(active.marca || active.combustivel || active.origem);

  return (
    <section aria-labelledby="filtros" className="flex flex-col gap-6">
      <h2 id="filtros" className="sr-only">
        Filtrar e ordenar o estoque
      </h2>
      <Group label="Marca">
        <Chip
          href={buildHref(active, { marca: undefined })}
          selected={!active.marca}
        >
          Todas
        </Chip>
        {makes.map((entry) => (
          <Chip
            key={entry.make}
            href={buildHref(active, { marca: entry.make })}
            selected={active.marca === entry.make}
            count={entry.count}
          >
            {entry.make}
          </Chip>
        ))}
      </Group>

      <Group label="Combustível">
        <Chip
          href={buildHref(active, { combustivel: undefined })}
          selected={!active.combustivel}
        >
          Todos
        </Chip>
        {fuels.map((entry) => (
          <Chip
            key={entry.fuel}
            href={buildHref(active, { combustivel: entry.fuel })}
            selected={active.combustivel === entry.fuel}
            count={entry.count}
          >
            {entry.fuel}
          </Chip>
        ))}
      </Group>

      <Group label="Origem">
        <Chip
          href={buildHref(active, { origem: undefined })}
          selected={!active.origem}
        >
          Todos
        </Chip>
        <Chip
          href={buildHref(active, { origem: "loja" })}
          selected={active.origem === "loja"}
          count={originCounts.loja}
        >
          Da loja
        </Chip>
        <Chip
          href={buildHref(active, { origem: "consignado" })}
          selected={active.origem === "consignado"}
          count={originCounts.consignado}
        >
          Consignados
        </Chip>
      </Group>

      <Group label="Ordenar">
        {sortOptions.map((option) => (
          <Chip
            key={option.value}
            href={buildHref(active, { ordem: option.value })}
            selected={(active.ordem ?? "preco-asc") === option.value}
          >
            {option.label}
          </Chip>
        ))}
      </Group>

      <div className="flex items-center gap-5 border-t border-border pt-5">
        <p aria-live="polite" className="text-sm text-foreground-muted">
          <span className="tnum font-medium text-foreground">{total}</span>{" "}
          {total === 1 ? "veículo" : "veículos"}
        </p>
        {hasFilters ? (
          <Link
            href={buildHref(
              { ordem: active.ordem },
              { marca: undefined, combustivel: undefined, origem: undefined },
            )}
            scroll={false}
            className="text-sm text-foreground-subtle underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
          >
            Limpar filtros
          </Link>
        ) : null}
      </div>
    </section>
  );
}

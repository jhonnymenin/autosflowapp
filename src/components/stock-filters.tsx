import Link from "next/link";

import {
  countInBand,
  fuelsWithCounts,
  kmBands,
  makesWithCounts,
  originCounts,
  priceBands,
  sortOptions,
  yearBands,
  type Band,
  type SortKey,
} from "@/lib/stock";

export interface ActiveFilters {
  q?: string;
  marca?: string;
  combustivel?: string;
  origem?: string;
  preco?: string;
  ano?: string;
  km?: string;
  ordem?: SortKey;
}

/** Monta /veiculos?… preservando as outras escolhas. */
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
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-5">
      <h3 className="w-24 shrink-0 text-eyebrow font-medium uppercase text-foreground-subtle">
        {label}
      </h3>
      {/* Rolagem horizontal evita quebra de linha nos conjuntos longos */}
      <div className="-mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 sm:flex-wrap">{children}</div>
      </div>
    </div>
  );
}

/** Um grupo de faixas (preço, ano, km). */
function BandGroup({
  label,
  kind,
  bands,
  param,
  active,
}: {
  label: string;
  kind: "price" | "year" | "km";
  bands: Band[];
  param: "preco" | "ano" | "km";
  active: ActiveFilters;
}) {
  const current = active[param];
  return (
    <Group label={label}>
      <Chip href={buildHref(active, { [param]: undefined })} selected={!current}>
        Todas
      </Chip>
      {bands.map((band) => (
        <Chip
          key={band.value}
          href={buildHref(active, { [param]: band.value })}
          selected={current === band.value}
          count={countInBand(kind, band)}
        >
          {band.label}
        </Chip>
      ))}
    </Group>
  );
}

/**
 * Filtros de alta intenção.
 *
 * Tudo são links e um formulário GET sobre search params: funcionam sem
 * JavaScript, sobrevivem ao refresh e podem ser compartilhados ou salvos —
 * um link de "até R$ 80 mil, 2020 ou mais novo" vai direto para o resultado.
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
  const hasFilters = Boolean(
    active.q ||
      active.marca ||
      active.combustivel ||
      active.origem ||
      active.preco ||
      active.ano ||
      active.km,
  );

  return (
    <section aria-labelledby="filtros" className="flex flex-col gap-6">
      <h2 id="filtros" className="sr-only">
        Buscar e filtrar o estoque
      </h2>

      {/* Busca livre — formulário GET, sem JavaScript */}
      <form action="/veiculos" method="get" className="flex gap-2">
        {active.ordem ? (
          <input type="hidden" name="ordem" value={active.ordem} />
        ) : null}
        <label htmlFor="busca" className="sr-only">
          Buscar por modelo, marca ou referência
        </label>
        <input
          id="busca"
          name="q"
          type="search"
          defaultValue={active.q ?? ""}
          placeholder="Buscar por modelo, marca ou referência"
          className="h-12 w-full border border-border bg-surface px-4 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-foreground-subtle focus:border-brand-bright"
        />
        <button
          type="submit"
          className="h-12 shrink-0 bg-foreground px-6 text-sm font-medium tracking-tight text-ink-950 transition-colors duration-300 hover:bg-white"
        >
          Buscar
        </button>
      </form>

      <BandGroup
        label="Preço"
        kind="price"
        bands={priceBands}
        param="preco"
        active={active}
      />
      <BandGroup
        label="Ano"
        kind="year"
        bands={yearBands}
        param="ano"
        active={active}
      />
      <BandGroup
        label="Km"
        kind="km"
        bands={kmBands}
        param="km"
        active={active}
      />

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

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">
        <p aria-live="polite" className="text-sm text-foreground-muted">
          <span className="tnum font-medium text-foreground">{total}</span>{" "}
          {total === 1 ? "veículo" : "veículos"}
          {active.q ? (
            <>
              {" "}
              para <span className="text-foreground">“{active.q}”</span>
            </>
          ) : null}
        </p>
        {hasFilters ? (
          <Link
            href={buildHref({ ordem: active.ordem }, {})}
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

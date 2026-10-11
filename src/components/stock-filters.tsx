import Link from "next/link";

import { ChevronDown, Close, Search } from "@/components/icons";
import { bodyLabels, isBodyType } from "@/data/body-types";
import {
  bodiesWithCounts,
  countInBand,
  fuelsWithCounts,
  kmBands,
  makesWithCounts,
  priceBands,
  sortOptions,
  yearBands,
  type Band,
  type SortKey,
} from "@/lib/stock";

export interface ActiveFilters {
  q?: string;
  marca?: string;
  carroceria?: string;
  combustivel?: string;
  origem?: string;
  preco?: string;
  ano?: string;
  km?: string;
  ordem?: SortKey;
}

/** Monta /veiculos?… preservando as outras escolhas. */
export function buildHref(
  active: ActiveFilters,
  patch: Partial<ActiveFilters>,
) {
  const next = { ...active, ...patch };
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(next)) {
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `/veiculos?${query}` : "/veiculos";
}

interface Option {
  value: string;
  label: string;
}

/** Lista suspensa nativa: teclado, leitor de tela e celular de graça. */
function Select({
  name,
  label,
  placeholder,
  options,
  value,
}: {
  name: keyof ActiveFilters;
  label: string;
  placeholder?: string;
  options: Option[];
  value?: string;
}) {
  const id = `filtro-${name}`;
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2.5 text-[0.6875rem] font-semibold text-foreground-muted"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={value ?? ""}
        key={value ?? ""}
        className={`h-15 w-full cursor-pointer appearance-none rounded-control border bg-surface pb-2.5 pl-4 pr-10 pt-6 text-[0.9375rem] font-medium outline-none transition-colors duration-300 hover:border-border-strong focus:border-brand ${
          value
            ? "border-brand text-foreground ring-1 ring-brand"
            : "border-border text-foreground"
        }`}
      >
        {placeholder !== undefined ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
    </div>
  );
}

const bandOptions = (kind: "price" | "year" | "km", bands: Band[]) =>
  bands.map((band) => ({
    value: band.value,
    label: `${band.label} (${countInBand(kind, band)})`,
  }));

/** Os filtros em si — coluna no desktop, folha no celular. */
export function FilterFields({ active }: { active: ActiveFilters }) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-3 hidden font-display text-lg font-semibold text-foreground lg:block">
        Filtrar
      </legend>
      {/* Mantém um filtro que veio por link e não tem lista própria */}
      {active.origem ? (
        <input type="hidden" name="origem" value={active.origem} />
      ) : null}
      <Select
        name="marca"
        label="Marca"
        placeholder="Todas"
        value={active.marca}
        options={makesWithCounts().map((entry) => ({
          value: entry.make,
          label: `${entry.make} (${entry.count})`,
        }))}
      />
      <Select
        name="carroceria"
        label="Tipo de carro"
        placeholder="Todos"
        value={active.carroceria}
        options={bodiesWithCounts().map((entry) => ({
          value: entry.body,
          label: `${entry.label} (${entry.count})`,
        }))}
      />
      <Select
        name="preco"
        label="Preço"
        placeholder="Qualquer"
        value={active.preco}
        options={bandOptions("price", priceBands)}
      />
      <Select
        name="ano"
        label="Ano"
        placeholder="Qualquer"
        value={active.ano}
        options={bandOptions("year", yearBands)}
      />
      <Select
        name="km"
        label="Quilometragem"
        placeholder="Qualquer"
        value={active.km}
        options={bandOptions("km", kmBands)}
      />
      <Select
        name="combustivel"
        label="Combustível"
        placeholder="Todos"
        value={active.combustivel}
        options={fuelsWithCounts().map((entry) => ({
          value: entry.fuel,
          label: `${entry.fuel} (${entry.count})`,
        }))}
      />
    </fieldset>
  );
}

/** Busca livre — envia ao apertar Enter ou o botão. */
export function SearchField({ value }: { value?: string }) {
  return (
    <div className="relative flex-1">
      <label htmlFor="busca" className="sr-only">
        Buscar por modelo, marca ou referência
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-foreground-subtle" />
      <input
        id="busca"
        name="q"
        type="search"
        enterKeyHint="search"
        defaultValue={value ?? ""}
        key={value ?? ""}
        placeholder="Buscar modelo, marca ou referência"
        className="h-12 w-full rounded-control border border-border bg-surface pl-11 pr-4 text-[0.9375rem] text-foreground outline-none transition-colors duration-300 placeholder:text-foreground-subtle hover:border-border-strong focus:border-brand"
      />
    </div>
  );
}

/** Ordem dos resultados. O padrão fica fora da URL. */
export function SortField({ value }: { value?: SortKey }) {
  return (
    <div className="relative">
      <label htmlFor="filtro-ordem" className="sr-only">
        Ordenar por
      </label>
      <select
        id="filtro-ordem"
        name="ordem"
        defaultValue={value === "destaque" || !value ? "" : value}
        key={value ?? ""}
        className="h-12 w-full cursor-pointer appearance-none rounded-control border border-border bg-surface pl-4 pr-10 text-sm font-semibold text-foreground outline-none transition-colors hover:border-border-strong focus:border-brand"
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value === "destaque" ? "" : option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
    </div>
  );
}

/** Rótulos dos filtros aplicados, para os chips removíveis. */
export function appliedFilters(active: ActiveFilters) {
  return [
    active.q ? { key: "q", label: `“${active.q}”` } : null,
    active.marca ? { key: "marca", label: active.marca } : null,
    isBodyType(active.carroceria)
      ? { key: "carroceria", label: bodyLabels[active.carroceria].plural }
      : null,
    active.preco
      ? {
          key: "preco",
          label: priceBands.find((b) => b.value === active.preco)?.label,
        }
      : null,
    active.ano
      ? {
          key: "ano",
          label: yearBands.find((b) => b.value === active.ano)?.label,
        }
      : null,
    active.km
      ? { key: "km", label: kmBands.find((b) => b.value === active.km)?.label }
      : null,
    active.combustivel
      ? { key: "combustivel", label: active.combustivel }
      : null,
    active.origem
      ? {
          key: "origem",
          label: active.origem === "loja" ? "Da loja" : "Consignados",
        }
      : null,
  ].filter((item): item is { key: keyof ActiveFilters; label: string } =>
    Boolean(item?.label),
  );
}

export function AppliedFilters({
  active,
  total,
}: {
  active: ActiveFilters;
  total: number;
}) {
  const applied = appliedFilters(active);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p aria-live="polite" className="mr-1 text-sm text-foreground-muted">
        <span className="tnum font-semibold text-foreground">{total}</span>{" "}
        {total === 1 ? "veículo encontrado" : "veículos encontrados"}
      </p>
      {applied.map((item) => (
        <Link
          key={item.key}
          href={buildHref(active, { [item.key]: undefined })}
          scroll={false}
          aria-label={`Remover filtro ${item.label}`}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-brand/10 pl-3 pr-2 text-xs font-semibold text-accent transition-colors hover:bg-brand/15"
        >
          {item.label}
          <Close className="h-3.5 w-3.5" />
        </Link>
      ))}
      {applied.length > 1 ? (
        <Link
          href={buildHref({ ordem: active.ordem }, {})}
          scroll={false}
          className="text-xs font-semibold text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          Limpar tudo
        </Link>
      ) : null}
    </div>
  );
}

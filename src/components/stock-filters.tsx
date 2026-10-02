import Link from "next/link";

import { FilterForm } from "@/components/filter-form";
import { ChevronDown } from "@/components/icons";
import {
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
        className="pointer-events-none absolute left-4 top-2 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-foreground-subtle"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={value ?? ""}
        key={value ?? ""}
        className={`h-14 w-full cursor-pointer appearance-none border bg-surface pb-2 pl-4 pr-10 pt-6 text-sm tracking-tight outline-none transition-colors duration-300 hover:border-border-strong focus:border-brand-bright ${
          value ? "border-brand text-foreground" : "border-border text-foreground-muted"
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

/**
 * Busca e filtros do estoque.
 *
 * Uma linha de listas suspensas em vez de grupos de botões: o cliente escolhe
 * marca, preço, ano, km e combustível sem rolar a página, e os filtros
 * aplicados aparecem logo abaixo, cada um removível com um toque.
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

  const applied = [
    active.q ? { key: "q", label: `“${active.q}”` } : null,
    active.marca ? { key: "marca", label: active.marca } : null,
    active.preco
      ? {
          key: "preco",
          label: priceBands.find((b) => b.value === active.preco)?.label,
        }
      : null,
    active.ano
      ? { key: "ano", label: yearBands.find((b) => b.value === active.ano)?.label }
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
  ].filter(
    (item): item is { key: keyof ActiveFilters; label: string } =>
      Boolean(item?.label),
  );

  return (
    <section aria-labelledby="filtros">
      <h2 id="filtros" className="sr-only">
        Buscar e filtrar o estoque
      </h2>

      <FilterForm className="flex flex-col gap-2">
        {/* Mantém um filtro que veio por link e não tem lista própria */}
        {active.origem ? (
          <input type="hidden" name="origem" value={active.origem} />
        ) : null}

        <div className="flex gap-2">
          <label htmlFor="busca" className="sr-only">
            Buscar por modelo, marca ou referência
          </label>
          <input
            id="busca"
            name="q"
            type="search"
            defaultValue={active.q ?? ""}
            key={active.q ?? ""}
            placeholder="Buscar por modelo, marca ou referência"
            className="h-14 w-full border border-border bg-surface px-4 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-foreground-subtle focus:border-brand-bright"
          />
          <button
            type="submit"
            className="h-14 shrink-0 bg-foreground px-6 text-sm font-medium tracking-tight text-ink-950 transition-colors duration-300 hover:bg-white sm:px-8"
          >
            Buscar
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <Select
            name="marca"
            label="Marca"
            placeholder="Todas"
            value={active.marca}
            options={makes.map((entry) => ({
              value: entry.make,
              label: `${entry.make} (${entry.count})`,
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
            options={fuels.map((entry) => ({
              value: entry.fuel,
              label: `${entry.fuel} (${entry.count})`,
            }))}
          />
          <Select
            name="ordem"
            label="Ordenar por"
            // O padrão fica fora da URL: valor vazio = "Fotos primeiro".
            value={active.ordem === "destaque" ? undefined : active.ordem}
            options={sortOptions.map((option) => ({
              label: option.label,
              value: option.value === "destaque" ? "" : option.value,
            }))}
          />
        </div>
      </FilterForm>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <p aria-live="polite" className="mr-2 text-sm text-foreground-muted">
          <span className="tnum font-medium text-foreground">{total}</span>{" "}
          {total === 1 ? "veículo" : "veículos"}
        </p>

        {applied.map((item) => (
          <Link
            key={item.key}
            href={buildHref(active, { [item.key]: undefined })}
            scroll={false}
            aria-label={`Remover filtro ${item.label}`}
            className="inline-flex h-8 items-center gap-2 border border-border px-3 text-xs tracking-tight text-foreground transition-colors duration-300 hover:border-foreground"
          >
            {item.label}
            <span aria-hidden="true" className="text-foreground-subtle">
              ×
            </span>
          </Link>
        ))}

        {applied.length > 0 ? (
          <Link
            href={buildHref({ ordem: active.ordem }, {})}
            scroll={false}
            className="text-xs text-foreground-subtle underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
          >
            Limpar tudo
          </Link>
        ) : null}
      </div>
    </section>
  );
}

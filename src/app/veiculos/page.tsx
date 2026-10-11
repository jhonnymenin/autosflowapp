import type { Metadata } from "next";
import Link from "next/link";

import { FilterForm } from "@/components/filter-form";
import {
  FilterSheet,
  FilterSheetProvider,
  FilterToggle,
} from "@/components/filter-sheet";
import { Document, WhatsApp } from "@/components/icons";
import {
  AppliedFilters,
  appliedFilters,
  buildHref,
  FilterFields,
  SearchField,
  SortField,
} from "@/components/stock-filters";
import { buttonClass } from "@/components/ui";
import { VehicleCard } from "@/components/vehicle-card";
import { STOCK_ISSUED_AT, STOCK_UPDATED_AT, vehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/site";
import { filterStock, isSortKey, priceRange } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Veículos à venda",
  description: `${vehicles.length} veículos à venda em São Paulo, a partir de ${formatPrice(priceRange.min)}. Filtre por marca, tipo de carro, preço, ano, quilometragem e combustível.`,
  alternates: { canonical: "/veiculos" },
  openGraph: {
    title: "Veículos à venda — AutosFlow",
    description:
      "Veículos selecionados com critério, avaliados com responsabilidade e apresentados com transparência.",
    url: "/veiculos",
  },
};

type SearchParams = Promise<{
  q?: string;
  marca?: string;
  carroceria?: string;
  combustivel?: string;
  origem?: string;
  preco?: string;
  ano?: string;
  km?: string;
  ordem?: string;
}>;

/**
 * Estoque.
 *
 * A experiência principal de exploração do site: busca e ordem no topo,
 * filtros numa coluna (desktop) ou numa folha (celular), e os carros em cards
 * grandes, com a foto dominando. Tudo vive na URL — dá para compartilhar uma
 * busca e voltar a ela.
 */
export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const active = {
    q: params.q?.trim() || undefined,
    marca: params.marca || undefined,
    carroceria: params.carroceria || undefined,
    combustivel: params.combustivel || undefined,
    origem: params.origem || undefined,
    preco: params.preco || undefined,
    ano: params.ano || undefined,
    km: params.km || undefined,
    ordem: isSortKey(params.ordem) ? params.ordem : undefined,
  };

  const results = filterStock({
    q: active.q,
    make: active.marca,
    body: active.carroceria,
    fuel: active.combustivel,
    origin: active.origem,
    price: active.preco,
    year: active.ano,
    km: active.km,
    sort: active.ordem,
  });

  const filterCount = appliedFilters(active).filter(
    (f) => f.key !== "q",
  ).length;
  const clearHref = buildHref({ q: active.q, ordem: active.ordem }, {});

  return (
    <>
      <section className="pb-6 pt-24 sm:pt-28 lg:pb-8 lg:pt-32">
        <div className="container-editorial flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-eyebrow font-semibold uppercase text-accent">
              Estoque
            </p>
            <h1 className="mt-3 text-display-md font-semibold text-foreground">
              Veículos à venda
            </h1>
            <p className="mt-2 text-foreground-muted">
              {vehicles.length} carros selecionados, a partir de{" "}
              {formatPrice(priceRange.min)}.
            </p>
          </div>
          <Link
            href="/tabela-de-precos"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground-muted transition-colors duration-300 hover:text-accent"
          >
            <Document className="h-4 w-4" />
            Tabela de preços
          </Link>
        </div>
      </section>

      <div className="container-editorial pb-section">
        <FilterSheetProvider>
          <FilterForm className="grid gap-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-10">
            <FilterSheet total={results.length} clearHref={clearHref}>
              <FilterFields active={active} />
              {filterCount > 0 ? (
                <Link
                  href={clearHref}
                  scroll={false}
                  className="mt-4 hidden text-sm font-semibold text-foreground-muted underline-offset-4 hover:text-foreground hover:underline lg:inline-block"
                >
                  Limpar filtros
                </Link>
              ) : null}
            </FilterSheet>

            <div className="min-w-0">
              <div className="flex flex-col gap-2 sm:flex-row">
                <SearchField value={active.q} />
                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <FilterToggle activeCount={filterCount} />
                  <div className="sm:w-52">
                    <SortField value={active.ordem} />
                  </div>
                </div>
                {/* Sem JavaScript, a busca precisa de um botão para enviar */}
                <noscript>
                  <button type="submit" className={buttonClass("solid", "md")}>
                    Buscar
                  </button>
                </noscript>
              </div>

              <div className="mt-4">
                <AppliedFilters active={active} total={results.length} />
              </div>

              <h2 className="sr-only">Resultados</h2>
              {results.length > 0 ? (
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((vehicle, index) => (
                    <li key={vehicle.slug}>
                      <VehicleCard
                        vehicle={vehicle}
                        priority={index < 2}
                        sizes="(min-width: 1280px) 340px, (min-width: 640px) 45vw, 100vw"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6 rounded-card border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
                  <p className="font-display text-2xl font-semibold text-foreground">
                    Nenhum carro com esses filtros.
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-foreground-muted">
                    Ajuste a seleção — ou conte o que você procura. Podemos
                    buscar o carro certo para você.
                  </p>
                  <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
                    <Link
                      href={clearHref}
                      className={buttonClass("outline", "lg")}
                    >
                      Limpar filtros
                    </Link>
                    <a
                      href={whatsappUrl(
                        "Olá! Não encontrei no site o carro que procuro. Podem me ajudar?",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("primary", "lg")}
                    >
                      <WhatsApp className="h-4.5 w-4.5" />
                      Pedir ajuda
                    </a>
                  </div>
                </div>
              )}

              <p className="mt-10 text-xs leading-relaxed text-foreground-subtle">
                Estoque conforme a tabela de preços de {STOCK_ISSUED_AT}, com
                valores revistos em {STOCK_UPDATED_AT}. Consignado é o veículo
                de um proprietário, anunciado e negociado com intermediação da
                AutosFlow. Valores e disponibilidade sujeitos a alteração sem
                aviso prévio.
              </p>
            </div>
          </FilterForm>
        </FilterSheetProvider>
      </div>
    </>
  );
}

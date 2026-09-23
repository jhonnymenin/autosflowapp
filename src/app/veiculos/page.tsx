import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/cta-section";
import { Document } from "@/components/icons";
import { StockFilters } from "@/components/stock-filters";
import { Eyebrow } from "@/components/ui";
import { VehicleListHeader, VehicleRow } from "@/components/vehicle-row";
import { STOCK_ISSUED_AT } from "@/data/vehicles";
import { filterStock, isSortKey } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Veículos em estoque",
  description:
    "Estoque AutosFlow: veículos selecionados com critério, com ano, quilometragem, combustível e valor de cada um. Filtre por marca, combustível e origem.",
  alternates: { canonical: "/veiculos" },
  openGraph: {
    title: "Veículos em estoque — AutosFlow",
    description:
      "Veículos selecionados com critério, avaliados com responsabilidade e apresentados com transparência.",
    url: "/veiculos",
  },
};

type SearchParams = Promise<{
  q?: string;
  marca?: string;
  combustivel?: string;
  origem?: string;
  preco?: string;
  ano?: string;
  km?: string;
  ordem?: string;
}>;

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const active = {
    q: params.q?.trim() || undefined,
    marca: params.marca,
    combustivel: params.combustivel,
    origem: params.origem,
    preco: params.preco,
    ano: params.ano,
    km: params.km,
    ordem: isSortKey(params.ordem) ? params.ordem : undefined,
  };

  const results = filterStock({
    q: active.q,
    make: active.marca,
    fuel: active.combustivel,
    origin: active.origem,
    price: active.preco,
    year: active.ano,
    km: active.km,
    sort: active.ordem,
  });

  return (
    <>
      <section className="border-b border-border pb-10 pt-28 sm:pb-12 sm:pt-36 lg:pt-40">
        <div className="container-editorial">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <Eyebrow>Estoque</Eyebrow>
              <h1 className="mt-4 text-display-md font-semibold text-foreground">
                Os carros certos.
              </h1>
            </div>
            <Link
              href="/tabela-de-precos"
              className="inline-flex shrink-0 items-center gap-3 text-sm font-medium tracking-tight text-foreground-muted transition-colors duration-300 hover:text-brand-bright"
            >
              <Document className="h-4 w-4" />
              Ver tabela de preços
            </Link>
          </div>
        </div>
      </section>

      <div className="container-editorial py-12 sm:py-16">
        <StockFilters active={active} total={results.length} />

        {results.length > 0 ? (
          <div className="mt-14 sm:mt-16">
            <VehicleListHeader />
            <ul className="border-t border-border lg:border-t-0">
              {results.map((vehicle, index) => (
                <VehicleRow key={vehicle.slug} vehicle={vehicle} index={index} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-16 border-t border-border py-20 text-center">
            <p className="font-display text-display-sm font-semibold text-foreground">
              Nenhum veículo com esses filtros.
            </p>
            <p className="mt-4 text-foreground-muted">
              Ajuste a seleção ou fale com um especialista — podemos procurar o
              carro certo para você.
            </p>
            <Link
              href="/veiculos"
              className="mt-8 inline-flex h-11 items-center border border-border-strong px-6 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-ink-950"
            >
              Ver todo o estoque
            </Link>
          </div>
        )}

        <div className="mt-10 grid gap-4 text-xs leading-relaxed text-foreground-subtle sm:grid-cols-2 sm:gap-10">
          <p>
            <span className="text-foreground-muted">Consignado</span> é o
            veículo de um proprietário, anunciado e negociado com intermediação
            da AutosFlow. A avaliação, a documentação e a entrega seguem o mesmo
            processo dos veículos da loja.
          </p>
          <p>
            Estoque conforme a tabela de preços de {STOCK_ISSUED_AT}. Valores e
            disponibilidade sujeitos a alteração sem aviso prévio.
          </p>
        </div>
      </div>

      <CtaSection
        image="/imagens/showroom-traseira.jpg"
        title="Encontrou o seu? Fale com um especialista."
      />
    </>
  );
}

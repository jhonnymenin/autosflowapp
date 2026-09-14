import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/cta-section";
import { Document } from "@/components/icons";
import { StockFilters } from "@/components/stock-filters";
import { Eyebrow } from "@/components/ui";
import { VehicleRow } from "@/components/vehicle-row";
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
  marca?: string;
  combustivel?: string;
  origem?: string;
  ordem?: string;
}>;

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const active = {
    marca: params.marca,
    combustivel: params.combustivel,
    origem: params.origem,
    ordem: isSortKey(params.ordem) ? params.ordem : undefined,
  };

  const results = filterStock({
    make: active.marca,
    fuel: active.combustivel,
    origin: active.origem,
    sort: active.ordem,
  });

  return (
    <>
      <section className="border-b border-border pb-14 pt-32 sm:pb-16 sm:pt-40 lg:pt-48">
        <div className="container-editorial">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <Eyebrow>Estoque</Eyebrow>
              <h1 className="mt-6 text-display-lg font-semibold text-foreground">
                Os carros certos.
              </h1>
              <p className="text-lead mt-6 max-w-xl text-foreground-muted">
                Selecionados com critério, avaliados com responsabilidade e
                apresentados com transparência.
              </p>
            </div>
            <Link
              href="/tabela-de-precos"
              className="inline-flex shrink-0 items-center gap-2.5 border-b border-border-strong pb-1 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright lg:pb-2"
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
          <ul className="mt-12 border-t border-border sm:mt-16">
            {results.map((vehicle, index) => (
              <VehicleRow key={vehicle.slug} vehicle={vehicle} index={index} />
            ))}
          </ul>
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
              className="mt-8 inline-flex h-11 items-center rounded-full border border-border-strong px-6 text-sm font-medium text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright"
            >
              Ver todo o estoque
            </Link>
          </div>
        )}

        <p className="mt-10 text-xs text-foreground-subtle">
          Estoque conforme a tabela de preços de {STOCK_ISSUED_AT}. Valores e
          disponibilidade sujeitos a alteração sem aviso prévio.
        </p>
      </div>

      <CtaSection
        image="/imagens/showroom-traseira.jpg"
        title="Encontrou o seu? Fale com um especialista."
      />
    </>
  );
}

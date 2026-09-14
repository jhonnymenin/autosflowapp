import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/cta-section";
import { ArrowRight, Document } from "@/components/icons";
import { PriceTable } from "@/components/price-table";
import { Eyebrow } from "@/components/ui";
import { addressOneLine, contact } from "@/data/brand";
import { STOCK_ISSUED_AT, vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Tabela de preços",
  description: `Tabela completa dos ${vehicles.length} veículos em estoque da AutosFlow, com ano, combustível, cor, quilometragem, placa e valor de cada um.`,
  alternates: { canonical: "/tabela-de-precos" },
  openGraph: {
    title: "Tabela de preços — AutosFlow",
    description: `Os ${vehicles.length} veículos em estoque, com todos os dados do registro.`,
    url: "/tabela-de-precos",
  },
};

export default function PriceTablePage() {
  return (
    <>
      <section className="border-b border-border pb-14 pt-32 sm:pb-16 sm:pt-40 lg:pt-48">
        <div className="container-editorial">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <Eyebrow>Transparência</Eyebrow>
              <h1 className="mt-6 text-display-lg font-semibold text-foreground">
                Tabela de preços.
              </h1>
              <p className="text-lead mt-6 max-w-xl text-foreground-muted">
                O estoque inteiro, com os mesmos dados do nosso registro
                interno. Sem letras pequenas e sem surpresas.
              </p>
            </div>
            <a
              href="/documentos/autosflow-tabela-de-precos.pdf"
              className="inline-flex shrink-0 items-center gap-2.5 border-b border-border-strong pb-1 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright lg:pb-2"
            >
              <Document className="h-4 w-4" />
              Documento original em PDF
            </a>
          </div>
        </div>
      </section>

      <div className="container-editorial py-12 sm:py-16">
        <p className="text-sm text-foreground-subtle lg:hidden">
          Deslize a tabela na horizontal para ver todas as colunas.
        </p>

        <div className="mt-6 lg:mt-0">
          <PriceTable />
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 text-xs leading-relaxed text-foreground-subtle sm:grid-cols-2 lg:gap-16">
          <div className="space-y-2">
            <p>
              <span className="text-foreground-muted">(*)</span> Veículo
              consignado — pertencente a um proprietário e anunciado com
              intermediação da AutosFlow.
            </p>
            <p>
              Emissão do registro: {STOCK_ISSUED_AT}. Valores e disponibilidade
              sujeitos a alteração sem aviso prévio.
            </p>
          </div>
          <div className="space-y-2 sm:text-right">
            <p className="text-foreground-muted">{addressOneLine}</p>
            <p className="tnum">{contact.phoneLabel}</p>
          </div>
        </div>

        <Link
          href="/veiculos"
          className="group/link mt-12 inline-flex items-center gap-2.5 border-b border-border-strong pb-1 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright"
        >
          Ver o estoque com filtros
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>

      <CtaSection title="Alguma dúvida sobre um destes veículos?" />
    </>
  );
}

import type { Metadata } from "next";

import { serviceCategories, services } from "../_data/services";
import { Listing, type ListingState } from "./_components/listing";

export const metadata: Metadata = {
  title: "Serviços para o seu carro",
  description:
    "Parceiros avaliados pela AutosFlow: lavagem, revisão, troca de óleo, débitos, mecânica e blindagem. Peça um orçamento sem compromisso.",
};

const sorts = ["relevancia", "menor-preco", "nome"] as const;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/**
 * FE-12 — listagem de serviços.
 *
 * Os filtros vivem na URL (?categoria=&cidade=&ordem=&q=), então a página
 * abre já filtrada a partir da faixa da home (FE-03) e pode ser indexada.
 */
export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categoria = first(params.categoria);
  const cidade = first(params.cidade);
  const ordem = first(params.ordem);

  const initial: ListingState = {
    categoria: serviceCategories.some((c) => c.slug === categoria) ? categoria : "",
    cidade: services.some((s) => s.city === cidade) ? cidade : "",
    ordem: (sorts as readonly string[]).includes(ordem)
      ? (ordem as ListingState["ordem"])
      : "relevancia",
    q: first(params.q).slice(0, 80),
  };

  return <Listing initial={initial} services={services} categories={serviceCategories} />;
}

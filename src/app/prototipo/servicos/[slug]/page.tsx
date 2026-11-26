import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteUrl } from "@/lib/site";

import { categoryOf, getService, partners, services } from "../../_data/services";
import { Detail } from "../_components/detail";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Serviço não encontrado" };
  return {
    title: `${service.title} · ${service.partner}`,
    description: service.summary,
  };
}

/**
 * FE-13 — detalhe do serviço.
 *
 * Renderizado no servidor, com dados estruturados do serviço. Slug que não
 * existe cai no not-found desta rota, com link de volta para a listagem.
 */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const category = categoryOf(service.category);
  const partner = partners[service.partner];
  const related = [
    ...services.filter((s) => s.category === service.category && s.slug !== service.slug),
    ...services.filter((s) => s.category !== service.category),
  ].slice(0, 4);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: category?.label,
    url: `${siteUrl}/prototipo/servicos/${service.slug}`,
    areaServed: { "@type": "City", name: service.city },
    provider: {
      "@type": "AutoRepair",
      name: service.partner,
      ...(partner
        ? {
            telephone: partner.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: partner.street,
              addressLocality: partner.city,
              addressRegion: partner.state,
              postalCode: partner.postalCode,
              addressCountry: "BR",
            },
          }
        : {}),
    },
    ...(service.price !== null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            price: service.price,
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: service.price,
              priceCurrency: "BRL",
            },
          },
        }
      : {}),
  };

  return (
    <>
      <Detail service={service} category={category} partner={partner} related={related} />
      <script
        type="application/ld+json"
        // Dados estáticos do protótipo: nenhuma entrada do usuário chega aqui.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
    </>
  );
}

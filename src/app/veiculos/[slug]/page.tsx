import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Calendar,
  Camera,
  Check,
  ChevronDown,
  Document,
  Phone,
  Shield,
  WhatsApp,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ArrowLink, Badge, buttonClass } from "@/components/ui";
import { VehicleCard } from "@/components/vehicle-card";
import { VehicleGallery } from "@/components/vehicle-gallery";
import { VehicleLead } from "@/components/vehicle-lead";
import { bodyLabels, bodyOf } from "@/data/body-types";
import { contact } from "@/data/brand";
import { hasRealPhotos, imagesFor } from "@/data/vehicle-images";
import { STOCK_ISSUED_AT, vehicles } from "@/data/vehicles";
import { formatKm, priceLabel } from "@/lib/format";
import {
  siteUrl,
  toLeadVehicle,
  whatsappForVehicle,
  whatsappVisit,
} from "@/lib/site";
import {
  fullName,
  getVehicle,
  maskedPlate,
  relatedVehicles,
  stockRef,
} from "@/lib/stock";

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return {};

  const name = fullName(vehicle);
  const description = `${name}, ${vehicle.year}, ${vehicle.fuel.toLowerCase()}, cor ${vehicle.color.toLowerCase()}, ${formatKm(vehicle.km).toLowerCase()}. ${priceLabel(vehicle.price)} na AutosFlow.`;

  return {
    title: `${name} ${vehicle.year}`,
    description,
    alternates: { canonical: `/veiculos/${vehicle.slug}` },
    openGraph: {
      title: `${name} ${vehicle.year} — AutosFlow`,
      description,
      url: `/veiculos/${vehicle.slug}`,
    },
  };
}

/**
 * Página do veículo.
 *
 * Ordem pensada para a decisão: a galeria primeiro, depois identificação e
 * preço, as ações (interesse, visita, proposta), a ficha, o que é verificado
 * e, por fim, alternativas. No celular, uma barra fixa mantém preço e
 * WhatsApp sempre ao alcance do polegar.
 */
export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const name = fullName(vehicle);
  const related = relatedVehicles(vehicle);
  const ref = stockRef(vehicle);
  const lead = toLeadVehicle(vehicle);
  const gallery = imagesFor(vehicle);
  const realPhotos = hasRealPhotos(vehicle);
  const body = bodyOf(vehicle);
  const interest = whatsappForVehicle(lead);

  const highlights = [
    { label: "Ano", value: vehicle.year },
    {
      label: "Quilometragem",
      value: vehicle.km > 0 ? formatKm(vehicle.km) : "Sob consulta",
    },
    { label: "Combustível", value: vehicle.fuel },
    { label: "Cor", value: vehicle.color },
  ];

  // Linguagem de consumidor: o código interno da tabela fica na tabela.
  const spec = [
    { label: "Marca", value: vehicle.make },
    { label: "Modelo", value: vehicle.model },
    { label: "Versão", value: vehicle.version },
    ...(body ? [{ label: "Tipo", value: bodyLabels[body].label }] : []),
    { label: "Ano / modelo", value: vehicle.year, numeric: true },
    {
      label: "Quilometragem",
      value: vehicle.km > 0 ? formatKm(vehicle.km) : "Sob consulta",
      numeric: true,
    },
    { label: "Combustível", value: vehicle.fuel },
    { label: "Cor", value: vehicle.color },
    ...(vehicle.plate
      ? [{ label: "Placa", value: maskedPlate(vehicle.plate), numeric: true }]
      : []),
    ...(vehicle.origin
      ? [
          {
            label: "Situação",
            value: vehicle.origin === "loja" ? "Veículo da loja" : "Consignado",
          },
        ]
      : []),
    { label: "Referência", value: ref, numeric: true },
  ];

  const transparency = [
    {
      title: "Dados conferem com o registro",
      body: `Ano, quilometragem, cor e valor saem da tabela de estoque de ${STOCK_ISSUED_AT}, publicada para consulta.`,
      done: true,
    },
    {
      title: realPhotos
        ? "Fotos da própria unidade"
        : "Fotos reais sob consulta",
      body: realPhotos
        ? "As imagens desta página são deste carro, não de catálogo."
        : "As imagens são de referência do modelo. Pedimos fotos desta unidade no atendimento.",
      done: realPhotos,
    },
    {
      title: "Laudo cautelar e histórico",
      body: "Disponíveis sob consulta: solicite no atendimento antes de fechar negócio.",
      done: false,
    },
  ];

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    vehicleConfiguration: vehicle.version,
    modelDate: String(vehicle.yearSort),
    color: vehicle.color,
    fuelType: vehicle.fuel,
    mileageFromOdometer:
      vehicle.km > 0
        ? { "@type": "QuantitativeValue", value: vehicle.km, unitCode: "KMT" }
        : undefined,
    image: gallery.map((image) => `${siteUrl}${image.src}`),
    url: `${siteUrl}/veiculos/${vehicle.slug}`,
    offers: {
      "@type": "Offer",
      price: vehicle.price > 0 ? vehicle.price : undefined,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/veiculos/${vehicle.slug}`,
      seller: { "@type": "AutoDealer", name: "AutosFlow" },
    },
  };

  return (
    <div className="pb-24 lg:pb-0">
      <section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="container-editorial">
          <nav aria-label="Trilha" className="mb-5 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-foreground-subtle">
              <li>
                <Link href="/veiculos" className="hover:text-foreground">
                  Estoque
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/veiculos?marca=${encodeURIComponent(vehicle.make)}`}
                  className="hover:text-foreground"
                >
                  {vehicle.make}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-foreground">{vehicle.model}</li>
            </ol>
          </nav>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="-mx-(--spacing-gutter) sm:mx-0 lg:col-span-7 xl:col-span-8">
              <VehicleGallery
                images={gallery}
                alt={name}
                real={realPhotos}
                priority
              />
            </div>

            {/* Painel comercial — fixo ao lado da galeria no desktop */}
            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="flex flex-wrap gap-1.5">
                  {realPhotos ? (
                    <Badge tone="brand">
                      <Camera className="h-3.5 w-3.5" />
                      Fotos da unidade
                    </Badge>
                  ) : null}
                  {vehicle.origin === "consignado" ? (
                    <Badge>Consignado</Badge>
                  ) : null}
                  {body ? <Badge>{bodyLabels[body].label}</Badge> : null}
                </div>

                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground-subtle">
                  {vehicle.make}
                </p>
                <h1 className="mt-1 font-display text-[2rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[2.5rem]">
                  {vehicle.model}
                </h1>
                <p className="mt-1.5 text-lg text-foreground-muted">
                  {vehicle.version}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-2">
                  {highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-control bg-surface-raised px-3.5 py-2.5"
                    >
                      <dt className="text-xs text-foreground-muted">
                        {item.label}
                      </dt>
                      <dd className="tnum mt-0.5 text-[0.9375rem] font-semibold text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 rounded-card border border-border bg-surface p-5 shadow-card sm:p-6">
                  <p className="text-sm text-foreground-subtle">Valor</p>
                  <p className="tnum mt-1 font-display text-[2.5rem] font-bold leading-none tracking-tight text-foreground">
                    {priceLabel(vehicle.price)}
                  </p>

                  <div className="mt-5 flex flex-col gap-2">
                    <a
                      href={interest}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("primary", "lg", "w-full")}
                    >
                      <WhatsApp className="h-4.5 w-4.5" />
                      Tenho interesse
                    </a>
                    <a
                      href={whatsappVisit(lead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("outline", "lg", "w-full")}
                    >
                      <Calendar className="h-4 w-4" />
                      Agendar visita ou test-drive
                    </a>
                  </div>

                  {/* Proposta com entrada, prazo e troca — sob demanda */}
                  <details className="group/proposal mt-4 border-t border-border pt-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                      Montar proposta (entrada, prazo, troca)
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open/proposal:rotate-180" />
                    </summary>
                    <VehicleLead lead={lead} />
                  </details>

                  <a
                    href={`tel:+${contact.phoneE164}`}
                    className="mt-4 flex items-center justify-center gap-2 border-t border-border pt-4 text-sm font-medium text-foreground-muted hover:text-foreground"
                  >
                    <Phone className="h-4 w-4" />
                    Prefere ligar?{" "}
                    <span className="tnum font-semibold">
                      {contact.phoneLabel}
                    </span>
                  </a>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-foreground-subtle">
                  Referência <span className="tnum font-semibold">{ref}</span> —
                  cite este código no atendimento.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Ficha e transparência */}
      <section className="py-16 sm:py-20" aria-labelledby="ficha">
        <div className="container-editorial grid gap-6 lg:grid-cols-12 lg:gap-10">
          <Reveal className="rounded-card border border-border bg-surface p-6 shadow-card sm:p-8 lg:col-span-7 xl:col-span-8">
            <h2
              id="ficha"
              className="font-display text-2xl font-semibold tracking-tight text-foreground"
            >
              Ficha do veículo
            </h2>
            <dl className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {spec.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-3.5"
                >
                  <dt className="text-sm text-foreground-subtle">
                    {item.label}
                  </dt>
                  <dd
                    className={`text-right text-[0.9375rem] font-semibold text-foreground ${item.numeric ? "tnum" : ""}`}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
              Publicamos o que o registro de estoque traz sobre este carro.
              Opcionais e detalhes de conservação são confirmados no
              atendimento.
            </p>
          </Reveal>

          <Reveal
            delay={40}
            className="rounded-card bg-surface-raised p-6 sm:p-8 lg:col-span-5 xl:col-span-4"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent shadow-card">
              <Shield className="h-5.5 w-5.5" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">
              Transparência
            </h2>
            <ul className="mt-5 space-y-4">
              {transparency.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full ${
                      item.done
                        ? "bg-brand text-white"
                        : "border border-border-strong bg-surface text-foreground-subtle"
                    }`}
                  >
                    {item.done ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-foreground-muted">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/tabela-de-precos"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              <Document className="h-4 w-4" />
              Ver na tabela de preços
            </Link>
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section
          className="border-t border-border bg-surface py-16 sm:py-20"
          aria-labelledby="relacionados"
        >
          <div className="container-editorial">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="relacionados"
                className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                Você também pode gostar
              </h2>
              <ArrowLink href="/veiculos">Ver todo o estoque</ArrowLink>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <VehicleCard vehicle={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Barra fixa do celular: preço e WhatsApp sempre à mão */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgb(15_23_42/0.25)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-foreground-subtle">
              {vehicle.model} {vehicle.version}
            </p>
            <p className="tnum font-display text-xl font-bold leading-tight text-foreground">
              {priceLabel(vehicle.price)}
            </p>
          </div>
          <a
            href={interest}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "lg", "flex-none")}
          >
            <WhatsApp className="h-4.5 w-4.5" />
            Tenho interesse
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        // Built from the typed stock record at build time.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
    </div>
  );
}

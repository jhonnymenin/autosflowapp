import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/cta-section";
import { ArrowRight, Calendar, Document, Phone } from "@/components/icons";
import { VehicleCard } from "@/components/vehicle-card";
import { VehicleGallery } from "@/components/vehicle-gallery";
import { VehicleLead } from "@/components/vehicle-lead";
import { Eyebrow } from "@/components/ui";
import { contact } from "@/data/brand";
import { imagesFor } from "@/data/vehicle-images";
import { STOCK_ISSUED_AT, vehicles } from "@/data/vehicles";
import { formatKm, formatPrice } from "@/lib/format";
import { siteUrl, whatsappVisit } from "@/lib/site";
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
  const description = `${name}, ${vehicle.year}, ${vehicle.fuel.toLowerCase()}, cor ${vehicle.color.toLowerCase()}, ${formatKm(vehicle.km).toLowerCase()}. ${formatPrice(vehicle.price)} na AutosFlow.`;

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
  const gallery = imagesFor(vehicle);

  // The hero already states year, mileage, fuel and colour; the sheet carries
  // what it does not, so the page never prints the same figure twice.
  const spec = [
    { label: "Marca", value: vehicle.make },
    { label: "Modelo", value: vehicle.model },
    { label: "Versão", value: vehicle.version },
    { label: "Referência", value: ref, numeric: true },
    { label: "Placa", value: maskedPlate(vehicle.plate), numeric: true },
    {
      label: "Situação",
      value: vehicle.origin === "loja" ? "Veículo da loja" : "Consignado",
    },
    { label: "Descrição em estoque", value: vehicle.sourceName },
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
      price: vehicle.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/veiculos/${vehicle.slug}`,
      seller: { "@type": "AutoDealer", name: "AutosFlow" },
    },
  };

  return (
    <>
      {/* ---------------------------------------------------------------
          Hero. Gallery and price sit side by side so the images are in view
          at the moment the figure is read. The photographs are references for
          the model, not the advertised unit — see data/vehicle-images.ts.
          --------------------------------------------------------------- */}
      <section className="border-b border-border pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pt-48">

        <div className="container-editorial">
          <nav aria-label="Trilha" className="mb-10 text-sm sm:mb-14">
            <ol className="flex flex-wrap items-center gap-2 text-foreground-subtle">
              <li>
                <Link
                  href="/veiculos"
                  className="transition-colors duration-300 hover:text-foreground"
                >
                  Estoque
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/veiculos?marca=${encodeURIComponent(vehicle.make)}`}
                  className="transition-colors duration-300 hover:text-foreground"
                >
                  {vehicle.make}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground-muted">{vehicle.model}</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <Eyebrow>{vehicle.make}</Eyebrow>
            <h1 className="mt-5 text-display-xl font-semibold text-foreground">
              {vehicle.model}
            </h1>
            <p className="mt-4 font-display text-display-sm font-medium tracking-tight text-foreground-muted">
              {vehicle.version}
            </p>
          </div>

          <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <VehicleGallery images={gallery} alt={name} priority />

              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-border pt-8 sm:grid-cols-4">
                {[
                  { label: "Ano", value: vehicle.year },
                  { label: "Quilometragem", value: formatKm(vehicle.km) },
                  { label: "Combustível", value: vehicle.fuel },
                  { label: "Cor", value: vehicle.color },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="text-eyebrow font-medium uppercase text-foreground-subtle">
                      {item.label}
                    </dt>
                    <dd className="tnum mt-2 text-lg font-display font-medium tracking-tight text-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Commercial panel, sticky alongside the gallery on large screens */}
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="border border-border bg-surface p-7 sm:p-9 lg:sticky lg:top-28">
                {vehicle.origin === "consignado" ? (
                  <div className="mb-6 border-l-2 border-brand pl-4">
                    <p className="text-eyebrow font-medium uppercase text-brand-bright">
                      Consignado
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
                      Veículo de um proprietário, anunciado e negociado com
                      intermediação da AutosFlow. A avaliação, a documentação e
                      a entrega seguem o mesmo processo dos veículos da loja.
                    </p>
                  </div>
                ) : null}
                <p className="text-eyebrow font-medium uppercase text-foreground-subtle">
                  Valor
                </p>
                <p className="tnum mt-4 font-display text-display-md font-semibold leading-none tracking-[-0.03em] text-foreground">
                  {formatPrice(vehicle.price)}
                </p>

                <VehicleLead vehicle={vehicle} />

                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href={whatsappVisit(vehicle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-13 items-center justify-center gap-3 border border-border-strong px-6 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-ink-950"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar visita ou test-drive
                  </a>
                  <a
                    href={`tel:+${contact.phoneE164}`}
                    className="inline-flex h-12 items-center justify-center gap-3 text-sm tracking-tight text-foreground-muted transition-colors duration-300 hover:text-foreground"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="tnum">{contact.phoneLabel}</span>
                  </a>
                </div>

                <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-foreground-subtle">
                  Referência <span className="tnum text-foreground-muted">{ref}</span> — cite este
                  código no atendimento. Fotos reais e laudo desta unidade sob
                  consulta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Technical sheet — every field the source document records.
          --------------------------------------------------------------- */}
      <section className="py-section" aria-labelledby="ficha">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Ficha técnica</Eyebrow>
              <h2
                id="ficha"
                className="mt-6 text-display-sm font-semibold text-foreground"
              >
                Tudo o que consta no registro.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
                Publicamos exatamente o que a tabela de estoque de{" "}
                {STOCK_ISSUED_AT} registra sobre este veículo — nada além disso.
                Opcionais, laudo e histórico são confirmados no atendimento.
              </p>
              <a
                href="/documentos/autosflow-tabela-de-precos.pdf"
                className="mt-7 inline-flex items-center gap-2.5 text-sm text-foreground-muted underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
              >
                <Document className="h-4 w-4" />
                Tabela original em PDF
              </a>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="border-t border-border">
                {spec.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-5"
                  >
                    <dt className="text-sm text-foreground-subtle">
                      {item.label}
                    </dt>
                    <dd
                      className={`text-base text-foreground sm:text-right ${item.numeric ? "tnum" : ""}`}
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Related stock */}
      {related.length > 0 ? (
        <section
          className="border-t border-border py-section"
          aria-labelledby="relacionados"
        >
          <div className="container-editorial">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-16">
              <h2
                id="relacionados"
                className="text-display-sm font-semibold text-foreground"
              >
                Outros veículos no estoque
              </h2>
              <Link
                href="/veiculos"
                className="group/link inline-flex shrink-0 items-center gap-3 text-sm font-medium tracking-tight text-foreground-muted transition-colors duration-300 hover:text-brand-bright"
              >
                Ver todo o estoque
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </div>

            <ul className="mt-10 grid gap-x-8 border-t border-border sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
              {related.map((other) => (
                <li key={other.slug} className="border-b border-border">
                  <VehicleCard vehicle={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaSection
        image="/imagens/showroom-traseira.jpg"
        title="Vamos conversar sobre este carro."
      />

      <script
        type="application/ld+json"
        // Built from the typed stock record at build time.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
    </>
  );
}

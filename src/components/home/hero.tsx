import Image from "next/image";
import Link from "next/link";

import { ArrowRight, WhatsApp } from "@/components/icons";
import { brand } from "@/data/brand";
import { vehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import { priceRange } from "@/lib/stock";
import { whatsappSell } from "@/lib/site";

const stats = [
  { label: "Veículos em estoque", value: String(vehicles.length) },
  { label: "A partir de", value: formatPrice(priceRange.min) },
  {
    label: "Marcas representadas",
    value: String(new Set(vehicles.map((vehicle) => vehicle.make)).size),
  },
];

export function Hero() {
  return (
    <section className="relative isolate pt-16 sm:pt-20 lg:flex lg:min-h-[94svh] lg:items-center lg:pt-20">
      {/*
        Two compositions, one DOM.
        Phones get a cinematic letterbox plate that keeps the whole car in
        frame, with the copy resolving beneath it. From `lg` the same plate
        becomes the full-bleed backdrop and the copy sits over it.
      */}
      <div className="relative aspect-16/10 w-full sm:aspect-21/9 lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <Image
          src="/imagens/sedan-estudio.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover object-[52%_40%] lg:object-[66%_56%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/45 lg:hidden" />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(100deg, var(--color-background) 4%, color-mix(in srgb, var(--color-background) 88%, transparent) 32%, transparent 64%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-background to-transparent lg:block" />
      </div>

      <div className="container-editorial relative -mt-14 pb-16 sm:-mt-24 sm:pb-20 lg:mt-0 lg:w-full lg:pb-0">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-brand-bright">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
            {brand.positioning}
          </p>

          <h1 className="mt-5 text-display-xl font-semibold text-foreground sm:mt-8">
            Seu carro no
            <br />
            fluxo certo.
          </h1>

          <p className="text-lead mt-5 max-w-md text-foreground-muted sm:mt-8 sm:max-w-lg">
            Comprar um carro deveria ser uma conquista. Nunca uma preocupação.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href="/veiculos"
              className="group/btn inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-foreground px-7 text-sm font-medium tracking-tight text-ink-950 transition-colors duration-300 hover:bg-white sm:h-14 sm:px-9"
            >
              Ver estoque
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            <a
              href={whatsappSell}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-brand-bright hover:text-brand-bright sm:h-14 sm:px-9"
            >
              <WhatsApp className="h-4.5 w-4.5" />
              Quero vender meu carro
            </a>
          </div>
        </div>

        {/* Stock figures — read straight from the price table. */}
        {/* Phones read these as a list; from `sm` they become a data strip. */}
        <dl className="mt-12 max-w-2xl border-t border-white/12 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-x-8 lg:mt-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-baseline justify-between gap-6 border-b border-white/12 py-3.5 sm:block sm:border-b-0 sm:py-0 sm:pt-6"
            >
              <dt className="text-eyebrow font-medium uppercase text-foreground-subtle">
                {stat.label}
              </dt>
              <dd className="tnum font-display text-data-xl font-semibold text-foreground sm:mt-2">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

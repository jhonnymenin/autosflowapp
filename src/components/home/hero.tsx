import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { imagesFor } from "@/data/vehicle-images";
import { vehicles } from "@/data/vehicles";
import { formatPrice, priceLabel } from "@/lib/format";
import { heroVehicle, priceRange, realPhotoCount } from "@/lib/stock";

import { QuickSearch } from "./quick-search";

/**
 * Abertura da home.
 *
 * Um painel marinho — o contraste dramático fica aqui, e só aqui — com um carro
 * real do estoque, fotografado na loja, ocupando a metade direita. Os dois
 * caminhos do negócio têm o mesmo peso: explorar o estoque ou vender o seu.
 * A busca rápida encosta na base do painel, para quem já sabe o que quer.
 */
export function Hero() {
  const feature = heroVehicle();
  const photo = feature
    ? (imagesFor(feature).find(
        (image) => !image.width || !image.height || image.width > image.height,
      ) ?? imagesFor(feature)[0])
    : undefined;

  return (
    <section aria-labelledby="hero" className="pt-[4.75rem] lg:pt-[5.5rem]">
      <div className="container-editorial">
        <div className="theme-dark relative isolate overflow-hidden rounded-[1.75rem] bg-background lg:min-h-[36rem] lg:rounded-[2rem]">
          {/* Foto: em cima no celular, metade direita no desktop */}
          {photo ? (
            <div className="relative aspect-4/3 w-full sm:aspect-16/9 lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[62%]">
              <Image
                src={photo.src}
                alt={
                  feature
                    ? `${feature.make} ${feature.model} na loja da AutosFlow`
                    : ""
                }
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 60vw, 100vw"
                quality={72}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/30 lg:to-transparent" />
            </div>
          ) : null}

          <div className="relative px-6 pb-8 pt-2 sm:px-10 sm:pb-12 lg:flex lg:min-h-[36rem] lg:w-[54%] lg:flex-col lg:justify-center lg:px-14 lg:py-16 xl:px-16">
            <p className="text-eyebrow font-semibold uppercase text-accent">
              Autoshopping digital · São Paulo
            </p>
            <h1
              id="hero"
              className="mt-4 text-display-lg font-semibold text-foreground"
            >
              Seu carro no fluxo certo.
            </h1>
            <p className="mt-5 max-w-md text-lead text-foreground-muted">
              Encontre o carro ideal ou venda o seu com acompanhamento de ponta
              a ponta — avaliação, negociação e documentação, com transparência
              em cada etapa.
            </p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/veiculos" className={buttonClass("primary", "lg")}>
                Explorar veículos
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
              <Link href="/vender" className={buttonClass("onDark", "lg")}>
                Quero vender meu carro
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                { label: "veículos à venda", value: String(vehicles.length) },
                { label: "a partir de", value: formatPrice(priceRange.min) },
                {
                  label: "com fotos da unidade",
                  value: String(realPhotoCount),
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-xs leading-snug text-foreground-subtle">
                    {item.label}
                  </dt>
                  <dd className="tnum font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* O carro da foto, clicável: a abertura já leva a um anúncio */}
          {feature ? (
            <Link
              href={`/veiculos/${feature.slug}`}
              className="group/feature absolute right-4 top-4 hidden items-center gap-3 rounded-full bg-ink-950/60 py-1.5 pl-4 pr-1.5 text-sm text-white backdrop-blur-md transition-colors hover:bg-ink-950/80 sm:flex lg:right-6 lg:top-6"
            >
              <span>
                <span className="text-white/70">Em destaque · </span>
                {feature.model} {feature.version}
                <span className="tnum ml-2 font-semibold">
                  {priceLabel(feature.price)}
                </span>
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-900 transition-transform duration-300 group-hover/feature:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ) : null}
        </div>

        <QuickSearch />
      </div>
    </section>
  );
}

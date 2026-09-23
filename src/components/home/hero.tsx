import Image from "next/image";
import Link from "next/link";

import { ArrowRight, WhatsApp } from "@/components/icons";
import { brand } from "@/data/brand";
import { vehicles } from "@/data/vehicles";
import { formatPrice } from "@/lib/format";
import { priceRange } from "@/lib/stock";
import { whatsappSell } from "@/lib/site";

const makes = new Set(vehicles.map((vehicle) => vehicle.make)).size;

/**
 * Hero.
 *
 * Deliberadamente curto: a vitrine tem de aparecer quase junto. A busca fica
 * aqui, no primeiro contato, para quem já sabe o que procura — é um
 * formulário GET, então funciona antes mesmo do JavaScript carregar.
 */
export function Hero() {
  return (
    <section className="relative isolate pt-16 sm:pt-20 lg:flex lg:min-h-[74svh] lg:items-center lg:pt-20">
      <div className="relative aspect-16/10 w-full sm:aspect-21/9 lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <Image
          src="/imagens/sedan-estudio.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover object-[52%_40%] lg:object-[74%_56%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/45 lg:hidden" />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(100deg, var(--color-background) 8%, color-mix(in srgb, var(--color-background) 94%, transparent) 38%, color-mix(in srgb, var(--color-background) 55%, transparent) 56%, transparent 74%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-background to-transparent lg:block" />
      </div>

      <div className="container-editorial relative -mt-14 pb-12 sm:-mt-24 sm:pb-16 lg:mt-0 lg:w-full lg:pb-0">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="text-eyebrow font-medium uppercase text-brand-bright">
            {brand.positioning}
          </p>

          <h1 className="mt-5 text-display-lg font-semibold text-foreground sm:mt-6">
            Seu carro no
            <br />
            fluxo certo.
          </h1>

          <p className="mt-5 max-w-md text-lead text-foreground-muted">
            {vehicles.length} veículos selecionados, de {makes} marcas, a partir
            de {formatPrice(priceRange.min)}.
          </p>

          {/* Busca direta — o caminho mais curto até o carro */}
          <form
            action="/veiculos"
            method="get"
            className="mt-7 flex max-w-lg gap-2 sm:mt-8"
          >
            <label htmlFor="busca-hero" className="sr-only">
              Buscar por modelo ou marca
            </label>
            <input
              id="busca-hero"
              name="q"
              type="search"
              placeholder="Buscar por modelo ou marca"
              className="h-13 w-full border border-white/25 bg-ink-950/50 px-4 text-sm text-foreground outline-none backdrop-blur-sm transition-colors duration-300 placeholder:text-foreground-subtle focus:border-brand-bright sm:h-14"
            />
            <button
              type="submit"
              className="h-13 shrink-0 bg-foreground px-6 text-sm font-medium tracking-tight text-ink-950 transition-colors duration-300 hover:bg-white sm:h-14 sm:px-8"
            >
              Buscar
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="/veiculos"
              className="group/link inline-flex items-center gap-2.5 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-brand-bright"
            >
              Ver todo o estoque
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
            <a
              href={whatsappSell}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm tracking-tight text-foreground-muted transition-colors duration-300 hover:text-foreground"
            >
              <WhatsApp className="h-4 w-4" />
              Quero vender meu carro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

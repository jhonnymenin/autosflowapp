import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";
import { bodyOf } from "@/data/body-types";
import { hasRealPhotos, imagesFor } from "@/data/vehicle-images";
import { vehicles } from "@/data/vehicles";
import { bodiesWithCounts, countInBand, priceBands } from "@/lib/stock";

/**
 * Encontre pelo seu perfil.
 *
 * Dois atalhos para quem ainda não tem um modelo em mente: o tipo de carro e
 * quanto quer gastar. Cada tile leva ao estoque já filtrado e mostra quantos
 * carros há ali — nada de atalho que abre uma página vazia.
 */
export function ProfileSection() {
  const bodies = bodiesWithCounts().map((entry) => {
    // A foto do tile é de um carro daquele tipo, com fotos reais se houver.
    const ofType = vehicles.filter((v) => bodyOf(v) === entry.body);
    const pick = ofType.find(hasRealPhotos) ?? ofType[0];
    const cover = pick ? imagesFor(pick)[0] : undefined;
    return { ...entry, cover };
  });

  return (
    <section
      className="border-y border-border bg-surface py-section"
      aria-labelledby="perfil"
    >
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            id="perfil"
            eyebrow="Encontre pelo seu perfil"
            title="Que tipo de carro você procura?"
          />
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {bodies.map((entry, index) => (
            <Reveal as="li" key={entry.body} delay={index * 30}>
              <Link
                href={`/veiculos?carroceria=${entry.body}`}
                className="group/tile relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-card bg-ink-900 p-4 text-white sm:aspect-square sm:p-6"
              >
                {entry.cover ? (
                  <Image
                    src={entry.cover.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    quality={70}
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/tile:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
                <div className="relative flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                      {entry.plural}
                    </p>
                    <p className="tnum mt-1 text-sm text-white/75">
                      {entry.count} {entry.count === 1 ? "carro" : "carros"}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-colors duration-300 group-hover/tile:bg-white group-hover/tile:text-ink-900">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal
          delay={60}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
        >
          <h3 className="text-sm font-semibold text-foreground">
            Ou pelo seu orçamento:
          </h3>
          <div className="-mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 sm:flex-wrap">
              {priceBands.map((band) => (
                <Link
                  key={band.value}
                  href={`/veiculos?preco=${band.value}`}
                  className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-border-strong bg-surface px-4 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground"
                >
                  {band.label}
                  <span className="tnum text-xs text-foreground-subtle">
                    {countInBand("price", band)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

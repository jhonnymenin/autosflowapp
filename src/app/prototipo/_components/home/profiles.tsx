"use client";

/**
 * FE-05 — Encontre pelo seu perfil, como no material de apoio: mantemos os
 * cartões de imagem por tipo de carro e, embaixo, a lista "Mais buscados"
 * (preço, km, ano, câmbio e outros); cada atalho abre o catálogo filtrado.
 */
import { motion } from "motion/react";
import Link from "next/link";

import Image from "@/components/image";

import { ArrowUpRight } from "../icons";
import { FeTag } from "../shell";
import { ease } from "../motion";
import { MediaReveal } from "../ui";

export interface ProfileTile {
  body: string;
  plural: string;
  count: number;
  cover: string;
}

export interface Shortcut {
  label: string;
  href: string;
  count: number;
}

export function Profiles({ tiles, shortcuts }: { tiles: ProfileTile[]; shortcuts: Shortcut[] }) {
  return (
    <section id="perfil" aria-labelledby="perfil-titulo" className="paper relative pb-28 sm:pb-36">
      <FeTag code="FE-05" title="Encontre pelo seu perfil: tags de critérios" className="left-4 -top-6 sm:left-10" />
      <div className="container-p">
        <p className="t-spec text-[var(--blue)]">Encontre pelo seu perfil</p>
        <h2 id="perfil-titulo" className="t-title mt-3 text-[clamp(1.9rem,3.4vw,3.2rem)]">
          Que tipo de carro você procura?
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <li key={tile.body}>
              <Link href={`/veiculos?body=${tile.body}`} data-cursor="Ver" className="group block">
                <MediaReveal delay={i * 0.08} className="aspect-[4/5] rounded-[6px] bg-[var(--paper-3)] sm:aspect-[3/4]">
                  <Image
                    src={tile.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 24vw, 48vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                </MediaReveal>
                <span className="mt-4 flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-[clamp(1.3rem,2vw,1.75rem)] leading-none font-bold tracking-[-0.03em]" style={{ fontStretch: "112%" }}>
                      {tile.plural}
                    </span>
                    <span className="mt-1.5 block text-[15px] text-[var(--ink-mute)]">
                      {tile.count} {tile.count === 1 ? "carro" : "carros"}
                    </span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white transition-[transform,background-color,color] duration-500 group-hover:rotate-45 group-hover:bg-[var(--blue)] group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <h3 className="text-[18px] font-semibold">Mais buscados</h3>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="mt-4 flex flex-wrap gap-2.5"
          >
            {shortcuts.map((shortcut) => (
              <motion.li key={shortcut.label} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
                <Link
                  href={shortcut.href}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white py-2.5 pr-2.5 pl-5 text-[15px] font-semibold transition-colors hover:bg-[var(--ink)] hover:text-white"
                >
                  {shortcut.label}
                  <span className="t-num rounded-full bg-[var(--paper)] px-2.5 py-0.5 text-[13px] text-[var(--ink-mute)] transition-colors group-hover:bg-[var(--signal)] group-hover:text-[var(--ink)]">
                    {shortcut.count}
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

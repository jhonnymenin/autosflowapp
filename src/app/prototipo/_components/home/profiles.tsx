"use client";

/**
 * FE-05 — Encontre pelo seu perfil.
 * Desktop: quatro painéis altos lado a lado; o que recebe o mouse (ou o
 * foco) se abre e mostra a foto inteira, os outros viram faixas com o nome
 * em pé. Celular: blocos empilhados. Embaixo, os "Mais buscados" como placas.
 */
import Link from "next/link";
import { useState } from "react";

import Image from "@/components/image";

import { ArrowUpRight } from "../icons";
import { RevealGroup, RevealItem } from "../motion";
import { FeTag } from "../shell";
import { SectionHead } from "../ui";

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
  const [active, setActive] = useState(0);

  return (
    <section id="perfil" aria-label="Encontre pelo seu perfil" className="night grain section-y relative">
      <FeTag code="FE-05" title="Encontre pelo seu perfil: tags de critérios" className="left-4 top-6 sm:left-10" />
      <div className="container-p relative z-[2]">
        <SectionHead
          tone="night"
          title="Que tipo de carro você procura?"
          lead="Escolha pelo jeito de usar. As contagens são do estoque de hoje, e cada atalho abre o catálogo já filtrado."
        />

        <RevealGroup stagger={0.09} className="mt-14 flex flex-col gap-3 lg:h-[72vh] lg:max-h-[48rem] lg:min-h-[34rem] lg:flex-row">
          {tiles.map((tile, i) => {
            const isActive = active === i;
            return (
              <RevealItem
                key={tile.body}
                className="min-w-0 lg:basis-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ flexGrow: isActive ? 5 : 1 }}
              >
                <Link
                  href={`/veiculos?body=${tile.body}`}
                  data-cursor="Ver"
                  data-active={isActive}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative block h-[64vw] max-h-[28rem] min-h-[17rem] overflow-hidden rounded-[6px] bg-[var(--night-2)] lg:h-full lg:max-h-none"
                >
                  <Image
                    src={tile.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] lg:scale-[1.18] lg:group-data-[active=true]:scale-100"
                  />
                  {/* Véu: escuro nas faixas fechadas, só embaixo na aberta. */}
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgb(5_8_15/0.92)_0%,rgb(5_8_15/0.25)_55%,rgb(5_8_15/0.05)_100%)]" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[rgb(5_8_15/0.55)] opacity-0 transition-opacity duration-700 lg:opacity-100 lg:group-data-[active=true]:opacity-0"
                  />

                  {/* Nome em pé, nas faixas fechadas (desktop). */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 transition-opacity duration-500 lg:block lg:group-data-[active=true]:opacity-0"
                  >
                    <span className="t-num block rotate-180 whitespace-nowrap text-[clamp(1.3rem,1.8vw,1.9rem)] uppercase [writing-mode:vertical-rl]">
                      {tile.plural}
                      <span className="ml-3 text-[var(--signal)]">{tile.count}</span>
                    </span>
                  </span>

                  {/* Conteúdo do painel aberto (sempre visível no celular). */}
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 lg:translate-y-6 lg:opacity-0 lg:group-data-[active=true]:translate-y-0 lg:group-data-[active=true]:opacity-100 lg:group-data-[active=true]:delay-200">
                    <span className="min-w-0">
                      <span className="t-mega block text-[clamp(2.6rem,6.4vw,7.5rem)] text-white">{tile.plural}</span>
                      <span className="mt-3 block text-[17px] text-[var(--on-night-mute)]">
                        <span className="t-num text-white">{tile.count}</span> {tile.count === 1 ? "carro" : "carros"} agora no estoque
                      </span>
                    </span>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-[var(--ink)] transition-[transform,background-color] duration-500 group-hover:rotate-45 group-hover:bg-[var(--signal)]">
                      <ArrowUpRight className="h-6 w-6" />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-20 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
          <h3 className="t-title shrink-0 lg:w-72">Mais buscados</h3>
          <RevealGroup stagger={0.04} className="flex flex-wrap gap-3">
            {shortcuts.map((shortcut) => (
              <RevealItem key={shortcut.label}>
                <Link
                  href={shortcut.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-white/[0.08] py-2.5 pr-2.5 pl-5 text-[16px] font-semibold text-[var(--on-night)] transition-colors duration-300 hover:bg-white hover:text-[var(--ink)]"
                >
                  {shortcut.label}
                  <span className="t-num grid h-8 min-w-8 place-items-center rounded-full bg-white/10 px-2 text-[13px] transition-colors duration-300 group-hover:bg-[var(--signal)] group-hover:text-[var(--ink)]">
                    {shortcut.count}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

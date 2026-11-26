"use client";

/**
 * FE-04 — Destaques compactos com selos e personalização, como no material de
 * apoio: cinco carros por linha, com foto, modelo, versão, ano | km, local e
 * valor; selos de destaque; quem já pesquisou vê carros parecidos (aqui, um
 * interruptor simula esse visitante).
 */
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";

import type { ProtoCar } from "../../_lib/types";
import { ArrowRight, ChevronLeft, ChevronRight } from "../icons";
import { FeTag } from "../shell";
import { ease } from "../motion";
import { CarCard } from "./car-card";

const recentSearches = ["Jeep Compass até 150 mil", "SUV automático"];

export function Showcase({ cars }: { cars: ProtoCar[] }) {
  const [personal, setPersonal] = useState(false);
  const railRef = useRef<HTMLUListElement>(null);
  const switchId = useId();

  const ordered = useMemo(() => {
    if (!personal) return cars;
    const score = (car: ProtoCar) => (car.body === "suv" ? 2 : 0) + (car.gearbox === "Automático" ? 1 : 0) + (car.model === "Compass" ? 3 : 0);
    return [...cars].sort((a, b) => score(b) - score(a));
  }, [cars, personal]);

  const scroll = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (rail) rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="destaques" aria-labelledby="destaques-titulo" className="paper relative scroll-mt-24 pt-10 pb-28 sm:pb-36">
      <FeTag code="FE-04" title="Destaques compactos com selos e personalização" className="left-4 -top-6 sm:left-10" />
      <div className="container-p">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-spec text-[var(--blue)]">{personal ? "Para você" : "Em destaque"}</p>
            <div className="mt-3 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={personal ? "p" : "d"}
                  id="destaques-titulo"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.55, ease }}
                  className="t-title text-[clamp(1.9rem,3.4vw,3.2rem)]"
                >
                  {personal ? "Com base no que você pesquisou" : "Carros selecionados para você"}
                </motion.h2>
              </AnimatePresence>
            </div>
            <AnimatePresence initial={false}>
              {personal && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap items-center gap-2 overflow-hidden pt-4 text-[15px] text-[var(--ink-mute)]"
                >
                  Suas últimas buscas:
                  {recentSearches.map((search) => (
                    <span key={search} className="rounded-full bg-[var(--ink)] px-3 py-1 font-semibold text-white">
                      {search}
                    </span>
                  ))}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor={switchId} className="flex cursor-pointer items-center gap-3 rounded-full bg-[var(--paper-3)] py-2 pr-2 pl-4 text-[14px] font-semibold">
              Simular visitante que já pesquisou
              <button
                id={switchId}
                type="button"
                role="switch"
                aria-checked={personal}
                onClick={() => setPersonal((value) => !value)}
                className={`relative h-7 w-12 rounded-full transition-colors ${personal ? "bg-[var(--blue)]" : "bg-[#c4c4bf]"}`}
              >
                <motion.span className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white" animate={{ x: personal ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
              </button>
            </label>
            <div className="hidden gap-2 sm:flex">
              <button type="button" onClick={() => scroll(-1)} aria-label="Carros anteriores" className="grid h-11 w-11 place-items-center rounded-full bg-white transition-colors hover:bg-[var(--ink)] hover:text-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Próximos carros" className="grid h-11 w-11 place-items-center rounded-full bg-white transition-colors hover:bg-[var(--ink)] hover:text-white">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <LayoutGroup>
          <ul
            ref={railRef}
            className="rail mt-10 auto-cols-[72%] gap-4 pb-2 sm:auto-cols-[44%] md:auto-cols-[31%] lg:auto-cols-[calc((100%-3rem)/4)] xl:auto-cols-[calc((100%-4rem)/5)]"
          >
            {ordered.map((car, i) => (
              <motion.li
                layout
                key={car.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                transition={{ duration: 0.8, delay: Math.min(i, 5) * 0.07, ease, layout: { type: "spring", stiffness: 150, damping: 22 } }}
              >
                <CarCard car={car} />
              </motion.li>
            ))}
          </ul>
        </LayoutGroup>

        <Link href="/veiculos" className="group mt-8 inline-flex items-center gap-1.5 text-[16px] font-semibold text-[var(--blue)]">
          Ver todos os {cars.length} carros <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

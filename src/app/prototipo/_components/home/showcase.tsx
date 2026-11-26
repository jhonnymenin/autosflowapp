"use client";

/**
 * FE-04 — Destaques compactos com selos e personalização.
 * Cinco por linha no desktop. O interruptor simula quem já pesquisou: o
 * título muda e os carros se reorganizam pelo que a pessoa procurou.
 */
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useId, useMemo, useState } from "react";

import type { ProtoCar } from "../../_lib/types";
import { FeTag } from "../shell";
import { ease } from "../motion";
import { PillLink } from "../ui";
import { CarCard } from "./car-card";

const recentSearches = ["SUV automático", "Toyota até R$ 160 mil"];
const VISIBLE = 10;

export function Showcase({ cars }: { cars: ProtoCar[] }) {
  const [personal, setPersonal] = useState(false);
  const switchId = useId();

  const ordered = useMemo(() => {
    if (!personal) return cars;
    const score = (car: ProtoCar) =>
      (car.body === "suv" ? 2 : 0) + (car.gearbox === "Automático" ? 1 : 0) + (car.make === "Toyota" ? 2 : 0);
    return [...cars].sort((a, b) => score(b) - score(a));
  }, [cars, personal]);

  return (
    <section id="destaques" aria-labelledby="destaques-titulo" className="paper section-y relative scroll-mt-24">
      <FeTag code="FE-04" title="Destaques compactos com selos e personalização" className="left-4 top-8 sm:left-10" />
      <div className="container-p">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="relative min-h-[2em] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={personal ? "p" : "d"}
                  id="destaques-titulo"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease }}
                  className="t-display"
                >
                  {personal ? "Do jeito que você procurou." : "Selecionados para você."}
                </motion.h2>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {personal ? (
                <motion.p key="p" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="t-lead mt-6 flex flex-wrap items-center gap-2 text-[var(--ink-mute)]">
                  Pelas suas últimas buscas:
                  {recentSearches.map((search) => (
                    <span key={search} className="rounded-full bg-[var(--ink)] px-3.5 py-1 text-[15px] font-semibold text-white">
                      {search}
                    </span>
                  ))}
                </motion.p>
              ) : (
                <motion.p key="d" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="t-lead mt-6 max-w-2xl text-[var(--ink-mute)]">
                  Cada carro com fotos da própria unidade, ficha conferida e preço na mesa. Passe o mouse na foto para folhear.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <label htmlFor={switchId} className="flex cursor-pointer items-center gap-4 rounded-full bg-[var(--paper-3)] py-2.5 pr-2.5 pl-5 text-[15px] font-semibold">
              Simular quem já pesquisou
              <button
                id={switchId}
                type="button"
                role="switch"
                aria-checked={personal}
                onClick={() => setPersonal((value) => !value)}
                className={`relative h-8 w-14 rounded-full transition-colors ${personal ? "bg-[var(--blue)]" : "bg-[#c9c5bc]"}`}
              >
                <motion.span className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white" animate={{ x: personal ? 24 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
              </button>
            </label>
          </div>
        </div>

        <LayoutGroup>
          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">
            {ordered.slice(0, VISIBLE).map((car, i) => (
              <motion.li
                layout
                key={car.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                transition={{ duration: 0.9, delay: (i % 5) * 0.07, ease, layout: { type: "spring", stiffness: 140, damping: 22 } }}
              >
                <CarCard car={car} />
              </motion.li>
            ))}
          </ul>
        </LayoutGroup>

        <div className="mt-16 flex justify-center">
          <PillLink href="/veiculos" tone="ink">
            Ver todos os {cars.length} carros
          </PillLink>
        </div>
      </div>
    </section>
  );
}

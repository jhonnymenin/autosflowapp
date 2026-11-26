"use client";

/**
 * FE-09 — Selo Verified como banner de separação, como no material de apoio:
 * um banner de largura total, com fundo escuro, entre depoimentos e loja; a
 * lista do que é checado em cada veículo; botão que abre o catálogo com os
 * carros Verified. Sem a palavra "garantia" até o jurídico validar.
 */
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { Mark } from "@/components/logo";

import { Check } from "../icons";
import { FeTag } from "../shell";
import { ease } from "../motion";
import { PillLink } from "../ui";

const checks = ["Laudo cautelar", "Histórico e leilão", "Inspeção mecânica", "Fotos padronizadas"];
const ringText = "VERIFIED · AUTOSFLOW · VERIFIED · AUTOSFLOW · ";

export function Verified() {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();
  const run = seen || !!reduce;

  return (
    <section ref={ref} aria-labelledby="verified-titulo" className="night grain relative overflow-hidden py-16 sm:py-20">
      <FeTag code="FE-09" title="Selo Verified como banner de separação" className="left-4 top-4 sm:left-10" />

      {/* Rastro de luz que cruza o banner quando ele aparece. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 h-[2px] w-[45vw] bg-[linear-gradient(90deg,transparent,var(--blue-glow),#fff)]"
        initial={{ x: "-50vw", opacity: 0 }}
        animate={run && !reduce ? { x: "150vw", opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      />

      <div className="container-p relative z-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex items-center gap-6 lg:col-span-4">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
            animate={run ? { scale: 1, opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease }}
            className="relative grid h-28 w-28 shrink-0 place-items-center"
          >
            <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <path id="verified-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text fill="white" fontSize="14" fontWeight="700" letterSpacing="2">
                <textPath href="#verified-ring" textLength="488" lengthAdjust="spacing">
                  {ringText}
                </textPath>
              </text>
            </svg>
            <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--blue)] text-white">
              <Mark className="h-7 w-auto" />
            </span>
          </motion.div>
          <div>
            <h2 id="verified-titulo" className="text-[clamp(1.6rem,2.4vw,2.25rem)] leading-tight font-bold tracking-[-0.03em]" style={{ fontStretch: "112%" }}>
              Selo Verified AutosFlow
            </h2>
            <p className="mt-2 text-[16px] text-[var(--on-night-mute)]">O que é checado em cada veículo</p>
          </div>
        </div>

        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:col-span-5">
          {checks.map((check, i) => (
            <li key={check} className="flex items-center gap-3 text-[17px] font-semibold">
              <motion.span
                initial={{ scale: 0 }}
                animate={run ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 460, damping: 15, delay: 0.5 + i * 0.18 }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]"
              >
                <Check className="h-4 w-4" />
              </motion.span>
              {check}
            </li>
          ))}
        </ul>

        <div className="lg:col-span-3 lg:justify-self-end">
          <PillLink href="/veiculos" tone="white">
            Ver carros com laudo
          </PillLink>
        </div>
      </div>
    </section>
  );
}

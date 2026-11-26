"use client";

/**
 * Jornadas: para cada persona, seis passos com o ponto de contato no
 * protótipo e uma curva de emoção (da ansiedade à confiança) que se desenha
 * ao aparecer e a cada troca de persona.
 */
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { ArrowUpRight } from "../../_components/icons";
import { WordReveal, ease } from "../../_components/motion";
import { journeys, personas, type PersonaKey } from "./content";

const W = 1200;
const H = 260;
const TOP = 24;
const BOTTOM = 232;

function point(i: number, total: number, emotion: number): [number, number] {
  return [((i + 0.5) / total) * W, BOTTOM - emotion * (BOTTOM - TOP)];
}

/** Catmull-Rom para Bézier: uma curva suave que passa por todos os pontos. */
function smoothPath(points: [number, number][]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export function Journeys() {
  const [key, setKey] = useState<PersonaKey>("comprador");
  const [hover, setHover] = useState<number | null>(null);
  const persona = personas.find((p) => p.key === key)!;
  const steps = journeys[key];
  const points = steps.map((step, i) => point(i, steps.length, step.emotion));
  const line = smoothPath(points);
  const area = `${line} L ${points[points.length - 1][0]} ${H} L ${points[0][0]} ${H} Z`;

  return (
    <section id="jornadas" aria-label="Jornadas" className="paper section-y relative scroll-mt-16">
      <div className="container-p">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <WordReveal as="h2" text="Da desconfiança à chave na mão." className="t-display" />
            <p className="t-lead mt-6 max-w-2xl text-[var(--ink-mute)]">
              Seis passos por pessoa, cada um ligado à tela do protótipo onde ele acontece. A curva mostra como a confiança
              deve subir a cada passo: é a hipótese que os testes de usabilidade vão confirmar ou corrigir.
            </p>
          </div>
        </div>

        {/* Escolha da persona */}
        <div role="tablist" aria-label="Escolha a persona" className="mt-12 flex flex-wrap gap-2">
          {personas.map((p) => {
            const active = p.key === key;
            return (
              <button
                key={p.key}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="jornada-painel"
                onClick={() => {
                  setKey(p.key);
                  setHover(null);
                }}
                className={`relative rounded-full px-5 py-3 text-[16px] font-semibold transition-colors ${active ? "text-white" : "bg-[var(--paper-3)] hover:bg-[#d8d4cb]"}`}
              >
                {active && (
                  <motion.span layoutId="ux-persona" className="absolute inset-0 rounded-full bg-[var(--ink)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">
                  {p.role} <span className={active ? "text-white/60" : "text-[var(--ink-mute)]"}>· {p.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div id="jornada-painel" role="tabpanel" aria-label={`Jornada: ${persona.role}`} className="mt-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={`sketch-${key}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="t-title max-w-4xl"
            >
              {persona.name}: {persona.sketch}
            </motion.p>
          </AnimatePresence>

          <div className="mt-10">
            <div>
              {/* Curva de emoção */}
              <div className="relative h-[15rem] rounded-[6px] bg-[var(--paper-2)] sm:h-[17rem]">
                <span className="absolute top-4 left-4 text-[14px] font-semibold text-[#0c7a4c]">Confiança</span>
                <span className="absolute bottom-4 left-4 text-[14px] font-semibold text-[#b23a2e]">Ansiedade</span>
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
                  <AnimatePresence mode="wait">
                    <motion.g key={key} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
                      <motion.path
                        d={area}
                        fill="var(--blue)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.08 }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                      <motion.path
                        d={line}
                        fill="none"
                        stroke="var(--blue)"
                        strokeWidth={4}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                      />
                    </motion.g>
                  </AnimatePresence>
                </svg>
                {/* Pontos e emoção (HTML, para não deformar com a escala do SVG) */}
                {steps.map((step, i) => {
                  const [x, y] = points[i];
                  const lit = hover === i;
                  return (
                    <motion.span
                      key={`${key}-${i}`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.25 + i * 0.22, ease }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
                    >
                      <span
                        className={`block rounded-full border-[3px] border-[var(--blue)] transition-[width,height,background-color] duration-300 ${
                          lit ? "h-6 w-6 bg-[var(--blue)]" : "h-4 w-4 bg-white"
                        }`}
                      />
                      <span
                        className={`absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-semibold transition-colors duration-300 lg:block ${
                          lit ? "bg-[var(--ink)] text-white" : "bg-white text-[var(--ink)]"
                        }`}
                      >
                        {step.feels}
                      </span>
                    </motion.span>
                  );
                })}
              </div>

              {/* Passos */}
              <AnimatePresence mode="wait">
                <motion.ol
                  key={key}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                  className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                >
                  {steps.map((step, i) => (
                    <motion.li
                      key={step.title}
                      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                      onPointerEnter={() => setHover(i)}
                      onPointerLeave={() => setHover(null)}
                      className={`flex flex-col rounded-[6px] p-4 transition-colors duration-300 ${hover === i ? "bg-[var(--paper-2)]" : ""}`}
                    >
                      <span aria-hidden="true" className="mb-4 block h-1 w-10 rounded-full bg-[var(--blue)]" style={{ opacity: 0.25 + step.emotion * 0.75 }} />
                      <h3 className="text-[18px] leading-snug font-[650] tracking-[-0.02em]">{step.title}</h3>
                      <p className="mt-1 text-[14px] font-semibold text-[#0b46b8] lg:hidden">{step.feels}</p>
                      <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-[var(--ink-mute)]">“{step.thinks}”</p>
                      {step.touch.href ? (
                        <Link
                          href={step.touch.href}
                          data-cursor="Abrir"
                          onFocus={() => setHover(i)}
                          onBlur={() => setHover(null)}
                          className="group mt-4 inline-flex items-start gap-1.5 text-[14px] font-semibold text-[var(--blue)]"
                        >
                          <span className="underline decoration-[var(--blue)]/30 underline-offset-4 group-hover:decoration-[var(--blue)]">{step.touch.label}</span>
                          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:rotate-45" />
                        </Link>
                      ) : (
                        <span className="mt-4 text-[14px] font-semibold text-[var(--ink-mute)]">{step.touch.label}</span>
                      )}
                    </motion.li>
                  ))}
                </motion.ol>
              </AnimatePresence>
            </div>
          </div>
          <p className="mt-6 text-[14px] text-[var(--ink-mute)]">
            Curva ilustrativa da hipótese de experiência, não medida. Os links abrem a tela correspondente do protótipo.
          </p>
        </div>
      </div>
    </section>
  );
}

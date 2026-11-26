"use client";

/**
 * FE-09 — Selo Verified como banner de separação.
 * Um campo inteiro de azul da marca. No desktop a cena fica presa na tela
 * enquanto a rolagem passa uma barra de luz sobre o desenho do carro: a cada
 * ponto checado, o item correspondente acende na lista. No celular, ou com
 * menos movimento, a varredura roda uma vez quando a cena aparece.
 * Sem a palavra "garantia" até o jurídico validar.
 */
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Mark } from "@/components/logo";

import { Check } from "../icons";
import { WordReveal, ease } from "../motion";
import { FeTag } from "../shell";
import { PillLink } from "../ui";
import { CarLineDrawing } from "./b-car";

const checkpoints = [
  { x: 0.25, y: 0.78, align: "center", title: "Laudo cautelar", text: "Estrutura, chassi e pintura avaliados por vistoria independente." },
  { x: 0.44, y: 0.36, align: "center", title: "Histórico e leilão", text: "Documentação, débitos e passagem por leilão consultados." },
  { x: 0.73, y: 0.44, align: "center", title: "Inspeção mecânica", text: "Motor, câmbio, suspensão e parte elétrica conferidos." },
  { x: 0.9, y: 0.52, align: "end", title: "Fotos padronizadas", text: "Fotos da própria unidade, no mesmo padrão, sem retoque." },
] as const;

const ringText = "VERIFIED · AUTOSFLOW · VERIFIED · AUTOSFLOW · ";

function Seal() {
  return (
    <div className="relative grid h-28 w-28 shrink-0 place-items-center sm:h-32 sm:w-32">
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
      <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-[var(--blue)] sm:h-[4.5rem] sm:w-[4.5rem]">
        <Mark className="h-7 w-auto sm:h-8" />
      </span>
    </div>
  );
}

export function Verified() {
  const sectionRef = useRef<HTMLElement>(null);
  const drawingRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pin, setPin] = useState(false);
  const [active, setActive] = useState(0);
  const scan = useMotionValue(0);
  const inView = useInView(drawingRef, { once: true, margin: "0px 0px -20% 0px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setPin(mq.matches && !reduce);
    const frame = requestAnimationFrame(update);
    mq.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", update);
    };
  }, [reduce]);

  // Desktop: a rolagem conduz a varredura.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!pin) return;
    scan.set(Math.min(1, Math.max(0, (v - 0.06) / 0.78)));
  });

  // Celular ou menos movimento: varre uma vez ao aparecer.
  useEffect(() => {
    if (pin || !inView) return;
    const controls = animate(scan, 1, { duration: reduce ? 0 : 2.8, ease: [0.65, 0, 0.35, 1] });
    return () => controls.stop();
  }, [pin, inView, reduce, scan]);

  useMotionValueEvent(scan, "change", (v) => {
    setActive(checkpoints.filter((c) => v >= c.x - 0.01).length);
  });

  const barLeft = useTransform(scan, (v) => `${(v * 100).toFixed(2)}%`);
  const barOpacity = useTransform(scan, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);
  const scannedClip = useTransform(scan, (v) => `inset(0% ${((1 - v) * 100).toFixed(2)}% 0% 0%)`);
  const percent = useTransform(scan, (v) => `${Math.round(v * 100)}%`);

  return (
    <section
      ref={sectionRef}
      aria-label="Selo Verified AutosFlow"
      className={`relative bg-[var(--blue)] text-white ${pin ? "h-[260vh]" : ""}`}
    >
      <div className={pin ? "sticky top-0 flex h-screen items-center overflow-hidden" : "py-24 sm:py-32"}>
        <FeTag code="FE-09" title="Selo Verified como banner de separação" className="left-4 top-20 sm:left-10" />

        <div className="container-p grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------------- O selo e a lista ---------------- */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-5">
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease }}
                className="origin-left scale-90"
              >
                <Seal />
              </motion.div>
              <WordReveal as="h2" text="Selo Verified AutosFlow" className="t-display text-[clamp(2rem,3vw,3.25rem)]" />
            </div>
            <p className="t-lead mt-5 max-w-sm text-white/85">O que é checado em cada veículo antes de entrar na vitrine.</p>

            <ul className="mt-7 flex flex-col gap-3.5">
              {checkpoints.map((c, i) => {
                const lit = i < active;
                return (
                  <motion.li
                    key={c.title}
                    animate={{ opacity: lit ? 1 : 0.42 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex gap-4"
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={{
                        backgroundColor: lit ? "#ffffff" : "rgb(255 255 255 / 0.16)",
                        color: lit ? "#1460f2" : "rgb(255 255 255 / 0)",
                        scale: lit ? 1 : 0.85,
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 18 }}
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
                    >
                      <Check className="h-4 w-4" />
                    </motion.span>
                    <span>
                      <span className="block text-[18px] font-semibold">{c.title}</span>
                      <AnimatePresence initial={false}>
                        {lit && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.45, ease }}
                            className="block overflow-hidden text-[15px] leading-relaxed text-white/80"
                          >
                            {c.text}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8">
              <PillLink href="/veiculos" tone="white">
                Ver carros com laudo
              </PillLink>
            </div>
          </div>

          {/* ---------------- A varredura ---------------- */}
          <div className="lg:col-span-8">
            <div ref={drawingRef} className="relative aspect-[1000/400] w-full">
              {/* Desenho base, apagado */}
              <CarLineDrawing className="absolute inset-0 h-full w-full text-white/30" strokeWidth={2.5} />
              {/* O que já foi checado: traço cheio */}
              <motion.div className="absolute inset-0" style={{ clipPath: scannedClip }}>
                <CarLineDrawing className="h-full w-full text-white" strokeWidth={3} glassFill="rgb(255 255 255 / 0.12)" />
              </motion.div>

              {/* Barra de luz */}
              <motion.span
                aria-hidden="true"
                style={{ left: barLeft, opacity: barOpacity }}
                className="pointer-events-none absolute -top-[8%] -bottom-[8%] w-[3px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_24px_6px_rgb(255_255_255/0.7)]"
              >
                <span className="absolute inset-y-0 right-full w-28 bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.22))]" />
              </motion.span>

              {/* Pontos de checagem */}
              {checkpoints.map((c, i) => (
                <span
                  key={c.title}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
                >
                  <AnimatePresence>
                    {i < active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 520, damping: 14 }}
                        className="relative grid h-9 w-9 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]"
                      >
                        <span className="ping absolute inset-0 rounded-full bg-[var(--signal)]" />
                        <Check className="relative h-5 w-5" />
                        <motion.span
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1, ease }}
                          className={`absolute bottom-full mb-3 hidden rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-[var(--blue)] sm:block ${
                            c.align === "end" ? "right-0" : "left-1/2 -translate-x-1/2"
                          }`}
                        >
                          {c.title}
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 text-white/80">
              <span className="t-spec">
                Varredura <motion.span className="t-num text-white">{percent}</motion.span>
              </span>
              <span className="t-spec">
                <span className="t-num text-white">{active}</span> de {checkpoints.length} checagens
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

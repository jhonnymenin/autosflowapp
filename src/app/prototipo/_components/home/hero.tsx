"use client";

/**
 * FE-01 — Topo. A promessa fica parada ("Seu carro no fluxo certo."), as
 * quatro frentes passam por baixo como portais: cada uma troca o fundo (a
 * Marginal à noite, a chave na mão, a loja, o lava-rápido), a frase e a ação.
 * Passam sozinhas (o carrossel do FE-01); mouse, foco ou toque escolhem.
 */
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { ArrowDownRight, Pause, Play } from "../icons";
import { FeTag, useProto } from "../shell";
import { ease } from "../motion";
import { PillButton, PillLink } from "../ui";

const DURATION = 7500;

export interface HeroFront {
  key: "comprar" | "vender" | "lojista" | "servicos";
  label: string;
  meta: string;
  sentence: string;
  cta: string;
  poster: string;
  video?: string;
  action: { href: string } | { waitlist: "lojista" };
}

export function Hero({ fronts, updatedAt }: { fronts: HeroFront[]; updatedAt: string }) {
  const { openWaitlist } = useProto();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const progress = useMotionValue(0);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const go = useCallback(
    (next: number) => {
      setIndex((next + fronts.length) % fronts.length);
      progress.set(0);
    },
    [fronts.length, progress],
  );

  const stopped = paused || hover || !!reduce;
  useAnimationFrame((_, delta) => {
    if (stopped || document.hidden) return;
    const next = progress.get() + delta / DURATION;
    if (next >= 1) go(index + 1);
    else progress.set(next);
  });

  const front = fronts[index];

  return (
    <section
      ref={ref}
      aria-roledescription="carrossel"
      aria-label="As quatro frentes da AutosFlow"
      className="night grain relative isolate flex min-h-[max(44rem,100svh)] flex-col overflow-hidden"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(index + 1);
        if (event.key === "ArrowLeft") go(index - 1);
      }}
    >
      <FeTag code="FE-01" title="Carrossel institucional no topo" phase="Fase 1 + 2" className="left-4 top-[5.5rem] sm:left-10" />

      {/* Fundo de cada frente. */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale: mediaScale }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={front.key}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 1.2, ease }, scale: { duration: 9, ease: "linear" } } }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease } }}
          >
            {front.video && !reduce ? (
              <video
                className="h-full w-full object-cover"
                src={front.video}
                poster={front.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- fundo decorativo já otimizado
              <img src={front.poster} alt="" className="h-full w-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[rgb(5_8_15/0.35)]" />
        <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgb(5_8_15/0.85),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(0deg,rgb(5_8_15/0.97)_8%,rgb(5_8_15/0.55)_55%,transparent)]" />
      </motion.div>

      <motion.div style={{ y: titleY, opacity: fade }} className="container-p relative z-10 flex flex-1 flex-col pt-[8.5rem] sm:pt-[9.5rem]">
        {/* Estoque ao vivo: prova real logo no topo. */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4, ease }}
          className="flex items-center gap-2.5 text-[14px] font-medium text-[var(--on-night-mute)]"
        >
          <span className="relative grid h-2.5 w-2.5 place-items-center">
            <span className="ping absolute h-2.5 w-2.5 rounded-full bg-[#3ddc84]" />
            <span className="h-2 w-2 rounded-full bg-[#3ddc84]" />
          </span>
          Estoque atualizado em {updatedAt} · Ipiranga, São Paulo
        </motion.p>

        <h1 className="t-mega mt-6 text-[clamp(2.5rem,9.4vw,10.5rem)]" aria-label="Seu carro no fluxo certo.">
          {[
            { lines: ["Seu carro", "no fluxo", "certo."], cls: "sm:hidden" },
            { lines: ["Seu carro no", "fluxo certo."], cls: "hidden sm:block" },
          ].map((variant) => (
            <span key={variant.cls} aria-hidden="true" className={variant.cls}>
              {variant.lines.map((line, li) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.2, delay: 1.9 + li * 0.12, ease }}
                  >
                    {line.split(" ").map((word, wi, words) => (
                      <span key={wi} className={word === "fluxo" ? "text-[var(--blue-glow)]" : undefined}>
                        {word}
                        {wi < words.length - 1 ? " " : ""}
                      </span>
                    ))}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="mt-8 grid flex-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={front.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease }}
              >
                <p className="t-lead max-w-xl text-[var(--on-night)]">{front.sentence}</p>
                <div className="mt-7">
                  {"href" in front.action ? (
                    <PillLink href={front.action.href} tone="white">
                      {front.cta}
                    </PillLink>
                  ) : (
                    <PillButton tone="white" onClick={() => openWaitlist("lojista")}>
                      {front.cta}
                    </PillButton>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Portais: as quatro frentes, com o tempo de cada uma. */}
      <div
        className="container-p relative z-10 pb-8 sm:pb-10"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <div className="flex items-end gap-4">
          <div role="tablist" aria-label="Escolha a frente" className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-6">
            {fronts.map((item, i) => {
              const active = i === index;
              return (
                <motion.button
                  key={item.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => go(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && i !== index && go(i)}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 + i * 0.08, ease }}
                  className="group flex flex-col gap-3 text-left"
                >
                  <span className="relative h-[2px] overflow-hidden rounded-full bg-white/20">
                    {active ? (
                      <motion.span className="absolute inset-0 origin-left bg-[linear-gradient(90deg,var(--blue-glow),#fff)]" style={{ scaleX: progress }} />
                    ) : null}
                  </span>
                  <span className={`flex items-center justify-between gap-2 transition-colors ${active ? "text-white" : "text-white/55 group-hover:text-white/85"}`}>
                    <span className="text-[clamp(1.25rem,2vw,1.75rem)] leading-none font-bold tracking-[-0.02em]" style={{ fontStretch: "112%" }}>
                      {item.label}
                    </span>
                    <ArrowDownRight
                      className={`h-5 w-5 shrink-0 transition-transform duration-500 ${active ? "-rotate-90 text-[var(--signal)]" : "group-hover:-rotate-45"}`}
                    />
                  </span>
                  <span className={`text-[13.5px] transition-colors ${active ? "text-[var(--on-night-mute)]" : "text-white/35"}`}>{item.meta}</span>
                </motion.button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Retomar a troca das frentes" : "Pausar a troca das frentes"}
            className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:grid"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Link href="#busca" aria-label="Ir para a busca" className="sr-only focus:not-sr-only">
        Ir para a busca
      </Link>
    </section>
  );
}

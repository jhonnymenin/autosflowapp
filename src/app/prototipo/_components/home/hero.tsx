"use client";

/**
 * FE-01 — Carrossel institucional no topo, como no material de apoio: três
 * banners (vender, lojista, serviços) que passam sozinhos; o mouse pausa, no
 * celular dá pra arrastar, setas e bolinhas navegam e há o botão "Pausar".
 * Os banners vêm de `_data/banners.ts`.
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
import { useCallback, useRef, useState } from "react";

import { banners } from "../../_data/banners";
import { ChevronLeft, ChevronRight } from "../icons";
import { FeTag, useProto } from "../shell";
import { WordReveal, ease } from "../motion";
import { PillButton, PillLink } from "../ui";

const DURATION = 7000;

export function Hero() {
  const { openWaitlist } = useProto();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const progress = useMotionValue(0);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const go = useCallback(
    (next: number) => {
      setIndex((next + banners.length) % banners.length);
      progress.set(0);
    },
    [progress],
  );

  const stopped = paused || hover || !!reduce;
  useAnimationFrame((_, delta) => {
    if (stopped || document.hidden) return;
    const next = progress.get() + delta / DURATION;
    if (next >= 1) go(index + 1);
    else progress.set(next);
  });

  const banner = banners[index];

  return (
    <section
      ref={ref}
      aria-roledescription="carrossel"
      aria-label="Destaques institucionais"
      className="night grain relative isolate flex min-h-[clamp(40rem,94svh,58rem)] flex-col overflow-hidden"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(index + 1);
        if (event.key === "ArrowLeft") go(index - 1);
      }}
    >
      <FeTag code="FE-01" title="Carrossel institucional no topo" phase="Fase 1 + 2" className="left-4 top-[5.5rem] sm:left-10" />

      {/* Fundo de cada banner: vídeo com pôster, zoom lento e parallax. */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale: mediaScale }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={banner.key}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 1.1, ease }, scale: { duration: 8, ease: "linear" } } }}
            exit={{ opacity: 0, transition: { duration: 1.1, ease } }}
          >
            {banner.video && !reduce ? (
              <video className="h-full w-full object-cover" src={banner.video} poster={banner.poster} autoPlay muted loop playsInline aria-hidden="true" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- fundo decorativo já otimizado
              <img src={banner.poster} alt="" className="h-full w-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(5_8_15/0.92)_0%,rgb(5_8_15/0.65)_40%,rgb(5_8_15/0.2)_75%,rgb(5_8_15/0.1)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgb(5_8_15/0.8),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgb(5_8_15/0.95),transparent)]" />
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -70) go(index + 1);
          if (info.offset.x > 70) go(index - 1);
        }}
        style={{ y: contentY }}
        className="container-p relative z-10 flex flex-1 touch-pan-y flex-col justify-center pt-[8rem] pb-52 sm:pb-56"
      >
        <AnimatePresence mode="wait">
          <motion.div key={banner.key} className="max-w-[62rem]" exit={{ opacity: 0, y: -24, transition: { duration: 0.35, ease } }}>
            <motion.p
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="t-spec flex items-center gap-2.5 text-[13px] text-[var(--blue-glow)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--blue-glow)]" />
              {banner.label}
            </motion.p>
            <WordReveal as="h1" inView={false} delay={0.05} text={banner.title} className="t-display mt-5 text-[clamp(2.5rem,5.6vw,6rem)]" />
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              className="t-lead mt-6 max-w-xl text-[var(--on-night-mute)]"
            >
              {banner.text}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="mt-9"
            >
              {"href" in banner.action ? (
                <PillLink href={banner.action.href} tone="white">
                  {banner.cta}
                </PillLink>
              ) : (
                <PillButton tone="white" onClick={() => openWaitlist("lojista")}>
                  {banner.cta}
                </PillButton>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controles: setas, bolinhas com o tempo de cada banner e "Pausar". */}
      <div className="container-p absolute inset-x-0 bottom-36 z-10 sm:bottom-40">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Banner anterior"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-[var(--ink)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div role="tablist" aria-label="Escolha o banner" className="flex items-center gap-2">
            {banners.map((item, i) => (
              <button key={item.key} role="tab" aria-selected={i === index} aria-label={item.label} onClick={() => go(i)} className="relative h-11 w-12 sm:w-16">
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                  {i === index && <motion.span className="absolute inset-0 origin-left rounded-full bg-white" style={{ scaleX: progress }} />}
                  {i < index && <span className="absolute inset-0 rounded-full bg-white/60" />}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Próximo banner"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-[var(--ink)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="ml-1 rounded-full bg-white/10 px-4 py-2.5 text-[14px] font-semibold transition-colors hover:bg-white/20"
          >
            {paused ? "Retomar" : "Pausar"}
          </button>
          {"waitlist" in banner.action && (
            <span className="ml-auto hidden text-[14px] text-[var(--on-night-mute)] md:block">Fase 2 · por enquanto, lista de espera</span>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

/**
 * FE-04 (destaque) — A vitrine. Os carros de verdade, recortados das fotos da
 * própria unidade (fundo removido), entram no palco como quem chega dirigindo
 * e freia. Arrastar, setas do teclado, botões e miniaturas trocam o carro.
 */
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { badgeLabels, type ProtoCar } from "../../_lib/types";
import { ChevronLeft, ChevronRight } from "../icons";
import { FeTag, useProto } from "../shell";
import { WordReveal, ease } from "../motion";
import { PillLink } from "../ui";

export interface StageCar {
  car: ProtoCar;
  cutout: { src: string; width: number; height: number };
}

const AUTOPLAY = 6500;

export function Showroom({ items }: { items: StageCar[] }) {
  const { toast } = useProto();
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  const go = useCallback(
    (next: number, direction: 1 | -1) => setState([(next + items.length) % items.length, direction]),
    [items.length],
  );

  useEffect(() => {
    if (reduce || hover || !inView) return;
    const timer = window.setTimeout(() => go(index + 1, 1), AUTOPLAY);
    return () => window.clearTimeout(timer);
  }, [index, hover, inView, reduce, go]);

  const { car, cutout } = items[index];
  const specs = [
    ["Ano", car.year],
    ["Km", car.kmLabel],
    ["Câmbio", car.gearbox],
    ["Combustível", car.fuel],
  ];

  return (
    <section
      ref={ref}
      id="vitrine"
      aria-roledescription="carrossel"
      aria-label="A vitrine: carros do estoque"
      className="night grain relative scroll-mt-0 overflow-hidden pt-24 pb-14 sm:pt-32"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(index + 1, 1);
        if (event.key === "ArrowLeft") go(index - 1, -1);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <FeTag code="Extra" title="Proposta fora do material de apoio" status="Proposta" className="left-4 top-6 sm:left-10" />

      <div className="container-p relative z-10 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <WordReveal as="h2" text="A vitrine." className="t-display" />
          <p className="t-lead mt-5 max-w-xl text-[var(--on-night-mute)]">
            Carros de verdade, recortados das fotos da própria unidade. Arraste para trocar de carro.
          </p>
        </div>
        <div className="flex items-center gap-3 lg:col-span-5 lg:justify-end">
          <span className="t-num mr-2 text-[18px] text-[var(--on-night-mute)]">
            <span className="text-white">{String(index + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => go(index - 1, -1)}
            aria-label="Carro anterior"
            className="grid h-14 w-14 place-items-center rounded-full bg-white/[0.08] transition-colors hover:bg-white hover:text-[var(--ink)]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1, 1)}
            aria-label="Próximo carro"
            className="grid h-14 w-14 place-items-center rounded-full bg-white text-[var(--ink)] transition-colors hover:bg-[var(--signal)]"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Palco */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) go(index + 1, 1);
          if (info.offset.x > 80) go(index - 1, -1);
        }}
        data-cursor="Arraste"
        className="relative mt-4 h-[clamp(20rem,46vw,40rem)] touch-pan-y select-none"
      >
        {/* Nome do modelo, gigante, atrás do carro. */}
        <AnimatePresence initial={false} custom={dir}>
          <motion.p
            key={`name-${car.slug}`}
            aria-hidden="true"
            custom={dir}
            initial={{ x: `${dir * 30}%`, opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: `${-dir * 30}%`, opacity: 0 }}
            transition={{ duration: 1.1, ease }}
            style={{ color: "transparent", WebkitTextStroke: "1.5px rgb(255 255 255 / 0.32)" }}
            className="t-mega pointer-events-none absolute inset-x-0 top-[6%] text-center text-[clamp(5rem,19vw,22rem)] whitespace-nowrap"
          >
            {car.model}
          </motion.p>
        </AnimatePresence>

        {/* Luz do chão e linha do palco. */}
        <div aria-hidden="true" className="absolute inset-x-[8%] bottom-[9%] h-[30%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(77_141_255/0.28),transparent_65%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[14%] h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.25),transparent)]" />

        {/* Rastro de luz que cruza o palco a cada troca. */}
        <AnimatePresence>
          <motion.span
            key={`streak-${car.slug}`}
            aria-hidden="true"
            initial={{ x: dir > 0 ? "110vw" : "-60vw", opacity: 0 }}
            animate={{ x: dir > 0 ? "-60vw" : "110vw", opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="pointer-events-none absolute bottom-[22%] left-0 h-[3px] w-[50vw] bg-[linear-gradient(90deg,transparent,#fff,var(--blue-glow),transparent)]"
          />
        </AnimatePresence>

        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={car.slug}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { x: `${dir * 70}%`, opacity: 0, filter: "blur(14px)" }}
            animate={reduce ? { opacity: 1 } : { x: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { x: `${-dir * 70}%`, opacity: 0, filter: "blur(14px)" }}
            transition={{ x: { type: "spring", stiffness: 70, damping: 17, mass: 1.1 }, opacity: { duration: 0.5 }, filter: { duration: 0.6 } }}
            className="absolute inset-x-0 bottom-[10%] mx-auto flex w-[min(92vw,62rem)] justify-center"
          >
            <motion.div
              className="relative w-full"
              initial={{ y: 0 }}
              animate={reduce ? undefined : { y: [0, 5, -2, 0] }}
              transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- recorte PNG/WebP com transparência */}
              <img
                src={cutout.src}
                width={cutout.width}
                height={cutout.height}
                alt={`${car.make} ${car.model} ${car.version}, ${car.color.toLowerCase()}`}
                draggable={false}
                className="relative z-10 mx-auto h-auto max-h-[clamp(16rem,38vw,33rem)] w-auto drop-shadow-[0_40px_40px_rgb(0_0_0/0.55)]"
              />
              {/* Reflexo no piso. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- reflexo decorativo */}
              <img
                src={cutout.src}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute top-full left-1/2 mx-auto h-auto max-h-[clamp(16rem,38vw,33rem)] w-auto -translate-x-1/2 -scale-y-100 opacity-[0.16] [mask-image:linear-gradient(to_top,#000,transparent_35%)]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Ficha do carro */}
      <div className="container-p relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${car.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease }}
              className="lg:col-span-7"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="t-spec text-[var(--on-night-mute)]">{car.make}</span>
                {car.badges.slice(0, 2).map((badge) => (
                  <span key={badge} className={`t-spec rounded-full px-2.5 py-1 ${badge === "verified" ? "bg-[var(--blue)] text-white" : "bg-white/10 text-white"}`}>
                    {badgeLabels[badge]}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-[clamp(2rem,3.6vw,3.6rem)] leading-[0.95] font-bold tracking-[-0.035em]" style={{ fontStretch: "112%" }}>
                {car.model} <span className="font-normal text-[var(--on-night-mute)]">{car.version}</span>
              </h3>
              <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
                {specs.map(([label, value]) => (
                  <div key={label}>
                    <dt className="t-spec text-[var(--on-night-mute)]">{label}</dt>
                    <dd className="mt-1.5 text-[17px] font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>
          <div className="lg:col-span-5 lg:text-right">
            <div className="h-[clamp(2.8rem,5vw,4.8rem)] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={`price-${car.slug}`}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.7, ease }}
                  className="t-num text-[clamp(2.6rem,5vw,4.8rem)] leading-none"
                >
                  {car.priceLabel}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 lg:justify-end">
              <button
                type="button"
                onClick={() => toast(`Test-drive do ${car.model}: escolhe o dia e a gente confirma no WhatsApp.`)}
                className="rounded-full bg-white/[0.08] px-6 py-4 text-[16px] font-semibold transition-colors hover:bg-white/[0.16]"
              >
                Agendar test-drive
              </button>
              <PillLink href={`/veiculos/${car.slug}`} tone="white" cursor="Ver">
                Ver este carro
              </PillLink>
            </div>
          </div>
        </div>

        {/* Miniaturas */}
        <div role="tablist" aria-label="Escolha o carro" className="rail mt-12 auto-cols-[38%] gap-3 sm:auto-cols-[24%] lg:grid lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-6">
          {items.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.car.slug}
                role="tab"
                aria-selected={active}
                onClick={() => go(i, i > index ? 1 : -1)}
                className="group relative flex flex-col items-center gap-2 rounded-[10px] px-2 pt-3 pb-4 transition-colors hover:bg-white/[0.05]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- miniatura do recorte */}
                <img
                  src={item.cutout.src}
                  alt=""
                  className={`h-14 w-auto object-contain transition-[transform,opacity] duration-500 sm:h-16 ${active ? "scale-105 opacity-100" : "opacity-45 group-hover:opacity-80"}`}
                />
                <span className={`text-[14px] font-semibold ${active ? "text-white" : "text-white/50"}`}>{item.car.model}</span>
                {active && (
                  <motion.span layoutId="stage-active" className="absolute inset-x-6 bottom-0 h-[3px] rounded-full bg-[var(--signal)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

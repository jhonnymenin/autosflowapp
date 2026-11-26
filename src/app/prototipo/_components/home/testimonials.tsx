"use client";

/**
 * FE-08 — Depoimentos.
 * Um depoimento por vez, grande, entrando palavra por palavra, com quem
 * escreveu e o carro que comprou. Embaixo, as primeiras frases de todos
 * passando devagar: a sensação de muita gente falando bem.
 * Só depoimentos reais e autorizados (data/testimonials.ts); sem foto
 * ainda, o avatar usa as iniciais.
 */
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Fragment, useCallback, useState } from "react";

import type { Testimonial } from "@/data/testimonials";

import { Pause, Play } from "../icons";
import { ease } from "../motion";
import { FeTag } from "../shell";
import { SectionHead } from "../ui";

const DURATION = 7500;
const tones = [
  "bg-[var(--blue)] text-white",
  "bg-[var(--ink)] text-white",
  "bg-[var(--signal)] text-[var(--ink)]",
  "bg-[#0f7a40] text-white",
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ""}`.toUpperCase();
}

function firstSentence(quote: string) {
  const match = quote.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : quote).trim();
}

const RING = 2 * Math.PI * 26;

function ProgressRing({ progress }: { progress: MotionValue<number> }) {
  const offset = useTransform(progress, (v) => RING * (1 - v));
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-90">
      <circle cx="30" cy="30" r="26" fill="none" stroke="rgb(11 15 23 / 0.12)" strokeWidth="2.5" />
      <motion.circle
        cx="30"
        cy="30"
        r="26"
        fill="none"
        stroke="var(--blue)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={RING}
        style={{ strokeDashoffset: offset }}
      />
    </svg>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const progress = useMotionValue(0);

  const go = useCallback(
    (next: number) => {
      setIndex((next + items.length) % Math.max(items.length, 1));
      progress.set(0);
    },
    [items.length, progress],
  );

  useAnimationFrame((_, delta) => {
    if (paused || hover || reduce || items.length < 2 || document.hidden) return;
    const next = progress.get() + delta / DURATION;
    if (next >= 1) go(index + 1);
    else progress.set(next);
  });

  if (items.length === 0) return null;

  const item = items[index];
  const words = item.quote.split(" ");
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <section id="depoimentos" aria-label="Depoimentos de clientes" className="paper section-y relative overflow-hidden">
      <FeTag code="FE-08" title="Depoimentos em carrossel com foto" className="left-4 top-6 sm:left-10" />
      <div className="container-p">
        <SectionHead
          title="Quem comprou, conta."
          lead={`${items.length} depoimentos enviados por clientes pelo WhatsApp, publicados com autorização. Do jeito que cada um escreveu.`}
          action={
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="inline-flex items-center gap-2.5 rounded-full bg-[var(--paper-3)] px-5 py-3 text-[15px] font-semibold transition-colors hover:bg-[var(--ink)] hover:text-white"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              {paused ? "Retomar" : "Pausar"}
            </button>
          }
        />

        <div
          className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-10"
          onPointerEnter={(event) => event.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <svg viewBox="0 0 64 48" aria-hidden="true" className="h-12 w-16 text-[var(--blue)] lg:col-span-1 lg:h-16 lg:w-20">
            <path
              fill="currentColor"
              d="M0 48V28C0 12 8 3 24 0l2.8 6.4C18 9.2 14.4 14.8 14 22h12v26H0Zm36 0V28C36 12 44 3 60 0l2.8 6.4C54 9.2 50.4 14.8 50 22h12v26H36Z"
            />
          </svg>

          <figure className="min-h-[26rem] lg:col-span-10 lg:min-h-[23rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={index} exit={{ opacity: 0, y: -18, transition: { duration: 0.35, ease } }}>
                <motion.blockquote
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.016 } } }}
                  className="text-[clamp(1.55rem,2.9vw,3rem)] leading-[1.16] font-[620] tracking-[-0.028em] text-[var(--ink)]"
                >
                  {words.map((word, i) => (
                    <Fragment key={`${word}-${i}`}>
                      <motion.span
                        className="inline-block"
                        variants={{
                          hidden: { opacity: 0, y: "0.35em", filter: "blur(6px)" },
                          show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 0.6, ease } },
                        }}
                      >
                        {word}
                      </motion.span>{" "}
                    </Fragment>
                  ))}
                </motion.blockquote>
                <motion.figcaption
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease }}
                  className="mt-10 flex items-center gap-4"
                >
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-[17px] font-bold ${tones[index % tones.length]}`}>
                    {initials(item.author)}
                  </span>
                  <span>
                    <span className="block text-[18px] font-semibold">{item.author}</span>
                    {item.context && <span className="block text-[16px] text-[var(--ink-mute)]">{item.context}</span>}
                  </span>
                </motion.figcaption>
              </motion.div>
            </AnimatePresence>
          </figure>
        </div>

        <div role="group" aria-label="Escolha o depoimento" className="mt-12 flex flex-wrap items-center gap-2 lg:ml-[calc(100%/12)]">
          {items.map((testimonial, i) => {
            const isActive = i === index;
            return (
              <button
                key={testimonial.author}
                type="button"
                aria-pressed={isActive}
                aria-label={`Depoimento de ${testimonial.author}`}
                onClick={() => go(i)}
                className="relative grid h-[60px] w-[60px] place-items-center rounded-full"
              >
                {isActive && <ProgressRing progress={progress} />}
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full text-[14px] font-bold transition-[transform,opacity] duration-300 ${tones[i % tones.length]} ${
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-45 hover:scale-100 hover:opacity-100"
                  }`}
                >
                  {initials(testimonial.author)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="marquee-wrap marquee-mask mt-20 flex flex-col gap-3" data-paused={paused}>
        {rows.map((row, r) => (
          <div key={r} className="marquee" data-reverse={r === 1} style={{ ["--marquee-duration" as string]: `${110 + r * 25}s` }}>
            {[...row, ...row].map((testimonial, i) => (
              <p
                key={`${testimonial.author}-${i}`}
                className="mx-1.5 flex shrink-0 items-center gap-3 rounded-full bg-[var(--paper-2)] py-2.5 pr-6 pl-2.5 text-[16px]"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12.5px] font-bold ${tones[(i + r) % tones.length]}`}>
                  {initials(testimonial.author)}
                </span>
                <span className="font-semibold">“{firstSentence(testimonial.quote)}”</span>
                <span className="text-[var(--ink-mute)]">{testimonial.author.split(" ")[0]}</span>
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

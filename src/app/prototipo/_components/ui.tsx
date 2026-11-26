"use client";

/**
 * Peças da v2 "Fluxo" (ver DESIGN.md): botões pílula com seta, revelação de
 * mídia por cortina, odômetro, letreiro que inclina com a velocidade da
 * rolagem e cabeçalho de seção.
 */
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { ArrowRight } from "./icons";
import { Magnetic, WordReveal, ease } from "./motion";

/* -------------------------------------------------------------------------
   Botões
   ---------------------------------------------------------------------- */

type Tone = "blue" | "white" | "ink" | "ghost-night" | "ghost-paper" | "signal";

const tones: Record<Tone, { shell: string; dot: string }> = {
  blue: { shell: "bg-[var(--blue)] text-white", dot: "bg-white text-[var(--blue)]" },
  white: { shell: "bg-white text-[var(--ink)]", dot: "bg-[var(--blue)] text-white" },
  ink: { shell: "bg-[var(--ink)] text-white", dot: "bg-white text-[var(--ink)]" },
  signal: { shell: "bg-[var(--signal)] text-[var(--ink)]", dot: "bg-[var(--ink)] text-[var(--signal)]" },
  "ghost-night": { shell: "bg-white/[0.08] text-white hover:bg-white/[0.14]", dot: "bg-white text-[var(--ink)]" },
  "ghost-paper": { shell: "bg-[var(--paper-3)] text-[var(--ink)] hover:bg-[#d8d4cb]", dot: "bg-[var(--ink)] text-white" },
};

function PillInner({ children, tone, size }: { children: React.ReactNode; tone: Tone; size: "md" | "lg" }) {
  return (
    <>
      <span className={`relative ${size === "lg" ? "pl-7 text-[17px]" : "pl-5 text-[15px]"} font-semibold`}>{children}</span>
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${tones[tone].dot} ${
          size === "lg" ? "h-11 w-11" : "h-9 w-9"
        }`}
      >
        <ArrowRight className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]" />
        <ArrowRight className="absolute h-5 w-5 -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      </span>
    </>
  );
}

const pillClass = (tone: Tone, size: "md" | "lg") =>
  `group inline-flex items-center gap-4 rounded-full ${size === "lg" ? "py-2 pr-2" : "py-1.5 pr-1.5"} transition-colors duration-300 ${tones[tone].shell}`;

export function PillLink({
  href,
  children,
  tone = "blue",
  size = "lg",
  magnetic = true,
  external,
  cursor,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  size?: "md" | "lg";
  magnetic?: boolean;
  external?: boolean;
  cursor?: string;
}) {
  const link = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={pillClass(tone, size)} data-cursor={cursor}>
      <PillInner tone={tone} size={size}>{children}</PillInner>
    </a>
  ) : (
    <Link href={href} className={pillClass(tone, size)} data-cursor={cursor}>
      <PillInner tone={tone} size={size}>{children}</PillInner>
    </Link>
  );
  return magnetic ? <Magnetic strength={0.18}>{link}</Magnetic> : link;
}

export function PillButton({
  children,
  tone = "blue",
  size = "lg",
  magnetic = true,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; size?: "md" | "lg"; magnetic?: boolean }) {
  const button = (
    <button type="button" {...rest} className={`${pillClass(tone, size)} ${rest.className ?? ""}`}>
      <PillInner tone={tone} size={size}>{children}</PillInner>
    </button>
  );
  return magnetic ? <Magnetic strength={0.18}>{button}</Magnetic> : button;
}

/* -------------------------------------------------------------------------
   Mídia que entra por cortina
   ---------------------------------------------------------------------- */

export function MediaReveal({
  children,
  className,
  delay = 0,
  parallax = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Deslocamento em % durante a rolagem (0 = sem parallax). */
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.3, delay, ease }}
    >
      <motion.div
        className="absolute inset-[-8%]"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay, ease }}
        style={parallax ? { y } : undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   Odômetro: cada dígito é um rolo
   ---------------------------------------------------------------------- */

function Digit({ value, run, delay }: { value: number; run: boolean; delay: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-baseline leading-none">
      <motion.span
        className="flex flex-col"
        initial={{ y: "0%" }}
        animate={run ? { y: `-${(value + 10) * 5}%` } : { y: "0%" }}
        transition={{ duration: 1.8 + delay, delay: delay * 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: "20em" }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="block h-[1em] leading-none">
            {i % 10}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const chars = value.split("");
  let digitIndex = 0;
  return (
    <span ref={ref} className={`t-num inline-flex items-baseline ${className ?? ""}`} aria-label={value}>
      {chars.map((char, i) => {
        if (/\d/.test(char)) {
          const d = digitIndex++;
          return reduce ? (
            <span key={i} aria-hidden="true">{char}</span>
          ) : (
            <span key={i} aria-hidden="true">
              <Digit value={Number(char)} run={seen} delay={d * 0.12} />
            </span>
          );
        }
        return (
          <span key={i} aria-hidden="true">
            {char}
          </span>
        );
      })}
    </span>
  );
}

/* -------------------------------------------------------------------------
   Letreiro gigante que acelera e inclina com a velocidade da rolagem
   ---------------------------------------------------------------------- */

export function VelocityMarquee({
  words,
  baseSpeed = 3,
  className,
  tone = "night",
}: {
  words: string[];
  baseSpeed?: number;
  className?: string;
  tone?: "night" | "paper" | "blue";
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2500, 0, 2500], [8, 0, -8]);
  const direction = useRef(1);
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseSpeed * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * Math.abs(f);
    x.set(x.get() - move);
  });

  const toneClass =
    tone === "night" ? "bg-[var(--night)] text-[var(--on-night)]" : tone === "blue" ? "bg-[var(--blue)] text-white" : "bg-[var(--paper)] text-[var(--ink)]";

  const row = (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="flex items-center">
          <span className={i % 2 ? "outline-text" : undefined}>{word}</span>
          <span aria-hidden="true" className="mx-[0.35em] inline-block h-[0.16em] w-[0.9em] rounded-full bg-[var(--signal)]" />
        </span>
      ))}
    </>
  );

  return (
    <div aria-hidden="true" className={`overflow-hidden py-6 sm:py-10 ${toneClass} ${className ?? ""}`}>
      <motion.div style={{ x: pos, skewX: skew }} className="t-mega flex w-max whitespace-nowrap">
        {row}
        {row}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Cabeçalho de seção: título grande + frase + ação opcional
   ---------------------------------------------------------------------- */

export function SectionHead({
  title,
  lead,
  id,
  action,
  tone = "paper",
  className,
}: {
  title: string;
  lead?: string;
  id?: string;
  action?: React.ReactNode;
  tone?: "paper" | "night";
  className?: string;
}) {
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className ?? ""}`}>
      <div className="lg:col-span-8">
        <WordReveal as="h2" text={title} className="t-display" />
        {lead && (
          <motion.p
            id={id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className={`t-lead mt-6 max-w-2xl ${tone === "night" ? "text-[var(--on-night-mute)]" : "text-[var(--ink-mute)]"}`}
          >
            {lead}
          </motion.p>
        )}
      </div>
      {action && <div className="lg:col-span-4 lg:justify-self-end">{action}</div>}
    </div>
  );
}

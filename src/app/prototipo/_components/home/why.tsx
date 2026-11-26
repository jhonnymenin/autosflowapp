"use client";

/**
 * FE-06 — Por que a AutosFlow · Como funciona (proposta).
 * Três passos ligados por uma estrada: o asfalto se desenha com a rolagem,
 * a faixa amarela corre no meio e um farol vai na frente; cada passo acende
 * quando o farol chega nele. Embaixo, os números do estoque num odômetro.
 */
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Check } from "../icons";
import { Reveal, WordReveal, ease } from "../motion";
import { FeTag } from "../shell";
import { Odometer } from "../ui";

const steps = [
  {
    title: "Escolha com informação",
    text: "Ano, km, cor e valor saem do cadastro do carro. Laudo cautelar e histórico ficam na mesa antes de você decidir.",
    tags: ["Ficha do cadastro", "Laudo cautelar", "Fotos da unidade"],
  },
  {
    title: "Negocie sem pressão",
    text: "Sem letras pequenas e sem surpresas. Você entende cada etapa da negociação e decide no seu tempo.",
    tags: ["Proposta pelo WhatsApp", "Troca e entrada", "Financiamento"],
  },
  {
    title: "Saia com tudo resolvido",
    text: "Documentação, transferência e financiamento com a gente. E também depois da entrega.",
    tags: ["Documentação", "Transferência", "Pós-venda"],
  },
];

export interface Stat {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export function Why({ stats }: { stats: Stat[] }) {
  const roadRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [marks, setMarks] = useState<number[]>([0.08, 0.5, 0.92]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: roadRef, offset: ["start 68%", "end 58%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, restDelta: 0.001 });
  const clip = useTransform(progress, (v) => `inset(0% 0% ${((1 - v) * 100).toFixed(2)}% 0%)`);
  const top = useTransform(progress, (v) => `${(v * 100).toFixed(2)}%`);

  useEffect(() => {
    const measure = () => {
      const road = roadRef.current;
      if (!road) return;
      const height = road.offsetHeight || 1;
      setMarks(stepRefs.current.map((li) => (li ? (li.offsetTop + 20) / height : 1)));
    };
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(progress, "change", (v) => {
    setActive(marks.filter((mark) => v >= mark - 0.015).length);
  });

  return (
    <section id="como-funciona" aria-label="Como funciona" className="paper section-y relative scroll-mt-24">
      <FeTag code="FE-06" title="Por que a AutosFlow" status="Proposta" className="left-4 top-8 sm:left-10" />

      <div className="container-p grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Coluna fixa: a promessa e onde a pessoa está na estrada. */}
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <WordReveal as="h2" text="Do anúncio à chave na mão." className="t-display text-[clamp(2.3rem,4.2vw,4rem)]" />
          <Reveal delay={0.2}>
            <p className="t-lead mt-8 max-w-md text-[var(--ink-mute)]">
              Comprar um carro deve ser uma conquista, nunca uma preocupação. A estrada é sempre a mesma, e a
              gente vai junto do começo ao fim.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-12 hidden flex-col gap-1 lg:flex" aria-hidden="true">
              {steps.map((step, i) => (
                <li key={step.title} className="flex items-center gap-4 py-1.5">
                  <motion.span
                    className="h-[3px] rounded-full"
                    animate={{
                      width: i < active ? 44 : 18,
                      backgroundColor: i < active ? "#0b0f17" : "#c9c4ba",
                    }}
                    transition={{ duration: 0.6, ease }}
                  />
                  <motion.span
                    className="text-[16px] font-semibold"
                    animate={{ color: i < active ? "#0b0f17" : "#8d9098" }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.title}
                  </motion.span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* A estrada. */}
        <ol ref={roadRef} className="relative flex flex-col gap-24 pl-16 sm:pl-24 lg:col-span-6 lg:col-start-7 lg:gap-[24vh] lg:py-[8vh]">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-[18px] w-3 rounded-full bg-[var(--paper-3)] sm:left-[30px]" />
          <motion.span
            aria-hidden="true"
            style={{ clipPath: clip }}
            className="absolute top-0 bottom-0 left-[18px] w-3 rounded-full bg-[var(--ink)] sm:left-[30px]"
          >
            <span className="absolute inset-y-3 left-1/2 w-[2px] -translate-x-1/2 bg-[repeating-linear-gradient(180deg,var(--signal)_0_14px,transparent_14px_28px)]" />
          </motion.span>
          {/* O farol na ponta da estrada. */}
          <motion.span
            aria-hidden="true"
            style={{ top }}
            className="absolute left-[24px] z-10 -translate-x-1/2 -translate-y-1/2 sm:left-[36px]"
          >
            <span className="absolute top-3 left-1/2 h-32 w-20 -translate-x-1/2 bg-[linear-gradient(180deg,rgb(77_141_255/0.45),transparent)] [clip-path:polygon(42%_0,58%_0,100%_100%,0_100%)]" />
            <span className="relative block h-6 w-6 rounded-full bg-white shadow-[0_0_0_6px_rgb(77_141_255/0.28),0_0_40px_12px_rgb(77_141_255/0.55)]" />
          </motion.span>

          {steps.map((step, i) => {
            const lit = i < active;
            return (
              <li
                key={step.title}
                ref={(node) => {
                  stepRefs.current[i] = node;
                }}
                className="relative"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute top-1 -left-10 z-[5] grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full sm:-left-[60px] sm:h-12 sm:w-12"
                  animate={{
                    scale: lit ? 1 : 0.62,
                    backgroundColor: lit ? "#ffd60a" : "#e2dfd8",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                >
                  <motion.span animate={{ opacity: lit ? 1 : 0, scale: lit ? 1 : 0.4 }} transition={{ duration: 0.3 }}>
                    <Check className="h-5 w-5 text-[var(--ink)]" />
                  </motion.span>
                </motion.span>
                <motion.div animate={{ opacity: lit ? 1 : 0.32, x: lit ? 0 : -10 }} transition={{ duration: 0.7, ease }}>
                  <h3 className="t-title">{step.title}</h3>
                  <p className="t-lead mt-5 max-w-lg text-[var(--ink-mute)]">{step.text}</p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-[var(--paper-2)] px-3.5 py-2 text-[14px] font-medium text-[var(--ink)]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Os números do estoque, num odômetro. */}
      <div className="container-p mt-28 sm:mt-40">
        <div className="night grain relative overflow-hidden rounded-[6px] px-6 py-14 sm:px-12 sm:py-20">
          <motion.span
            aria-hidden="true"
            className="absolute top-0 left-0 z-[2] h-[2px] w-1/3 bg-[linear-gradient(90deg,transparent,var(--blue-glow),#fff)]"
            animate={{ x: ["-100%", "320%"] }}
            transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 1.2, ease: [0.65, 0, 0.35, 1] }}
          />
          <div className="relative z-[2] flex flex-wrap items-end justify-between gap-4">
            <p className="t-title max-w-md">O estoque de hoje, em números.</p>
            <p className="text-[15px] text-[var(--on-night-mute)]">Dados do estoque publicado no site.</p>
          </div>
          <dl className="relative z-[2] mt-14 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-5 max-w-[14rem] text-[16px] leading-snug text-[var(--on-night-mute)]">{stat.label}</dt>
                <dd className="t-num flex items-start text-[clamp(3rem,6.6vw,7rem)] leading-[0.9] whitespace-nowrap">
                  {stat.prefix && (
                    <span className="mt-[0.12em] mr-[0.12em] text-[0.32em] leading-none text-[var(--on-night-mute)]">
                      {stat.prefix.trim()}
                    </span>
                  )}
                  <Odometer value={stat.value} />
                  {stat.suffix && <span className="text-[0.5em] leading-none text-[var(--signal)]">{stat.suffix}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

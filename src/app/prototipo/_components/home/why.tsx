"use client";

/**
 * FE-06 — Por que a AutosFlow (proposta), como no material de apoio: os quatro
 * cartões do bloco atual (o primeiro com o texto revisto, menos técnico), um
 * "Como funciona" em três passos e a faixa de números — só com dados reais.
 */
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { Check } from "../icons";
import { FeTag } from "../shell";
import { ease } from "../motion";
import { Odometer } from "../ui";

const reasons = [
  { title: "O que está no anúncio está no carro", text: "Ano, quilometragem, cor e valor saem direto do cadastro do veículo." },
  { title: "Sem pressão e sem letras pequenas", text: "Você entende cada etapa da negociação e decide no seu tempo." },
  { title: "Laudo e histórico na mesa", text: "Laudo cautelar, histórico e inspeção mecânica antes de você decidir." },
  { title: "Com você depois da entrega", text: "Documentação, transferência e financiamento resolvidos com a gente." },
];

const steps = [
  { title: "Escolha com informação", text: "Fotos da própria unidade, ficha conferida e preço claro." },
  { title: "Negocie sem pressão", text: "Proposta pelo WhatsApp, troca, entrada e financiamento." },
  { title: "Saia com tudo resolvido", text: "Documentação e transferência por nossa conta." },
];

export interface Stat {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export function Why({ stats }: { stats: Stat[] }) {
  const roadRef = useRef<HTMLDivElement>(null);
  const seen = useInView(roadRef, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const run = seen || !!reduce;

  return (
    <section id="como-funciona" aria-labelledby="why-titulo" className="paper relative scroll-mt-24 pb-28 sm:pb-36">
      <FeTag code="FE-06" title="Por que a AutosFlow" status="Proposta" className="left-4 -top-6 sm:left-10" />
      <div className="container-p">
        <p className="t-spec text-[var(--blue)]">Por que a AutosFlow</p>
        <h2 id="why-titulo" className="t-title mt-3 max-w-4xl text-[clamp(1.9rem,3.4vw,3.2rem)]">
          Segurança em cada etapa, do anúncio à chave na mão.
        </h2>

        {/* Os quatro cartões */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
          {reasons.map((reason) => (
            <motion.li
              key={reason.title}
              variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              className="group relative overflow-hidden rounded-[10px] bg-white p-6 sm:p-7"
            >
              <motion.span
                aria-hidden="true"
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, delay: 0.2, ease } } }}
                className="absolute inset-x-0 top-0 h-1 origin-left bg-[var(--blue)]"
              />
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f0ff] text-[var(--blue)] transition-colors duration-300 group-hover:bg-[var(--blue)] group-hover:text-white">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-[19px] leading-snug font-semibold tracking-[-0.015em]">{reason.title}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-[var(--ink-mute)]">{reason.text}</p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Como funciona, em três passos, numa estrada que se desenha */}
        <div ref={roadRef} className="mt-16 rounded-[10px] bg-[var(--night)] px-6 pt-8 pb-10 text-[var(--on-night)] sm:px-10 sm:pt-10">
          <h3 className="text-[22px] font-semibold tracking-[-0.02em]">Como funciona</h3>
          <div className="relative mt-10">
            {/* asfalto e faixa amarela (desktop) */}
            <div aria-hidden="true" className="absolute top-[18px] right-[8%] left-[8%] hidden h-2 overflow-hidden rounded-full bg-white/10 md:block">
              <motion.div
                className="absolute inset-0 origin-left bg-[var(--ink)]"
                initial={{ scaleX: 0 }}
                animate={run ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.8, ease }}
              />
              <motion.div
                className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 origin-left bg-[repeating-linear-gradient(90deg,var(--signal)_0_14px,transparent_14px_26px)]"
                initial={{ scaleX: 0 }}
                animate={run ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.8, ease }}
              />
            </div>
            <motion.span
              aria-hidden="true"
              className="absolute top-[10px] left-[8%] hidden h-6 w-6 rounded-full bg-white shadow-[0_0_24px_6px_rgb(77_141_255/0.55)] md:block"
              initial={{ left: "8%", opacity: 0 }}
              animate={run ? { left: "92%", opacity: [0, 1, 1, 0] } : {}}
              transition={{ duration: 1.8, ease }}
            />
            <ol className="relative grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4 md:flex-col md:items-center md:text-center">
                  <motion.span
                    initial={{ scale: 0.6, backgroundColor: "rgb(255 255 255 / 0.12)" }}
                    animate={run ? { scale: 1, backgroundColor: "#ffd60a" } : {}}
                    transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.3 + i * 0.6 }}
                    className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-[var(--ink)]"
                  >
                    <Check className="h-5 w-5" />
                  </motion.span>
                  <span>
                    <span className="block text-[18px] font-semibold md:mt-4">{step.title}</span>
                    <span className="mt-1.5 block text-[15.5px] leading-relaxed text-[var(--on-night-mute)]">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Faixa de números (só dados reais) */}
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[10px] bg-[var(--ink)] px-6 py-7 text-white">
              <p className="text-[clamp(2rem,3.4vw,3.2rem)] leading-none">
                {stat.prefix && <span className="t-num mr-1 align-top text-[0.45em] text-white/60">{stat.prefix}</span>}
                <Odometer value={stat.value} />
                {stat.suffix && <span className="t-num text-[var(--signal)]">{stat.suffix}</span>}
              </p>
              <p className="mt-3 text-[15px] text-white/65">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[13px] text-[var(--ink-mute)]">Números do estoque publicado no site. A faixa só mostra dados reais.</p>
      </div>
    </section>
  );
}

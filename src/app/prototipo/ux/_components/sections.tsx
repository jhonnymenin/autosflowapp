"use client";

/**
 * Seções da Análise de UX (ver content.ts para o texto).
 * Mesma linguagem da home v2: noite com grão, papel quente, Archivo.
 */
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Image from "@/components/image";

import { ArrowRight, ArrowUpRight, Check } from "../../_components/icons";
import { Reveal, RevealGroup, RevealItem, WordReveal, ease } from "../../_components/motion";
import { MediaReveal, Odometer, PillLink } from "../../_components/ui";
import {
  blocks,
  decisions,
  diagnosis,
  funnels,
  personas,
  phase1,
  phase2,
  principles,
  qualityDone,
  qualityPending,
  sections,
} from "./content";

export interface UxStats {
  cars: number;
  makes: number;
  testimonials: number;
  services: number;
}

/* -------------------------------------------------------------------------
   Capa
   ---------------------------------------------------------------------- */

export function Cover({ stats }: { stats: UxStats }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const lines = ["A nova", "experiência", "AutosFlow"];
  const numbers = [
    { value: String(stats.cars), label: "carros reais no estoque" },
    { value: String(stats.makes), label: "marcas" },
    { value: String(stats.testimonials), label: "depoimentos autorizados" },
    { value: "13", label: "itens de home e serviços" },
    { value: "20", label: "decisões para fechar" },
  ];

  return (
    <section ref={ref} id="capa" aria-label="Capa" className="night grain relative overflow-hidden">
      <motion.div aria-hidden="true" style={{ y }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- arquivo estático do protótipo, sem versões em /_img */}
          <img src="/prototipo/sp-noite.jpg" alt="" className="h-full w-full object-cover opacity-50" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--night)_8%,rgb(5_8_15/0.55)_55%,rgb(5_8_15/0.75)_100%)]" />
      </motion.div>

      <div className="container-p relative z-[2] flex min-h-[100svh] flex-col justify-end pt-[8.5rem] pb-14 sm:pb-20">
        <h1 aria-label="A nova experiência AutosFlow" className="t-mega text-[clamp(2.1rem,9.6vw,10.5rem)]">
          {lines.map((line, i) => (
            <span key={line} aria-hidden="true" className="-mt-[0.14em] block overflow-hidden pt-[0.16em] pb-[0.04em] first:mt-0">
              <motion.span
                className={`block ${i === 2 ? "text-[var(--blue-glow)]" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="t-lead mt-8 max-w-2xl text-[var(--on-night)]"
        >
          Um autoshopping digital com quatro frentes, comprar, vender, lojista e serviços, num fluxo só. Aqui está como cada
          pessoa vai viver a nova AutosFlow, por que cada bloco existe e como vamos medir.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.85, ease }} className="mt-8">
          <PillLink href="/prototipo" tone="white">
            Ver o protótipo
          </PillLink>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {numbers.map((n) => (
            <div key={n.label}>
              <Odometer value={n.value} className="text-[clamp(2.4rem,4.4vw,4.25rem)] leading-none" />
              <p className="mt-3 text-[15px] text-[var(--on-night-mute)]">{n.label}</p>
            </div>
          ))}
        </div>

        <nav aria-label="Seções da análise" className="mt-14 flex flex-wrap gap-2">
          {sections.slice(1).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full bg-white/[0.08] px-4 py-2 text-[14px] font-medium transition-colors hover:bg-white hover:text-[var(--ink)]"
            >
              {section.label}
            </a>
          ))}
        </nav>
        <p className="mt-8 text-[13px] text-[var(--on-night-mute)]">
          Protótipo para discussão · 26 de novembro de 2026 · base: material de apoio de 23/11/2026
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Diagnóstico
   ---------------------------------------------------------------------- */

export function Diagnosis() {
  return (
    <section id="diagnostico" aria-label="Diagnóstico" className="paper section-y relative scroll-mt-16">
      <div className="container-p">
        <WordReveal as="h2" text="Onde a home perdia gente." className="t-display" />
        <Reveal delay={0.15}>
          <p className="t-lead mt-6 max-w-2xl text-[var(--ink-mute)]">
            Dez pontos da home atual e o que o novo desenho faz com cada um. Todos vêm das conversas do time e do material
            de apoio.
          </p>
        </Reveal>

        <div className="mt-14 hidden grid-cols-12 gap-6 px-5 lg:grid">
          <span className="col-span-5 text-[15px] font-semibold text-[var(--ink-mute)]">Antes</span>
          <span className="col-span-6 col-start-7 text-[15px] font-semibold text-[#0b46b8]">Agora</span>
        </div>
        <ol className="mt-4 flex flex-col">
          {diagnosis.map((item, i) => (
            <motion.li
              key={item.before}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.05, ease }}
              className="group grid gap-3 rounded-[6px] px-5 py-7 transition-colors duration-500 hover:bg-[var(--paper-2)] lg:grid-cols-12 lg:items-center lg:gap-6"
            >
              <p className="relative text-[18px] leading-snug text-[var(--ink-mute)] lg:col-span-5">
                <span className="mb-1 block text-[14px] font-semibold lg:hidden">Antes</span>
                {item.before}
              </p>
              <span aria-hidden="true" className="hidden lg:col-span-1 lg:grid lg:place-items-center">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3, ease }}
                  className="flex h-10 w-full origin-left items-center"
                >
                  <span className="h-[2px] flex-1 bg-[var(--blue)]" />
                  <ArrowRight className="-ml-2 h-6 w-6 text-[var(--blue)]" />
                </motion.span>
              </span>
              <p className="text-[clamp(1.15rem,1.6vw,1.45rem)] leading-snug font-[620] tracking-[-0.015em] lg:col-span-5">
                <span className="mb-1 block text-[14px] font-semibold text-[#0b46b8] lg:hidden">Agora</span>
                {item.after}
              </p>
              <span className="flex flex-wrap gap-1.5 lg:col-span-1 lg:justify-end">
                {item.fe.map((code) => (
                  <span key={code} className="t-num rounded-full bg-[var(--ink)] px-2.5 py-1 text-[13px] text-white">
                    {code}
                  </span>
                ))}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Personas
   ---------------------------------------------------------------------- */

export function Personas() {
  return (
    <section id="personas" aria-label="Quem usa" className="night grain section-y relative scroll-mt-16">
      <div className="container-p relative z-[2]">
        <WordReveal as="h2" text="Quatro pessoas, quatro frentes." className="t-display" />
        <Reveal delay={0.15}>
          <p className="t-lead mt-6 max-w-2xl text-[var(--on-night-mute)]">
            Quem chega, o que quer resolver e do que tem medo. São hipóteses a validar em entrevistas, cinco por persona,
            antes de a Fase 1 ir ao ar.
          </p>
        </Reveal>

        <RevealGroup stagger={0.1} className="mt-14 grid gap-3 lg:grid-cols-2">
          {personas.map((persona) => (
            <RevealItem key={persona.key} className="flex flex-col overflow-hidden rounded-[6px] bg-[var(--night-2)]">
              <MediaReveal className="aspect-[16/8]">
                <Image src={persona.photo} alt={persona.photoAlt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
              </MediaReveal>
              <div className="flex flex-1 flex-col p-7 sm:p-10">
              <h3 className="t-title">{persona.role}</h3>
              <p className="mt-3 text-[19px] leading-snug">
                <span className="font-semibold text-[var(--signal)]">{persona.name}.</span>{" "}
                <span className="text-[var(--on-night-mute)]">{persona.sketch}</span>
              </p>
              <p className="mt-6 text-[18px] leading-relaxed">“{persona.job}”</p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-[14px] font-semibold text-[var(--on-night-mute)]">Medos</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {persona.fears.map((fear) => (
                      <li key={fear} className="flex gap-2.5 text-[16px]">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b5e]" />
                        {fear}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[var(--on-night-mute)]">Precisa ver primeiro</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {persona.firstSee.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[16px]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#3ddc84]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {persona.where.map((where) => (
                  <Link
                    key={where.label}
                    href={where.href}
                    data-cursor="Abrir"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-4 py-2 text-[14px] font-medium transition-colors hover:bg-white hover:text-[var(--ink)]"
                  >
                    {where.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
                  </Link>
                ))}
              </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Bloco a bloco
   ---------------------------------------------------------------------- */

const statusTone = { "Em validação": "bg-[#e8f0ff] text-[#0b46b8]", Proposta: "bg-[#fff3d6] text-[#8a5a00]" } as const;
const phaseTone = { "Fase 1": "bg-[#e1f5ea] text-[#0c7a4c]", "Fase 2": "bg-[#ffe8d6] text-[#9a4a00]", "Fase 1 + 2": "bg-[#e1f5ea] text-[#0c7a4c]" } as const;

export function Blocks() {
  return (
    <section id="blocos" aria-label="Bloco a bloco" className="night grain section-y relative scroll-mt-16">
      <div className="container-p relative z-[2]">
        <WordReveal as="h2" text="A home, bloco a bloco." className="t-display" />
        <Reveal delay={0.15}>
          <p className="t-lead mt-6 max-w-2xl text-[var(--on-night-mute)]">
            Os treze itens do material de apoio: o que é, por que existe e o evento que vamos medir. Cada código abre a tela
            no protótipo.
          </p>
        </Reveal>

        <ol className="mt-14 flex flex-col gap-1">
          {blocks.map((block, i) => (
            <motion.li
              key={block.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.05, ease }}
            >
              <Link
                href={block.href}
                data-cursor="Abrir"
                className="group grid gap-4 rounded-[6px] px-5 py-7 transition-colors duration-500 hover:bg-[var(--night-2)] lg:grid-cols-12 lg:items-start lg:gap-6"
              >
                <span className="t-num text-[clamp(2rem,3.2vw,3rem)] leading-none text-[var(--blue-glow)] transition-transform duration-500 group-hover:translate-x-2 lg:col-span-2">
                  {block.code}
                </span>
                <span className="lg:col-span-4">
                  <span className="block text-[clamp(1.3rem,1.9vw,1.75rem)] leading-tight font-[650] tracking-[-0.025em]" style={{ fontStretch: "112%" }}>
                    {block.title}
                  </span>
                  <span className="mt-3 block text-[16px] leading-relaxed text-[var(--on-night-mute)]">{block.what}</span>
                </span>
                <span className="text-[16px] leading-relaxed lg:col-span-3">
                  <span className="block text-[13px] font-semibold text-[var(--on-night-mute)]">Por quê</span>
                  {block.why}
                </span>
                <span className="flex flex-col gap-3 lg:col-span-3">
                  <span className="flex flex-wrap gap-1.5">
                    {block.events.map((event) => (
                      <code key={event} className="rounded-md bg-white/[0.08] px-2 py-1 font-mono text-[13px] text-[#cfe0ff]">
                        {event}
                      </code>
                    ))}
                  </span>
                  <span className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold">
                    <span className={`rounded-md px-2 py-1 ${phaseTone[block.phase]}`}>{block.phase}</span>
                    <span className={`rounded-md px-2 py-1 ${statusTone[block.status]}`}>{block.status}</span>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-[var(--on-night-mute)] transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-white" />
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Princípios
   ---------------------------------------------------------------------- */

export function Principles() {
  return (
    <section id="principios" aria-label="Princípios de design" className="paper section-y relative scroll-mt-16">
      <div className="container-p">
        <WordReveal as="h2" text="Cinco princípios." className="t-display" />
        <ul className="mt-14 flex flex-col gap-2">
          {principles.map((principle, i) => (
            <motion.li
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.04, ease }}
              className="grid gap-4 rounded-[6px] py-8 lg:grid-cols-12 lg:gap-6"
            >
              <h3
                className="text-[clamp(2.2rem,4.6vw,4.6rem)] leading-[0.95] font-bold tracking-[-0.04em] lg:col-span-6"
                style={{ fontStretch: "112%" }}
              >
                {principle.title}
              </h3>
              <p className="t-lead text-[var(--ink)] lg:col-span-5 lg:col-start-8">{principle.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Qualidade e acessibilidade
   ---------------------------------------------------------------------- */

export function Quality() {
  return (
    <section id="qualidade" aria-label="Acessibilidade e qualidade" className="night grain section-y relative scroll-mt-16">
      <div className="container-p relative z-[2]">
        <WordReveal as="h2" text="O que já está pronto, e o que falta." className="t-display" />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="t-title">No protótipo</h3>
            <RevealGroup stagger={0.06} className="mt-6 flex flex-col gap-2">
              {qualityDone.map((item) => (
                <RevealItem key={item} className="flex items-start gap-4 rounded-[6px] bg-[var(--night-2)] px-5 py-4 text-[17px]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#3ddc84] text-[var(--ink)]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div>
            <h3 className="t-title">Antes de ir ao ar</h3>
            <RevealGroup stagger={0.06} className="mt-6 flex flex-col gap-2">
              {qualityPending.map((item) => (
                <RevealItem key={item} className="flex items-start gap-4 rounded-[6px] px-5 py-4 text-[17px] text-[var(--on-night-mute)] ring-1 ring-inset ring-white/10">
                  <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-dashed border-[var(--signal)]" />
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Funil e métricas
   ---------------------------------------------------------------------- */

export function Funnels() {
  return (
    <section id="funil" aria-label="Funil e métricas" className="paper section-y relative scroll-mt-16">
      <div className="container-p">
        <WordReveal as="h2" text="Como vamos medir." className="t-display" />
        <Reveal delay={0.15}>
          <p className="t-lead mt-6 max-w-3xl text-[var(--ink-mute)]">
            Cada frente vira um funil com eventos nomeados. Os números ficam “a medir” até o protótipo virar site; o clique no
            WhatsApp já é medido hoje pelo Vercel Analytics.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          {funnels.map((funnel) => (
            <div key={funnel.front}>
              <h3 className="t-title">{funnel.front}</h3>
              <ol className="mt-6 flex flex-col gap-4">
                {funnel.steps.map((step, i) => {
                  const width = 100 - (i * 62) / Math.max(funnel.steps.length - 1, 1);
                  return (
                    <li key={step.label}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="text-[17px] font-semibold">{step.label}</span>
                        <span className="text-[13px] text-[var(--ink-mute)]">a medir</span>
                      </div>
                      <div className="mt-2 h-3 rounded-full bg-[var(--paper-3)]">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: i * 0.12, ease }}
                          className="h-full origin-left rounded-full bg-[var(--blue)]"
                          style={{ width: `${width}%`, opacity: 1 - i * 0.12 }}
                        />
                      </div>
                      <code className="mt-2 block font-mono text-[13px] text-[var(--ink-mute)]">{step.event}</code>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-10 text-[14px] text-[var(--ink-mute)]">A largura das barras ilustra o formato de funil; não é dado medido.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Fases e decisões (com marcação para usar na reunião)
   ---------------------------------------------------------------------- */

const totalDecisions = decisions.reduce((sum, group) => sum + group.items.length, 0);

export function Phases() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Marcações guardadas no navegador de quem apresenta.
    const frame = requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("proto-ux-decisoes");
        if (saved) setDone(JSON.parse(saved));
      } catch {
        /* sem marcações salvas */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggle = (id: string) => {
    setDone((current) => {
      const next = { ...current, [id]: !current[id] };
      window.localStorage.setItem("proto-ux-decisoes", JSON.stringify(next));
      return next;
    });
  };

  const decided = Object.values(done).filter(Boolean).length;

  return (
    <section id="fases" aria-label="Fases e decisões" className="night grain section-y relative scroll-mt-16">
      <div className="container-p relative z-[2]">
        <WordReveal as="h2" text="Fases e decisões em aberto." className="t-display" />

        <div className="mt-14 grid gap-3 lg:grid-cols-12">
          <div className="rounded-[6px] bg-[var(--night-2)] p-7 sm:p-10 lg:col-span-7">
            <p className="flex items-baseline gap-4">
              <Odometer value={String(phase1.length)} className="text-[clamp(3rem,5vw,4.5rem)] leading-none text-[#3ddc84]" />
              <span className="t-title">itens na Fase 1</span>
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {phase1.map((item) => (
                <li key={item} className="text-[16px] leading-snug">
                  <span className="t-num mr-2 text-[var(--blue-glow)]">{item.slice(0, 5)}</span>
                  {item.slice(6)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[6px] bg-[var(--night-2)] p-7 sm:p-10 lg:col-span-5">
            <p className="flex items-baseline gap-4">
              <Odometer value={String(phase2.length)} className="text-[clamp(3rem,5vw,4.5rem)] leading-none text-[var(--signal)]" />
              <span className="t-title">itens na Fase 2</span>
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {phase2.map((item) => (
                <li key={item} className="text-[16px] leading-snug">
                  <span className="t-num mr-2 text-[var(--blue-glow)]">{item.slice(0, 5)}</span>
                  {item.slice(6)}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[15px] leading-relaxed text-[var(--on-night-mute)]">
              Dependem de parceiros e lojistas. No FE-01, só o slide de vender entra na Fase 1; Lojista e Serviços levam à
              lista de espera até lá.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="t-title">{totalDecisions} decisões para fecharmos</h3>
            <p className="mt-3 max-w-xl text-[16px] text-[var(--on-night-mute)]">
              Marque durante a reunião o que for decidido. Fica salvo neste navegador. Quem decide cada ponto: a definir.
            </p>
          </div>
          <div className="w-full max-w-sm">
            <p className="flex items-baseline justify-between text-[15px]">
              <span className="t-num text-[28px]">
                {decided} <span className="text-[var(--on-night-mute)]">de {totalDecisions}</span>
              </span>
              <span className="text-[var(--on-night-mute)]">decididas</span>
            </p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-[var(--signal)]"
                animate={{ scaleX: decided / totalDecisions }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {decisions.map((group) => (
            <div key={group.fe} className="rounded-[6px] bg-[var(--night-2)] p-6">
              <p className="flex items-baseline gap-3">
                <span className="t-num text-[20px] text-[var(--blue-glow)]">{group.fe}</span>
                <span className="text-[17px] font-semibold">{group.title}</span>
              </p>
              <ul className="mt-4 flex flex-col gap-1">
                {group.items.map((item, i) => {
                  const id = `${group.fe}-${i}`;
                  const checked = !!done[id];
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => toggle(id)}
                        className="flex w-full items-start gap-3 rounded-[6px] px-2 py-2.5 text-left text-[15.5px] leading-snug transition-colors hover:bg-white/[0.05]"
                      >
                        <motion.span
                          animate={{ scale: checked ? [1, 1.25, 1] : 1 }}
                          transition={{ duration: 0.35 }}
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md transition-colors ${
                            checked ? "bg-[var(--signal)] text-[var(--ink)]" : "bg-white/10"
                          }`}
                        >
                          {checked && <Check className="h-3.5 w-3.5" />}
                        </motion.span>
                        <span className={checked ? "text-[var(--on-night-mute)] line-through" : ""}>{item}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Fecho
   ---------------------------------------------------------------------- */

export function Closing() {
  return (
    <section aria-label="Fecho" className="night grain relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- arquivo estático do protótipo, sem versões em /_img */}
        <img src="/prototipo/sp-noite.jpg" alt="" className="h-full w-full object-cover object-bottom opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--night)_0%,rgb(5_8_15/0.4)_50%,var(--night)_100%)]" />
      </div>
      <div className="container-p relative z-[2] flex min-h-[80svh] flex-col items-start justify-center py-32">
        <WordReveal as="h2" text="Seu carro no fluxo certo." className="t-mega max-w-[14ch] text-[clamp(3rem,8vw,8.5rem)]" />
        <Reveal delay={0.3} className="mt-12 flex flex-wrap gap-3">
          <PillLink href="/prototipo" tone="white">
            Ver o protótipo
          </PillLink>
          <PillLink href="/prototipo/servicos" tone="ghost-night">
            Serviços
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Trilho de seções (desktop): pontos à direita, o atual alongado.
   ---------------------------------------------------------------------- */

export function SectionRail() {
  const [current, setCurrent] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Seções da análise"
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 mix-blend-difference xl:block"
    >
      <ul className="pointer-events-auto flex flex-col items-end gap-3">
        {sections.map((section) => {
          const active = current === section.id;
          return (
            <li key={section.id}>
              <a href={`#${section.id}`} aria-current={active ? "true" : undefined} className="group flex items-center gap-3 py-0.5 text-white">
                <span
                  className={`text-[13px] font-medium transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {section.label}
                </span>
                <span className={`block h-1.5 rounded-full bg-white transition-[width,opacity] duration-500 ${active ? "w-8 opacity-100" : "w-1.5 opacity-60"}`} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

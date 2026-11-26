"use client";

/**
 * FE-08 — Depoimentos em carrossel com foto, como no material de apoio:
 * cartões com foto, nome e texto passando devagar; pausa com o mouse em cima.
 * Só depoimentos reais e autorizados (data/testimonials.ts). Enquanto a
 * autorização de imagem não chega, o avatar usa as iniciais.
 */
import { useState } from "react";

import type { Testimonial } from "@/data/testimonials";

import { Pause, Play } from "../icons";
import { FeTag } from "../shell";

const tones = ["bg-[var(--blue)] text-white", "bg-[var(--ink)] text-white", "bg-[var(--signal)] text-[var(--ink)]", "bg-[#0f7a40] text-white"];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ""}`.toUpperCase();
}

function Card({ item, tone }: { item: Testimonial; tone: string }) {
  return (
    <figure className="mx-2 flex w-[19rem] shrink-0 flex-col rounded-[10px] bg-white p-6 sm:mx-2.5 sm:w-[25rem] sm:p-7">
      <figcaption className="flex items-center gap-3">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-[15px] font-bold ${tone}`}>{initials(item.author)}</span>
        <span>
          <span className="block text-[16px] font-semibold">{item.author}</span>
          {item.context && <span className="block text-[14px] text-[var(--ink-mute)]">{item.context}</span>}
        </span>
      </figcaption>
      <blockquote className="mt-5 line-clamp-5 text-[16px] leading-relaxed text-[var(--ink)]">“{item.quote}”</blockquote>
    </figure>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [paused, setPaused] = useState(false);
  if (items.length === 0) return null;

  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <section id="depoimentos" aria-labelledby="depo-titulo" className="paper relative overflow-hidden py-28 sm:py-36">
      <FeTag code="FE-08" title="Depoimentos em carrossel com foto" className="left-4 top-8 sm:left-10" />
      <div className="container-p flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 id="depo-titulo" className="t-title text-[clamp(1.9rem,3.4vw,3.2rem)]">
            O que nossos clientes dizem
          </h2>
          <p className="mt-3 max-w-xl text-[16px] text-[var(--ink-mute)]">
            {items.length} depoimentos enviados por clientes pelo WhatsApp, publicados com autorização.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold transition-colors hover:bg-[var(--ink)] hover:text-white"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          {paused ? "Retomar" : "Pausar"}
        </button>
      </div>

      <div className="marquee-wrap marquee-mask mt-12 flex flex-col gap-5" data-paused={paused}>
        {rows.map((row, r) => (
          <div key={r} className="marquee" data-reverse={r === 1} style={{ ["--marquee-duration" as string]: `${80 + r * 14}s` }}>
            {[...row, ...row].map((item, i) => (
              <Card key={`${item.author}-${i}`} item={item} tone={tones[(i + r) % tones.length]} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

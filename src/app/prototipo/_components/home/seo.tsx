"use client";

/**
 * FE-11 — Continue sua busca (SEO).
 * Um índice: título fixo à esquerda, grupos à direita. Os links ficam no
 * HTML mesmo com a sanfona fechada (ela só recolhe visualmente); só vira
 * link o termo que tem carro agora.
 */
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { ChevronDown } from "../icons";
import { WordReveal, ease } from "../motion";
import { FeTag } from "../shell";

export interface SeoGroup {
  title: string;
  links: { label: string; href: string; count: number }[];
}

export function Seo({ groups, initial = 0 }: { groups: SeoGroup[]; initial?: number }) {
  const [open, setOpen] = useState<number | null>(initial);
  const total = groups.reduce((sum, group) => sum + group.links.length, 0);

  return (
    <section id="continue" aria-label="Continue sua busca" className="paper section-y relative">
      <FeTag code="FE-11" title="Continue sua busca (SEO)" className="left-4 top-6 sm:left-10" />
      <div className="container-p grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <WordReveal as="h2" text="Continue sua busca" className="t-display lg:text-[clamp(2.6rem,4.6vw,5rem)]" />
          <p className="t-lead mt-6 max-w-sm text-[var(--ink-mute)]">
            {total} atalhos para o catálogo, por preço, marca, carroceria e mais. Só aparece o que tem carro agora.
          </p>
        </div>

        <ul className="flex flex-col gap-2 lg:col-span-7">
          {groups.map((group, i) => {
            const isOpen = open === i;
            const panelId = `continue-${i}`;
            return (
              <motion.li
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease }}
                className={`rounded-[6px] transition-colors duration-500 ${isOpen ? "bg-[var(--paper-2)]" : "hover:bg-[var(--paper-2)]"}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 px-5 py-6 text-left sm:px-7"
                  >
                    <span className="flex-1 text-[clamp(1.35rem,2.2vw,1.75rem)] leading-tight font-[650] tracking-[-0.025em]" style={{ fontStretch: "112%" }}>
                      {group.title}
                    </span>
                    <span className="t-num text-[15px] text-[var(--ink-mute)]">
                      {group.links.length} {group.links.length === 1 ? "opção" : "opções"}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-[var(--ink)] text-white" : "bg-[var(--paper-3)]"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>
                </h3>
                <div id={panelId} className="p-collapse" data-open={isOpen}>
                  <div>
                    <ul className="flex flex-wrap gap-2 px-5 pb-7 sm:px-7">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            tabIndex={isOpen ? undefined : -1}
                            className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--paper-3)] py-2 pr-2 pl-4 text-[15px] font-semibold transition-colors duration-300 hover:bg-[var(--ink)] hover:text-white"
                          >
                            {link.label}
                            <span className="t-num grid h-7 min-w-7 place-items-center rounded-full bg-white/70 px-1.5 text-[12.5px] transition-colors group-hover:bg-[var(--signal)] group-hover:text-[var(--ink)]">
                              {link.count}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

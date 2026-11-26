"use client";

/**
 * FE-03 — Serviços (v2 "Fluxo").
 * Uma lista tipográfica gigante, uma linha por categoria. No desktop, a foto
 * da categoria segue o cursor; as outras linhas apagam. No celular, cada
 * linha mostra a miniatura à esquerda.
 */
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import Image from "@/components/image";

import { serviceCategories, services } from "../../_data/services";
import { ArrowUpRight, PartnerPlus } from "../icons";
import { ease } from "../motion";
import { FeTag, useProto } from "../shell";
import { PillLink, SectionHead } from "../ui";

const brl = new Intl.NumberFormat("pt-BR");

const labelCls =
  "block text-[clamp(2.4rem,5.4vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.04em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:translate-x-6";

export function ServicesStrip() {
  const { openWaitlist } = useProto();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const x = useSpring(0, { stiffness: 240, damping: 26, mass: 0.5 });
  const y = useSpring(0, { stiffness: 240, damping: 26, mass: 0.5 });
  const vx = useVelocity(x);
  const rotate = useTransform(vx, [-1600, 0, 1600], [-9, 0, 9], { clamp: true });

  const rows = useMemo(
    () =>
      serviceCategories.map((category) => {
        const list = services.filter((service) => service.category === category.slug);
        const prices = list.map((service) => service.price).filter((p): p is number => p !== null);
        return {
          ...category,
          count: list.length,
          from: prices.length ? `a partir de R$ ${brl.format(Math.min(...prices))}` : "sob consulta",
        };
      }),
    [],
  );
  const activeRow = rows.find((row) => row.slug === active);

  const track = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const dim = (slug: string) => (active && active !== slug ? "lg:opacity-30" : "opacity-100");

  return (
    <section ref={sectionRef} aria-labelledby="servicos-lead" className="paper section-y relative overflow-hidden">
      <FeTag code="FE-03" title="Serviços: faixa clicável da home" phase="Fase 2" className="left-4 top-8 sm:left-10" />
      <div className="container-p">
        <SectionHead
          id="servicos-lead"
          title="Tudo pro seu carro, num lugar só."
          lead="Da lavagem à transferência, com parceiros avaliados pela AutosFlow."
          action={
            <PillLink href="/prototipo/servicos" tone="ink">
              Ver todos os serviços
            </PillLink>
          }
        />

        <ul
          className="mt-16 flex flex-col sm:mt-20"
          onPointerMove={track}
          onPointerLeave={() => setActive(null)}
        >
          {rows.map((row, i) => (
            <motion.li
              key={row.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.06, ease }}
            >
              <Link
                href={`/prototipo/servicos?categoria=${row.slug}`}
                data-cursor="Ver"
                onPointerEnter={(event) => event.pointerType === "mouse" && setActive(row.slug)}
                onFocus={() => setActive(row.slug)}
                onBlur={() => setActive(null)}
                className={`group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 py-4 transition-opacity duration-500 sm:gap-x-8 sm:py-5 ${dim(row.slug)}`}
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[6px] bg-[var(--paper-3)] lg:hidden">
                  <Image src={row.cover} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 lg:col-start-1 lg:col-end-3">
                  <span className={labelCls} style={{ fontStretch: "112%" }}>
                    {row.label}
                  </span>
                  <span className="mt-2 block text-[15px] text-[var(--ink-mute)] lg:hidden">
                    {row.count} {row.count === 1 ? "serviço" : "serviços"} · {row.from}
                  </span>
                </span>
                <span className="flex items-center gap-8">
                  <span className="hidden text-right lg:block">
                    <span className="t-num block text-[22px] text-[var(--ink)]">
                      {row.count} {row.count === 1 ? "serviço" : "serviços"}
                    </span>
                    <span className="block text-[15px] text-[var(--ink-mute)]">{row.from}</span>
                  </span>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--paper-3)] text-[var(--ink)] transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:bg-[var(--blue)] group-hover:text-white group-focus-visible:bg-[var(--blue)] group-focus-visible:text-white sm:h-14 sm:w-14">
                    <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.9, delay: rows.length * 0.06, ease }}
          >
            <button
              type="button"
              onClick={() => openWaitlist("parceiro")}
              data-cursor="Entrar"
              className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 py-4 text-left text-[var(--blue)] transition-opacity duration-500 sm:gap-x-8 sm:py-5 ${active ? "lg:opacity-30" : "opacity-100"}`}
            >
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[6px] bg-[var(--blue)] text-white lg:hidden">
                <PartnerPlus className="h-7 w-7" />
              </span>
              <span className="min-w-0 lg:col-start-1 lg:col-end-3">
                <span className={labelCls} style={{ fontStretch: "112%" }}>
                  Seja um parceiro
                </span>
                <span className="mt-2 block text-[15px] text-[var(--ink-mute)]">Ofereça seus serviços na AutosFlow</span>
              </span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--blue)] text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90 sm:h-14 sm:w-14">
                <PartnerPlus className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
            </button>
          </motion.li>
        </ul>
      </div>

      {/* Foto da categoria seguindo o cursor (desktop). */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ x, y, rotate }}
          className="pointer-events-none absolute top-0 left-0 z-10 hidden lg:block"
        >
          <AnimatePresence>
            {activeRow && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.45, ease }}
                className="relative -mt-[140px] -ml-[190px] h-[280px] w-[380px] overflow-hidden rounded-[6px] bg-[var(--night)] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55)]"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeRow.slug}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease }}
                    className="absolute inset-0"
                  >
                    <Image src={activeRow.cover} alt="" fill sizes="420px" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <span className="t-spec absolute bottom-3 left-3 rounded-full bg-[var(--signal)] px-3 py-1.5 text-[var(--ink)]">
                  {activeRow.blurb}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

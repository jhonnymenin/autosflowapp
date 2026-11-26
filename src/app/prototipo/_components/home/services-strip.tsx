"use client";

/**
 * FE-03 — Serviços: faixa clicável da home, como no material de apoio.
 * Cada ícone abre a listagem já filtrada pela categoria; "Seja um parceiro"
 * abre o cadastro de interesse; "Ver todos os serviços" leva à listagem.
 * Ao passar o mouse, o círculo se enche com a foto da categoria.
 */
import { motion } from "motion/react";
import Link from "next/link";

import Image from "@/components/image";

import { serviceCategories } from "../../_data/services";
import { ArrowRight, PartnerPlus, ServiceGlyph } from "../icons";
import { ease } from "../motion";
import { FeTag, useProto } from "../shell";

const circle =
  "relative grid h-[4.75rem] w-[4.75rem] place-items-center overflow-hidden rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 sm:h-24 sm:w-24";

export function ServicesStrip() {
  const { openWaitlist } = useProto();

  return (
    <section aria-labelledby="servicos-faixa" className="paper relative pt-16 pb-24 sm:pt-20 sm:pb-28">
      <FeTag code="FE-03" title="Serviços: faixa clicável da home" phase="Fase 2" className="left-4 top-4 sm:left-10" />
      <div className="container-p">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="servicos-faixa" className="text-[20px] font-semibold tracking-[-0.015em]">
            Serviços para o seu carro
          </h2>
          <Link href="/prototipo/servicos" className="group inline-flex items-center gap-1.5 text-[16px] font-semibold text-[var(--blue)]">
            Ver todos os serviços <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="rail mt-8 auto-cols-[6.5rem] gap-2 sm:auto-cols-[8rem] lg:grid lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-7 lg:gap-4"
        >
          {serviceCategories.map((category) => (
            <motion.li key={category.slug} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
              <Link
                href={`/prototipo/servicos?categoria=${category.slug}`}
                data-cursor="Ver"
                className="group flex flex-col items-center gap-3 rounded-[14px] py-3 text-center"
              >
                <span className={`${circle} bg-white text-[var(--blue)]`}>
                  <Image
                    src={category.cover}
                    alt=""
                    fill
                    sizes="160px"
                    className="scale-125 object-cover opacity-0 transition-[opacity,transform] duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <span className="absolute inset-0 bg-[rgb(5_8_15/0.35)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative transition-colors duration-300 group-hover:text-white">
                    <ServiceGlyph icon={category.icon} className="h-8 w-8 sm:h-9 sm:w-9" />
                  </span>
                </span>
                <span className="text-[15px] font-semibold sm:text-[16px]">{category.label}</span>
              </Link>
            </motion.li>
          ))}
          <motion.li variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
            <button type="button" onClick={() => openWaitlist("parceiro")} className="group flex w-full flex-col items-center gap-3 rounded-[14px] py-3 text-center">
              <span className={`${circle} bg-[var(--blue)] text-white`}>
                <span className="transition-transform duration-500 group-hover:rotate-90">
                  <PartnerPlus className="h-8 w-8 sm:h-9 sm:w-9" />
                </span>
              </span>
              <span className="text-[15px] font-semibold text-[var(--blue)] sm:text-[16px]">Seja um parceiro</span>
            </button>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}

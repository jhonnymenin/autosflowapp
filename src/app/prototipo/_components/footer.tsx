"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { addressOneLine, brand, contact } from "@/data/brand";
import { waGeneral as whatsappGeneral } from "../_lib/whatsapp";

import { WhatsApp } from "./icons";
import { ease } from "./motion";
import { PillLink } from "./ui";

const columns = [
  {
    title: "Comprar",
    links: [
      { label: "A vitrine", href: "/prototipo#vitrine" },
      { label: "Todos os carros", href: "/veiculos" },
      { label: "SUVs", href: "/veiculos?body=suv" },
      { label: "Tabela de preços", href: "/tabela-de-precos" },
    ],
  },
  {
    title: "Vender",
    links: [
      { label: "Quanto vale meu carro", href: "/prototipo#vender" },
      { label: "Como funciona", href: "/prototipo#como-funciona" },
      { label: "Venda assistida", href: "/vender" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { label: "Todos os serviços", href: "/prototipo/servicos" },
      { label: "Lavagem", href: "/prototipo/servicos?categoria=lavagem" },
      { label: "Revisão", href: "/prototipo/servicos?categoria=revisao" },
      { label: "Débitos e transferência", href: "/prototipo/servicos?categoria=debitos" },
    ],
  },
  {
    title: "Protótipo",
    links: [
      { label: "Análise de UX", href: "/prototipo/ux" },
      { label: "Site atual", href: "/" },
    ],
  },
];

const letters = brand.name.split("");

export function ProtoFooter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const trail = useTransform(scrollYProgress, [0.2, 0.9], ["-60%", "120%"]);

  return (
    <footer ref={ref} className="night grain relative overflow-hidden">
      {/* Fechamento: a promessa e as duas ações. */}
      <div className="container-p pt-28 pb-20 sm:pt-40">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="t-mega text-[clamp(2.5rem,8.6vw,9.5rem)]"
        >
          {[
            { lines: ["Seu carro", "no fluxo", "certo."], cls: "sm:hidden" },
            { lines: ["Seu carro no", "fluxo certo."], cls: "hidden sm:block" },
          ].map((variant) => (
            <span key={variant.cls} className={variant.cls}>
              {variant.lines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <motion.span className="block" variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.1, ease } } }}>
                    {line.split(" ").map((word, wi, words) => (
                      <span key={wi} className={word === "fluxo" ? "text-[var(--blue-glow)]" : undefined}>
                        {word}
                        {wi < words.length - 1 ? " " : ""}
                      </span>
                    ))}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.p>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <PillLink href="/prototipo#vitrine" tone="white">
            Quero comprar
          </PillLink>
          <PillLink href="/prototipo#vender" tone="ghost-night">
            Quero vender
          </PillLink>
          <a
            href={whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-2 px-3 py-3 text-[16px] font-semibold text-[var(--on-night-mute)] transition-colors hover:text-white"
          >
            <WhatsApp className="h-5 w-5 text-[#3ddc84]" /> {contact.whatsappLabel}
          </a>
        </div>
      </div>

      {/* Rastro de luz que atravessa o rodapé com a rolagem. */}
      <div aria-hidden="true" className="relative h-px overflow-hidden bg-white/10">
        <motion.span style={{ x: trail }} className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,var(--blue-glow),#fff)]" />
      </div>

      <div className="container-p grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[17px] leading-relaxed text-[var(--on-night-mute)]">{brand.descriptor}.</p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/45">{addressOneLine}</p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="t-spec text-white/45">{column.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[16px] text-[var(--on-night)] transition-colors hover:text-[var(--signal)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <motion.p
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="flex select-none justify-center overflow-hidden px-2 text-[clamp(3.5rem,16.4vw,17rem)] leading-[0.8] font-extrabold tracking-[-0.05em] text-white"
        style={{ fontStretch: "125%" }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className={index >= 5 ? "text-[var(--blue-glow)]" : undefined}
            variants={{ hidden: { y: "100%" }, show: { y: "0%", transition: { duration: 1.1, ease } } }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.p>

      <div className="container-p flex flex-col gap-2 py-6 text-[13px] text-white/40 sm:flex-row sm:justify-between">
        <p>Protótipo para discussão. Carros, preços, fotos e depoimentos são do site atual; serviços e parceiros são exemplos.</p>
        <p>Vídeos e imagens de apoio gerados no Magnific. Recortes feitos a partir das fotos reais do estoque.</p>
      </div>
    </footer>
  );
}

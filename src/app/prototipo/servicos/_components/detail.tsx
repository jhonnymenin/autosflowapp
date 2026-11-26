"use client";

import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import Image from "@/components/image";
import { waUrl as whatsappUrl } from "../../_lib/whatsapp";

import type { Partner, Service, ServiceCategory } from "../../_data/services";
import { FeTag, useProto } from "../../_components/shell";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  ServiceGlyph,
  Shield,
  WhatsApp,
} from "../../_components/icons";
import { ease, Reveal, WordReveal } from "../../_components/motion";
import { PillButton } from "../../_components/ui";
import { priceText, ServiceCard } from "./service-card";

/* -------------------------------------------------------------------------
   Utilidades
   ---------------------------------------------------------------------- */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Dia da semana e hora decimal agora, no fuso de São Paulo. */
function nowInSaoPaulo(): { day: number; time: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "0";
  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    time: (Number(get("hour")) % 24) + Number(get("minute")) / 60,
  };
}

function hourLabel(value: number): string {
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);
  return minutes ? `${hours}h${String(minutes).padStart(2, "0")}` : `${hours}h`;
}

function hourRows(partner: Partner) {
  const rows = partner.hours.map((entry) => ({
    label: entry.label,
    value: `${hourLabel(entry.open)} às ${hourLabel(entry.close)}`,
    days: entry.days,
  }));
  const covered = new Set(partner.hours.flatMap((entry) => entry.days));
  if (!covered.has(6)) rows.push({ label: "Sábado", value: "Fechado", days: [6] });
  if (!covered.has(0)) rows.push({ label: "Domingo", value: "Fechado", days: [0] });
  return rows;
}

function isOpen(partner: Partner, now: { day: number; time: number }): boolean {
  return partner.hours.some((entry) => entry.days.includes(now.day) && now.time >= entry.open && now.time < entry.close);
}

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const panel = "rounded-[10px] bg-[var(--paper-2)] p-6 sm:p-7";
const sideH2 = "text-[19px] leading-tight font-semibold tracking-[-0.015em] text-[var(--ink)]";
const fieldCls =
  "w-full rounded-[10px] bg-[var(--paper-3)] px-4 py-3.5 text-[16px] font-medium text-[var(--ink)] outline-none ring-[var(--blue)] transition-shadow placeholder:font-normal placeholder:text-[var(--ink-mute)] focus:ring-2";

/* -------------------------------------------------------------------------
   Página
   ---------------------------------------------------------------------- */

export function Detail({
  service,
  category,
  partner,
  related,
}: {
  service: Service;
  category?: ServiceCategory;
  partner?: Partner;
  related: Service[];
}) {
  const nameId = useId();
  const orderRef = useRef<HTMLDivElement>(null);
  const orderVisible = useInView(orderRef, { margin: "0px 0px -20% 0px" });

  const goToForm = () => {
    orderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => document.getElementById(nameId)?.focus({ preventScroll: true }), 700);
  };

  return (
    <>
      <section className="paper relative pt-[calc(4.75rem+2.25rem)] pb-24 sm:pb-32">
        <FeTag code="FE-13" title="Serviços: página de detalhe" phase="Fase 2" className="top-[calc(4.75rem+0.5rem)] right-4 sm:right-8" />
        <div className="container-p">
          <nav aria-label="Você está em" className="text-[14px] text-[var(--ink-mute)]">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/prototipo" className="transition-colors hover:text-[var(--ink)]">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/prototipo/servicos" className="transition-colors hover:text-[var(--ink)]">
                  Serviços
                </Link>
              </li>
              {category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={`/prototipo/servicos?categoria=${category.slug}`} className="transition-colors hover:text-[var(--ink)]">
                      {category.label}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-[var(--ink)]">
                {service.title}
              </li>
            </ol>
          </nav>

          {/* Título no topo: está na primeira tela. */}
          <div className="mt-6">
            <WordReveal as="h1" inView={false} text={service.title} className="t-display text-[clamp(2.6rem,5.6vw,5.75rem)]" />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
              className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <p className="t-lead max-w-2xl text-[var(--ink-mute)]">
                Orçamento sem compromisso com {service.partner}. A resposta chega no seu WhatsApp.
              </p>
              <ul className="flex flex-wrap gap-2">
                {category && (
                  <li className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-3.5 py-2 text-[14px] font-semibold text-white sm:px-4 sm:text-[15px]">
                    <ServiceGlyph icon={category.icon} className="h-[18px] w-[18px] text-[var(--signal)]" />
                    {category.label}
                  </li>
                )}
                <li className="flex items-center gap-2 rounded-full bg-[var(--paper-3)] px-3.5 py-2 text-[14px] font-medium sm:px-4 sm:text-[15px]">
                  <MapPin className="h-4.5 w-4.5 text-[var(--blue)]" /> {service.city}
                </li>
                <li className="flex items-center gap-2 rounded-full bg-[var(--paper-3)] px-3.5 py-2 text-[14px] font-medium sm:px-4 sm:text-[15px]">
                  <Clock className="h-4.5 w-4.5 text-[var(--blue)]" /> {service.duration}
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* ---------------- Coluna principal ---------------- */}
            <div className="flex min-w-0 flex-col gap-20 lg:col-span-8">
              <Gallery images={service.images} title={service.title} />

              <section aria-labelledby="sobre" className="grid gap-6 md:grid-cols-8">
                <Reveal className="md:col-span-3">
                  <h2 id="sobre" className="t-title">
                    Sobre este serviço
                  </h2>
                </Reveal>
                <Reveal delay={0.1} className="md:col-span-5">
                  <p className="t-lead text-[var(--ink)]">{service.summary}</p>
                </Reveal>
              </section>

              <div className="grid gap-12 md:grid-cols-2 md:gap-10">
                <CheckSection id="incluso" title="O que está incluso" items={service.includes} />
                <CheckSection id="antes" title="Antes de ir" items={service.before} muted />
              </div>

              <HowItWorks />

              <Faq service={service} />
            </div>

            {/* ---------------- Coluna lateral ---------------- */}
            <aside aria-label="Pedido e contato" className="flex flex-col gap-4 self-start lg:sticky lg:top-24 lg:col-span-4">
              <div ref={orderRef}>
                <OrderCard service={service} nameId={nameId} />
              </div>
              {partner && <ContactCard partner={partner} />}
              {partner && <AddressCard partner={partner} />}
              {partner && <HoursCard partner={partner} />}
              {partner && <PartnerCard partner={partner} />}
            </aside>
          </div>

          <Related services={related} />
        </div>
      </section>

      {/* Barra fixa no celular: preço e pedido sempre à mão. */}
      <AnimatePresence>
        {!orderVisible && (
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-x-0 bottom-0 z-40 bg-[var(--night)] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-[var(--on-night)] shadow-[0_-16px_40px_-16px_rgb(0_0_0/0.6)] lg:hidden"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] text-[var(--on-night-mute)]">{service.price === null ? "Preço" : "a partir de"}</p>
                <p className="t-num text-[22px] leading-tight">{priceText(service.price)}</p>
              </div>
              <PillButton tone="signal" size="md" magnetic={false} onClick={goToForm}>
                Orçamento
              </PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div aria-hidden="true" className="paper h-24 lg:hidden" />
    </>
  );
}

/* -------------------------------------------------------------------------
   Galeria
   ---------------------------------------------------------------------- */

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const many = images.length > 1;

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + images.length) % images.length);
  };

  return (
    <div>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.3, delay: 0.15, ease }}
        className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-[var(--night)]"
        role="group"
        aria-roledescription="galeria"
        aria-label={`Fotos de ${title}`}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(index + 1);
          if (event.key === "ArrowLeft") go(index - 1);
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, scale: 1.08, x: direction * 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: direction * -60 }}
            transition={{ duration: 0.8, ease }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              else if (info.offset.x > 60) go(index - 1);
            }}
            data-cursor={many ? "Arraste" : undefined}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${title}, foto ${index + 1} de ${images.length}`}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="pointer-events-none object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {many && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
            <span className="pointer-events-auto rounded-full bg-[var(--night)] px-3.5 py-2 text-[14px] font-medium text-white">
              Foto {index + 1} de {images.length}
            </span>
            <span className="pointer-events-auto flex gap-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => go(index - 1)}
                aria-label="Foto anterior"
                className="grid h-12 w-12 place-items-center rounded-full bg-white text-[var(--ink)] transition-colors hover:bg-[var(--signal)]"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => go(index + 1)}
                aria-label="Próxima foto"
                className="grid h-12 w-12 place-items-center rounded-full bg-white text-[var(--ink)] transition-colors hover:bg-[var(--signal)]"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </span>
          </div>
        )}
      </motion.div>

      {many && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-pressed={i === index}
              aria-label={`Foto ${i + 1} de ${images.length}`}
              onClick={() => go(i)}
              className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[var(--night)]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 15vw, 24vw"
                className={`object-cover transition-[opacity,transform] duration-500 ${
                  i === index ? "opacity-100" : "opacity-45 hover:scale-105 hover:opacity-85"
                }`}
              />
              {i === index && (
                <motion.span
                  layoutId="thumb-ring"
                  className="absolute inset-x-0 bottom-0 h-1 bg-[var(--blue)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Listas com check
   ---------------------------------------------------------------------- */

function CheckSection({ id, title, items, muted = false }: { id: string; title: string; items: string[]; muted?: boolean }) {
  return (
    <section aria-labelledby={id}>
      <Reveal>
        <h2 id={id} className="t-title">
          {title}
        </h2>
      </Reveal>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
        className="mt-6 flex flex-col"
      >
        {items.map((item) => (
          <motion.li
            key={item}
            variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}
            className="flex items-start gap-4 py-3 text-[17px] leading-snug text-[var(--ink)]"
          >
            <motion.span
              variants={{
                hidden: { scale: 0, rotate: -45 },
                show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 500, damping: 18 } },
              }}
              className={`mt-px grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                muted ? "bg-[var(--paper-3)] text-[var(--ink)]" : "bg-[var(--blue)] text-white"
              }`}
            >
              <Check className="h-4 w-4" />
            </motion.span>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Como funciona: três passos ligados por uma linha que se desenha na rolagem
   ---------------------------------------------------------------------- */

const steps = [
  { title: "Você pede o orçamento", text: "Preenche o formulário ao lado, em menos de um minuto." },
  { title: "O parceiro responde", text: "Pelo WhatsApp, em horário comercial, com o valor para o seu carro." },
  { title: "Você agenda e vai", text: "No dia combinado, sem fila e com tudo explicado." },
];

function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <section aria-labelledby="como-funciona" className="rounded-[10px] bg-[var(--night)] p-7 text-[var(--on-night)] sm:p-10">
      <Reveal>
        <h2 id="como-funciona" className="t-title">
          Como funciona
        </h2>
      </Reveal>
      <ol ref={ref} className="relative mt-10 grid gap-10 pl-12 sm:grid-cols-3 sm:gap-8 sm:pt-12 sm:pl-0">
        {/* Trilho e rastro de luz (horizontal no desktop, vertical no celular). */}
        <span aria-hidden="true" className="absolute top-[11px] right-[14%] left-[13px] hidden h-[3px] rounded-full bg-white/10 sm:block" />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: line }}
          className="absolute top-[11px] right-[14%] left-[13px] hidden h-[3px] origin-left rounded-full bg-[linear-gradient(90deg,var(--blue),var(--blue-glow),#fff)] sm:block"
        />
        <span aria-hidden="true" className="absolute top-3 bottom-6 left-[11px] w-[3px] rounded-full bg-white/10 sm:hidden" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: line }}
          className="absolute top-3 bottom-6 left-[11px] w-[3px] origin-top rounded-full bg-[var(--blue-glow)] sm:hidden"
        />
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.18, ease }}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 -left-12 grid h-[25px] w-[25px] place-items-center rounded-full bg-[var(--night)] ring-[3px] ring-[var(--blue-glow)] sm:-top-12 sm:left-0"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--signal)]" />
            </span>
            <h3 className="text-[19px] leading-snug font-semibold">{step.title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--on-night-mute)]">{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Perguntas frequentes
   ---------------------------------------------------------------------- */

function Faq({ service }: { service: Service }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const faqs = [
    {
      q: "Quanto tempo leva?",
      a: `Em média ${service.duration.toLowerCase()}, mas o parceiro confirma quando responder o orçamento.`,
    },
    {
      q: "O preço é fechado?",
      a: "O valor “a partir de” é uma referência. O orçamento final depende do carro e é enviado antes de qualquer serviço.",
    },
    {
      q: "Posso cancelar?",
      a: "Pode, é só avisar o parceiro pelo WhatsApp com antecedência. Não há cobrança pelo pedido de orçamento.",
    },
  ];

  return (
    <section aria-labelledby="faq">
      <Reveal>
        <h2 id="faq" className="t-title">
          Perguntas frequentes
        </h2>
      </Reveal>
      <div className="mt-6 flex flex-col gap-2">
        {faqs.map((faq, index) => {
          const expanded = open === index;
          const panelId = `${baseId}-p${index}`;
          return (
            <div key={faq.q} className={`rounded-[10px] transition-colors ${expanded ? "bg-[var(--paper-2)]" : "hover:bg-[var(--paper-2)]"}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[19px] font-semibold tracking-[-0.01em] text-[var(--ink)]"
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.4, ease }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${expanded ? "bg-[var(--ink)] text-white" : "bg-[var(--paper-3)]"}`}
                  >
                    <ChevronDown className="h-4.5 w-4.5" />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl px-5 pb-6 text-[17px] leading-relaxed text-[var(--ink-mute)]">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Pedido de orçamento
   ---------------------------------------------------------------------- */

function OrderCard({ service, nameId }: { service: Service; nameId: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<{ field: "name" | "phone" | "consent"; message: string } | null>(null);
  const phoneId = useId();
  const vehicleId = useId();
  const consentId = useId();
  const errorId = useId();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (status !== "idle") return;
    if (name.trim().length < 2) return setError({ field: "name", message: "Informe seu nome." });
    if (phone.replace(/\D/g, "").length < 10) return setError({ field: "phone", message: "Informe o WhatsApp com DDD." });
    if (!consent) return setError({ field: "consent", message: "Precisamos do seu aceite para passar o contato ao parceiro." });
    setError(null);
    setStatus("loading");
    window.setTimeout(() => setStatus("done"), 900);
  };

  const message = [
    "Olá! Vim pela AutosFlow e quero um orçamento:",
    "",
    `*${service.title}* com ${service.partner} (${service.city})`,
    `Nome: ${name.trim()}`,
    `Veículo: ${vehicle.trim() || "informo depois"}`,
  ].join("\n");

  const inputCls = (field: "name" | "phone") => `${fieldCls} ${error?.field === field ? "ring-2 ring-[#c0262d]" : ""}`;

  return (
    <section aria-labelledby="orcamento" className="relative overflow-hidden rounded-[10px] bg-white p-6 sm:p-7">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="t-num text-[clamp(2.4rem,3.4vw,3.2rem)] leading-none text-[var(--ink)]">{priceText(service.price)}</span>
        {service.price !== null && <span className="text-[15px] text-[var(--ink-mute)]">a partir de</span>}
      </p>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-[var(--ink-mute)]">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-[var(--blue)]" /> {service.city}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-[var(--blue)]" /> {service.duration}
        </span>
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mt-7 flex flex-col items-start"
            role="status"
          >
            <motion.span
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 14 }}
              className="grid h-14 w-14 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]"
            >
              <Check className="h-7 w-7" />
            </motion.span>
            <h2 id="orcamento" className="t-title mt-5">
              Pedido enviado.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-mute)]">
              O parceiro responde pelo WhatsApp. No produto, o pedido cai no admin com status “novo”.
            </p>
            <motion.a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#0f7a40] py-4 text-[16px] font-semibold text-white"
            >
              <WhatsApp className="h-5 w-5" /> Abrir conversa no WhatsApp
            </motion.a>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setName("");
                setPhone("");
                setVehicle("");
                setConsent(false);
              }}
              className="mt-3 self-center text-[15px] font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
            >
              Fazer outro pedido
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -10 }}
            noValidate
            onSubmit={submit}
            aria-labelledby="orcamento"
            aria-describedby={error ? errorId : undefined}
            className="mt-7 flex flex-col gap-4"
          >
            <h2 id="orcamento" className={sideH2}>
              Solicitar orçamento
            </h2>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={nameId} className="text-[14px] font-semibold text-[var(--ink)]">
                Nome
              </label>
              <input id={nameId} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-invalid={error?.field === "name"} className={inputCls("name")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={phoneId} className="text-[14px] font-semibold text-[var(--ink)]">
                WhatsApp
              </label>
              <input
                id={phoneId}
                value={phone}
                onChange={(event) => setPhone(maskPhone(event.target.value))}
                inputMode="tel"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                aria-invalid={error?.field === "phone"}
                className={inputCls("phone")}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={vehicleId} className="text-[14px] font-semibold text-[var(--ink)]">
                Seu veículo <span className="font-normal text-[var(--ink-mute)]">(opcional)</span>
              </label>
              <input id={vehicleId} value={vehicle} onChange={(event) => setVehicle(event.target.value)} placeholder="Ex.: Onix 2020" className={fieldCls} />
            </div>
            <label htmlFor={consentId} className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug text-[var(--ink)]">
              <input
                id={consentId}
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                aria-invalid={error?.field === "consent"}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#1460f2]"
              />
              Aceito que a AutosFlow passe meu contato ao parceiro.
            </label>
            <AnimatePresence>
              {error && (
                <motion.p
                  id={errorId}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto", x: [0, -6, 6, -3, 0] }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[14.5px] font-medium text-[#b42318]"
                >
                  {error.message}
                </motion.p>
              )}
            </AnimatePresence>
            <PillButton type="submit" tone="blue" magnetic={false} aria-busy={status === "loading"} className="mt-1 w-full justify-between">
              {status === "loading" ? (
                <span className="flex items-center gap-2.5">
                  <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-white/30 border-t-white" />
                  Enviando…
                </span>
              ) : (
                "Solicitar orçamento"
              )}
            </PillButton>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Contato, endereço, horário e parceiro
   ---------------------------------------------------------------------- */

function ContactCard({ partner }: { partner: Partner }) {
  const { toast } = useProto();
  const [showPhone, setShowPhone] = useState(false);

  return (
    <section aria-labelledby="fale" className={panel}>
      <h2 id="fale" className={sideH2}>
        Fale com o parceiro
      </h2>
      <div className="mt-4 flex flex-col gap-2.5">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => toast("Abriria o WhatsApp do parceiro com a mensagem pronta.")}
          className="flex items-center justify-center gap-2 rounded-full bg-[#0f7a40] py-3.5 font-semibold text-white"
        >
          <WhatsApp className="h-5 w-5" /> Chamar no WhatsApp
        </motion.button>
        <AnimatePresence mode="wait" initial={false}>
          {showPhone ? (
            <motion.button
              key="phone"
              type="button"
              initial={{ opacity: 0, rotateX: -80 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.45, ease }}
              onClick={() => toast(`No celular, abriria o discador com ${partner.phone}.`)}
              className="flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] py-3.5 font-semibold text-white"
            >
              <Phone className="h-5 w-5 text-[var(--signal)]" /> Ligar <span className="tnum">{partner.phone}</span>
            </motion.button>
          ) : (
            <motion.button
              key="reveal"
              type="button"
              exit={{ opacity: 0, rotateX: 80 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowPhone(true)}
              className="flex items-center justify-center gap-2 rounded-full bg-[var(--paper-3)] py-3.5 font-semibold text-[var(--ink)] transition-colors hover:bg-[#d8d4cb]"
            >
              <Phone className="h-5 w-5 text-[var(--blue)]" /> Ver telefone
            </motion.button>
          )}
        </AnimatePresence>
        <p className="mt-1 text-[14px] text-[var(--ink-mute)]">Resposta em até 2 h no horário comercial (exemplo).</p>
      </div>
    </section>
  );
}

function IllustratedMap({ pin }: { pin: [number, number] }) {
  return (
    <div className="relative aspect-[5/3] overflow-hidden rounded-[6px] bg-[#dedad2]">
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[
          [14, 14, 96, 58],
          [126, 14, 80, 58],
          [222, 14, 70, 40],
          [308, 14, 80, 74],
          [14, 88, 60, 66],
          [90, 88, 116, 46],
          [222, 70, 70, 64],
          [14, 170, 96, 56],
          [126, 150, 80, 76],
          [308, 104, 80, 54],
          [222, 150, 70, 76],
          [308, 174, 80, 52],
        ].map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="3" fill="#cfcac0" />
        ))}
        <rect x="90" y="88" width="116" height="46" rx="3" fill="#c3d3b8" />
        <g stroke="#f7f6f3" strokeWidth="9" strokeLinecap="round" fill="none">
          <path d="M0 80h400M0 162h400M118 0v240M214 0v240M300 0v240" />
        </g>
        <path d="M-10 214 C 90 190, 150 130, 230 120 S 360 70, 420 40" stroke="#0b0f17" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M-10 214 C 90 190, 150 130, 230 120 S 360 70, 420 40" stroke="#ffd60a" strokeWidth="2" strokeDasharray="10 10" fill="none" />
      </svg>
      <span className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${pin[0]}%`, top: `${pin[1]}%` }}>
        <span className="ping absolute bottom-0 left-1/2 -ml-3 h-6 w-6 rounded-full bg-[var(--blue)]/40" />
        <motion.span
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.2 }}
          className="relative grid h-10 w-10 place-items-center rounded-full rounded-br-none bg-[var(--blue)] text-white shadow-[0_10px_20px_-8px_rgb(20_96_242/0.7)] [transform:rotate(45deg)]"
        >
          <MapPin className="h-5 w-5 -rotate-45" />
        </motion.span>
      </span>
      <span className="absolute bottom-2.5 left-2.5 rounded-full bg-[var(--night)] px-3 py-1.5 text-[13px] font-medium text-white">Mapa ilustrativo</span>
    </div>
  );
}

function AddressCard({ partner }: { partner: Partner }) {
  const { toast } = useProto();
  return (
    <section aria-labelledby="endereco" className={panel}>
      <h2 id="endereco" className={sideH2}>
        Endereço
      </h2>
      <div className="mt-4">
        <IllustratedMap pin={partner.pin} />
      </div>
      <address className="mt-4 text-[16px] leading-relaxed text-[var(--ink)] not-italic">
        <span className="font-semibold">{partner.name}</span>
        <br />
        {partner.street}, {partner.district}
        <br />
        <span className="text-[var(--ink-mute)]">
          {partner.city} – {partner.state} · CEP {partner.postalCode}
        </span>
      </address>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => toast("Abriria o endereço no Google Maps (endereço de exemplo).")}
          className="rounded-full bg-[var(--ink)] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--blue)]"
        >
          Abrir no Maps
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => toast("Traçaria a rota a partir da sua localização, se você permitir.")}
          className="rounded-full bg-[var(--paper-3)] py-3 text-[15px] font-semibold text-[var(--ink)] transition-colors hover:bg-[#d8d4cb]"
        >
          Traçar rota
        </motion.button>
      </div>
    </section>
  );
}

function HoursCard({ partner }: { partner: Partner }) {
  const [now, setNow] = useState<{ day: number; time: number } | null>(null);

  useEffect(() => {
    const update = () => setNow(nowInSaoPaulo());
    const frame = requestAnimationFrame(update);
    const timer = window.setInterval(update, 60_000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  const open = now ? isOpen(partner, now) : null;

  return (
    <section aria-labelledby="horario" className={panel}>
      <div className="flex items-center justify-between gap-3">
        <h2 id="horario" className={sideH2}>
          Horário de funcionamento
        </h2>
        <AnimatePresence>
          {open !== null && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold ${
                open ? "bg-[#dff3e8] text-[#0c6b42]" : "bg-[#f8e2df] text-[#a1262b]"
              }`}
            >
              <span className={`relative h-2 w-2 rounded-full ${open ? "bg-[#0f9d63]" : "bg-[#c0262d]"}`}>
                {open && <span className="ping absolute inset-0 rounded-full bg-[#0f9d63]" />}
              </span>
              {open ? "Aberto agora" : "Fechado agora"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <dl className="mt-4 flex flex-col gap-1">
        {hourRows(partner).map((row) => {
          const today = now ? row.days.includes(now.day) : false;
          return (
            <div
              key={row.label}
              className={`flex items-center justify-between rounded-[8px] px-3 py-2.5 text-[15.5px] ${
                today ? "bg-[var(--paper-3)] font-semibold text-[var(--ink)]" : "text-[var(--ink-mute)]"
              }`}
            >
              <dt>
                {row.label}
                {today && <span className="ml-2 text-[13px] font-semibold text-[#0b46b8]">hoje</span>}
              </dt>
              <dd className="tnum">{row.value}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const initials = partner.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section aria-labelledby="parceiro-card" className={panel}>
      <h2 id="parceiro-card" className="sr-only">
        Sobre o parceiro
      </h2>
      <div className="flex items-center gap-4">
        <span className="t-num grid h-14 w-14 shrink-0 place-items-center rounded-[6px] bg-[var(--night)] text-[18px] text-[var(--signal)]">{initials}</span>
        <div>
          <p className="text-[17px] font-semibold text-[var(--ink)]">{partner.name}</p>
          <p className="text-[15px] text-[var(--ink-mute)]">
            {partner.city} · parceiro desde {partner.since}
          </p>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-2 text-[15px] font-medium text-[var(--ink)]">
        <Shield className="h-5 w-5 text-[var(--blue)]" /> Parceiro verificado AutosFlow
      </p>
      <Link href={`/prototipo/servicos?q=${encodeURIComponent(partner.name)}`} className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--blue)]">
        Ver outros serviços deste parceiro
        <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Relacionados
   ---------------------------------------------------------------------- */

function Related({ services }: { services: Service[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const scroll = (direction: number) => railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.8, behavior: "smooth" });

  if (services.length === 0) return null;

  return (
    <section aria-label="Serviços relacionados" className="mt-28 sm:mt-36">
      <div className="flex items-end justify-between gap-4">
        <WordReveal as="h2" text="Serviços relacionados" className="t-display text-[clamp(2.2rem,4.4vw,4.5rem)]" />
        <div className="flex gap-2 lg:hidden">
          <button type="button" onClick={() => scroll(-1)} aria-label="Anteriores" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--paper-3)] text-[var(--ink)]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Próximos" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--paper-3)] text-[var(--ink)]">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <ul ref={railRef} className="rail mt-10 auto-cols-[82%] gap-6 sm:auto-cols-[46%] lg:auto-cols-[calc((100%-4.5rem)/4)]">
        {services.map((service, index) => (
          <motion.li
            key={service.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: index * 0.08, ease }}
          >
            <ServiceCard service={service} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 82vw" />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

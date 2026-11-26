"use client";

/**
 * FE-10 — Visite a loja: agenda e mapa (proposta).
 * Foto real do showroom, mapa ilustrativo do Ipiranga e agendamento.
 * Horário de EXEMPLO (seg a sáb, 9h às 18h) até a loja confirmar o real.
 */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";

import Image from "@/components/image";
import { contact, manifesto } from "@/data/brand";

import { Calendar, Check, Clock, MapPin } from "../icons";
import { Reveal, WordReveal, ease } from "../motion";
import { FeTag } from "../shell";
import { MediaReveal, PillButton, PillLink } from "../ui";

const hours = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:00"];
const full = new Set(["10:30", "16:00"]);
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${contact.address.street}, ${contact.address.district}, ${contact.address.city} - ${contact.address.state}`,
)}`;

function spNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, hour: (Number(get("hour")) % 24) + Number(get("minute")) / 60 };
}

function nextDays(count: number) {
  const out: { key: string; week: string; date: string }[] = [];
  const date = new Date();
  while (out.length < count) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() === 0) continue;
    const week = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date).replace(".", "");
    out.push({
      key: date.toISOString().slice(0, 10),
      week: `${week.charAt(0).toUpperCase()}${week.slice(1)}`,
      date: `${date.getDate()}/${date.getMonth() + 1}`,
    });
  }
  return out;
}

/* Mapa ilustrativo: quadras, o parque do Museu do Ipiranga, a Rua Silva
   Bueno em azul e o pino da loja. Não é cartografia: é orientação. */
function MiniMap() {
  const draw = (delay: number) => ({
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
    transition: { duration: 1.6, delay, ease },
  });
  return (
    <figure className="overflow-hidden rounded-[6px] bg-white">
      <svg
        viewBox="0 0 480 250"
        role="img"
        aria-label="Mapa ilustrativo do entorno da loja: Rua Silva Bueno, no Ipiranga, perto do Museu do Ipiranga"
        className="block h-auto w-full"
      >
        <rect width="480" height="250" fill="#0b111d" />
        {/* quadras */}
        {[
          [196, 22, 70, 44],
          [278, 22, 86, 44],
          [376, 22, 84, 44],
          [196, 80, 70, 52],
          [278, 80, 86, 52],
          [376, 80, 84, 40],
          [24, 150, 82, 76],
          [118, 150, 66, 76],
          [196, 146, 70, 80],
          [278, 168, 86, 58],
          [376, 150, 84, 76],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#141c2c" />
        ))}
        {/* parque do Museu do Ipiranga */}
        <rect x="24" y="22" width="160" height="112" rx="6" fill="#123326" />
        <rect x="74" y="58" width="60" height="22" rx="2" fill="#1f4a37" />
        <text x="104" y="104" textAnchor="middle" fontSize="12" fontWeight="600" fill="rgb(244 242 238 / 0.62)">
          Museu do Ipiranga
        </text>
        {/* ruas */}
        <motion.path d="M0 140 H480" stroke="#26324a" strokeWidth="7" fill="none" {...draw(0)} />
        <motion.path d="M190 0 V250" stroke="#26324a" strokeWidth="6" fill="none" {...draw(0.1)} />
        <motion.path d="M272 0 V250" stroke="#26324a" strokeWidth="5" fill="none" {...draw(0.2)} />
        <motion.path d="M370 0 V250" stroke="#26324a" strokeWidth="5" fill="none" {...draw(0.3)} />
        {/* Rua Silva Bueno, em destaque */}
        <motion.path
          d="M0 74 C 120 74, 200 72, 272 74 S 420 74, 480 74"
          stroke="var(--blue-glow)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          {...draw(0.5)}
        />
        <text x="286" y="66" fontSize="12" fontWeight="600" fill="#9fc0ff">
          R. Silva Bueno
        </text>
        <text x="380" y="158" fontSize="11.5" fill="rgb(244 242 238 / 0.45)">
          Ipiranga
        </text>
        {/* pino da loja */}
        <motion.circle cx="404" cy="74" r="10" fill="var(--signal)" opacity="0.5" animate={{ r: [10, 30], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
        <circle cx="404" cy="74" r="9" fill="var(--signal)" stroke="#05080f" strokeWidth="3" />
        <rect x="350" y="94" width="108" height="26" rx="13" fill="#f4f2ee" />
        <text x="404" y="111.5" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0b0f17">
          AutosFlow
        </text>
      </svg>
      <figcaption className="flex items-center justify-between gap-4 px-4 py-3 text-[13px] text-[var(--ink-mute)]">
        <span>{contact.address.street} · {contact.address.district}</span>
        <span>mapa ilustrativo</span>
      </figcaption>
    </figure>
  );
}

export function Visit() {
  const [open, setOpen] = useState(false);
  const [openNow, setOpenNow] = useState<boolean | null>(null);
  const [days, setDays] = useState<{ key: string; week: string; date: string }[]>([]);
  const [day, setDay] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(false);
  const panelId = useId();
  const phoneId = useId();

  useEffect(() => {
    // Datas e "aberto agora" dependem do relógio: só no navegador.
    const frame = requestAnimationFrame(() => {
      const now = spNow();
      setOpenNow(now.day >= 1 && now.day <= 6 && now.hour >= 9 && now.hour < 18);
      const list = nextDays(6);
      setDays(list);
      setDay(list[0]?.key ?? null);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const chosen = days.find((d) => d.key === day);

  return (
    <section id="loja" aria-label="Visite a loja" className="paper section-y relative">
      <FeTag code="FE-10" title="Visite a loja: agenda e mapa" status="Proposta" className="left-4 top-6 sm:left-10" />
      <div className="container-p relative z-[2] grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-7">
          <MediaReveal parallax={6} className="aspect-[4/5] rounded-[6px] sm:aspect-[4/3] lg:aspect-auto lg:h-[min(86vh,54rem)]">
            <Image
              src="/imagens/loja-showroom.jpg"
              alt="Showroom da AutosFlow no Ipiranga, com um Corolla Cross e um Audi Q3 do estoque"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </MediaReveal>
          <AnimatePresence>
            {openNow !== null && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-5 left-5 z-10 inline-flex items-center gap-2.5 rounded-full bg-[var(--night)] py-2.5 pr-5 pl-4 text-[15px] font-semibold text-white"
              >
                <span className="relative grid h-2.5 w-2.5 place-items-center">
                  <span className={`ping absolute h-2.5 w-2.5 rounded-full ${openNow ? "bg-[#3ddc84]" : "bg-white/40"}`} />
                  <span className={`h-2.5 w-2.5 rounded-full ${openNow ? "bg-[#3ddc84]" : "bg-white/40"}`} />
                </span>
                {openNow ? "Aberto agora" : "Fechado agora"}
              </motion.span>
            )}
          </AnimatePresence>
          <p className="absolute bottom-5 left-5 z-10 rounded-full bg-[var(--night)]/80 px-4 py-2 text-[13px] text-white/80">
            Showroom AutosFlow · Ipiranga, São Paulo
          </p>
        </div>

        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <WordReveal as="h2" text="Venha ver de perto." className="t-display" />
          <Reveal delay={0.15}>
            <p className="t-lead mt-6 text-[var(--ink-mute)]">{manifesto.order}</p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10 flex flex-col gap-5">
            <p className="flex gap-4 text-[17px]">
              <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-[var(--blue-glow)]" />
              <span>
                <b className="font-semibold">{contact.address.street}</b>
                <br />
                <span className="text-[var(--ink-mute)]">
                  {contact.address.district}, {contact.address.city} · {contact.address.state}
                </span>
              </span>
            </p>
            <p className="flex gap-4 text-[17px]">
              <Clock className="mt-0.5 h-6 w-6 shrink-0 text-[var(--blue-glow)]" />
              <span>
                <b className="font-semibold">Seg a sáb · 9h às 18h</b>
                <br />
                <span className="text-[var(--ink-mute)]">Horário de exemplo, a confirmar com a loja</span>
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-8">
            <MiniMap />
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink href={mapsHref} external tone="white">
              Como chegar
            </PillLink>
            <PillButton tone="ghost-paper" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
              {open ? "Fechar agenda" : "Agendar visita"}
            </PillButton>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-[10px] bg-white p-5 sm:p-7">
                  <AnimatePresence mode="wait" initial={false}>
                    {booked ? (
                      <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex items-start gap-4">
                        <motion.span
                          initial={{ rotate: -20, scale: 0 }}
                          animate={{ rotate: [0, -10, 10, 0], scale: 1 }}
                          transition={{ duration: 0.7 }}
                          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]"
                        >
                          <Check className="h-7 w-7" />
                        </motion.span>
                        <div>
                          <p className="text-[20px] font-semibold">
                            Visita marcada: {chosen ? `${chosen.week} ${chosen.date}` : ""}, {hour}
                          </p>
                          <p className="mt-1 text-[15px] text-[var(--ink-mute)]">
                            Confirmação pelo WhatsApp. No produto, o horário fica bloqueado na agenda do backoffice.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="form" exit={{ opacity: 0 }}>
                        <p className="flex items-center gap-2 text-[14px] font-semibold">
                          <Calendar className="h-4 w-4 text-[var(--blue-glow)]" /> Escolha o dia
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                          {days.map((d) => (
                            <button
                              key={d.key}
                              type="button"
                              aria-pressed={day === d.key}
                              onClick={() => setDay(d.key)}
                              className={`flex flex-col items-center rounded-[6px] py-2.5 transition-colors ${
                                day === d.key ? "bg-[var(--ink)] text-white" : "bg-[var(--paper)] hover:bg-[var(--paper-3)]"
                              }`}
                            >
                              <span className="text-[13px] opacity-70">{d.week}</span>
                              <span className="t-num text-[17px]">{d.date}</span>
                            </button>
                          ))}
                        </div>
                        <p className="mt-6 text-[14px] font-semibold">Horário</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {hours.map((h) => (
                            <button
                              key={h}
                              type="button"
                              disabled={full.has(h)}
                              aria-pressed={hour === h}
                              onClick={() => setHour(h)}
                              title={full.has(h) ? "Horário lotado" : undefined}
                              className={`t-num rounded-full px-4 py-2 text-[15px] transition-colors disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[#a3a39e] disabled:line-through ${
                                hour === h ? "bg-[var(--blue)] text-white" : "bg-[var(--paper)] hover:bg-[var(--paper-3)]"
                              }`}
                            >
                              {h}
                            </button>
                          ))}
                        </div>
                        <label htmlFor={phoneId} className="mt-6 block text-[14px] font-semibold">
                          Seu WhatsApp
                        </label>
                        <input
                          id={phoneId}
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="(11) 99999-9999"
                          className="mt-2 w-full rounded-[6px] bg-[var(--paper)] px-4 py-4 text-[17px] font-medium text-[var(--ink)] outline-none ring-[var(--blue)] placeholder:text-[#8a8a85] focus:ring-2"
                        />
                        {error && (
                          <p role="alert" className="mt-3 text-[15px] font-medium text-[#ff8a80]">
                            {error}
                          </p>
                        )}
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            if (!hour) return setError("Escolha um horário.");
                            if (phone.replace(/\D/g, "").length < 10) return setError("Informe o WhatsApp com DDD.");
                            setError("");
                            setBooked(true);
                          }}
                          className="mt-6 w-full rounded-full bg-[var(--blue)] py-4 text-[17px] font-semibold text-white"
                        >
                          Confirmar visita
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

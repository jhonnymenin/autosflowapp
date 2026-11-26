"use client";

/**
 * FE-07 — Venda seu carro: pré-avaliação rápida (proposta).
 * A peça viva da home: uma placa Mercosul gigante, em 3D, onde a pessoa
 * digita a placa; depois, a quilometragem e o WhatsApp. O resultado aparece
 * num velocímetro de valor. A estimativa é de EXEMPLO; no produto viria da
 * FIPE do modelo, ajustada pela avaliação da equipe.
 */
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

import { contact, journeySteps, pitch } from "@/data/brand";

import { ArrowRight, WhatsApp } from "../icons";
import { Reveal, WordReveal, ease } from "../motion";
import { FeTag } from "../shell";
import { Odometer } from "../ui";
import { ValueGauge } from "./b-gauge";
import { MercosulPlate, PLATE } from "./b-plate";

/** Mesmo texto do site; montado aqui para não puxar `lib/site` (e o estoque) para o cliente. */
const sellHref = `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(
  "Olá! Quero vender meu carro com a AutosFlow e gostaria de uma avaliação.",
)}`;

function estimate(plate: string, km: number): [number, number] {
  let hash = 7;
  for (const char of plate) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const base = 58000 + (hash % 72) * 1000;
  const wear = 1 - (Math.min(km, 250000) / 250000) * 0.32;
  const mid = base * wear;
  const round = (v: number) => Math.round(v / 1000) * 1000;
  return [round(mid * 0.95), round(mid * 1.05)];
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const CYCLE = 0.55;
const PAUSE = 1.4;

export function Sell() {
  const [plate, setPlate] = useState("");
  const [km, setKm] = useState(60000);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const ids = { plate: useId(), km: useId(), phone: useId(), err: useId(), hint: useId() };

  const valid = PLATE.test(plate);
  const fill = `${(km / 250000) * 100}%`;
  const total = journeySteps.length * CYCLE + PAUSE;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid) return setError("Confira a placa (ex.: ABC1D23).");
    if (phone.replace(/\D/g, "").length < 10) return setError("Informe o WhatsApp com DDD.");
    setError("");
    setState("loading");
    window.setTimeout(() => {
      setRange(estimate(plate, km));
      setState("done");
    }, 1500);
  }

  return (
    <section id="vender" aria-label="Venda seu carro" className="night grain section-y relative scroll-mt-20 overflow-hidden">
      <FeTag code="FE-07" title="Venda seu carro: pré-avaliação rápida" status="Proposta" className="left-4 top-6 sm:left-10" />

      {/* Poça de luz azul atrás da placa. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[18%] right-[-12%] h-[70vw] max-h-[60rem] w-[70vw] max-w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgb(20_96_242/0.26),transparent)]"
      />

      <div className="container-p relative z-[2] grid gap-20 lg:grid-cols-12 lg:gap-12">
        {/* ---------------- O que a AutosFlow faz ---------------- */}
        <div className="lg:col-span-5">
          <WordReveal as="h2" text="Você acompanha. A AutosFlow cuida." className="t-display text-[clamp(2.2rem,3.6vw,3.6rem)]" />
          <Reveal delay={0.2}>
            <p className="t-lead mt-8 max-w-md text-[var(--on-night-mute)]">{pitch.lead}</p>
          </Reveal>

          <ol className="relative mt-14 flex flex-col pl-9" aria-label="O que a AutosFlow faz por você">
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-[2px] rounded-full bg-white/10" />
            <motion.span
              aria-hidden="true"
              className="absolute left-[5px] h-14 w-[6px] rounded-full bg-[linear-gradient(180deg,transparent,var(--blue-glow),#fff)]"
              initial={{ top: "0%", opacity: 0 }}
              animate={{ top: ["0%", "88%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: journeySteps.length * CYCLE, repeat: Infinity, repeatDelay: PAUSE, ease: "linear" }}
            />
            {journeySteps.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07, ease }}
                className="relative py-3"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute top-1/2 -left-9 h-4 w-4 -translate-y-1/2 rounded-full"
                  animate={{
                    backgroundColor: ["rgb(255 255 255 / 0.16)", "#ffd60a", "rgb(255 255 255 / 0.16)"],
                    scale: [1, 1.35, 1],
                  }}
                  transition={{ duration: total, repeat: Infinity, delay: i * CYCLE, times: [0, 0.05, 0.22] }}
                />
                <motion.span
                  className="block text-[clamp(1.1rem,1.5vw,1.375rem)] font-medium tracking-[-0.015em]"
                  animate={{ color: ["rgb(244 242 238 / 0.62)", "#f4f2ee", "rgb(244 242 238 / 0.62)"] }}
                  transition={{ duration: total, repeat: Infinity, delay: i * CYCLE, times: [0, 0.05, 0.3] }}
                >
                  {step}
                </motion.span>
              </motion.li>
            ))}
          </ol>

          <a
            href={sellHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 inline-flex items-center gap-2.5 text-[16px] font-semibold text-[var(--on-night)]"
          >
            <WhatsApp className="h-5 w-5 text-[#3ddc84]" />
            <span className="border-b border-white/25 pb-0.5 transition-colors group-hover:border-white">
              Prefere conversar? Fale pelo WhatsApp
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>

        {/* ---------------- A placa ---------------- */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {state !== "done" ? (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                exit={{ opacity: 0, y: -24, transition: { duration: 0.4, ease } }}
                aria-describedby={error ? ids.err : undefined}
              >
                <Reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="t-title">Quanto vale o seu carro?</h3>
                    <span className="t-spec text-[var(--signal)]">Leva 30 segundos</span>
                  </div>
                  <p id={ids.hint} className="mt-3 text-[17px] text-[var(--on-night-mute)]">
                    Digite a placa direto nela. Depois, a quilometragem e o seu WhatsApp.
                  </p>
                </Reveal>

                <Reveal delay={0.15} className="mt-10 sm:mt-12">
                  <label htmlFor={ids.plate} className="t-spec mb-4 block text-[var(--on-night-mute)]">
                    Placa
                  </label>
                  <MercosulPlate
                    id={ids.plate}
                    value={plate}
                    onChange={(value) => {
                      setPlate(value);
                      setError("");
                    }}
                    loading={state === "loading"}
                    invalid={!!error && !valid}
                    describedBy={ids.hint}
                  />
                </Reveal>

                <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <label htmlFor={ids.km} className="t-spec text-[var(--on-night-mute)]">
                        Quilometragem
                      </label>
                      <span className="t-num text-[clamp(1.5rem,2.2vw,2rem)] leading-none">
                        {km.toLocaleString("pt-BR")}
                        <span className="ml-1 text-[0.55em] text-[var(--on-night-mute)]">km</span>
                      </span>
                    </div>
                    <input
                      id={ids.km}
                      type="range"
                      min={0}
                      max={250000}
                      step={1000}
                      value={km}
                      onChange={(event) => setKm(Number(event.target.value))}
                      aria-valuetext={`${km.toLocaleString("pt-BR")} quilômetros`}
                      className="km-range mt-6 w-full"
                      style={{ background: `linear-gradient(90deg, var(--blue) 0 ${fill}, rgb(255 255 255 / 0.14) ${fill} 100%)` }}
                    />
                    <div className="mt-3 flex justify-between text-[13px] text-[var(--on-night-mute)]">
                      <span>0 km</span>
                      <span>250 mil km</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={ids.phone} className="t-spec text-[var(--on-night-mute)]">
                      WhatsApp
                    </label>
                    <input
                      id={ids.phone}
                      value={phone}
                      onChange={(event) => setPhone(formatPhone(event.target.value))}
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(11) 99999-9999"
                      className="mt-4 w-full rounded-[6px] bg-white/[0.07] px-5 py-4 text-[18px] font-medium text-[var(--on-night)] outline-none ring-[var(--blue-glow)] placeholder:text-white/30 focus:ring-2"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      id={ids.err}
                      role="alert"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: [0, -6, 6, -3, 0] }}
                      exit={{ opacity: 0 }}
                      className="mt-8 text-[16px] font-medium text-[#ff8a80]"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={state === "idle" ? { scale: 1.015 } : undefined}
                  whileTap={{ scale: 0.98 }}
                  disabled={state === "loading"}
                  className="group mt-10 flex w-full items-center justify-between gap-4 rounded-full bg-[var(--blue)] py-2.5 pr-2.5 pl-8 text-[18px] font-semibold text-white disabled:opacity-90"
                >
                  {state === "loading" ? (
                    <span className="flex items-center gap-3 py-2.5">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-[3px] border-white/30 border-t-white"
                      />
                      Consultando FIPE e histórico…
                    </span>
                  ) : (
                    <>
                      <span>Ver estimativa</span>
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[var(--blue)]">
                        <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                    </>
                  )}
                </motion.button>
                <p className="mt-5 text-[14px] leading-relaxed text-[var(--on-night-mute)]">
                  Usamos seus dados só para a avaliação e para falar com você sobre a venda.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                aria-live="polite"
              >
                <p className="t-spec text-[var(--on-night-mute)]">
                  Placa {plate} · {km.toLocaleString("pt-BR")} km
                </p>
                <h3 className="t-title mt-3">Faixa estimada para o seu carro</h3>

                <div className="mx-auto mt-6 max-w-[34rem]">
                  <ValueGauge range={range} />
                </div>

                <p className="t-num -mt-6 text-center text-[clamp(2.6rem,6vw,5.5rem)] leading-none">
                  <span className="mr-2 align-top text-[0.4em] text-[var(--on-night-mute)]">R$</span>
                  <Odometer value={String(range[0] / 1000)} />
                  <span className="mx-[0.25em] text-[0.45em] text-[var(--on-night-mute)]">a</span>
                  <Odometer value={String(range[1] / 1000)} />
                  <span className="ml-2 text-[0.4em] text-[var(--on-night-mute)]">mil</span>
                </p>

                <p className="t-lead mx-auto mt-10 max-w-xl text-center text-[var(--on-night)]">
                  Recebemos seu contato. A gente te chama no WhatsApp em até 2 horas para marcar a avaliação.
                </p>
                <p className="mx-auto mt-6 flex max-w-xl gap-3 rounded-[6px] bg-white/[0.06] px-5 py-4 text-[14px] leading-relaxed text-[var(--on-night-mute)]">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--signal)]" />
                  Estimativa de exemplo neste protótipo. No produto: FIPE do modelo, ajustada pela avaliação da
                  equipe. O lead cai no backoffice com a origem “home”.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <a
                    href={sellHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#0f7a40] px-7 py-4 text-[16px] font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    <WhatsApp className="h-5 w-5" /> Falar agora
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setState("idle");
                      setPlate("");
                    }}
                    className="rounded-full bg-white/[0.08] px-7 py-4 text-[16px] font-semibold transition-colors hover:bg-white/[0.14]"
                  >
                    Avaliar outro carro
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

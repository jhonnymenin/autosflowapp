"use client";

/**
 * FE-02 — Busca rápida com linguagem natural, logo abaixo do carrossel, como
 * no material de apoio: campo livre que entende frases e preenche os filtros
 * (chips editáveis em "Entendi"), sugestões ao digitar, os três filtros com
 * "Buscar carros" e os exemplos do wireframe em "Experimente".
 */
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import Image from "@/components/image";

import {
  catalogHref,
  chipsOf,
  filterCars,
  hasFilters,
  norm,
  parseQuery,
  removeKey,
  type Parsed,
} from "../../_lib/search";
import type { ProtoCar } from "../../_lib/types";
import { ArrowRight, Close, Search, Sparkle } from "../icons";
import { FeTag, useProto } from "../shell";
import { ease } from "../motion";

/** Exemplos do wireframe do time. */
const examples = ["Honda Civic até 100 mil", "Jeep Compass automático em Campinas", "Onix 2020 por menos de 80 mil"];
const placeholders = ["Renault Kwid por menos de 50 mil em São Paulo", ...examples];

const priceOptions = [
  { value: "", label: "Qualquer valor" },
  { value: "0-50000", label: "Até R$ 50 mil" },
  { value: "50000-80000", label: "R$ 50 a 80 mil" },
  { value: "80000-110000", label: "R$ 80 a 110 mil" },
  { value: "110000-", label: "Acima de R$ 110 mil" },
];

const bodyOptions = [
  { value: "", label: "Todos os tipos" },
  { value: "suv", label: "SUV" },
  { value: "hatch", label: "Hatch" },
  { value: "sedan", label: "Sedã" },
  { value: "picape", label: "Picape" },
];

function useTypewriter(lines: string[], active: boolean) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return;
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer: number;
    const tick = () => {
      const current = lines[line];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1800);
          return;
        }
        timer = window.setTimeout(tick, 50);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
        }
        timer = window.setTimeout(tick, 20);
      }
    };
    timer = window.setTimeout(tick, 900);
    return () => window.clearTimeout(timer);
  }, [lines, active]);
  return text;
}

export function QuickSearch({ cars }: { cars: ProtoCar[] }) {
  const { toast } = useProto();
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState<Parsed>({});
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const typing = useRef<number | null>(null);

  const placeholder = useTypewriter(placeholders, !text);
  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))].sort((a, b) => a.localeCompare(b, "pt-BR")), [cars]);

  const suggestions = useMemo(() => {
    const q = norm(text);
    if (q.length < 2) return [];
    const found: { name: string; version: string }[] = [];
    for (const car of cars) {
      const haystack = norm(`${car.make} ${car.model} ${car.version}`);
      if (q.split(/\s+/).every((word) => haystack.includes(word))) found.push({ name: `${car.make} ${car.model}`, version: car.version });
    }
    return found.slice(0, 5);
  }, [text, cars]);

  const results = useMemo(() => filterCars(cars, parsed), [cars, parsed]);
  const chips = chipsOf(parsed);
  const filtered = hasFilters(parsed);

  function update(value: string) {
    setText(value);
    setParsed(parseQuery(value, cars));
    setOpen(true);
    setActive(-1);
  }

  function typeExample(example: string) {
    if (typing.current) window.clearInterval(typing.current);
    let i = 0;
    inputRef.current?.focus();
    typing.current = window.setInterval(() => {
      i += 1;
      update(example.slice(0, i));
      if (i >= example.length && typing.current) {
        window.clearInterval(typing.current);
        typing.current = null;
        setOpen(false);
      }
    }, 26);
  }

  useEffect(
    () => () => {
      if (typing.current) window.clearInterval(typing.current);
    },
    [],
  );

  const priceValue = parsed.minPrice || parsed.maxPrice ? `${parsed.minPrice ?? 0}-${parsed.maxPrice ?? ""}` : "";

  return (
    <section id="busca" aria-label="Buscar carros" className="container-p relative z-20 -mt-28 scroll-mt-24 sm:-mt-32">
      <FeTag code="FE-02" title="Busca rápida com linguagem natural" className="-top-12 left-4 sm:left-10" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease }}
        className="rounded-[20px] bg-white p-3 text-[var(--ink)] shadow-[0_50px_100px_-40px_rgb(5_8_15/0.6)] sm:p-5"
      >
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
            if (!filtered && text.trim()) toast(`Sem filtro reconhecido: buscaria pelo texto “${text.trim()}”.`);
          }}
          className="relative"
        >
          <motion.div
            animate={{ boxShadow: focused ? "inset 0 0 0 2px #1460f2" : "inset 0 0 0 0px #1460f2" }}
            className="flex items-center gap-3 rounded-[14px] bg-[var(--paper-2)] px-4 sm:px-6"
          >
            <motion.span animate={{ rotate: focused ? 90 : 0, scale: focused ? 1.15 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 16 }}>
              <Sparkle className="h-6 w-6 text-[var(--blue)]" />
            </motion.span>
            <div className="relative min-w-0 flex-1">
              <input
                ref={inputRef}
                value={text}
                onChange={(event) => update(event.target.value)}
                onFocus={() => {
                  setFocused(true);
                  setOpen(true);
                }}
                onBlur={() => {
                  setFocused(false);
                  window.setTimeout(() => setOpen(false), 150);
                }}
                onKeyDown={(event) => {
                  if (!suggestions.length) return;
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActive((a) => (a + 1) % suggestions.length);
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActive((a) => (a - 1 + suggestions.length) % suggestions.length);
                  } else if (event.key === "Enter" && active >= 0) {
                    event.preventDefault();
                    update(suggestions[active].name);
                    setOpen(false);
                  } else if (event.key === "Escape") setOpen(false);
                }}
                role="combobox"
                aria-expanded={open && suggestions.length > 0}
                aria-controls={listId}
                aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
                aria-label="Descreva o carro que você procura"
                autoComplete="off"
                className="w-full bg-transparent py-5 text-[17px] font-medium outline-none sm:py-6 sm:text-[20px]"
              />
              {!text && (
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-[17px] text-[var(--ink-mute)] sm:text-[20px]">
                  Ex.: {placeholder}
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="ml-0.5 inline-block h-[1.1em] w-[2px] bg-[var(--blue)]" />
                </span>
              )}
            </div>
            {text && (
              <button
                type="button"
                onClick={() => {
                  update("");
                  inputRef.current?.focus();
                }}
                aria-label="Limpar busca"
                className="grid h-9 w-9 place-items-center rounded-full text-[var(--ink-mute)] hover:bg-white"
              >
                <Close className="h-5 w-5" />
              </button>
            )}
          </motion.div>

          <AnimatePresence>
            {open && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-[14px] bg-white p-2 shadow-[0_30px_70px_-20px_rgb(5_8_15/0.45)]"
              >
                <p className="t-spec px-4 pt-2 pb-1 text-[var(--ink-mute)]">Sugestões</p>
                <ul id={listId} role="listbox">
                  {suggestions.map((s, i) => (
                    <li
                      id={`${listId}-${i}`}
                      key={`${s.name}-${s.version}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        update(s.name);
                        setOpen(false);
                      }}
                      className={`cursor-pointer rounded-[10px] px-4 py-3 text-[16px] ${i === active ? "bg-[var(--paper)]" : "hover:bg-[var(--paper-2)]"}`}
                    >
                      <span className="font-semibold">{s.name}</span> <span className="text-[var(--ink-mute)]">· {s.version}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* O que o site entendeu: chips editáveis antes de buscar. */}
          <AnimatePresence initial={false}>
            {text.trim() && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-2 px-1 pt-4">
                  {filtered ? (
                    <>
                      <span className="mr-1 text-[15px] font-semibold">Entendi:</span>
                      <LayoutGroup>
                        <AnimatePresence mode="popLayout">
                          {chips.map((chip) => (
                            <motion.span
                              layout
                              key={`${chip.key}-${chip.label}`}
                              initial={{ opacity: 0, scale: 0.6, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.6 }}
                              transition={{ type: "spring", stiffness: 500, damping: 28 }}
                              className="inline-flex items-center gap-1 rounded-full bg-[var(--ink)] py-1.5 pr-1.5 pl-3.5 text-[14px] font-medium text-white"
                            >
                              {chip.label}
                              <button
                                type="button"
                                aria-label={`Remover ${chip.label}`}
                                onClick={() => setParsed((p) => removeKey(p, chip.key))}
                                className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/20"
                              >
                                <Close className="h-3.5 w-3.5" />
                              </button>
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </LayoutGroup>
                      <span aria-live="polite" className="ml-auto flex items-center gap-3 text-[15px]">
                        <span className="flex -space-x-3">
                          {results.slice(0, 3).map((car) => (
                            <span key={car.slug} className="relative h-9 w-12 overflow-hidden rounded-[6px] ring-2 ring-white">
                              <Image src={car.photos[0].src} alt="" fill sizes="160px" className="object-cover" />
                            </span>
                          ))}
                        </span>
                        <b className="t-num">{results.length}</b> {results.length === 1 ? "carro combina" : "carros combinam"}
                        {results.length > 0 ? (
                          <Link href={catalogHref(parsed)} className="group inline-flex items-center gap-1 font-semibold text-[var(--blue)]">
                            Ver resultados <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        ) : (
                          <button type="button" onClick={() => toast("Alerta criado: avisamos no WhatsApp quando entrar um carro assim.")} className="font-semibold text-[var(--blue)]">
                            Criar alerta
                          </button>
                        )}
                      </span>
                    </>
                  ) : (
                    <span className="text-[15px] text-[var(--ink-mute)]">
                      Não conseguimos entender a frase, então vamos buscar pelo texto: <b className="text-[var(--ink)]">“{text.trim()}”</b>
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filtros clássicos + Buscar carros. */}
          <div className="grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2 sm:gap-3 sm:pt-4 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <LightSelect
              label="Marca"
              value={parsed.make ?? ""}
              onChange={(value) => setParsed((p) => ({ ...removeKey(p, "make"), make: value || undefined }))}
              options={[{ value: "", label: "Todas as marcas" }, ...makes.map((m) => ({ value: m, label: m }))]}
            />
            <LightSelect
              label="Faixa de preço"
              value={priceOptions.some((o) => o.value === priceValue) ? priceValue : ""}
              onChange={(value) => {
                const [min, max] = value.split("-");
                setParsed((p) => ({ ...p, minPrice: min && Number(min) > 0 ? Number(min) : undefined, maxPrice: max ? Number(max) : undefined }));
              }}
              options={priceOptions}
            />
            <LightSelect
              label="Carroceria"
              value={parsed.body ?? ""}
              onChange={(value) => setParsed((p) => ({ ...p, body: (value || undefined) as Parsed["body"] }))}
              options={bodyOptions}
            />
            <Link
              href={catalogHref(parsed)}
              className="group flex items-center justify-center gap-2 rounded-[14px] bg-[var(--blue)] px-8 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-[#0b46b8]"
            >
              <Search className="h-5 w-5" /> Buscar carros
            </Link>
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-2 px-1 pt-4 pb-1">
          <span className="text-[14px] text-[var(--ink-mute)]">Experimente:</span>
          {examples.map((example) => (
            <motion.button
              key={example}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => typeExample(example)}
              className="rounded-full bg-[#e8f0ff] px-3.5 py-1.5 text-[14px] font-medium text-[#0b46b8] transition-colors hover:bg-[var(--blue)] hover:text-white"
            >
              {example}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function LightSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="relative flex flex-col rounded-[14px] bg-[var(--paper-2)] px-4 pt-2.5 pb-2 transition-colors focus-within:bg-[#e8f0ff] hover:bg-[var(--paper)]">
      <span className="text-[12.5px] font-medium text-[var(--ink-mute)]">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="appearance-none bg-transparent pr-6 text-[16px] font-semibold outline-none">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute right-4 bottom-3 h-4 w-4 text-[var(--ink-mute)]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}

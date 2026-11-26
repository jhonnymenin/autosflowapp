"use client";

/**
 * FE-02 — Busca rápida com linguagem natural.
 * A pessoa escreve como falaria com um vendedor; o site mostra o que entendeu
 * em chips editáveis e, ao vivo, os carros do estoque real que combinam.
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
import { WordReveal, ease } from "../motion";

const examples = [
  "SUV automático até 130 mil",
  "Toyota híbrido",
  "Hatch até 70 mil",
  "Picape diesel",
  "Compass 2022 ou mais",
];

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
        timer = window.setTimeout(tick, 55);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
        }
        timer = window.setTimeout(tick, 22);
      }
    };
    timer = window.setTimeout(tick, 600);
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

  const placeholder = useTypewriter(examples, !text);
  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))].sort((a, b) => a.localeCompare(b, "pt-BR")), [cars]);

  const suggestions = useMemo(() => {
    const q = norm(text);
    if (q.length < 2) return [];
    const models = new Map<string, number>();
    for (const car of cars) {
      const name = `${car.make} ${car.model}`;
      const haystack = norm(`${name} ${car.version}`);
      if (q.split(/\s+/).every((word) => haystack.includes(word)) || haystack.includes(q)) {
        models.set(name, (models.get(name) ?? 0) + 1);
      }
    }
    return [...models.entries()].slice(0, 5);
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
    }, 28);
  }

  useEffect(
    () => () => {
      if (typing.current) window.clearInterval(typing.current);
    },
    [],
  );

  const priceValue = parsed.minPrice || parsed.maxPrice ? `${parsed.minPrice ?? 0}-${parsed.maxPrice ?? ""}` : "";

  return (
    <section id="busca" aria-labelledby="busca-titulo" className="night relative scroll-mt-20 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <FeTag code="FE-02" title="Busca rápida com linguagem natural" className="left-4 top-6 sm:left-10" />
      <div className="container-p">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <WordReveal as="h2" text="Diga do seu jeito." className="t-display lg:col-span-7" />
          <p id="busca-titulo" className="t-lead text-[var(--on-night-mute)] lg:col-span-5">
            Escreva como você falaria com um vendedor. A gente entende a frase e mostra, na hora, os carros do estoque que combinam.
          </p>
        </div>

        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
            if (!filtered && text.trim()) toast(`Sem filtro reconhecido: buscaria pelo texto “${text.trim()}”.`);
          }}
          className="relative mt-12"
        >
          <motion.div
            animate={{ boxShadow: focused ? "0 0 0 6px rgb(77 141 255 / 0.35)" : "0 0 0 0px rgb(77 141 255 / 0)" }}
            className="flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 text-[var(--ink)] sm:gap-4 sm:pl-8"
          >
            <motion.span animate={{ rotate: focused ? 90 : 0, scale: focused ? 1.15 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 16 }}>
              <Sparkle className="h-7 w-7 text-[var(--blue)]" />
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
                    update(suggestions[active][0]);
                    setOpen(false);
                  } else if (event.key === "Escape") setOpen(false);
                }}
                role="combobox"
                aria-expanded={open && suggestions.length > 0}
                aria-controls={listId}
                aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
                aria-label="Descreva o carro que você procura"
                autoComplete="off"
                className="w-full bg-transparent py-4 text-[18px] font-medium outline-none sm:py-5 sm:text-[clamp(1.25rem,1.8vw,1.6rem)]"
              />
              {!text && (
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-[18px] text-[var(--ink-mute)] sm:text-[clamp(1.25rem,1.8vw,1.6rem)]">
                  {placeholder}
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
                className="grid h-10 w-10 place-items-center rounded-full text-[var(--ink-mute)] hover:bg-[var(--paper)]"
              >
                <Close className="h-5 w-5" />
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-[var(--blue)] px-5 py-4 text-[16px] font-semibold text-white sm:px-8"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Buscar</span>
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {open && suggestions.length > 0 && (
              <motion.ul
                id={listId}
                role="listbox"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-4 top-full z-30 mt-3 overflow-hidden rounded-[18px] bg-white p-2 text-[var(--ink)] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.7)] sm:inset-x-8"
              >
                {suggestions.map(([name, count], i) => (
                  <li
                    id={`${listId}-${i}`}
                    key={name}
                    role="option"
                    aria-selected={i === active}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      update(name);
                      setOpen(false);
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3.5 text-[17px] ${i === active ? "bg-[var(--paper)]" : "hover:bg-[var(--paper-2)]"}`}
                  >
                    <span className="font-semibold">{name}</span>
                    <span className="text-[15px] text-[var(--ink-mute)]">
                      {count} {count === 1 ? "carro" : "carros"}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </form>

        {/* O que o site entendeu. */}
        <div className="mt-6 min-h-[3rem]">
          <AnimatePresence mode="wait" initial={false}>
            {text.trim() ? (
              <motion.div key="parsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap items-center gap-2">
                {filtered ? (
                  <>
                    <span className="mr-2 text-[16px] font-semibold">Entendi</span>
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
                            className="inline-flex items-center gap-1 rounded-full bg-[var(--signal)] py-1.5 pr-1.5 pl-4 text-[15px] font-semibold text-[var(--ink)]"
                          >
                            {chip.label}
                            <button
                              type="button"
                              aria-label={`Remover ${chip.label}`}
                              onClick={() => setParsed((p) => removeKey(p, chip.key))}
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-black/10"
                            >
                              <Close className="h-4 w-4" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </LayoutGroup>
                  </>
                ) : (
                  <span className="text-[16px] text-[var(--on-night-mute)]">
                    Não reconheci filtros nessa frase. Vamos buscar pelo texto: <b className="text-white">“{text.trim()}”</b>
                  </span>
                )}
              </motion.div>
            ) : (
              <motion.div key="examples" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap items-center gap-2">
                <span className="mr-2 text-[15px] text-[var(--on-night-mute)]">Experimente</span>
                {examples.slice(0, 4).map((example) => (
                  <motion.button
                    key={example}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => typeExample(example)}
                    className="rounded-full bg-white/[0.08] px-4 py-2 text-[15px] font-medium transition-colors hover:bg-white hover:text-[var(--ink)]"
                  >
                    {example}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Resultado ao vivo + filtros clássicos. */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatePresence initial={false} mode="wait">
              {!filtered && (
                <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <p className="pb-4 text-[18px] font-semibold">Comece por estes</p>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {cars.slice(0, 4).map((car, i) => (
                      <motion.li key={car.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.07, ease }}>
                        <Link href={`/veiculos/${car.slug}`} data-cursor="Ver" className="group block">
                          <span className="relative block aspect-[4/3] overflow-hidden rounded-[6px] bg-[var(--night-3)]">
                            <Image src={car.photos[0].src} alt={`${car.make} ${car.model}`} fill sizes="(min-width: 640px) 18vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          </span>
                          <span className="mt-3 block truncate text-[15px] font-semibold">
                            {car.model} {car.yearSort}
                          </span>
                          <span className="t-num block text-[15px] text-[var(--on-night-mute)]">{car.priceLabel}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {filtered && (
                <motion.div key="results" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4">
                    <p aria-live="polite" className="text-[18px] font-semibold">
                      {results.length === 0 ? "Nenhum carro com tudo isso agora." : (
                        <>
                          <span className="t-num text-[var(--signal)]">{results.length}</span> {results.length === 1 ? "carro combina" : "carros combinam"}
                        </>
                      )}
                    </p>
                    {results.length > 0 ? (
                      <Link href={catalogHref(parsed)} className="group inline-flex items-center gap-1.5 text-[16px] font-semibold text-[var(--blue-glow)]">
                        Ver no catálogo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <button type="button" onClick={() => toast("Alerta criado: avisamos no WhatsApp quando entrar um carro assim.")} className="text-[16px] font-semibold text-[var(--blue-glow)]">
                        Criar alerta para essa busca
                      </button>
                    )}
                  </div>
                  <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                      {results.slice(0, 4).map((car) => (
                        <motion.li layout key={car.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, ease }}>
                          <Link href={`/veiculos/${car.slug}`} data-cursor="Ver" className="group block">
                            <span className="relative block aspect-[4/3] overflow-hidden rounded-[6px] bg-[var(--night-3)]">
                              <Image src={car.photos[0].src} alt={`${car.make} ${car.model}`} fill sizes="(min-width: 640px) 18vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </span>
                            <span className="mt-3 block truncate text-[15px] font-semibold">
                              {car.model} {car.yearSort}
                            </span>
                            <span className="t-num block text-[15px] text-[var(--on-night-mute)]">{car.priceLabel}</span>
                          </Link>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 gap-2 self-start sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            <NightSelect
              label="Marca"
              value={parsed.make ?? ""}
              onChange={(value) => setParsed((p) => ({ ...removeKey(p, "make"), make: value || undefined }))}
              options={[{ value: "", label: "Todas as marcas" }, ...makes.map((m) => ({ value: m, label: m }))]}
            />
            <NightSelect
              label="Faixa de preço"
              value={priceOptions.some((o) => o.value === priceValue) ? priceValue : ""}
              onChange={(value) => {
                const [min, max] = value.split("-");
                setParsed((p) => ({ ...p, minPrice: min && Number(min) > 0 ? Number(min) : undefined, maxPrice: max ? Number(max) : undefined }));
              }}
              options={priceOptions}
            />
            <NightSelect
              label="Carroceria"
              value={parsed.body ?? ""}
              onChange={(value) => setParsed((p) => ({ ...p, body: (value || undefined) as Parsed["body"] }))}
              options={bodyOptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function NightSelect({
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
    <label className="relative flex items-center justify-between gap-3 rounded-full bg-white/[0.07] py-3 pr-11 pl-5 transition-colors focus-within:bg-white/[0.14] hover:bg-white/[0.12]">
      <span className="shrink-0 text-[14px] text-[var(--on-night-mute)]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 appearance-none bg-transparent text-right text-[16px] font-semibold text-white outline-none [&>option]:text-[var(--ink)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute right-4 h-4 w-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}

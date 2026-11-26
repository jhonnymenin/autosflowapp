"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import Image from "@/components/image";

import type { Service, ServiceCategory } from "../../_data/services";
import { FeTag, useProto } from "../../_components/shell";
import { ChevronDown, Close, Search, ServiceGlyph } from "../../_components/icons";
import { ease, WordReveal } from "../../_components/motion";
import { PillButton, VelocityMarquee } from "../../_components/ui";
import { ServiceCard } from "./service-card";

export interface ListingState {
  categoria: string;
  cidade: string;
  ordem: "relevancia" | "menor-preco" | "nome";
  q: string;
}

const PAGE = 8;
const MORE = 4;

const norm = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

function toQuery(state: ListingState): string {
  const qs = new URLSearchParams();
  if (state.categoria) qs.set("categoria", state.categoria);
  if (state.cidade) qs.set("cidade", state.cidade);
  if (state.ordem !== "relevancia") qs.set("ordem", state.ordem);
  if (state.q.trim()) qs.set("q", state.q.trim());
  return qs.toString();
}

const nightSelect =
  "appearance-none rounded-full bg-white/[0.08] py-3.5 pr-11 pl-5 text-[15px] font-medium text-[var(--on-night)] outline-none ring-[var(--blue-glow)] transition-colors hover:bg-white/[0.14] focus:ring-2 [&>option]:bg-white [&>option]:text-[var(--ink)]";

/**
 * FE-12 — listagem de serviços (v2 "Fluxo").
 * Faixa noturna com título, busca, categorias e filtros; grade editorial no
 * papel; convite para parceiros no campo azul. Filtros vivem na URL.
 */
export function Listing({
  initial,
  services,
  categories,
}: {
  initial: ListingState;
  services: Service[];
  categories: ServiceCategory[];
}) {
  const router = useRouter();
  const { openWaitlist } = useProto();
  const [state, setState] = useState<ListingState>(initial);
  const [visible, setVisible] = useState(PAGE);
  const searchId = useId();
  const cityId = useId();
  const sortId = useId();
  const firstRender = useRef(true);

  const cities = useMemo(
    () => [...new Set(services.map((s) => s.city))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    [services],
  );
  const categoryBySlug = useMemo(() => new Map(categories.map((c) => [c.slug, c])), [categories]);

  const update = (patch: Partial<ListingState>) => {
    setState((current) => ({ ...current, ...patch }));
    setVisible(PAGE);
  };

  // Filtros na URL, sem rolar a página; a digitação espera um instante.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      const qs = toQuery(state);
      router.replace(`/prototipo/servicos${qs ? `?${qs}` : ""}`, { scroll: false });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [state, router]);

  const filtered = useMemo(() => {
    const q = norm(state.q);
    const list = services.filter((service) => {
      if (state.categoria && service.category !== state.categoria) return false;
      if (state.cidade && service.city !== state.cidade) return false;
      if (q) {
        const haystack = norm(
          `${service.title} ${service.partner} ${categoryBySlug.get(service.category)?.label ?? ""} ${service.city}`,
        );
        if (!q.split(/\s+/).every((term) => haystack.includes(term))) return false;
      }
      return true;
    });
    if (state.ordem === "menor-preco") return [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (state.ordem === "nome") return [...list].sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    return list;
  }, [services, state, categoryBySlug]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;
  const hasFilters = Boolean(state.categoria || state.cidade || state.q.trim());
  const clear = () => update({ categoria: "", cidade: "", q: "", ordem: "relevancia" });
  const activeCategory = state.categoria ? categoryBySlug.get(state.categoria) : undefined;

  const chips = [{ slug: "", label: "Todos", icon: null as ServiceCategory["icon"] | null }].concat(
    categories.map((c) => ({ slug: c.slug, label: c.label, icon: c.icon })),
  );

  return (
    <>
      {/* ---------------------------------------------------------------
          Faixa noturna: título, busca, categorias e filtros
          ------------------------------------------------------------ */}
      <section className="night grain relative overflow-hidden pt-[calc(4.75rem+3rem)] pb-12 sm:pt-[calc(4.75rem+4.5rem)] sm:pb-16">
        <FeTag code="FE-12" title="Serviços: página de listagem" phase="Fase 2" className="top-[calc(4.75rem+0.75rem)] left-4 sm:left-8" />

        {/* Foto de fundo à direita, com zoom lento e véu. */}
        <motion.div
          aria-hidden="true"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease }}
          className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={activeCategory?.cover ?? "todos"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
              className="absolute inset-0"
            >
              <Image
                src={activeCategory?.cover ?? "/imagens/prototipo/hero-servicos.jpg"}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--night)_0%,rgb(5_8_15/0.86)_30%,rgb(5_8_15/0.45)_70%,rgb(5_8_15/0.6)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,var(--night),transparent)]" />
        </motion.div>

        <div className="container-p relative z-[2]">
          <nav aria-label="Você está em" className="text-[14px] text-[var(--on-night-mute)]">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/prototipo" className="transition-colors hover:text-white">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                Serviços
              </li>
            </ol>
          </nav>

          <div className="mt-6 max-w-[62rem]">
            <WordReveal
              as="h1"
              inView={false}
              text="Serviços para o seu carro"
              className="t-display text-[clamp(2.8rem,7vw,7.5rem)]"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="t-lead mt-6 max-w-xl text-[var(--on-night-mute)]"
            >
              Parceiros avaliados pela AutosFlow. Peça um orçamento sem compromisso e receba a resposta no WhatsApp.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-10 max-w-3xl"
          >
            <label htmlFor={searchId} className="sr-only">
              Buscar serviço
            </label>
            <div className="relative flex h-16 items-center rounded-full bg-white text-[var(--ink)] ring-[var(--blue-glow)] transition-shadow focus-within:ring-4">
              <Search className="pointer-events-none absolute left-6 h-6 w-6 text-[var(--blue)]" />
              <input
                id={searchId}
                type="search"
                value={state.q}
                onChange={(event) => update({ q: event.target.value })}
                placeholder="Lavagem, revisão, transferência…"
                autoComplete="off"
                className="h-full w-full rounded-full bg-transparent pr-16 pl-16 text-[18px] font-medium outline-none placeholder:text-[var(--ink-mute)] [&::-webkit-search-cancel-button]:hidden"
              />
              <AnimatePresence>
                {state.q && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    onClick={() => update({ q: "" })}
                    aria-label="Limpar busca"
                    className="absolute right-3 grid h-10 w-10 place-items-center rounded-full bg-[var(--paper-3)] text-[var(--ink)]"
                  >
                    <Close className="h-4.5 w-4.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div
            role="group"
            aria-label="Categorias"
            className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {chips.map((chip, index) => {
              const active = state.categoria === chip.slug;
              return (
                <motion.button
                  key={chip.slug || "todos"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ categoria: chip.slug })}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.05, ease }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-colors ${
                    active ? "text-[var(--ink)]" : "bg-white/[0.07] text-[var(--on-night)] hover:bg-white/[0.14]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="svc-chip"
                      className="absolute inset-0 rounded-full bg-[var(--signal)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {chip.icon && <ServiceGlyph icon={chip.icon} className="h-[18px] w-[18px]" />}
                    {chip.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p aria-live="polite" className="flex items-baseline gap-3">
              <span className="t-num text-[clamp(2.6rem,4.4vw,4rem)] leading-none text-white">{filtered.length}</span>
              <span className="text-[17px] text-[var(--on-night-mute)]">
                {filtered.length === 1 ? "serviço encontrado" : "serviços encontrados"}
                {state.cidade ? ` em ${state.cidade}` : ""}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <label htmlFor={cityId} className="sr-only">
                  Cidade
                </label>
                <select id={cityId} value={state.cidade} onChange={(event) => update({ cidade: event.target.value })} className={nightSelect}>
                  <option value="">Todas as cidades</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4.5 w-4.5 -translate-y-1/2 text-white/70" />
              </div>
              <div className="relative">
                <label htmlFor={sortId} className="sr-only">
                  Ordenar por
                </label>
                <select
                  id={sortId}
                  value={state.ordem}
                  onChange={(event) => setState((current) => ({ ...current, ordem: event.target.value as ListingState["ordem"] }))}
                  className={nightSelect}
                >
                  <option value="relevancia">Mais relevantes</option>
                  <option value="menor-preco">Menor preço</option>
                  <option value="nome">Nome (A a Z)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4.5 w-4.5 -translate-y-1/2 text-white/70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Grade editorial no papel
          ------------------------------------------------------------ */}
      <section aria-labelledby="resultados" className="paper pt-14 pb-28 sm:pt-20 sm:pb-36">
        <div className="container-p">
          <h2 id="resultados" className="sr-only">
            Resultados
          </h2>

          {filtered.length > 0 ? (
            <motion.ul layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout" initial={true}>
                {shown.map((service, index) => (
                  <motion.li
                    key={service.slug}
                    layout
                    initial={{ opacity: 0, y: 40, clipPath: "inset(30% 0% 0% 0%)" }}
                    animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.8, delay: Math.min(index, 8) * 0.06, ease }}
                  >
                    <ServiceCard service={service} category={categoryBySlug.get(service.category)} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="grid gap-10 py-6 lg:grid-cols-12 lg:items-end"
            >
              <div className="lg:col-span-8">
                <p className="t-display">Nada por aqui ainda.</p>
                <p className="t-lead mt-6 max-w-xl text-[var(--ink-mute)]">
                  Ainda não temos parceiros nessa busca. Tente outra categoria ou cidade. Se você oferece esse serviço, vem ser
                  parceiro da AutosFlow.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-self-end">
                <PillButton tone="ink" onClick={clear}>
                  Limpar filtros
                </PillButton>
                <PillButton tone="ghost-paper" onClick={() => openWaitlist("parceiro")}>
                  Quero ser parceiro
                </PillButton>
              </div>
            </motion.div>
          )}

          {(remaining > 0 || (hasFilters && filtered.length > 0)) && (
            <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
              {remaining > 0 && (
                <PillButton tone="ink" onClick={() => setVisible((v) => v + MORE)}>
                  Carregar mais <span className="ml-1 text-white/60">+{Math.min(MORE, remaining)}</span>
                </PillButton>
              )}
              {hasFilters && filtered.length > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="rounded-full px-5 py-3 text-[15px] font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Convite para parceiros, no campo azul
          ------------------------------------------------------------ */}
      <section aria-label="Seja um parceiro" className="relative overflow-hidden bg-[var(--blue)] text-white">
        <VelocityMarquee tone="blue" words={["Oficinas", "Lava-rápidos", "Despachantes", "Blindadoras", "Funilarias"]} className="pt-14 pb-0 sm:pt-20 sm:pb-0" />
        <div className="container-p grid gap-10 pt-12 pb-20 sm:pb-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <WordReveal as="h2" text="Quer oferecer seus serviços?" className="t-display" />
            <p className="t-lead mt-6 max-w-xl text-white/85">
              Cadastre sua oficina, lava-rápido ou despachante. Quem compra e vende carro na AutosFlow passa a encontrar você.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <PillButton tone="white" onClick={() => openWaitlist("parceiro")}>
              Quero ser parceiro
            </PillButton>
          </div>
        </div>
      </section>
    </>
  );
}

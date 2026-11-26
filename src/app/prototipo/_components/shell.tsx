"use client";

import { ReactLenis } from "lenis/react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Logo, Mark } from "@/components/logo";

import { serviceCategories } from "../_data/services";
import { ProtoFooter } from "./footer";
import { ArrowRight, ArrowUpRight, Check, Close, Menu } from "./icons";
import { ease } from "./motion";

/* -------------------------------------------------------------------------
   Contexto do protótipo
   ---------------------------------------------------------------------- */

type WaitlistKind = "lojista" | "parceiro";

interface ProtoContextValue {
  feOn: boolean;
  setFeOn: (on: boolean) => void;
  toast: (message: string) => void;
  openWaitlist: (kind: WaitlistKind) => void;
}

const ProtoContext = createContext<ProtoContextValue | null>(null);

export function useProto(): ProtoContextValue {
  const value = useContext(ProtoContext);
  if (!value) throw new Error("useProto fora do ProtoShell");
  return value;
}

export function ProtoShell({ children }: { children: React.ReactNode }) {
  const [feOn, setFeOnState] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistKind | null>(null);
  const counter = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const saved = window.localStorage.getItem("proto-fe") === "1";
    if (saved) {
      const frame = requestAnimationFrame(() => setFeOnState(true));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  const setFeOn = useCallback((on: boolean) => {
    setFeOnState(on);
    window.localStorage.setItem("proto-fe", on ? "1" : "0");
  }, []);

  const toast = useCallback((message: string) => {
    const id = ++counter.current;
    setToasts((list) => [...list.slice(-2), { id, message }]);
    window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3600);
  }, []);

  const content = (
    <MotionConfig reducedMotion="user">
      <ProtoContext.Provider value={{ feOn, setFeOn, toast, openWaitlist: setWaitlist }}>
        <Preloader />
        <ProtoBar />
        <ProtoNav />
        {children}
        <ProtoFooter />
        <Cursor />

        <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.45, ease }}
                className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-[var(--signal)] py-3 pr-6 pl-3 text-[15px] font-medium text-[var(--ink)] shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-[var(--signal)]">
                  <Mark className="h-3 w-auto" />
                </span>
                {t.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <WaitlistDialog kind={waitlist} onClose={() => setWaitlist(null)} />
      </ProtoContext.Provider>
    </MotionConfig>
  );

  if (reduce) return content;
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, anchors: { offset: -80 } }}>
      {content}
    </ReactLenis>
  );
}

/* -------------------------------------------------------------------------
   Abertura: o símbolo, um rastro de luz e a cortina sobe (uma vez por sessão)
   ---------------------------------------------------------------------- */

function Preloader() {
  const [state, setState] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.sessionStorage.getItem("proto-intro") === "1") {
      const frame = requestAnimationFrame(() => setState("gone"));
      return () => cancelAnimationFrame(frame);
    }
    window.sessionStorage.setItem("proto-intro", "1");
    const t1 = window.setTimeout(() => setState("leave"), 1700);
    const t2 = window.setTimeout(() => setState("gone"), 2700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (state === "gone") return null;
  return (
    <motion.div
      aria-hidden="true"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={state === "leave" ? { clipPath: "inset(0% 0% 100% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.95, ease: [0.83, 0, 0.17, 1] }}
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-[var(--night)] text-white"
    >
      <motion.span
        className="absolute top-1/2 left-0 h-[2px] w-[45vw] bg-[linear-gradient(90deg,transparent,#4d8dff,#fff)]"
        initial={{ x: "-50vw", opacity: 0 }}
        animate={{ x: "150vw", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.3, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.span
        className="absolute top-[calc(50%+14px)] left-0 h-px w-[30vw] bg-[linear-gradient(90deg,transparent,#ff3b30)]"
        initial={{ x: "120vw", opacity: 0 }}
        animate={{ x: "-40vw", opacity: [0, 0.9, 0.9, 0] }}
        transition={{ duration: 1.4, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
      />
      <div className="relative flex flex-col items-center gap-5">
        <motion.span initial={{ scale: 0.4, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}>
          <Mark className="h-14 w-auto text-[#4d8dff]" />
        </motion.span>
        <span className="flex overflow-hidden text-[clamp(2rem,5vw,3.5rem)] leading-none font-extrabold tracking-[-0.04em]" style={{ fontStretch: "125%" }}>
          {"AutosFlow".split("").map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.35 + i * 0.04, ease }}
              className={i >= 5 ? "text-[#4d8dff]" : undefined}
            >
              {l}
            </motion.span>
          ))}
        </span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.9 }} className="text-[15px]">
          Seu carro no fluxo certo.
        </motion.span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   Cursor próprio (só mouse): ponto que vira etiqueta em [data-cursor]
   ---------------------------------------------------------------------- */

function Cursor() {
  const x = useSpring(-100, { stiffness: 700, damping: 45, mass: 0.4 });
  const y = useSpring(-100, { stiffness: 700, damping: 45, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const root = document.getElementById("proto-root");
    root?.setAttribute("data-cursor-ready", "true");
    const frame = requestAnimationFrame(() => setEnabled(true));
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      const tagged = target?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(tagged?.dataset.cursor || null);
      setHovering(!!target?.closest?.("a, button, [role='button'], label, select, input"));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      cancelAnimationFrame(frame);
      root?.removeAttribute("data-cursor-ready");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 92 : hovering ? 44 : 12;
  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none fixed top-0 left-0 z-[300] mix-blend-normal"
    >
      <motion.div
        animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${
          label ? "bg-[var(--signal)] text-[var(--ink)]" : hovering ? "border-2 border-[var(--blue-glow)] bg-[rgb(77_141_255/0.12)]" : "bg-[var(--blue)]"
        }`}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[13px] font-bold"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   Barra do protótipo (para a apresentação)
   ---------------------------------------------------------------------- */

const protoTabs = [
  { href: "/prototipo", label: "Home", match: (p: string) => p === "/prototipo" },
  { href: "/prototipo/servicos", label: "Serviços", match: (p: string) => p === "/prototipo/servicos" },
  {
    href: "/prototipo/servicos/lavagem-completa",
    label: "Detalhe do serviço",
    match: (p: string) => p.startsWith("/prototipo/servicos/"),
  },
  { href: "/prototipo/ux", label: "Análise de UX", match: (p: string) => p.startsWith("/prototipo/ux") },
];

function ProtoBar() {
  const pathname = usePathname();
  const { feOn, setFeOn } = useProto();
  const switchId = useId();

  return (
    <div className="relative z-[60] bg-black text-[13px] text-white/70">
      <div className="container-p flex h-10 items-center gap-4">
        <span className="hidden shrink-0 items-center gap-2 font-semibold text-white sm:flex">
          <Mark className="h-3.5 w-auto text-[var(--blue-glow)]" />
          Protótipo
        </span>
        <nav aria-label="Telas do protótipo" className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {protoTabs.map((tab) => {
            const active = tab.match(pathname);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className="relative shrink-0 rounded-full px-3 py-1 transition-colors hover:text-white"
              >
                {active && (
                  <motion.span layoutId="proto-tab" className="absolute inset-0 rounded-full bg-white/14" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className={`relative ${active ? "text-white" : ""}`}>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
        <label htmlFor={switchId} className="flex shrink-0 cursor-pointer items-center gap-2">
          <span className="hidden md:inline">Códigos FE</span>
          <span className="md:hidden">FE</span>
          <button
            id={switchId}
            type="button"
            role="switch"
            aria-checked={feOn}
            onClick={() => setFeOn(!feOn)}
            className={`relative h-5 w-9 rounded-full transition-colors ${feOn ? "bg-[var(--blue)]" : "bg-white/20"}`}
          >
            <motion.span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white" animate={{ x: feOn ? 16 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 32 }} />
          </button>
        </label>
        <Link href="/" className="hidden shrink-0 items-center gap-1 hover:text-white lg:flex">
          Site atual <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Etiqueta FE (liga e desliga pela barra)
   ---------------------------------------------------------------------- */

const statusTone: Record<string, string> = {
  "Em validação": "bg-[#e8f0ff] text-[#0b46b8]",
  Proposta: "bg-[#fff3d6] text-[#8a5a00]",
};
const phaseTone: Record<string, string> = {
  "Fase 1": "bg-[#e1f5ea] text-[#0c7a4c]",
  "Fase 2": "bg-[#ffe8d6] text-[#9a4a00]",
  "Fase 1 + 2": "bg-[#e1f5ea] text-[#0c7a4c]",
};

export function FeTag({
  code,
  title,
  status = "Em validação",
  phase = "Fase 1",
  className = "left-4 top-4",
}: {
  code: string;
  title: string;
  status?: "Em validação" | "Proposta";
  phase?: "Fase 1" | "Fase 2" | "Fase 1 + 2";
  className?: string;
}) {
  const { feOn } = useProto();
  return (
    <AnimatePresence>
      {feOn && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.9 }}
          transition={{ duration: 0.35, ease }}
          className={`pointer-events-none absolute z-30 flex flex-wrap items-center gap-1.5 rounded-xl bg-white p-1.5 pr-2.5 text-[12px] font-medium text-[var(--ink)] shadow-[0_8px_24px_-8px_rgb(0_0_0/0.45)] ${className}`}
        >
          <span className="rounded-lg bg-[var(--ink)] px-2 py-1 font-semibold text-white">{code}</span>
          <span className="max-w-[16rem] truncate">{title}</span>
          <span className={`rounded-md px-1.5 py-0.5 ${statusTone[status]}`}>{status}</span>
          <span className={`rounded-md px-1.5 py-0.5 ${phaseTone[phase]}`}>{phase}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------
   Navegação: transparente sobre a noite, barra noturna ao rolar, com o
   rastro de luz mostrando quanto da página já passou.
   ---------------------------------------------------------------------- */

function ProtoNav() {
  const pathname = usePathname();
  const { toast, openWaitlist } = useProto();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 600 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const lightTop = pathname.startsWith("/prototipo/servicos/");
  const onNight = !lightTop || solid || open;

  const links: { label: string; href?: string; onClick?: () => void }[] = [
    { label: "Comprar", href: "/prototipo#vitrine" },
    { label: "Vender", href: "/prototipo#vender" },
    { label: "Serviços", href: "/prototipo/servicos" },
    { label: "Lojistas", onClick: () => openWaitlist("lojista") },
  ];

  return (
    <motion.header
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease }}
      className={`sticky top-0 z-50 -mb-[4.75rem] h-[4.75rem] transition-colors duration-500 ${
        solid || open ? "bg-[var(--night)] text-[var(--on-night)]" : onNight ? "bg-transparent text-[var(--on-night)]" : "bg-transparent text-[var(--ink)]"
      }`}
    >
      <div className="container-p flex h-full items-center gap-10">
        <Link href="/prototipo" aria-label="AutosFlow, início do protótipo" className="shrink-0">
          <Logo tone={onNight ? "dark" : "light"} />
        </Link>

        <nav aria-label="Principal" className="hidden flex-1 items-center gap-1 lg:flex">
          {links.map((link) => {
            const cls = "group relative overflow-hidden px-3 py-2 text-[15px] font-medium";
            const inner = (
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{link.label}</span>
                <span className="absolute inset-0 translate-y-full text-[var(--blue-glow)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                  {link.label}
                </span>
              </span>
            );
            return link.href ? (
              <Link key={link.label} href={link.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <button key={link.label} type="button" onClick={link.onClick} className={cls}>
                {inner}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => toast("Área do cliente: favoritos, alertas e propostas (Fase 2).")}
            className="hidden px-3 py-2 text-[15px] font-medium sm:block"
          >
            Entrar
          </button>
          <Link
            href="/prototipo#vender"
            className={`group hidden items-center gap-2 rounded-full py-2.5 pr-2.5 pl-5 text-[15px] font-semibold transition-colors sm:inline-flex ${
              onNight ? "bg-white text-[var(--ink)] hover:bg-[var(--signal)]" : "bg-[var(--ink)] text-white hover:bg-[var(--blue)]"
            }`}
          >
            Vender meu carro
            <span className={`grid h-7 w-7 place-items-center rounded-full ${onNight ? "bg-[var(--ink)] text-white" : "bg-white text-[var(--ink)]"}`}>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
            </span>
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
          >
            {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Rastro de luz: progresso da página. */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[linear-gradient(90deg,transparent,var(--blue-glow)_40%,#fff)]"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-x-0 top-[4.75rem] bottom-0 flex flex-col justify-between bg-[var(--night)] px-5 pt-6 pb-10 text-[var(--on-night)] lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
              className="flex flex-col"
            >
              {links.map((link) => (
                <motion.li key={link.label} className="overflow-hidden" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                  <motion.div variants={{ hidden: { y: "100%" }, show: { y: "0%", transition: { duration: 0.7, ease } } }}>
                    {link.href ? (
                      <Link href={link.href} onClick={() => setOpen(false)} className="t-mega block py-2 text-[clamp(2.6rem,13vw,4rem)]">
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          link.onClick?.();
                        }}
                        className="t-mega block py-2 text-left text-[clamp(2.6rem,13vw,4rem)]"
                      >
                        {link.label}
                      </button>
                    )}
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => toast("Área do cliente (Fase 2).")} className="rounded-full bg-white/10 py-4 font-semibold">
                Entrar
              </button>
              <Link href="/prototipo#vender" onClick={() => setOpen(false)} className="rounded-full bg-white py-4 text-center font-semibold text-[var(--ink)]">
                Vender meu carro
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* -------------------------------------------------------------------------
   Lista de espera (FE-01: Lojista e Serviços são Fase 2)
   ---------------------------------------------------------------------- */

const fleetSizes = ["Até 10 carros", "10 a 30", "30 a 80", "Mais de 80"];

function WaitlistDialog({ kind, onClose }: { kind: WaitlistKind | null; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const [error, setError] = useState("");
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [lastKind, setLastKind] = useState(kind);
  if (kind !== lastKind) {
    setLastKind(kind);
    setSent(false);
    setChoice(null);
    setError("");
  }

  useEffect(() => {
    if (!kind) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const frame = requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("input")?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, [kind, onClose]);

  const copy =
    kind === "parceiro"
      ? {
          title: "Seja um parceiro de serviços",
          lead: "Oficinas, lava-rápidos, despachantes e blindadoras. Entre na lista e a gente te chama quando a vitrine de serviços abrir.",
          name: "Nome da empresa",
          choiceLabel: "O que você oferece",
          choices: serviceCategories.map((c) => c.label),
        }
      : {
          title: "Sua frota na vitrine certa",
          lead: "Mais visibilidade para o seu estoque e leads qualificados. A área do lojista abre na Fase 2: entre na lista de espera.",
          name: "Nome da loja",
          choiceLabel: "Tamanho da frota",
          choices: fleetSizes,
        };

  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" aria-label="Fechar" onClick={onClose} className="absolute inset-0 bg-black/75" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="relative w-full max-w-xl overflow-hidden rounded-t-[1.5rem] bg-[var(--night-2)] p-7 text-[var(--on-night)] shadow-2xl sm:rounded-[1.5rem] sm:p-10"
          >
            <button type="button" onClick={onClose} aria-label="Fechar" className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <Close className="h-5 w-5" />
            </button>
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start gap-5 py-4">
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 16 }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)]"
                  >
                    <Check className="h-8 w-8" />
                  </motion.span>
                  <h2 id={titleId} className="t-display text-[clamp(2.2rem,4vw,3.2rem)]">
                    Você está na lista.
                  </h2>
                  <p className="t-lead text-[var(--on-night-mute)]">
                    A gente te chama no WhatsApp assim que abrir. No produto, este cadastro cai no backoffice com a origem do clique.
                  </p>
                  <button type="button" onClick={onClose} className="mt-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[var(--ink)]">
                    Fechar
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -12 }}
                  noValidate
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    const phone = String(data.get("whatsapp") ?? "").replace(/\D/g, "");
                    if (String(data.get("nome") ?? "").trim().length < 2) return setError("Informe o nome.");
                    if (phone.length < 10) return setError("Informe o WhatsApp com DDD.");
                    setError("");
                    setSent(true);
                  }}
                  className="flex flex-col gap-6"
                >
                  <div className="pr-12">
                    <h2 id={titleId} className="t-display text-[clamp(2.2rem,4vw,3.2rem)]">
                      {copy.title}
                    </h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-[var(--on-night-mute)]">{copy.lead}</p>
                  </div>
                  <label className="flex flex-col gap-2 text-[14px] font-semibold">
                    {copy.name}
                    <input name="nome" autoComplete="organization" className="rounded-xl bg-white/[0.07] px-4 py-4 text-[17px] font-medium outline-none ring-[var(--blue-glow)] focus:ring-2" />
                  </label>
                  <fieldset>
                    <legend className="mb-3 text-[14px] font-semibold">{copy.choiceLabel}</legend>
                    <div className="flex flex-wrap gap-2">
                      {copy.choices.map((item) => (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={choice === item}
                          onClick={() => setChoice(item)}
                          className={`rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors ${
                            choice === item ? "bg-[var(--signal)] text-[var(--ink)]" : "bg-white/[0.07] hover:bg-white/[0.14]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <label className="flex flex-col gap-2 text-[14px] font-semibold">
                    WhatsApp
                    <input
                      name="whatsapp"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(11) 99999-9999"
                      className="rounded-xl bg-white/[0.07] px-4 py-4 text-[17px] font-medium outline-none ring-[var(--blue-glow)] placeholder:text-white/35 focus:ring-2"
                    />
                  </label>
                  {error && (
                    <p role="alert" className="text-[15px] font-medium text-[#ff8a80]">
                      {error}
                    </p>
                  )}
                  <motion.button whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 rounded-full bg-[var(--blue)] py-4.5 text-[17px] font-semibold text-white">
                    Entrar na lista de espera <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

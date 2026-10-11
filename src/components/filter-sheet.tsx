"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Close, Sliders } from "@/components/icons";

/**
 * Painel de filtros.
 *
 * No desktop é uma coluna fixa ao lado dos resultados. No celular vira uma
 * folha em tela cheia, aberta por um botão: os filtros não ocupam a tela o
 * tempo todo, e o rodapé da folha mostra quantos carros a seleção devolve —
 * o filtro já se aplica ao mudar, então o botão só fecha.
 */
const SheetContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function FilterSheetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function FilterToggle({ activeCount }: { activeCount: number }) {
  const { setOpen } = useContext(SheetContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-controls="painel-filtros"
      className="inline-flex h-12 items-center justify-center gap-2 rounded-control border border-border-strong bg-surface px-4 text-sm font-semibold text-foreground lg:hidden"
    >
      <Sliders className="h-4.5 w-4.5" />
      Filtros
      {activeCount > 0 ? (
        <span className="tnum flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[0.6875rem] text-white">
          {activeCount}
        </span>
      ) : null}
    </button>
  );
}

export function FilterSheet({
  total,
  clearHref,
  children,
}: {
  total: number;
  clearHref: string;
  children: ReactNode;
}) {
  const { open, setOpen } = useContext(SheetContext);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("select, button")?.focus();
    return () => {
      style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  return (
    <div
      id="painel-filtros"
      ref={panelRef}
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label="Filtros"
      className={`${
        open ? "fixed inset-0 z-[60] flex flex-col bg-surface" : "hidden"
      } lg:sticky lg:top-24 lg:z-auto lg:block lg:self-start lg:bg-transparent`}
    >
      {/* Cabeçalho da folha — só no celular */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4 lg:hidden">
        <p className="font-display text-lg font-semibold text-foreground">
          Filtros
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar filtros"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-foreground/5"
        >
          <Close className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 lg:overflow-visible lg:p-0">
        {children}
      </div>

      {/* Rodapé da folha — resultado da seleção e saída */}
      <div className="flex items-center gap-3 border-t border-border px-5 py-4 lg:hidden">
        <a
          href={clearHref}
          className="inline-flex h-12 items-center px-2 text-sm font-semibold text-foreground-muted underline-offset-4 hover:underline"
        >
          Limpar
        </a>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="tnum inline-flex h-12 flex-1 items-center justify-center rounded-control bg-brand text-sm font-semibold text-white"
        >
          Ver {total} {total === 1 ? "veículo" : "veículos"}
        </button>
      </div>
    </div>
  );
}

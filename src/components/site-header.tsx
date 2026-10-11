"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ArrowRight, Phone, WhatsApp } from "@/components/icons";
import { Logo } from "@/components/logo";
import { contact } from "@/data/brand";
import { nav, whatsappGeneral } from "@/lib/site";

/**
 * Cabeçalho.
 *
 * Claro e fixo, com vidro fosco ao rolar: o menu fica sempre a um toque, sem
 * disputar atenção com as fotos. No celular, o painel ocupa a tela, com alvos
 * grandes e o WhatsApp no fim, onde o polegar alcança.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Fecha ao trocar de página (o painel não deve sobreviver à navegação).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Painel aberto: trava a rolagem, Escape fecha, foco volta ao botão.
  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-border bg-surface/85 shadow-[0_1px_12px_-6px_rgb(15_23_42/0.12)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-background"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link
          href="/"
          aria-label="AutosFlow — página inicial"
          className="shrink-0"
        >
          <Logo tone="light" priority />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full bg-surface-raised/70 p-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300 ${
                    isActive(item.href)
                      ? "bg-surface text-foreground shadow-card"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:+${contact.phoneE164}`}
            className="hidden items-center gap-2 px-3 text-sm font-medium text-foreground-muted transition-colors duration-300 hover:text-foreground xl:inline-flex"
          >
            <Phone className="h-4 w-4" />
            <span className="tnum">{contact.phoneLabel}</span>
          </a>
          <a
            href={whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-control bg-brand px-4 text-sm font-semibold tracking-tight text-white transition-colors duration-300 hover:bg-brand-deep sm:inline-flex"
          >
            <WhatsApp className="h-4 w-4" />
            Falar no WhatsApp
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 lg:hidden"
          >
            <span className="sr-only">
              {open ? "Fechar menu" : "Abrir menu"}
            </span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-full rounded bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full rounded bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="flex h-[calc(100svh-4rem)] flex-col overflow-y-auto border-t border-border bg-surface lg:hidden"
      >
        <nav
          aria-label="Principal (celular)"
          className="container-editorial py-4"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center justify-between rounded-control px-4 py-4 font-display text-xl font-semibold tracking-tight transition-colors ${
                    isActive(item.href)
                      ? "bg-surface-raised text-foreground"
                      : "text-foreground hover:bg-surface-raised"
                  }`}
                >
                  {item.label}
                  <ArrowRight className="h-5 w-5 text-foreground-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-editorial mt-auto flex flex-col gap-3 pb-8 pt-6">
          <a
            href={whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center justify-center gap-2.5 rounded-control bg-brand px-6 text-sm font-semibold text-white"
          >
            <WhatsApp className="h-4.5 w-4.5" />
            Falar no WhatsApp
          </a>
          <a
            href={`tel:+${contact.phoneE164}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-control border border-border-strong text-sm font-semibold text-foreground"
          >
            <Phone className="h-4 w-4" />
            <span className="tnum">{contact.phoneLabel}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

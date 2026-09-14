"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { WhatsApp } from "@/components/icons";
import { Logo } from "@/components/logo";
import { contact } from "@/data/brand";
import { nav, whatsappGeneral } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Deferred so a restored scroll position is picked up without setting
    // state during the effect itself.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // While the panel is open: lock the page, trap Escape, restore focus.
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? "border-b border-border bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link
          href="/"
          aria-label="AutosFlow — página inicial"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Logo priority />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative block px-4 py-2 text-sm tracking-tight transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 bottom-0 h-px origin-left bg-brand-bright transition-transform duration-400 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center bg-brand px-5 text-sm font-medium tracking-tight text-white transition-colors duration-300 hover:bg-brand-bright sm:inline-flex"
          >
            Falar com especialista
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-400 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-400 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel — full sheet, generous targets, its own commercial block */}
      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="flex min-h-[calc(100svh-4rem)] flex-col border-t border-border bg-ink-950 lg:hidden"
      >
        <nav
          aria-label="Principal (mobile)"
          className="container-editorial py-2"
        >
          <ul>
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-border/70">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5 text-display-sm font-semibold tracking-tight text-foreground"
                >
                  <span className="tnum text-eyebrow font-sans font-medium tracking-[0.18em] text-foreground-subtle">
                    0{index + 1}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-editorial mt-auto flex flex-col gap-3 pb-10 pt-8">
          <a
            href={whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex h-13 items-center justify-center gap-3 bg-brand px-6 text-sm font-medium text-white"
          >
            <WhatsApp className="h-4.5 w-4.5" />
            Falar com especialista
          </a>
          <a
            href={`tel:+${contact.phoneE164}`}
            className="text-center text-sm text-foreground-muted"
          >
            {contact.phoneLabel}
          </a>
        </div>
      </div>
    </header>
  );
}

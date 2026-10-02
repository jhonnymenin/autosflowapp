"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowRight } from "@/components/icons";
import type { Testimonial } from "@/data/testimonials";

/**
 * Depoimentos em carrossel.
 *
 * Uma faixa com rolagem horizontal e snap nativo: no celular mostra um
 * depoimento por vez (com a ponta do próximo visível, para sugerir o gesto),
 * no tablet dois e no desktop três. Sem JavaScript continua sendo uma faixa
 * rolável; os botões só chamam `scrollTo`.
 */
export function TestimonialCarousel({
  items,
  preview = false,
}: {
  items: Testimonial[];
  /** Exemplos de desenvolvimento, marcados como tal. */
  preview?: boolean;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (track && slide) {
      const inset = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft - inset });
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const [first, second] = track.children as unknown as HTMLElement[];
        const step =
          first && second
            ? second.offsetLeft - first.offsetLeft
            : track.clientWidth;
        setActive(Math.round(track.scrollLeft / Math.max(step, 1)));
        setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
      });
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const last = items.length - 1;
  const current = Math.min(active, last);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
    >
      <ul
        ref={trackRef}
        className="-mx-(--spacing-gutter) flex snap-x snap-mandatory scroll-px-(--spacing-gutter) gap-6 overflow-x-auto overscroll-x-contain scroll-smooth px-(--spacing-gutter) [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:gap-10 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <li
            key={`${item.author}-${item.quote.slice(0, 24)}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Depoimento ${index + 1} de ${items.length}`}
            className="w-[85%] shrink-0 snap-start border-t border-border pt-6 sm:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-5rem)/3)]"
          >
            {preview ? (
              <span className="mb-3 inline-block border border-dashed border-border px-2 py-0.5 text-eyebrow uppercase text-foreground-subtle">
                Exemplo · só em dev
              </span>
            ) : null}
            <blockquote className="font-display text-lg leading-snug tracking-tight text-foreground sm:text-xl">
              “{item.quote}”
            </blockquote>
            <p className="mt-4 text-sm text-foreground-muted">
              {item.author}
              {item.context ? (
                <span className="text-foreground-subtle">
                  {" "}
                  · {item.context}
                </span>
              ) : null}
            </p>
            {item.source ? (
              <a
                href={item.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-foreground-subtle underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
              >
                Ver avaliação original
              </a>
            ) : null}
          </li>
        ))}
      </ul>

      {items.length > 1 ? (
        <div className="mt-8 flex items-center justify-between gap-6">
          <p className="tnum text-xs font-medium tracking-[0.14em] text-foreground-subtle">
            <span className="text-foreground">
              {String(current + 1).padStart(2, "0")}
            </span>{" "}
            / {String(items.length).padStart(2, "0")}
          </p>

          <div className="flex gap-px">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, current - 1))}
              disabled={current === 0}
              aria-label="Depoimento anterior"
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors duration-300 hover:border-foreground disabled:opacity-30 disabled:hover:border-border"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(last, current + 1))}
              disabled={atEnd}
              aria-label="Próximo depoimento"
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors duration-300 hover:border-foreground disabled:opacity-30 disabled:hover:border-border"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p aria-live="polite" className="sr-only">
            Depoimento {current + 1} de {items.length}
          </p>
        </div>
      ) : null}
    </section>
  );
}

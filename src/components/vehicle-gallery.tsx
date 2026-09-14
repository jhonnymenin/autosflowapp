"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowRight } from "@/components/icons";
import {
  ILLUSTRATIVE_IMAGES,
  ILLUSTRATIVE_NOTE,
  type VehicleImage,
} from "@/data/vehicle-images";

/**
 * Vehicle carousel.
 *
 * Built on native scroll-snap: touch swipe, trackpad and keyboard all work
 * without a carousel library, and every frame stays in the document for
 * crawlers. The buttons only drive `scrollTo`, so with JavaScript unavailable
 * the strip is still a scrollable gallery.
 */
export function VehicleGallery({
  images,
  alt,
  priority = false,
}: {
  images: VehicleImage[];
  /** Describes the model shown, not the advertised unit. */
  alt: string;
  priority?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft });
  }, []);

  // Track which frame is showing, straight from the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(track.scrollLeft / track.clientWidth);
        setActive(Math.max(0, Math.min(images.length - 1, index)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [images.length]);

  if (images.length === 0) return null;

  const go = (delta: number) =>
    scrollTo(Math.max(0, Math.min(images.length - 1, active + delta)));

  return (
    <section
      className="group/gallery relative"
      aria-roledescription="carrossel"
      aria-label={`Imagens do modelo ${alt}`}
    >
      <div className="relative overflow-hidden bg-surface">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              className="relative aspect-16/9 w-full shrink-0 snap-center"
              role="group"
              aria-roledescription="slide"
              aria-label={`Imagem ${index + 1} de ${images.length}`}
            >
              <Image
                src={image.src}
                alt={
                  index === 0
                    ? `${alt} — imagem de referência do modelo`
                    : `${alt} — imagem de referência ${index + 1}`
                }
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                quality={80}
                priority={priority && index === 0}
                loading={priority && index === 0 ? undefined : "lazy"}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        {images.length > 1 ? (
          <>
            {/* Controls sit over the frame; they fade in on pointer devices
                but are always reachable by keyboard. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-4">
              <div className="pointer-events-auto flex gap-1.5">
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => scrollTo(index)}
                    aria-label={`Ir para a imagem ${index + 1}`}
                    aria-current={index === active ? "true" : undefined}
                    className={`h-1 w-7 transition-colors duration-300 ${
                      index === active
                        ? "bg-foreground"
                        : "bg-foreground/35 hover:bg-foreground/60"
                    }`}
                  />
                ))}
              </div>

              <div className="pointer-events-auto flex gap-px">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={active === 0}
                  aria-label="Imagem anterior"
                  className="flex h-10 w-10 items-center justify-center bg-ink-950/70 text-foreground backdrop-blur-sm transition-colors duration-300 hover:bg-ink-950 disabled:opacity-30 disabled:hover:bg-ink-950/70"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={active === images.length - 1}
                  aria-label="Próxima imagem"
                  className="flex h-10 w-10 items-center justify-center bg-ink-950/70 text-foreground backdrop-blur-sm transition-colors duration-300 hover:bg-ink-950 disabled:opacity-30 disabled:hover:bg-ink-950/70"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p aria-live="polite" className="sr-only">
              Imagem {active + 1} de {images.length}
            </p>
          </>
        ) : null}
      </div>

      {ILLUSTRATIVE_IMAGES ? (
        <p className="mt-3 text-xs leading-relaxed text-foreground-subtle">
          {ILLUSTRATIVE_NOTE}
        </p>
      ) : null}
    </section>
  );
}

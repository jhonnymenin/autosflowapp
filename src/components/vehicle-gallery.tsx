"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowRight, Close, Expand } from "@/components/icons";
import { ILLUSTRATIVE_NOTE, type VehicleImage } from "@/data/vehicle-images";

/**
 * Galeria do veículo.
 *
 * Faixa com snap nativo — arrastar no celular, trackpad e teclado funcionam
 * sem biblioteca, e todas as fotos ficam no documento. Por baixo, miniaturas
 * para ir direto à foto que interessa; um toque em "Ampliar" abre a mesma
 * faixa em tela cheia, sobre fundo preto.
 *
 * Fotos de celular chegam em pé: quadros largos preenchem o slide, os demais
 * aparecem inteiros sobre um fundo desfocado da própria foto.
 */
export function VehicleGallery({
  images,
  alt,
  real = false,
  priority = false,
}: {
  images: VehicleImage[];
  alt: string;
  real?: boolean;
  priority?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [full, setFull] = useState(false);

  const scrollTo = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (track && slide) {
      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        behavior: smooth ? "smooth" : "instant",
      });
    }
  }, []);

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

  // A miniatura ativa acompanha a foto, sem rolar a página.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (strip && thumb) {
      strip.scrollTo({
        left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  // Tela cheia: trava a página, setas e Escape, e mantém a foto atual.
  useEffect(() => {
    const index = active;
    requestAnimationFrame(() => scrollTo(index, false));
    if (!full) return;
    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFull(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full, scrollTo]);

  if (images.length === 0) return null;

  const go = (delta: number) =>
    scrollTo(Math.max(0, Math.min(images.length - 1, active + delta)));

  const arrow =
    "pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-card backdrop-blur-md transition-[opacity,background-color] duration-300 hover:bg-white disabled:opacity-0";

  return (
    <section
      aria-roledescription="carrossel"
      aria-label={real ? `Fotos do ${alt}` : `Imagens do modelo ${alt}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      <div
        className={
          full
            ? "fixed inset-0 z-[70] flex flex-col bg-black"
            : "group/gallery relative overflow-hidden bg-surface-raised sm:rounded-card"
        }
      >
        <div className="relative flex-1">
          <div
            ref={trackRef}
            tabIndex={0}
            aria-label="Fotos — use as setas para navegar"
            className={`flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              full ? "h-full" : ""
            }`}
          >
            {images.map((image, index) => {
              const wide =
                !image.width ||
                !image.height ||
                image.width / image.height >= 1.3;
              const eager = priority && index === 0;
              const label = real
                ? `${alt} — foto ${index + 1} de ${images.length}`
                : `${alt} — imagem de referência do modelo ${index + 1}`;

              return (
                <div
                  key={image.src}
                  className={`relative w-full shrink-0 snap-center overflow-hidden ${
                    full ? "h-full" : "aspect-4/3"
                  }`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Imagem ${index + 1} de ${images.length}`}
                >
                  {wide || full ? null : (
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="64px"
                      quality={30}
                      loading={eager ? undefined : "lazy"}
                      className="scale-110 object-cover opacity-60 blur-2xl"
                    />
                  )}
                  <Image
                    src={image.src}
                    alt={label}
                    fill
                    sizes={
                      full
                        ? "100vw"
                        : "(min-width: 1280px) 66vw, (min-width: 1024px) 58vw, 100vw"
                    }
                    quality={82}
                    priority={eager}
                    loading={eager ? undefined : "lazy"}
                    className={
                      wide && !full
                        ? "object-cover object-center"
                        : "object-contain object-center"
                    }
                  />
                </div>
              );
            })}
          </div>

          {/* Controles sobre a foto */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-3 sm:p-4">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={active === 0}
              aria-label="Foto anterior"
              className={`${arrow} ${full ? "" : "sm:opacity-0 sm:group-hover/gallery:opacity-100"}`}
            >
              <ArrowRight className="h-4.5 w-4.5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={active === images.length - 1}
              aria-label="Próxima foto"
              className={`${arrow} ${full ? "" : "sm:opacity-0 sm:group-hover/gallery:opacity-100"}`}
            >
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
            <p
              aria-live="polite"
              className="tnum rounded-full bg-ink-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
            >
              {active + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => setFull((value) => !value)}
              className="pointer-events-auto inline-flex h-9 items-center gap-2 rounded-full bg-ink-950/70 px-3.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-ink-950/90"
            >
              {full ? (
                <>
                  <Close className="h-4 w-4" />
                  Fechar
                </>
              ) : (
                <>
                  <Expand className="h-4 w-4" />
                  Ampliar
                </>
              )}
            </button>
          </div>
        </div>

        {images.length > 1 ? (
          <div
            ref={thumbsRef}
            className={`hidden gap-2 overflow-x-auto p-2 [scrollbar-width:none] sm:flex [&::-webkit-scrollbar]:hidden ${
              full ? "bg-black" : "bg-surface"
            }`}
          >
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Ver foto ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={`relative h-16 w-20 flex-none overflow-hidden rounded-lg transition-[opacity,box-shadow] duration-300 ${
                  index === active
                    ? "opacity-100 ring-2 ring-brand"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="80px"
                  quality={50}
                  loading="lazy"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {!real ? (
        <p className="mt-3 px-(--spacing-gutter) text-xs leading-relaxed text-foreground-subtle sm:px-0">
          {ILLUSTRATIVE_NOTE}
        </p>
      ) : null}
    </section>
  );
}

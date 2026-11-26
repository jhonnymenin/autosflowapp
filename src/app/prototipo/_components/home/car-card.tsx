"use client";

/**
 * FE-04 — card compacto, sem caixa: foto 4:3 que se percorre passando o mouse
 * (uma faixa por foto, como uma vitrine que você folheia), selos, modelo,
 * versão, ano | km, local e valor.
 */
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import Image from "@/components/image";

import { badgeLabels, type BadgeKey, type ProtoCar } from "../../_lib/types";
import { Heart } from "../icons";
import { useProto } from "../shell";

const badgeTone: Record<BadgeKey, string> = {
  verified: "bg-[var(--blue)] text-white",
  "baixa-km": "bg-white text-[var(--ink)]",
  "abaixo-fipe": "bg-[#0f9d63] text-white",
  "super-preco": "bg-[var(--signal)] text-[var(--ink)]",
  hibrido: "bg-white text-[#0c7a4c]",
  assistida: "bg-[var(--ink)] text-white",
};

export function CarCard({ car }: { car: ProtoCar }) {
  const { toast } = useProto();
  const [liked, setLiked] = useState(false);
  const [photo, setPhoto] = useState(0);
  const photos = car.photos.slice(0, 3);

  return (
    <article className="group relative">
      <Link
        href={`/veiculos/${car.slug}`}
        data-cursor="Ver"
        className="block"
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          const next = Math.min(photos.length - 1, Math.floor(((event.clientX - rect.left) / rect.width) * photos.length));
          if (next !== photo) setPhoto(next);
        }}
        onPointerLeave={() => setPhoto(0)}
      >
        <span className="relative block aspect-[4/3] overflow-hidden rounded-[6px] bg-[var(--paper-3)]">
          {photos.map((p, i) => (
            <Image
              key={p.src}
              src={p.src}
              alt={i === 0 ? `${car.make} ${car.model} ${car.version}` : ""}
              fill
              sizes="(min-width: 1280px) 19vw, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
              className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${i === photo ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {photos.length > 1 && (
            <span className="absolute inset-x-3 top-3 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {photos.map((p, i) => (
                <span key={p.src} className={`h-[3px] flex-1 rounded-full transition-colors ${i === photo ? "bg-white" : "bg-white/40"}`} />
              ))}
            </span>
          )}
          <span className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {car.badges.slice(0, 2).map((badge) => (
              <span key={badge} className={`t-spec rounded-full px-2.5 py-1 text-[11.5px] ${badgeTone[badge]}`}>
                {badgeLabels[badge]}
              </span>
            ))}
          </span>
        </span>
        <span className="mt-4 flex items-center justify-between gap-2">
          <span className="t-spec text-[var(--ink-mute)]">{car.make}</span>
          <span className="t-spec text-[var(--ink-mute)]">{car.ref}</span>
        </span>
        <span className="mt-1.5 line-clamp-2 block text-[18px] leading-snug font-semibold tracking-[-0.015em]">
          {car.model} <span className="font-normal text-[var(--ink-mute)]">{car.version}</span>
        </span>
        <span className="mt-2 block text-[14.5px] text-[var(--ink-mute)]">
          {car.year} · {car.kmLabel} · {car.gearbox}
        </span>
        <span className="mt-1 block text-[14px] text-[var(--ink-mute)]">{car.location}</span>
        <span className="t-num mt-3 block text-[24px] leading-none">{car.priceLabel}</span>
      </Link>
      <motion.button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? `Remover ${car.model} dos favoritos` : `Favoritar ${car.model}`}
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          setLiked((value) => !value);
          if (!liked) toast("Favoritado. Com a conta criada, avisamos se o preço baixar.");
        }}
        className="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white text-[var(--ink)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 aria-pressed:opacity-100 max-lg:opacity-100"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={liked ? "on" : "off"}
            initial={{ scale: 0.3, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.3 }}
            transition={{ type: "spring", stiffness: 520, damping: 14 }}
            className={liked ? "text-[#e0245e]" : ""}
          >
            <Heart className="h-5 w-5" filled={liked} />
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </article>
  );
}

"use client";

import Link from "next/link";

import Image from "@/components/image";

import type { Service, ServiceCategory } from "../../_data/services";
import { ArrowUpRight, Clock } from "../../_components/icons";

const brl = new Intl.NumberFormat("pt-BR");

export function priceText(price: number | null): string {
  return price === null ? "Sob consulta" : `R$ ${brl.format(price)}`;
}

/**
 * Cartão de serviço (FE-12 e relacionados do FE-13), sem caixa: foto, rótulo
 * de categoria sobre a foto e o texto aberto embaixo, como editorial.
 */
export function ServiceCard({
  service,
  category,
  sizes = "(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw",
}: {
  service: Service;
  category?: ServiceCategory;
  sizes?: string;
}) {
  return (
    <Link href={`/prototipo/servicos/${service.slug}`} data-cursor="Ver" className="group flex h-full flex-col">
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[6px] bg-[var(--paper-3)]">
        <Image
          src={service.images[0]}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
        />
        <span className="absolute inset-0 bg-[var(--ink)] opacity-0 transition-opacity duration-500 group-hover:opacity-15" />
        {category && (
          <span className="t-spec absolute top-3 left-3 rounded-full bg-[var(--night)] px-3 py-1.5 text-[var(--on-night)]">
            {category.label}
          </span>
        )}
        <span className="absolute right-3 bottom-3 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-[var(--signal)] text-[var(--ink)] opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </span>
      <span className="flex flex-1 flex-col pt-4">
        <span className="text-[22px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--ink)] transition-colors group-hover:text-[var(--blue)]">
          {service.title}
        </span>
        <span className="mt-2 text-[15px] text-[var(--ink-mute)]">
          {service.partner} · {service.city}
        </span>
        <span className="mt-auto flex items-end justify-between gap-3 pt-4">
          <span className="flex items-center gap-1.5 text-[14px] text-[var(--ink-mute)]">
            <Clock className="h-4 w-4" /> {service.duration}
          </span>
          <span className="text-right text-[14px] text-[var(--ink-mute)]">
            {service.price === null ? (
              <span className="t-num text-[19px] text-[var(--ink)]">Sob consulta</span>
            ) : (
              <>
                a partir de <span className="t-num ml-1 text-[22px] text-[var(--ink)]">{priceText(service.price)}</span>
              </>
            )}
          </span>
        </span>
      </span>
    </Link>
  );
}

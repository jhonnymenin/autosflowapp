import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Mark } from "@/components/logo";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <Mark className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-72 w-auto -translate-y-1/2 text-ink-850 sm:h-[26rem]" />
      <div className="container-editorial flex min-h-[70svh] flex-col justify-center py-32 sm:py-40">
        <Eyebrow>Erro 404</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-display-lg font-semibold text-foreground">
          Esta página saiu do fluxo.
        </h1>
        <p className="text-lead mt-6 max-w-md text-foreground-muted">
          O endereço não existe ou o veículo já não está no estoque.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/veiculos"
            className="group/btn inline-flex h-13 items-center justify-center gap-3 bg-brand px-8 text-sm font-medium tracking-tight text-white transition-colors duration-300 hover:bg-brand-bright"
          >
            Ver o estoque
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
          <Link
            href="/"
            className="inline-flex h-13 items-center justify-center border border-border-strong px-8 text-sm font-medium tracking-tight text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-ink-950"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}

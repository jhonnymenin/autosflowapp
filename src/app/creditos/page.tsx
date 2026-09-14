import type { Metadata } from "next";
import Link from "next/link";

import { Eyebrow } from "@/components/ui";
import {
  allImageCredits,
  ILLUSTRATIVE_IMAGES,
} from "@/data/vehicle-images";

export const metadata: Metadata = {
  title: "Créditos de imagem",
  description:
    "Autoria e licença das imagens de referência usadas no catálogo da AutosFlow.",
  alternates: { canonical: "/creditos" },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  const credits = allImageCredits();

  return (
    <section className="pb-section pt-32 sm:pt-40 lg:pt-48">
      <div className="container-editorial">
        <div className="max-w-2xl">
          <Eyebrow>Créditos</Eyebrow>
          <h1 className="mt-5 text-display-lg font-semibold text-foreground">
            Créditos de imagem.
          </h1>
          {ILLUSTRATIVE_IMAGES ? (
            <p className="text-lead mt-6 text-foreground-muted">
              As imagens que ilustram o catálogo são referências do modelo, não
              da unidade anunciada. Todas são Creative Commons ou domínio
              público, com uso comercial permitido, e estão creditadas abaixo.
            </p>
          ) : (
            <p className="text-lead mt-6 text-foreground-muted">
              Autoria e licença das imagens publicadas no site.
            </p>
          )}
        </div>

        <ul className="mt-14 border-t border-border sm:mt-16">
          {credits.map((image) => (
            <li
              key={image.src}
              className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span className="text-sm text-foreground">{image.author}</span>
              <span className="flex flex-wrap items-baseline gap-x-4 text-sm text-foreground-subtle">
                <span>{image.licence}</span>
                <a
                  href={image.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
                >
                  Ver original
                </a>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-foreground-subtle">
          Fotografia institucional e identidade visual são material próprio da
          AutosFlow.
        </p>

        <Link
          href="/veiculos"
          className="mt-10 inline-flex items-center text-sm font-medium tracking-tight text-foreground-muted transition-colors duration-300 hover:text-brand-bright"
        >
          Voltar ao estoque
        </Link>
      </div>
    </section>
  );
}

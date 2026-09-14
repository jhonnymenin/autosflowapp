import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { manifesto, verified } from "@/data/brand";

export function VerifiedSection() {
  return (
    <section
      className="relative isolate border-t border-border"
      aria-labelledby="confianca"
    >
      {/* The photograph carries the section rather than hiding behind a
          gradient: full-bleed on one half, full strength, with the copy
          holding the other half. */}
      <div className="lg:grid lg:min-h-[42rem] lg:grid-cols-2">
        <div className="relative aspect-4/3 w-full lg:aspect-auto lg:h-full">
          <Image
            src="/imagens/farol-detalhe.jpg"
            alt="Detalhe do conjunto óptico de um veículo sob iluminação de estúdio."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={80}
            className="object-cover object-center"
          />
        </div>

        <Reveal className="flex flex-col justify-center px-(--spacing-gutter) py-16 sm:py-20 lg:py-24 lg:pl-16 lg:pr-(--spacing-gutter) xl:pl-24">
          <div className="max-w-xl">
            <Eyebrow>Confiança</Eyebrow>
            <h2
              id="confianca"
              className="mt-5 text-display-md font-semibold text-foreground"
            >
              Confiança começa com informação.
            </h2>
            <p className="text-lead mt-6 text-foreground-muted">
              {manifesto.trustDetail}
            </p>

            {/* A ruled register, not a row of ticks. */}
            <dl className="mt-12 border-t border-border">
              {verified.criteria.map((item, index) => (
                <div
                  key={item}
                  className="flex items-baseline gap-5 border-b border-border py-3.5"
                >
                  <dt className="tnum text-eyebrow font-medium tracking-[0.18em] text-foreground-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </dt>
                  <dd className="text-sm tracking-tight text-foreground sm:text-base">
                    {item}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-foreground-subtle">
              {verified.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

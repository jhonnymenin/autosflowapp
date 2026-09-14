import Image from "next/image";

import { Check } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { manifesto, verified } from "@/data/brand";

export function VerifiedSection() {
  return (
    <section
      className="border-t border-border bg-surface py-section"
      aria-labelledby="confianca"
    >
      <div className="container-editorial">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Confiança</Eyebrow>
            <h2
              id="confianca"
              className="mt-6 text-display-md font-semibold text-foreground"
            >
              Confiança começa com informação.
            </h2>
            <p className="text-lead mt-6 max-w-xl text-foreground-muted">
              {manifesto.trustDetail}
            </p>

            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {verified.criteria.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4.5 w-4.5 flex-none text-brand-bright" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 max-w-xl border-l-2 border-brand pl-5 text-sm leading-relaxed text-foreground-muted">
              {verified.note}
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6">
            <div className="relative aspect-4/3 overflow-hidden lg:aspect-5/4">
              <Image
                src="/imagens/farol-detalhe.jpg"
                alt="Detalhe do conjunto óptico de um veículo em iluminação de estúdio."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={78}
                className="object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

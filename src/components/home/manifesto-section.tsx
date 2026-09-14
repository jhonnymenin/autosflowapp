import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { manifesto } from "@/data/brand";

export function ManifestoSection() {
  return (
    <section className="bg-bone-50 py-section text-navy">
      <div className="container-editorial">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-brand">
              <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" />
              Manifesto
            </p>
            <h2 className="mt-6 text-display-md font-semibold text-navy">
              {manifesto.claim}
            </h2>
            <p className="mt-5 text-display-sm font-display font-medium tracking-tight text-brand">
              {manifesto.claimEcho}
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <p className="text-lead text-navy/75">{manifesto.opening}</p>
            </Reveal>

            <Reveal delay={140} as="ul" className="mt-12 border-t border-navy/12">
              {manifesto.criteria.map((line, index) => (
                <li
                  key={line}
                  className="flex items-baseline gap-5 border-b border-navy/12 py-4 sm:gap-8"
                >
                  <span className="tnum text-eyebrow font-medium tracking-[0.18em] text-navy/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base tracking-tight text-navy sm:text-lg">
                    {line}
                  </span>
                </li>
              ))}
            </Reveal>

            <Reveal delay={180} className="mt-12">
              <p className="text-lead max-w-lg text-navy/75">{manifesto.trust}</p>
              <p className="mt-6 text-display-sm font-display font-semibold tracking-tight text-navy">
                {manifesto.promise}
              </p>
              <Link
                href="/sobre"
                className="group/link mt-8 inline-flex items-center gap-2.5 border-b border-navy/25 pb-1 text-sm font-medium tracking-tight text-navy transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                Ler o manifesto completo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { journeySteps, manifesto } from "@/data/brand";

export function JourneySection() {
  return (
    <section
      className="relative isolate overflow-hidden border-t border-border py-section"
      aria-labelledby="jornada"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/imagens/estrada-anoitecer.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={72}
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="container-editorial">
        <Reveal className="max-w-3xl">
          <Eyebrow>A jornada</Eyebrow>
          <h2
            id="jornada"
            className="mt-6 text-display-md font-semibold text-foreground"
          >
            Da escolha à entrega — e também depois dela.
          </h2>
          <p className="text-lead mt-6 max-w-2xl text-foreground-muted">
            {manifesto.journey}
          </p>
        </Reveal>

        <Reveal
          delay={80}
          as="ol"
          className="mt-14 grid gap-px border-t border-border sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
        >
          {journeySteps.map((step, index) => (
            <li
              key={step}
              className="group/step relative border-b border-border py-7 sm:py-9 sm:[&:not(:nth-child(2n))]:pr-8 lg:[&:not(:nth-child(3n))]:pr-8"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover/step:w-full"
              />
              <p className="tnum text-eyebrow font-medium tracking-[0.18em] text-brand-bright">
                Etapa {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 max-w-[15ch] text-xl font-display font-medium tracking-tight text-foreground sm:text-2xl">
                {step}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

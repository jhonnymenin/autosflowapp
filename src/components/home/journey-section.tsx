import { JourneyLine } from "@/components/journey-line";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { manifesto } from "@/data/brand";

export function JourneySection() {
  return (
    <section
      className="border-t border-border py-section"
      aria-labelledby="jornada"
    >
      <div className="container-editorial">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>A jornada</Eyebrow>
            <h2
              id="jornada"
              className="mt-5 text-display-md font-semibold text-foreground"
            >
              Cuidamos do caminho.
            </h2>
          </div>
          <p className="text-lead max-w-xl text-foreground-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            {manifesto.journey}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <JourneyLine />
        </Reveal>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/reveal";
import { VehicleCard } from "@/components/vehicle-card";
import { ArrowLink, SectionHeading } from "@/components/ui";
import { vehicles } from "@/data/vehicles";
import { showcaseVehicles } from "@/lib/stock";

/**
 * Vitrine: seis cards grandes, os com fotos da unidade primeiro. Grade e não
 * trilho — uma grade se lê de uma vez e não esconde carros fora da tela.
 */
export function ShowcaseSection() {
  const showcase = showcaseVehicles(6);

  return (
    <section className="pb-section pt-16 sm:pt-20" aria-labelledby="vitrine">
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            id="vitrine"
            eyebrow="Em destaque"
            title="Carros selecionados para você."
            action={
              <ArrowLink href="/veiculos">
                Ver os {vehicles.length} veículos
              </ArrowLink>
            }
          />
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {showcase.map((vehicle, index) => (
            <Reveal as="li" key={vehicle.slug} delay={(index % 3) * 40}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

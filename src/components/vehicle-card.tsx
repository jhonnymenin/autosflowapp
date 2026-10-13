import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Camera } from "@/components/icons";
import { Badge } from "@/components/ui";
import { hasRealPhotos, imagesFor } from "@/data/vehicle-images";
import { formatKmShort, priceLabel } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

/**
 * Card de veículo — a unidade da vitrine e do estoque.
 *
 * Hierarquia fixa: a foto vende, o nome identifica, a linha de dados apoia e
 * o preço fecha. Selos só com informação real: "Fotos da unidade" quando a
 * foto é do próprio carro, "Imagem ilustrativa" quando ainda não é.
 */
export function VehicleCard({
  vehicle,
  priority = false,
  sizes = "(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw",
}: {
  vehicle: Vehicle;
  priority?: boolean;
  sizes?: string;
}) {
  const cover = imagesFor(vehicle)[0];
  const real = hasRealPhotos(vehicle);
  const name = `${vehicle.make} ${vehicle.model}`;

  return (
    <Link
      href={`/veiculos/${vehicle.slug}`}
      className="group/card flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-[box-shadow,transform,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-border-strong hover:shadow-lift"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-raised">
        {cover ? (
          <Image
            src={cover.src}
            alt={`${name} ${vehicle.version}`}
            fill
            sizes={sizes}
            quality={74}
            priority={priority}
            className="object-cover object-center transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-[1.04]"
          />
        ) : null}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {real ? (
            <Badge tone="dark">
              <Camera className="h-3.5 w-3.5" />
              Fotos da unidade
            </Badge>
          ) : (
            <Badge tone="dark">Imagem ilustrativa</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-subtle">
          {vehicle.make}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-[1.375rem]">
          {vehicle.model}{" "}
          <span className="font-medium text-foreground-muted">
            {vehicle.version}
          </span>
        </h3>

        <dl className="tnum mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground-muted">
          <div>
            <dt className="sr-only">Ano</dt>
            <dd>{vehicle.year}</dd>
          </div>
          <span aria-hidden="true" className="text-border-strong">
            •
          </span>
          <div>
            <dt className="sr-only">Quilometragem</dt>
            <dd>
              {vehicle.km > 0 ? formatKmShort(vehicle.km) : "Km sob consulta"}
            </dd>
          </div>
          <span aria-hidden="true" className="text-border-strong">
            •
          </span>
          <div>
            <dt className="sr-only">Combustível</dt>
            <dd>{vehicle.fuel}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <p className="text-xs text-foreground-subtle">
              {vehicle.origin === "consignado" ? "Consignado · valor" : "Valor"}
            </p>
            <p className="tnum mt-0.5 font-display text-[1.625rem] font-bold leading-none tracking-tight text-foreground">
              {priceLabel(vehicle.price)}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface-raised text-foreground transition-colors duration-300 group-hover/card:bg-brand group-hover/card:text-white"
          >
            <ArrowRight className="h-4.5 w-4.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

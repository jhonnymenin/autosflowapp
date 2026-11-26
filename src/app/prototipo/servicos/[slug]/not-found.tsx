import Link from "next/link";

import { ArrowRight } from "../../_components/icons";

export default function ServiceNotFound() {
  return (
    <section className="night grain relative overflow-hidden pt-[calc(4.75rem+6rem)] pb-32">
      <div className="container-p relative z-[2] grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p aria-hidden="true" className="t-mega text-[clamp(5rem,18vw,16rem)] text-[var(--signal)]">
            404
          </p>
          <h1 className="t-display mt-6">Serviço não encontrado</h1>
          <p className="t-lead mt-6 max-w-xl text-[var(--on-night-mute)]">
            Esse endereço não existe ou o serviço saiu da vitrine. Veja os outros serviços dos nossos parceiros.
          </p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Link
            href="/prototipo/servicos"
            className="group inline-flex items-center gap-4 rounded-full bg-white py-2 pr-2 pl-7 text-[17px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--signal)]"
          >
            Ver todos os serviços
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--blue)] text-white">
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

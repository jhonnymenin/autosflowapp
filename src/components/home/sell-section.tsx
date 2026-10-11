import Image from "next/image";
import Link from "next/link";

import { WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { buttonClass } from "@/components/ui";
import { pitch } from "@/data/brand";
import { whatsappSell } from "@/lib/site";

/**
 * Venda o seu carro.
 *
 * O outro lado do negócio, em três passos que agrupam as seis etapas da
 * jornada assistida (apresentação, p.5). Fundo marinho para separar com
 * clareza "quero comprar" de "quero vender" ao rolar a home.
 */
export const sellSteps = [
  {
    title: "Avaliação e preço justo",
    body: "Cadastramos o carro, avaliamos e definimos com você o valor de anúncio.",
  },
  {
    title: "Fotos, anúncio e atendimento",
    body: "Produzimos fotos e vídeo, divulgamos e atendemos os interessados.",
  },
  {
    title: "Negociação e transferência",
    body: "Conduzimos propostas, financiamento do comprador e a documentação até a transferência.",
  },
];

export function SellSection() {
  return (
    <section className="py-section" aria-labelledby="vender-home">
      <div className="container-editorial">
        <div className="theme-dark grid overflow-hidden rounded-[1.75rem] bg-background lg:grid-cols-2 lg:rounded-[2rem]">
          <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <Reveal>
              <p className="text-eyebrow font-semibold uppercase text-accent">
                Venda o seu carro
              </p>
              <h2
                id="vender-home"
                className="mt-3 text-display-md font-semibold text-foreground"
              >
                Você acompanha. A AutosFlow cuida do processo.
              </h2>
              <p className="text-lead mt-4 max-w-lg text-foreground-muted">
                {pitch.lead}
              </p>
            </Reveal>

            <Reveal as="ol" delay={40} className="mt-10 space-y-6">
              {sellSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="tnum flex h-9 w-9 flex-none items-center justify-center rounded-full border border-border-strong font-display text-sm font-semibold text-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </Reveal>

            <Reveal
              delay={80}
              className="mt-10 flex flex-col gap-2.5 sm:flex-row"
            >
              <a
                href={whatsappSell}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary", "lg")}
              >
                <WhatsApp className="h-4.5 w-4.5" />
                Pedir avaliação
              </a>
              <Link href="/vender" className={buttonClass("onDark", "lg")}>
                Como funciona
              </Link>
            </Reveal>
          </div>

          <div className="relative min-h-72 lg:min-h-full">
            <Image
              src="/imagens/farol-detalhe.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={74}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>
        </div>
      </div>
    </section>
  );
}

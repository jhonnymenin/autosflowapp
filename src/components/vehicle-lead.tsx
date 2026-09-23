"use client";

import { useMemo, useState } from "react";

import { WhatsApp } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import { whatsappForVehicle, type LeadVehicle } from "@/lib/site";

const TERMS = [24, 36, 48, 60];

/**
 * Proposta por veículo.
 *
 * Monta a conversa com entrada, prazo e troca já preenchidos. Não calcula
 * parcela: o site não tem taxa, seguro nem tarifa cadastrados, e um número
 * estimado aqui viraria uma promessa que o atendimento teria de desfazer.
 * Quem define o valor é o atendimento, com a proposta já em mãos.
 */
export function VehicleLead({ lead }: { lead: LeadVehicle }) {
  const [down, setDown] = useState("");
  const [term, setTerm] = useState<number | null>(null);
  const [tradeIn, setTradeIn] = useState(false);

  const downValue = useMemo(() => {
    const digits = down.replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  }, [down]);

  const href = whatsappForVehicle(lead, {
    downPayment: downValue || undefined,
    instalments: term ?? undefined,
    tradeIn,
  });

  return (
    <div className="border-t border-border pt-7">
      <h2 className="text-eyebrow font-medium uppercase text-foreground-subtle">
        Montar proposta
      </h2>

      <div className="mt-5 space-y-5">
        <div>
          <label
            htmlFor="entrada"
            className="block text-sm text-foreground-muted"
          >
            Entrada
          </label>
          <div className="mt-2 flex items-center border border-border bg-background focus-within:border-brand-bright">
            <span className="pl-3 text-sm text-foreground-subtle">R$</span>
            <input
              id="entrada"
              name="entrada"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="0"
              value={downValue ? downValue.toLocaleString("pt-BR") : ""}
              onChange={(event) => setDown(event.target.value)}
              className="tnum h-11 w-full bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-foreground-subtle"
            />
          </div>
        </div>

        <div>
          <span className="block text-sm text-foreground-muted">
            Prazo pretendido
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TERMS.map((option) => {
              const selected = term === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTerm(selected ? null : option)}
                  className={`tnum h-9 border px-4 text-sm transition-colors duration-300 ${
                    selected
                      ? "border-brand bg-brand text-white"
                      : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  {option}x
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground-muted">
          <input
            type="checkbox"
            checked={tradeIn}
            onChange={(event) => setTradeIn(event.target.checked)}
            className="mt-0.5 h-4 w-4 flex-none accent-[var(--color-brand)]"
          />
          Tenho um veículo para dar na troca
        </label>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex h-13 w-full items-center justify-center gap-3 bg-brand px-6 text-sm font-medium tracking-tight text-white transition-colors duration-300 hover:bg-brand-bright"
      >
        <WhatsApp className="h-4.5 w-4.5" />
        Enviar proposta
      </a>

      <p className="mt-3 text-xs leading-relaxed text-foreground-subtle">
        {downValue > 0 || term || tradeIn
          ? `Sua mensagem já vai com ${[
              downValue > 0 ? `entrada de ${formatPrice(downValue)}` : null,
              term ? `${term}x` : null,
              tradeIn ? "veículo na troca" : null,
            ]
              .filter(Boolean)
              .join(", ")}.`
          : "O atendimento retorna com as condições de financiamento disponíveis."}
      </p>
    </div>
  );
}

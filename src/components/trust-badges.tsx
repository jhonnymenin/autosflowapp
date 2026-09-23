import { Check } from "@/components/icons";

/**
 * Garantias ao lado do botão.
 *
 * Fica colado na conversão porque é ali que a dúvida aparece. Cada linha é um
 * compromisso que a AutosFlow assume de fato — nada aqui é estimativa nem
 * promessa que o atendimento teria de desfazer depois.
 */
const guarantees = [
  "Laudo cautelar e histórico documental",
  "Inspeção mecânica antes da entrega",
  "Documentação e transferência com a gente",
  "Dados do anúncio conferem com o registro",
];

export function TrustBadges() {
  return (
    <div className="mt-6 border-t border-border pt-5">
      <ul className="space-y-2.5">
        {guarantees.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground-muted"
          >
            <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-brand-bright" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

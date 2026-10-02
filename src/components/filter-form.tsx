"use client";

import { useRouter } from "next/navigation";
import { useTransition, type FormEvent } from "react";

/**
 * Formulário de filtros do estoque.
 *
 * Sem JavaScript, é um formulário GET comum: o botão envia e a URL guarda a
 * seleção. Com JavaScript, cada lista aplica o filtro assim que muda, sem
 * recarregar a página nem pular para o topo. Campos vazios não vão para a
 * URL, para que o link compartilhado fique limpo.
 */
export function FilterForm({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function apply(form: HTMLFormElement) {
    const params = new URLSearchParams();
    for (const [key, value] of new FormData(form)) {
      if (typeof value === "string" && value.trim()) {
        params.set(key, value.trim());
      }
    }
    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `/veiculos?${query}` : "/veiculos", {
        scroll: false,
      });
    });
  }

  return (
    <form
      action="/veiculos"
      method="get"
      aria-busy={pending}
      className={className}
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        apply(event.currentTarget);
      }}
      onChange={(event) => {
        if (event.target instanceof HTMLSelectElement) {
          apply(event.currentTarget);
        }
      }}
    >
      {children}
    </form>
  );
}

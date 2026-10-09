"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Medição de audiência (Vercel Web Analytics, sem cookies).
 *
 * Além das visitas, registra cada clique que abre o WhatsApp — a conversão do
 * site. Um único ouvinte no documento pega todos os links `wa.me`, então
 * nenhum botão precisa saber que é medido. O evento leva a página de origem,
 * que no caso de um veículo já identifica o anúncio.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.(
        'a[href^="https://wa.me/"]',
      );
      if (link) track("whatsapp", { page: window.location.pathname });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <VercelAnalytics />;
}

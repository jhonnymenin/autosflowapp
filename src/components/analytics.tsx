"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { initOpenAiPixel, trackPageViewed } from "@/lib/openai-pixel";

/**
 * Medição de audiência (Vercel Web Analytics, sem cookies).
 *
 * Além das visitas, registra cada clique que abre o WhatsApp — a conversão do
 * site. Um único ouvinte no documento pega todos os links `wa.me`, então
 * nenhum botão precisa saber que é medido. O evento leva a página de origem,
 * que no caso de um veículo já identifica o anúncio.
 *
 * Também carrega o pixel do OpenAI Ads (só nos domínios de produção — ver
 * lib/openai-pixel.ts) e manda `page_viewed` a cada página. A navegação entre
 * páginas não recarrega o documento, então o evento acompanha a rota, não o
 * carregamento; filtros do estoque mudam só a query e não contam como página.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (initOpenAiPixel()) trackPageViewed();
  }, [pathname]);

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

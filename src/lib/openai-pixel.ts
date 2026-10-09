/*
 * Measurement Pixel do OpenAI Ads.
 *
 * O ID não é segredo — aparece no HTML de qualquer site que roda o pixel —,
 * mas o carregamento é preso aos domínios de produção. Sem a trava, um
 * `npm run dev`, um preview da Vercel ou um teste automatizado mandaria evento
 * para a conta de anúncios real e sujaria a otimização da campanha.
 *
 * `NEXT_PUBLIC_OPENAI_PIXEL_ID` tem prioridade: com um ID falso, testa o
 * mecanismo fora de produção; definido vazio no painel da Vercel, desliga o
 * pixel sem deploy de código.
 */

/** Pixel da AutosFlow, enviado pelo Jhonny em 09/10/2026. */
const PIXEL_ID = "CziZEESMDxgWnP8w6YFdbC";

/**
 * Domínios em que o pixel pode carregar. O apex redireciona para o www, mas
 * entra na lista: se um dia passar a servir o site direto, o rastreamento não
 * para em silêncio. Ao acrescentar domínio na Vercel, acrescentar aqui.
 */
const PRODUCTION_HOSTS = ["www.autosflow.com.br", "autosflow.com.br"];

const ENV_ID = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID;

function pixelIdForThisHost(): string {
  if (ENV_ID !== undefined) return ENV_ID;
  if (typeof window === "undefined") return "";
  return PRODUCTION_HOSTS.includes(window.location.hostname) ? PIXEL_ID : "";
}

type Oaiq = ((...args: unknown[]) => void) & { q: unknown[] };

declare global {
  interface Window {
    oaiq?: Oaiq;
  }
}

/**
 * Injeta o snippet oficial uma única vez; seguro para chamar de novo. É o
 * código do Ads Manager reescrito como função, sem o `debug: true` da
 * configuração inicial, que só enche o console do visitante.
 *
 * @returns se o pixel está ativo nesta página.
 */
export function initOpenAiPixel(): boolean {
  if (typeof window === "undefined") return false;
  if (window.oaiq) return true;

  const id = pixelIdForThisHost();
  if (id === "") return false;

  const oaiq = function (...args: unknown[]) {
    oaiq.q.push(args);
  } as Oaiq;
  oaiq.q = [];
  window.oaiq = oaiq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
  document.head.appendChild(script);

  oaiq("init", { pixelId: id });
  return true;
}

/** Identificador do evento, para deduplicar se a Conversions API entrar depois. */
function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * `page_viewed`, com o payload exato que o Ads Manager gerou —
 * `{ type: "contents" }`. Campos fora do esquema não vão: evento rejeitado
 * some sem aviso.
 */
export function trackPageViewed(): void {
  window.oaiq?.(
    "measure",
    "page_viewed",
    { type: "contents" },
    { event_id: newEventId() },
  );
}

/**
 * FE-01 — os banners do carrossel institucional, numa lista de configuração
 * fácil de trocar (como pede o material de apoio). Textos do wireframe do time.
 * Na Fase 1 só "Vender" leva a um fluxo real; Lojista abre a lista de espera.
 */
export interface Banner {
  key: "vender" | "lojista" | "servicos";
  label: string;
  title: string;
  text: string;
  cta: string;
  poster: string;
  video?: string;
  action: { href: string } | { waitlist: "lojista" };
  phase: "Fase 1" | "Fase 2";
}

export const banners: Banner[] = [
  {
    key: "vender",
    label: "Vender meu carro",
    title: "Venda seu carro com a gente cuidando de tudo",
    text: "Avaliação, fotos, anúncio, atendimento e documentação. Você acompanha, a AutosFlow cuida do processo.",
    cta: "Quero avaliar meu carro",
    poster: "/prototipo/hero-fluxo.jpg",
    video: "/prototipo/hero-fluxo.mp4",
    action: { href: "#vender" },
    phase: "Fase 1",
  },
  {
    key: "lojista",
    label: "Sou lojista",
    title: "Coloque a sua frota na AutosFlow",
    text: "Mais visibilidade pro seu estoque e leads qualificados. O primeiro mês é por nossa conta.",
    cta: "Quero ser parceiro",
    poster: "/imagens/prototipo/hero-lojista.jpg",
    video: "/prototipo/hero-lojista.mp4",
    action: { waitlist: "lojista" },
    phase: "Fase 2",
  },
  {
    key: "servicos",
    label: "Serviços",
    title: "Tudo pro seu carro num lugar só",
    text: "Revisão, lavagem, troca de óleo, débitos e mais, com parceiros avaliados pela AutosFlow.",
    cta: "Ver serviços",
    poster: "/imagens/prototipo/hero-servicos.jpg",
    video: "/prototipo/hero-servicos.mp4",
    action: { href: "/prototipo/servicos" },
    phase: "Fase 2",
  },
];

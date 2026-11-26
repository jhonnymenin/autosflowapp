/**
 * Conteúdo da Análise de UX (protótipo).
 *
 * Personas e jornadas são HIPÓTESES a validar em entrevistas. Nenhum número
 * aqui é inventado: o que não foi medido aparece como "a medir" ou "a definir".
 * Os códigos FE seguem o material de apoio de 23/11/2026.
 */

export const sections = [
  { id: "capa", label: "Início" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "personas", label: "Quem usa" },
  { id: "jornadas", label: "Jornadas" },
  { id: "blocos", label: "Bloco a bloco" },
  { id: "principios", label: "Princípios" },
  { id: "qualidade", label: "Qualidade" },
  { id: "funil", label: "Funil" },
  { id: "fases", label: "Fases e decisões" },
] as const;

/* -------------------------------------------------------------------------
   Diagnóstico: antes → agora
   ---------------------------------------------------------------------- */

export const diagnosis: { before: string; after: string; fe: string[] }[] = [
  {
    before: "A home só falava de comprar.",
    after: "As quatro frentes aparecem logo no topo: comprar, vender, lojista e serviços.",
    fe: ["FE-01"],
  },
  {
    before: "A busca ficava no meio da página e pedia vários filtros.",
    after: "Um campo só, logo abaixo do topo, que entende frases como “SUV automático até 130 mil”.",
    fe: ["FE-02"],
  },
  {
    before: "Os ícones de serviço não levavam a lugar nenhum.",
    after: "Cada serviço abre a vitrine de parceiros e uma página de detalhe com orçamento.",
    fe: ["FE-03", "FE-12", "FE-13"],
  },
  {
    before: "Um card grande ocupava a tela e dificultava comparar.",
    after: "Cards compactos, cinco por linha, com selos e carros ligados ao que a pessoa já buscou.",
    fe: ["FE-04"],
  },
  {
    before: "Poucos atalhos de busca.",
    after: "Tipos de carro e “Mais buscados” com a contagem real do estoque.",
    fe: ["FE-05"],
  },
  {
    before: "Para vender, um único botão de WhatsApp.",
    after: "Pré-avaliação com placa, km e WhatsApp: a pessoa vê uma faixa de valor e o time recebe o lead.",
    fe: ["FE-07"],
  },
  {
    before: "Um depoimento só, num cartão.",
    after: "Doze depoimentos reais passando, com nome e o carro que cada um comprou.",
    fe: ["FE-08"],
  },
  {
    before: "O selo Verified, nosso diferencial, escondido num cartão pequeno.",
    after: "Um banner de largura total com o que é checado em cada carro.",
    fe: ["FE-09"],
  },
  {
    before: "A loja aparecia, mas sem como marcar a visita.",
    after: "Agenda com dia e horário, mapa e “aberto agora”.",
    fe: ["FE-10"],
  },
  {
    before: "O fim da página não levava a lugar nenhum.",
    after: "“Continue sua busca”: links por preço, marca e carroceria que o Google também segue.",
    fe: ["FE-11"],
  },
];

/* -------------------------------------------------------------------------
   Personas (hipóteses)
   ---------------------------------------------------------------------- */

export type PersonaKey = "comprador" | "proprietario" | "lojista" | "servicos";

export interface Persona {
  key: PersonaKey;
  role: string;
  name: string;
  sketch: string;
  photo: string;
  photoAlt: string;
  job: string;
  fears: string[];
  firstSee: string[];
  where: { label: string; href: string }[];
}

export const personas: Persona[] = [
  {
    key: "comprador",
    role: "Comprador",
    name: "Carla",
    sketch: "Quer um SUV automático até R$ 130 mil para a família.",
    photo: "/imagens/veiculos/reais/jeep-compass-limited-t270/01-0b92bb0f.jpg",
    photoAlt: "Jeep Compass Limited 2022 do estoque da AutosFlow, no showroom",
    job: "Quando decido trocar de carro, quero achar um carro confiável no meu orçamento sem gastar fins de semana rodando lojas.",
    fears: ["Cair em golpe", "Carro batido ou de leilão", "Pagar acima da FIPE", "Vendedor empurrando"],
    firstSee: ["Preço e km na cara", "Fotos do carro de verdade", "Laudo e histórico"],
    where: [
      { label: "Busca em linguagem natural (FE-02)", href: "/prototipo#vitrine" },
      { label: "Vitrine e destaques (FE-04)", href: "/prototipo#vitrine" },
    ],
  },
  {
    key: "proprietario",
    role: "Proprietário que vende",
    name: "Marcos",
    sketch: "Quer vender o Onix 2024 para dar entrada num carro maior.",
    photo: "/imagens/prototipo/hero-vender.jpg",
    photoAlt: "Chave de carro passando de uma mão para outra, num showroom",
    job: "Quando preciso vender meu carro, quero saber quanto ele vale e vender sem dor de cabeça nem risco.",
    fears: ["Proposta muito abaixo do valor", "Golpe do comprador", "Burocracia da transferência", "Perder tempo com curioso"],
    firstSee: ["Uma faixa de valor", "Quem cuida de cada etapa", "Quanto tempo leva"],
    where: [
      { label: "Pré-avaliação com a placa (FE-07)", href: "/prototipo#vender" },
      { label: "Topo “Vender meu carro” (FE-01)", href: "/prototipo" },
    ],
  },
  {
    key: "lojista",
    role: "Lojista",
    name: "Paulo",
    sketch: "Loja com 40 carros no pátio, em Guarulhos.",
    photo: "/imagens/prototipo/hero-lojista.jpg",
    photoAlt: "Loja de carros iluminada ao anoitecer, com carros enfileirados",
    job: "Quando tenho carro parado no pátio, quero mais gente qualificada vendo meu estoque sem pagar por clique perdido.",
    fears: ["Lead frio", "Plataforma cara", "Retrabalho para cadastrar a frota"],
    firstSee: ["Quanto custa", "Que tipo de lead chega", "Quanto trabalho dá"],
    where: [{ label: "Banner e lista de espera (FE-01, Fase 2)", href: "/prototipo" }],
  },
  {
    key: "servicos",
    role: "Cliente de serviços",
    name: "Ana",
    sketch: "Precisa fazer a revisão dos 30 mil km antes de viajar.",
    photo: "/imagens/prototipo/svc-revisao.jpg",
    photoAlt: "Mecânico com um tablet inspecionando um carro no elevador",
    job: "Quando meu carro precisa de revisão, lavagem ou papelada, quero achar alguém de confiança perto de mim e saber o preço antes.",
    fears: ["Oficina que inventa serviço", "Preço surpresa", "Perder o dia esperando"],
    firstSee: ["Preço “a partir de”", "Onde fica e se está aberto", "O que está incluso"],
    where: [
      { label: "Faixa de serviços (FE-03)", href: "/prototipo" },
      { label: "Listagem (FE-12)", href: "/prototipo/servicos" },
      { label: "Detalhe (FE-13)", href: "/prototipo/servicos/revisao-preventiva" },
    ],
  },
];

/* -------------------------------------------------------------------------
   Jornadas: passos, ponto de contato e curva de emoção (0 = ansiedade,
   1 = confiança). Valores ilustrativos da hipótese, não medidos.
   ---------------------------------------------------------------------- */

export interface Step {
  title: string;
  thinks: string;
  feels: string;
  emotion: number;
  touch: { label: string; href?: string };
}

export const journeys: Record<PersonaKey, Step[]> = {
  comprador: [
    { title: "Chega pela home", thinks: "Será que aqui tem carro no meu orçamento?", feels: "Desconfiada", emotion: 0.28, touch: { label: "Topo com as quatro frentes", href: "/prototipo" } },
    { title: "Escreve o que quer", thinks: "Escrevi do meu jeito e ele entendeu.", feels: "Surpresa", emotion: 0.55, touch: { label: "Busca em linguagem natural", href: "/prototipo#vitrine" } },
    { title: "Compara os carros", thinks: "Foto do carro de verdade, km e preço na cara.", feels: "Interessada", emotion: 0.66, touch: { label: "Vitrine", href: "/prototipo#vitrine" } },
    { title: "Confere o laudo", thinks: "Laudo cautelar e histórico: menos medo de golpe.", feels: "Mais segura", emotion: 0.78, touch: { label: "Selo Verified", href: "/prototipo" } },
    { title: "Chama no WhatsApp", thinks: "Não precisei explicar qual era o carro.", feels: "Atendida", emotion: 0.84, touch: { label: "Página do carro", href: "/veiculos" } },
    { title: "Agenda a visita", thinks: "Horário marcado, sem pressão.", feels: "Confiante", emotion: 0.95, touch: { label: "Visite a loja", href: "/prototipo#loja" } },
  ],
  proprietario: [
    { title: "Vê “Vender” no topo", thinks: "Eles também vendem o meu carro?", feels: "Curioso", emotion: 0.3, touch: { label: "Topo · Vender meu carro", href: "/prototipo" } },
    { title: "Entende o processo", thinks: "Eles cuidam de fotos, anúncio e papelada.", feels: "Aliviado", emotion: 0.5, touch: { label: "Venda seu carro", href: "/prototipo#vender" } },
    { title: "Digita a placa e a km", thinks: "Em meio minuto já tenho uma faixa de valor.", feels: "Animado", emotion: 0.7, touch: { label: "Pré-avaliação", href: "/prototipo#vender" } },
    { title: "Recebe o contato", thinks: "Me chamaram rápido e sem empurrar.", feels: "Respeitado", emotion: 0.74, touch: { label: "WhatsApp da AutosFlow" } },
    { title: "Avaliação na loja", thinks: "Vi o preço justo e concordei.", feels: "Seguro", emotion: 0.86, touch: { label: "Visite a loja", href: "/prototipo#loja" } },
    { title: "Venda e transferência", thinks: "Não precisei ir a despachante nenhum.", feels: "Resolvido", emotion: 0.96, touch: { label: "Serviço de transferência", href: "/prototipo/servicos/transferencia" } },
  ],
  lojista: [
    { title: "Vê o banner “Sou lojista”", thinks: "Mais um portal querendo meu dinheiro?", feels: "Cético", emotion: 0.22, touch: { label: "Topo · Sou lojista", href: "/prototipo" } },
    { title: "Lê a proposta", thinks: "Primeiro mês por conta: dá pra testar.", feels: "Curioso", emotion: 0.46, touch: { label: "Topo · Sou lojista", href: "/prototipo" } },
    { title: "Entra na lista de espera", thinks: "Foi rápido: nome, frota e WhatsApp.", feels: "Interessado", emotion: 0.6, touch: { label: "Lista de espera", href: "/prototipo" } },
    { title: "É chamado para o piloto", thinks: "Me mostraram o painel e o CRM.", feels: "Avaliando", emotion: 0.66, touch: { label: "Fase 2 · ainda não existe no protótipo" } },
    { title: "Cadastra a frota", thinks: "Subi o estoque sem retrabalho.", feels: "Satisfeito", emotion: 0.76, touch: { label: "Fase 2 · área do lojista" } },
    { title: "Recebe os primeiros leads", thinks: "Gente que já sabe qual carro quer.", feels: "Convencido", emotion: 0.92, touch: { label: "Fase 2 · painel de leads" } },
  ],
  servicos: [
    { title: "Toca em “Revisão”", thinks: "Achei sem procurar no Google.", feels: "Prática", emotion: 0.38, touch: { label: "Faixa de serviços", href: "/prototipo" } },
    { title: "Compara parceiros", thinks: "Preço “a partir de” e cidade, lado a lado.", feels: "No controle", emotion: 0.58, touch: { label: "Listagem de serviços", href: "/prototipo/servicos?categoria=revisao" } },
    { title: "Abre o detalhe", thinks: "Sei o que está incluso e quanto tempo leva.", feels: "Informada", emotion: 0.68, touch: { label: "Detalhe do serviço", href: "/prototipo/servicos/revisao-preventiva" } },
    { title: "Vê onde fica", thinks: "Aberto agora e perto de casa.", feels: "Tranquila", emotion: 0.78, touch: { label: "Mapa e horário", href: "/prototipo/servicos/revisao-preventiva" } },
    { title: "Pede o orçamento", thinks: "Nome e WhatsApp, e eu autorizei o contato.", feels: "Segura", emotion: 0.85, touch: { label: "Pedido de orçamento", href: "/prototipo/servicos/revisao-preventiva" } },
    { title: "Vai no dia marcado", thinks: "Sem fila, preço combinado.", feels: "Satisfeita", emotion: 0.95, touch: { label: "No parceiro" } },
  ],
};

/* -------------------------------------------------------------------------
   Bloco a bloco
   ---------------------------------------------------------------------- */

export interface Block {
  code: string;
  title: string;
  what: string;
  why: string;
  events: string[];
  phase: "Fase 1" | "Fase 2" | "Fase 1 + 2";
  status: "Em validação" | "Proposta";
  href: string;
}

export const blocks: Block[] = [
  { code: "FE-01", title: "Carrossel institucional", what: "As quatro frentes no topo, com vídeo e troca automática.", why: "A home só falava de comprar.", events: ["topo_frente_clicada", "lista_espera_lojista"], phase: "Fase 1 + 2", status: "Em validação", href: "/prototipo" },
  { code: "FE-02", title: "Busca em linguagem natural", what: "Campo livre que entende frases e mostra o que entendeu em chips editáveis.", why: "A busca pedia vários filtros no meio da página.", events: ["busca_natural_usada", "busca_sem_resultado", "busca_para_catalogo"], phase: "Fase 1", status: "Em validação", href: "/prototipo" },
  { code: "FE-03", title: "Faixa de serviços", what: "Cada categoria abre a listagem já filtrada.", why: "Os ícones não clicavam.", events: ["servico_categoria_clicada"], phase: "Fase 2", status: "Em validação", href: "/prototipo" },
  { code: "FE-04", title: "Destaques e vitrine", what: "Cards compactos, selos e personalização por histórico.", why: "O card grande ocupava espaço e não ajudava a comparar.", events: ["card_veiculo_clicado", "favorito_adicionado", "personalizacao_exibida"], phase: "Fase 1", status: "Em validação", href: "/prototipo#vitrine" },
  { code: "FE-05", title: "Perfil e atalhos", what: "Tipos de carro e “Mais buscados” com contagem real.", why: "Os atalhos de busca eram poucos.", events: ["atalho_clicado"], phase: "Fase 1", status: "Em validação", href: "/prototipo#perfil" },
  { code: "FE-06", title: "Por que a AutosFlow", what: "Como funciona em três passos e números reais do estoque.", why: "O bloco existia, mas convertia pouco.", events: ["como_funciona_visto"], phase: "Fase 1", status: "Proposta", href: "/prototipo" },
  { code: "FE-07", title: "Pré-avaliação", what: "Placa, km e WhatsApp, com uma faixa de valor na hora.", why: "Captar carro é o motor do negócio e só havia um botão.", events: ["pre_avaliacao_iniciada", "lead_venda_home", "whatsapp_click"], phase: "Fase 1", status: "Proposta", href: "/prototipo#vender" },
  { code: "FE-08", title: "Depoimentos", what: "Clientes reais, um por vez e passando sem parar.", why: "Um cartão só não passava a sensação de muita gente.", events: ["depoimento_interacao"], phase: "Fase 1", status: "Em validação", href: "/prototipo#depoimentos" },
  { code: "FE-09", title: "Selo Verified", what: "Banner de largura total com o que é checado.", why: "O diferencial estava escondido.", events: ["verified_cta_clicado"], phase: "Fase 1", status: "Em validação", href: "/prototipo" },
  { code: "FE-10", title: "Visite a loja", what: "Agenda com dia e horário, mapa e “aberto agora”.", why: "Não havia como marcar a visita pelo site.", events: ["visita_agendada", "como_chegar_clicado"], phase: "Fase 1", status: "Proposta", href: "/prototipo#loja" },
  { code: "FE-11", title: "Continue sua busca", what: "Sanfona de categorias com links para o catálogo.", why: "Ajuda o Google a conhecer as páginas do catálogo.", events: ["tráfego orgânico por página (Search Console)"], phase: "Fase 1", status: "Em validação", href: "/prototipo#continue" },
  { code: "FE-12", title: "Serviços: listagem", what: "Vitrine de parceiros com filtros na URL.", why: "Serviços viram a quarta frente de receita.", events: ["servico_filtrado", "servico_card_clicado"], phase: "Fase 2", status: "Em validação", href: "/prototipo/servicos" },
  { code: "FE-13", title: "Serviços: detalhe", what: "Pedido de orçamento, contato, mapa e horário do parceiro.", why: "A pessoa quer saber o preço, como falar e onde ir.", events: ["orcamento_servico_enviado", "parceiro_whatsapp_click"], phase: "Fase 2", status: "Em validação", href: "/prototipo/servicos/lavagem-completa" },
];

/* -------------------------------------------------------------------------
   Princípios
   ---------------------------------------------------------------------- */

export const principles = [
  {
    title: "O fluxo",
    text: "O nome vira a experiência. Cada tela leva ao próximo passo e nenhuma termina num beco sem saída. O rastro de luz da Marginal no topo é a mesma linha que mostra o caminho ao rolar.",
  },
  {
    title: "Prova real",
    text: "Só estoque, fotos e depoimentos de verdade. A vitrine usa a unidade anunciada, recortada da foto da loja. O que ainda é exemplo vem escrito como exemplo.",
  },
  {
    title: "Uma ação por tela",
    text: "Cada tela tem um botão principal: buscar, avaliar, agendar ou pedir orçamento. O resto apoia a decisão, não compete com ela.",
  },
  {
    title: "Movimento com propósito",
    text: "A animação explica: o carro entra na vitrine, a placa confirma, a linha mostra o caminho. Para quem pede menos movimento no sistema, tudo aparece parado.",
  },
  {
    title: "Feito para o polegar",
    text: "Pensado primeiro para o celular: alvos grandes, a ação principal ao alcance do dedo e nada que dependa de passar o mouse.",
  },
];

/* -------------------------------------------------------------------------
   Qualidade e acessibilidade
   ---------------------------------------------------------------------- */

export const qualityDone = [
  "Contraste AA nos textos principais",
  "Foco visível e navegação completa pelo teclado",
  "Rótulo em todo campo e em todo botão só de ícone",
  "Respeita “reduzir movimento” do sistema",
  "Protótipo fora do Google: noindex e fora do sitemap",
  "Placa nunca exibida inteira: o carro é identificado pela referência AF-###",
  "Consentimento LGPD no pedido de orçamento",
  "Links do “Continue sua busca” no HTML mesmo com a sanfona fechada",
  "Dados de exemplo rotulados como exemplo",
];

export const qualityPending = [
  "Teste com leitor de tela (VoiceOver e TalkBack)",
  "Texto de consentimento e prazo de guarda dos leads, com o jurídico",
  "Banner de cookies e preferências guardadas (FE-04)",
  "Core Web Vitals medidos com o vídeo no topo",
  "Autorização de imagem dos clientes para fotos nos depoimentos",
  "Integração com o backoffice: leads, agenda e lista de espera",
  "Teste de usabilidade com cinco pessoas por persona",
];

/* -------------------------------------------------------------------------
   Funis
   ---------------------------------------------------------------------- */

export const funnels: { front: string; steps: { label: string; event: string }[] }[] = [
  {
    front: "Comprar",
    steps: [
      { label: "Visita na home", event: "page_view" },
      { label: "Busca ou atalho", event: "busca_natural_usada · atalho_clicado" },
      { label: "Abre um carro", event: "card_veiculo_clicado" },
      { label: "Chama no WhatsApp", event: "whatsapp (já medido)" },
      { label: "Visita agendada", event: "visita_agendada" },
    ],
  },
  {
    front: "Vender",
    steps: [
      { label: "Visita na home", event: "page_view" },
      { label: "Começa a pré-avaliação", event: "pre_avaliacao_iniciada" },
      { label: "Envia placa, km e WhatsApp", event: "lead_venda_home" },
      { label: "Avaliação marcada", event: "backoffice" },
      { label: "Carro anunciado", event: "backoffice" },
    ],
  },
  {
    front: "Lojista",
    steps: [
      { label: "Visita na home", event: "page_view" },
      { label: "Abre a frente lojista", event: "topo_frente_clicada" },
      { label: "Entra na lista de espera", event: "lista_espera_lojista" },
      { label: "Piloto (Fase 2)", event: "backoffice" },
    ],
  },
  {
    front: "Serviços",
    steps: [
      { label: "Visita na home", event: "page_view" },
      { label: "Escolhe a categoria", event: "servico_categoria_clicada" },
      { label: "Abre o serviço", event: "servico_card_clicado" },
      { label: "Pede orçamento", event: "orcamento_servico_enviado" },
    ],
  },
];

/* -------------------------------------------------------------------------
   Fases e decisões em aberto (material de apoio, p. 13)
   ---------------------------------------------------------------------- */

export const phase1 = [
  "FE-01 Carrossel institucional no topo",
  "FE-02 Busca rápida com linguagem natural",
  "FE-04 Destaques compactos com selos e personalização",
  "FE-05 Encontre pelo seu perfil",
  "FE-06 Por que a AutosFlow",
  "FE-07 Venda seu carro: pré-avaliação rápida",
  "FE-08 Depoimentos em carrossel",
  "FE-09 Selo Verified como banner",
  "FE-10 Visite a loja: agenda e mapa",
  "FE-11 Continue sua busca (SEO)",
];

export const phase2 = [
  "FE-03 Serviços: faixa clicável da home",
  "FE-12 Serviços: página de listagem",
  "FE-13 Serviços: página de detalhe",
];

export const decisions: { fe: string; title: string; items: string[] }[] = [
  {
    fe: "FE-01",
    title: "Carrossel institucional",
    items: [
      "Para onde levar Lojista e Serviços enquanto a Fase 2 não existe (sugestão: lista de espera com WhatsApp).",
      "Textos e imagens dos slides.",
    ],
  },
  {
    fe: "FE-02",
    title: "Busca em linguagem natural",
    items: [
      "Qual provedor de IA usar e o teto de custo por mês.",
      "Cidade como filtro: o veículo tem localização cadastrada?",
    ],
  },
  {
    fe: "FE-04",
    title: "Destaques",
    items: [
      "Regras dos selos: quantos % abaixo da FIPE e limite de km por ano.",
      "Texto do banner de cookies e que preferências guardar (LGPD).",
    ],
  },
  { fe: "FE-05", title: "Perfil e atalhos", items: ["Lista final de atalhos e a ordem."] },
  { fe: "FE-06", title: "Por que a AutosFlow", items: ["Se entram a faixa de números e a página “Como funciona”."] },
  {
    fe: "FE-07",
    title: "Pré-avaliação",
    items: [
      "Se entra na Fase 1 e o que mostrar como estimativa (faixa ou só confirmação).",
      "Texto de consentimento e prazo de guarda dos dados do lead.",
    ],
  },
  { fe: "FE-08", title: "Depoimentos", items: ["Autorização de nome e foto de cada cliente."] },
  { fe: "FE-09", title: "Selo Verified", items: ["Texto final das verificações, evitando “garantia” até o jurídico validar."] },
  { fe: "FE-10", title: "Visite a loja", items: ["Horário real e quantas visitas cabem por horário."] },
  { fe: "FE-11", title: "Continue sua busca", items: ["Estrutura dos endereços (ex.: /carros/[marca]/[modelo]) e lista de categorias."] },
  {
    fe: "FE-12",
    title: "Serviços: listagem",
    items: [
      "Modelo comercial: só pedido de orçamento ou pagamento na plataforma.",
      "Lista inicial de categorias e parceiros reais.",
    ],
  },
  {
    fe: "FE-13",
    title: "Serviços: detalhe",
    items: [
      "Se o pedido vai direto ao parceiro ou passa pela AutosFlow.",
      "Consentimento para repassar o contato ao parceiro (LGPD).",
      "Mapa: ilustrativo, imagem estática ou Google incorporado.",
      "Telefone direto ou só depois de “Ver telefone”.",
    ],
  },
];

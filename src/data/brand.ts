/**
 * Institutional content.
 *
 * Sources: "Manifesto_Autosflow.pdf" (brand manifesto), the AutosFlow logo
 * sheet (name, descriptor, colours) and "apresentacao_carflow.pdf" (business
 * model, journey, ecosystem, services and platform scope — produced under the
 * project's earlier CarFlow name). Contact details come from the footer of the
 * stock price table. Nothing here is invented; section headings and link
 * labels are editorial wrapping around the source copy.
 */

export const brand = {
  name: "AutosFlow",
  tagline: "Seu carro no fluxo certo.",
  descriptor: "O autoshopping digital do proprietário",
  positioning: "Intermediação automotiva premium",
} as const;

export const contact = {
  phoneLabel: "(11) 94876-8653",
  /** E.164, for tel: and wa.me links. */
  phoneE164: "5511948768653",
  address: {
    street: "Av. Prof. Luiz Ignácio Anhaia Mello, 3.850",
    district: "Jd. Independência",
    city: "São Paulo",
    state: "SP",
    postalCode: "03294-100",
  },
} as const;

export const addressOneLine = `${contact.address.street} — ${contact.address.district}, ${contact.address.city} — ${contact.address.state}, CEP ${contact.address.postalCode}`;

/** Manifesto, transcribed from Manifesto_Autosflow.pdf. */
export const manifesto = {
  opening:
    "Comprar um carro deveria ser uma conquista. Nunca uma preocupação. Para transformar a compra, a venda e a troca de um carro em uma experiência mais simples, transparente, segura e prazerosa nasce a AutosFlow.",
  claim: "Aqui, carro não é apenas estoque.",
  claimEcho: "É escolha. É história. É desejo. É movimento.",
  criteria: [
    "Queremos ter os carros certos.",
    "Selecionados com critério.",
    "Avaliados com responsabilidade.",
    "Apresentados com transparência.",
    "Entregues com o cuidado que uma conquista merece.",
  ],
  trust:
    "Acreditamos que confiança começa com informação. Você precisa saber o que está comprando, entender cada etapa da negociação e sentir segurança para decidir.",
  /** Same passage split, for places where the first line is the heading. */
  trustDetail:
    "Você precisa saber o que está comprando, entender cada etapa da negociação e sentir segurança para decidir.",
  promise: "Sem pressão, sem letras pequenas e sem surpresas.",
  order: "Primeiro entendemos você. Depois falamos de carro.",
  journey:
    "E cuidamos de toda a jornada: da escolha à avaliação, da negociação à documentação, do financiamento à entrega — e também depois dela.",
  closing:
    "Porque nossa responsabilidade não termina quando a chave muda de mão.",
} as const;

/** Owner pain points the service answers. Source: apresentação, p.2. */
export const painPoints = [
  "Não saber o preço correto do veículo",
  "Receber propostas muito abaixo do valor real",
  "Ter medo de golpes e negociações inseguras",
  "Dificuldade para viabilizar financiamento ao comprador",
  "Falta de apoio para documentação, transferência e venda",
] as const;

/** Positioning pillars. Source: apresentação, p.3. */
export const positioningPillars = [
  "Transforma a venda particular em uma experiência assistida",
  "O proprietário mantém o controle do veículo",
  "A plataforma organiza avaliação, divulgação, atendimento e negociação",
  "O comprador encontra mais segurança para decidir",
  "Lojistas e parceiros entram como parte de um ecossistema conectado",
] as const;

/** Who the ecosystem serves. Source: apresentação, p.4. */
export const audiences = [
  {
    title: "Proprietários",
    description:
      "Venda assistida, avaliação, anúncios e suporte na negociação.",
  },
  {
    title: "Compradores",
    description:
      "Busca de veículos, atendimento, financiamento, seguro e documentação.",
  },
  {
    title: "Lojistas",
    description: "Estoque virtual, geração de leads e oportunidades comerciais.",
  },
  {
    title: "Prestadores",
    description: "Serviços automotivos antes, durante e depois da venda.",
  },
] as const;

/** The six stages of the assisted sale. Source: apresentação, p.5. */
export const journeySteps = [
  "Cadastro do veículo",
  "Avaliação e precificação",
  "Fotos, vídeo e apresentação",
  "Anúncios e atendimento",
  "Propostas e negociação",
  "Financiamento e transferência",
] as const;

/** Services connected to the sale. Source: apresentação, p.7. */
export const serviceGroups = [
  {
    stage: "Antes da venda",
    items: [
      "Lavagem premium",
      "Higienização",
      "Polimento",
      "Martelinho",
      "Funilaria",
      "Vistoria cautelar",
      "Mecânica",
    ],
  },
  {
    stage: "Durante a venda",
    items: ["Financiamento", "Seguro", "Despachante", "Transferência"],
  },
  {
    stage: "Depois da venda",
    items: ["Seguro", "Rastreador", "Proteção veicular", "Acessórios"],
  },
] as const;

/** Criteria behind the verification seal. Source: apresentação, p.8. */
export const verified = {
  note: "Veículos aprovados podem receber o selo Verified, aumentando a segurança e a conversão.",
  criteria: [
    "Laudo cautelar",
    "Histórico documental",
    "Inspeção mecânica",
    "Fotos padronizadas",
    "Informações organizadas",
    "Mais confiança para o comprador",
  ],
} as const;

/** What the retailer programme offers. Source: apresentação, p.6. */
export const forRetailers = [
  "Área do lojista",
  "Cadastro de veículos",
  "Geração de leads",
  "Assinaturas mensais",
  "Comissão por venda",
  "Painel admin e CRM",
] as const;

/** Long-term vision. Source: apresentação, p.10. */
export const vision = {
  lead: "É a infraestrutura digital para transformar a venda automotiva em uma experiência mais segura, rápida e lucrativa.",
  detail:
    "A visão de longo prazo é unir marketplace, autoshopping, despachante, corretora, oficina e tecnologia em um único ambiente.",
  claim: "Venda melhor, venda com confiança, venda no fluxo certo.",
} as const;

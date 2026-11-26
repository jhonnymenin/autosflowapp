/**
 * Protótipo — serviços e parceiros (FE-03, FE-12, FE-13).
 *
 * DADOS DE EXEMPLO, vindos do wireframe navegável: parceiros, endereços,
 * telefones e preços não são reais. Os endereços seguem "Rua Exemplo" de
 * propósito, para ninguém confundir com um parceiro de verdade. Fotos geradas
 * no Magnific para ilustrar cada categoria.
 */

export type ServiceIcon = "wrench" | "doc" | "drop" | "check" | "oil" | "shield";

export interface ServiceCategory {
  slug: string;
  label: string;
  icon: ServiceIcon;
  /** Uma frase curta, para a faixa da home e os chips da listagem. */
  blurb: string;
  cover: string;
}

export const serviceCategories: ServiceCategory[] = [
  { slug: "mecanica", label: "Mecânica", icon: "wrench", blurb: "Diagnóstico, alinhamento e reparos", cover: "/imagens/prototipo/svc-alinhamento.jpg" },
  { slug: "debitos", label: "Débitos", icon: "doc", blurb: "IPVA, multas e transferência", cover: "/imagens/prototipo/svc-debitos.jpg" },
  { slug: "lavagem", label: "Lavagem", icon: "drop", blurb: "Lavagem, cera e higienização", cover: "/imagens/prototipo/svc-lavagem.jpg" },
  { slug: "revisao", label: "Revisão", icon: "check", blurb: "Revisão preventiva e vistoria", cover: "/imagens/prototipo/svc-revisao.jpg" },
  { slug: "oleo", label: "Troca de óleo", icon: "oil", blurb: "Óleo, filtros e fluidos", cover: "/imagens/prototipo/svc-oleo.jpg" },
  { slug: "blindagem", label: "Blindagem", icon: "shield", blurb: "Blindagem e manutenção", cover: "/imagens/prototipo/svc-blindagem.jpg" },
];

export interface Partner {
  name: string;
  street: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  /** [dias da semana (0 = domingo), abre, fecha] em horas decimais, fuso de São Paulo. */
  hours: { days: number[]; label: string; open: number; close: number }[];
  since: string;
  /** Posição do pino no mapa ilustrativo, em % (x, y). */
  pin: [number, number];
}

const weekdays = { days: [1, 2, 3, 4, 5], label: "Segunda a sexta", open: 8, close: 18 };
const saturday = { days: [6], label: "Sábado", open: 8, close: 13 };

export const partners: Record<string, Partner> = {
  "Lava Rápido Ipiranga": { name: "Lava Rápido Ipiranga", street: "Rua Exemplo, 123", district: "Ipiranga", city: "São Paulo", state: "SP", postalCode: "04208-000", phone: "(11) 4000-1001", hours: [weekdays, saturday], since: "2026", pin: [58, 46] },
  "Brilho Car": { name: "Brilho Car", street: "Av. Exemplo, 456", district: "Gonzaga", city: "Santos", state: "SP", postalCode: "11060-000", phone: "(13) 4000-1002", hours: [weekdays, { ...saturday, close: 16 }], since: "2026", pin: [40, 58] },
  "Oficina Central": { name: "Oficina Central", street: "Rua Exemplo, 789", district: "Vila Mariana", city: "São Paulo", state: "SP", postalCode: "04101-000", phone: "(11) 4000-1003", hours: [weekdays, saturday], since: "2026", pin: [46, 38] },
  "Troca Fácil": { name: "Troca Fácil", street: "Av. Exemplo, 321", district: "Centro", city: "Guarulhos", state: "SP", postalCode: "07011-000", phone: "(11) 4000-1004", hours: [{ ...weekdays, open: 7.5 }, saturday], since: "2026", pin: [62, 32] },
  "Despachante Ágil": { name: "Despachante Ágil", street: "Rua Exemplo, 55, sala 12", district: "Sé", city: "São Paulo", state: "SP", postalCode: "01001-000", phone: "(11) 4000-1005", hours: [{ ...weekdays, open: 9, close: 17 }], since: "2026", pin: [50, 50] },
  "Pneu Certo": { name: "Pneu Certo", street: "Av. Exemplo, 980", district: "Cambuí", city: "Campinas", state: "SP", postalCode: "13025-000", phone: "(19) 4000-1006", hours: [weekdays, saturday], since: "2026", pin: [36, 42] },
  BlindAuto: { name: "BlindAuto", street: "Rua Exemplo, 1500", district: "Mooca", city: "São Paulo", state: "SP", postalCode: "03103-000", phone: "(11) 4000-1007", hours: [weekdays], since: "2026", pin: [64, 54] },
  "Vistoria Já": { name: "Vistoria Já", street: "Rua Exemplo, 210", district: "Pinheiros", city: "São Paulo", state: "SP", postalCode: "05422-000", phone: "(11) 4000-1008", hours: [weekdays, saturday], since: "2026", pin: [42, 44] },
};

export interface Service {
  slug: string;
  title: string;
  category: string;
  partner: string;
  city: string;
  /** "a partir de", em reais. null = sob consulta. */
  price: number | null;
  duration: string;
  images: string[];
  summary: string;
  includes: string[];
  before: string[];
}

const img = (name: string) => `/imagens/prototipo/${name}.jpg`;

export const services: Service[] = [
  {
    slug: "lavagem-completa",
    title: "Lavagem completa",
    category: "lavagem",
    partner: "Lava Rápido Ipiranga",
    city: "São Paulo",
    price: 80,
    duration: "1h30",
    images: [img("svc-lavagem"), img("svc-interior"), img("svc-roda"), img("hero-servicos")],
    summary:
      "Lavagem externa com espuma neutra, aspiração do interior, limpeza de vidros e pretinho nos pneus. Para o dia a dia ou para deixar o carro pronto para as fotos do anúncio.",
    includes: ["Pré-lavagem com espuma neutra", "Aspiração completa do interior", "Vidros por dentro e por fora", "Pretinho nos pneus", "Comprovante do serviço por WhatsApp"],
    before: ["Retire objetos pessoais do carro", "Chegue com 10 minutos de antecedência", "Avise se houver alguma mancha específica"],
  },
  {
    slug: "lavagem-detalhada",
    title: "Lavagem detalhada com cera",
    category: "lavagem",
    partner: "Brilho Car",
    city: "Santos",
    price: 160,
    duration: "3h",
    images: [img("svc-roda"), img("svc-lavagem"), img("hero-servicos")],
    summary: "Lavagem técnica, descontaminação da pintura e aplicação de cera de carnaúba. Brilho de carro de vitrine.",
    includes: ["Lavagem técnica em duas etapas", "Descontaminação da pintura", "Cera de carnaúba", "Limpeza de rodas e caixas de roda"],
    before: ["Agende com um dia de antecedência", "Evite trazer o carro logo após chuva forte"],
  },
  {
    slug: "revisao-preventiva",
    title: "Revisão preventiva 30 itens",
    category: "revisao",
    partner: "Oficina Central",
    city: "São Paulo",
    price: 290,
    duration: "4h",
    images: [img("svc-revisao"), img("svc-vistoria"), img("svc-alinhamento")],
    summary: "Checagem de 30 itens de segurança e conforto, com relatório por foto e orçamento antes de qualquer troca.",
    includes: ["Checklist de 30 itens", "Relatório com fotos", "Orçamento antes de trocar peças", "Garantia do parceiro de 30 dias"],
    before: ["Leve o documento do veículo", "Informe a quilometragem da última revisão"],
  },
  {
    slug: "revisao-pre-venda",
    title: "Revisão pré-venda",
    category: "revisao",
    partner: "Oficina Central",
    city: "São Paulo",
    price: 220,
    duration: "3h",
    images: [img("svc-vistoria"), img("svc-revisao")],
    summary: "Para quem vai vender: o carro chega ao comprador sem surpresas, e o laudo vira argumento na negociação.",
    includes: ["Checagem mecânica e elétrica", "Relatório para anexar ao anúncio", "Lista do que vale corrigir antes de vender"],
    before: ["Leve o documento do veículo", "Avise se o carro já está anunciado"],
  },
  {
    slug: "troca-oleo",
    title: "Troca de óleo e filtro",
    category: "oleo",
    partner: "Troca Fácil",
    city: "Guarulhos",
    price: 140,
    duration: "45 min",
    images: [img("svc-oleo"), img("svc-revisao")],
    summary: "Óleo na especificação do fabricante e filtro novo, com etiqueta da próxima troca.",
    includes: ["Óleo na especificação do manual", "Filtro de óleo novo", "Checagem de fluidos", "Etiqueta da próxima troca"],
    before: ["Confira no manual a especificação do óleo", "Chegue com 10 minutos de antecedência"],
  },
  {
    slug: "troca-oleo-sintetico",
    title: "Óleo sintético completo",
    category: "oleo",
    partner: "Troca Fácil",
    city: "São Paulo",
    price: 230,
    duration: "1h",
    images: [img("svc-oleo")],
    summary: "Troca com óleo 100% sintético, filtros de óleo e de ar, e checagem de fluidos.",
    includes: ["Óleo 100% sintético", "Filtro de óleo e filtro de ar", "Checagem de fluidos"],
    before: ["Confira no manual a especificação do óleo"],
  },
  {
    slug: "consulta-debitos",
    title: "Consulta de débitos veiculares",
    category: "debitos",
    partner: "Despachante Ágil",
    city: "São Paulo",
    price: 60,
    duration: "No mesmo dia",
    images: [img("svc-debitos")],
    summary: "IPVA, licenciamento, multas e restrições numa consulta só, com o resultado no seu WhatsApp.",
    includes: ["IPVA e licenciamento", "Multas e restrições", "Resultado por WhatsApp"],
    before: ["Tenha em mãos o Renavam"],
  },
  {
    slug: "transferencia",
    title: "Transferência de propriedade",
    category: "debitos",
    partner: "Despachante Ágil",
    city: "São Paulo",
    price: 390,
    duration: "3 dias úteis",
    images: [img("svc-debitos"), img("hero-vender")],
    summary: "Da vistoria ao documento novo, o despachante cuida de cada etapa da transferência.",
    includes: ["Agendamento da vistoria", "Taxas e formulários", "Acompanhamento até o documento novo"],
    before: ["Comprador e vendedor com documentos pessoais", "CRV assinado e com firma reconhecida"],
  },
  {
    slug: "alinhamento",
    title: "Alinhamento e balanceamento",
    category: "mecanica",
    partner: "Pneu Certo",
    city: "Campinas",
    price: 150,
    duration: "1h",
    images: [img("svc-alinhamento"), img("svc-roda")],
    summary: "Alinhamento 3D computadorizado e balanceamento das quatro rodas.",
    includes: ["Alinhamento 3D", "Balanceamento das 4 rodas", "Calibragem dos pneus"],
    before: ["Avise se o volante está puxando para algum lado"],
  },
  {
    slug: "mecanica-geral",
    title: "Diagnóstico mecânico",
    category: "mecanica",
    partner: "Oficina Central",
    city: "São Paulo",
    price: 120,
    duration: "2h",
    images: [img("svc-revisao"), img("svc-alinhamento")],
    summary: "Scanner, teste de rodagem e inspeção visual para descobrir de onde vem aquele barulho.",
    includes: ["Leitura por scanner", "Teste de rodagem", "Relatório e orçamento"],
    before: ["Descreva o problema com o máximo de detalhe"],
  },
  {
    slug: "blindagem-nivel3",
    title: "Blindagem nível III-A",
    category: "blindagem",
    partner: "BlindAuto",
    city: "São Paulo",
    price: null,
    duration: "20 dias",
    images: [img("svc-blindagem")],
    summary: "Blindagem certificada nível III-A, com manta de aramida e vidros multicamadas.",
    includes: ["Manta de aramida", "Vidros multicamadas", "Documentação e certificado"],
    before: ["Agende uma visita técnica para orçamento"],
  },
  {
    slug: "vistoria-cautelar",
    title: "Vistoria cautelar",
    category: "revisao",
    partner: "Vistoria Já",
    city: "São Paulo",
    price: 350,
    duration: "2h",
    images: [img("svc-vistoria"), img("svc-revisao")],
    summary: "Laudo de estrutura, pintura, chassi e motor, para comprar ou vender com segurança.",
    includes: ["Análise de estrutura e chassi", "Medição de pintura", "Laudo digital"],
    before: ["Leve o documento do veículo", "Chegue com o carro limpo"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function categoryOf(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

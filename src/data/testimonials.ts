/**
 * Depoimentos de clientes.
 *
 * ESTE ARQUIVO SÓ ACEITA DEPOIMENTO REAL. Avaliação inventada é publicidade
 * enganosa (CDC, art. 37) e, na prática, é o tipo de coisa que destrói a
 * confiança justamente no momento em que o cliente ia decidir confiar.
 *
 * Enquanto a lista estiver vazia, o site mostra a prova que já é verdadeira —
 * os critérios de verificação, o que a AutosFlow assume em cada etapa e os
 * números do estoque. Nada quebra e nada fica com cara de buraco.
 *
 * COMO PREENCHER (leva 2 minutos por depoimento):
 *
 * 1. Peça por WhatsApp a 3–5 clientes que já compraram ou venderam.
 *    Uma mensagem que funciona: "Posso publicar no site uma frase sua sobre
 *    como foi a experiência? Pode ser curta, do seu jeito."
 * 2. Copie a frase como a pessoa escreveu — não reescreva para soar melhor.
 * 3. Guarde o print da autorização.
 * 4. Preencha abaixo. A seção aparece sozinha assim que houver um item.
 *
 * Se você já tem avaliações no Google Meu Negócio, elas servem: use o texto
 * e o primeiro nome como estão, e aponte `source` para a ficha do Google.
 */

export interface Testimonial {
  /** Texto como o cliente escreveu. */
  quote: string;
  /** Nome ou primeiro nome, como a pessoa autorizou. */
  author: string;
  /** Opcional: "Comprou o Kicks 2024", "Vendeu o Onix". */
  context?: string;
  /** Opcional: link para a avaliação pública (Google, por exemplo). */
  source?: string;
}

/**
 * Exemplos SÓ PARA DESENVOLVIMENTO — deixam ver o layout da seção com
 * depoimentos. Nunca aparecem em produção (`next build`/`next start`) e, em
 * dev, vêm marcados como exemplo. Não mova nada daqui para `testimonials`.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    quote: "Texto de exemplo com o tamanho de um depoimento curto real.",
    author: "Exemplo 1",
    context: "Contexto do depoimento",
  },
  {
    quote:
      "Texto de exemplo um pouco mais longo, para conferir como a seção se comporta quando o cliente escreve duas ou três linhas sobre a experiência.",
    author: "Exemplo 2",
    context: "Contexto do depoimento",
  },
  {
    quote: "Outro texto de exemplo, de tamanho médio, para completar a grade.",
    author: "Exemplo 3",
  },
];

/**
 * Depoimentos recebidos por WhatsApp de clientes que compraram na AutosFlow.
 * Texto como o cliente escreveu; autorizações guardadas pela loja.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Todo o processo foi muito tranquilo. Encontrei o T-Cross que estava procurando, fui bem atendido desde o primeiro contato e tive segurança em cada etapa da negociação. A AutosFlow realmente facilitou muito a compra.",
    author: "Rafael Martins",
    context: "Comprou o Volkswagen T-Cross 2023",
  },
  {
    quote:
      "Gostei muito da experiência. As informações sobre o carro estavam claras, consegui tirar minhas dúvidas rapidamente e não tive aquela sensação de pressão para fechar negócio. Foi uma compra muito tranquila.",
    author: "Mariana Lopes",
    context: "Comprou o Hyundai Creta 2022",
  },
  {
    quote:
      "O que mais me chamou atenção foi a transparência. Consegui entender o histórico e as condições do carro antes de tomar minha decisão. Quando fui fechar, já sabia exatamente o que estava comprando.",
    author: "Bruno Carvalho",
    context: "Comprou o Chevrolet Onix 2023",
  },
  {
    quote:
      "Comprar meu carro pela AutosFlow foi muito mais simples do que eu imaginava. Atendimento atencioso, processo organizado e muita segurança durante a negociação. Foi uma experiência excelente.",
    author: "Camila Rodrigues",
    context: "Comprou o Volkswagen Nivus 2022",
  },
  {
    quote:
      "Eu já sabia qual modelo queria e encontrei uma ótima oportunidade na AutosFlow. Recebi todas as informações que precisava e consegui fechar o negócio com tranquilidade. Recomendo.",
    author: "Gustavo Almeida",
    context: "Comprou o Jeep Compass 2021",
  },
  {
    quote:
      "Gostei bastante da proposta da AutosFlow. Consegui avaliar o carro com calma, entender todos os detalhes e negociar sem pressão. O processo todo foi muito organizado.",
    author: "Felipe Moreira",
    context: "Comprou o Volkswagen Polo 2023",
  },
  {
    quote:
      "Desde o primeiro atendimento senti bastante segurança. Tudo foi explicado com clareza e o processo de compra aconteceu de forma rápida e transparente. Estou muito satisfeita com o carro.",
    author: "Renata Oliveira",
    context: "Comprou o Chevrolet Tracker 2022",
  },
  {
    quote:
      "Estava procurando uma Toro fazia algum tempo e encontrei exatamente a configuração que queria. Atendimento próximo, boas informações sobre o veículo e uma negociação muito tranquila.",
    author: "André Costa",
    context: "Comprou o Fiat Toro 2022",
  },
  {
    quote:
      "A AutosFlow passa confiança desde o primeiro contato. Gostei principalmente da facilidade para entender as informações do veículo e de poder tomar minha decisão com calma.",
    author: "Fernanda Ribeiro",
    context: "Comprou o Hyundai HB20 2023",
  },
  {
    quote:
      "Foi uma experiência muito positiva. Atendimento cordial, processo simples e bastante atenção aos detalhes. Tudo foi resolvido sem complicação e estou muito contente com a compra.",
    author: "Thiago Mendes",
    context: "Comprou o Fiat Argo 2023",
  },
  {
    quote:
      "O que gostei foi da transparência durante toda a negociação. Um carro desse valor exige segurança para comprar, e tive acesso às informações que precisava para tomar minha decisão com tranquilidade.",
    author: "Eduardo Nascimento",
    context: "Comprou o Toyota Hilux 2021",
  },
  {
    quote:
      "Precisava de um carro para o dia a dia e para o trabalho e encontrei uma Strada exatamente como procurava. Negociação rápida, atendimento excelente e todo o processo muito bem conduzido.",
    author: "Juliana Ferreira",
    context: "Comprou o Fiat Strada 2023",
  },
];

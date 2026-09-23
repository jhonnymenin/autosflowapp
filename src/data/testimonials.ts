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

export const testimonials: Testimonial[] = [
  // Exemplo do formato — apague este comentário ao inserir o primeiro real:
  // {
  //   quote: "Explicaram tudo antes de eu perguntar. Fechei no mesmo dia.",
  //   author: "Marina R.",
  //   context: "Comprou o Creta 2020/2021",
  // },
];

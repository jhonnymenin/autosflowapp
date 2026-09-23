# AutosFlow

Website oficial da **AutosFlow** — *o autoshopping digital do proprietário*.

Showroom digital e apresentação institucional: manifesto da marca, jornada de
venda assistida, catálogo navegável do estoque e a tabela de preços completa.

---

## Stack

| Camada       | Escolha                                    |
| ------------ | ------------------------------------------ |
| Framework    | Next.js 16 (App Router)                    |
| UI           | React 19, Server Components por padrão     |
| Linguagem    | TypeScript em modo estrito                 |
| Estilo       | Tailwind CSS v4 (tokens em `globals.css`)  |
| Tipografia   | Archivo (display) + Inter (texto), `next/font` |
| Ícones       | SVGs inline no próprio projeto             |
| Animação     | CSS scroll-driven (`animation-timeline`)   |
| Dados        | Arquivos TypeScript locais — sem banco     |

Além de `next`, `react` e `react-dom`, a única dependência é
`@vercel/analytics`. Não há backend, banco de dados nem variáveis de ambiente
obrigatórias.

---

## Comandos

```bash
npm install      # instala dependências
npm run dev      # ambiente de desenvolvimento em http://localhost:3000
npm run lint     # ESLint
npm run typecheck # tsc --noEmit
npm run build    # build de produção
npm run start    # serve o build de produção
```

---

## Estrutura

```
src/
  app/
    layout.tsx              cabeçalho, rodapé, fontes, metadata, JSON-LD
    page.tsx                home
    veiculos/page.tsx       catálogo: busca + filtros por search params
    veiculos/[slug]/        página de cada veículo (estática, 17 rotas)
    creditos/               créditos das imagens de referência (noindex)
    tabela-de-precos/       tabela de preços completa em HTML
    sobre/ · contato/       institucional
    icon.svg · apple-icon.png · sitemap.ts · robots.ts · not-found.tsx
  components/
    site-header.tsx         única parte "use client" relevante (menu + scroll)
    site-footer.tsx · logo.tsx · icons.tsx · ui.tsx · reveal.tsx
    vehicle-card.tsx        painel de veículo (home, relacionados)
    vehicle-row.tsx         linha editorial do catálogo
    stock-filters.tsx       busca e filtros — links e form GET, sem JavaScript
    vehicle-lead.tsx        proposta por veículo (entrada, prazo, troca)
    trust-section.tsx       prova social — depoimentos reais + prova factual
    trust-badges.tsx        garantias ao lado do botão de conversão
    price-table.tsx         tabela de preços semântica
    vehicle-gallery.tsx     carrossel (scroll-snap nativo, sem dependência)
    cta-section.tsx         bloco comercial compartilhado
    home/                   hero, vitrine e "por que"
  data/
    vehicles.ts             ← fonte única do estoque (dados verificados)
    testimonials.ts         ← depoimentos de clientes (só reais)
    vehicle-images.ts       ← fotos dos veículos (PROVISÓRIAS)
    brand.ts                ← fonte única do conteúdo institucional
  lib/
    stock.ts                filtros, ordenação, relacionados
    format.ts · site.ts     formatação pt-BR, rotas e links de WhatsApp
  types/vehicle.ts

public/
  brand/                    símbolo em SVG e logotipo em PNG (claro/escuro)
  imagens/                  fotografia de marca
  documentos/               manifesto em PDF
```

---

## Conteúdo

Todo o conteúdo vem dos materiais da marca. **Nada é inventado**: não há
especificação, opcional, garantia, preço ou número que não esteja nos
documentos de origem.

| Origem                              | Onde aparece                                    |
| ----------------------------------- | ----------------------------------------------- |
| `Manifesto_Autosflow.pdf`           | `data/brand.ts` → home, `/sobre`                |
| `Tabela de Preços (Venda)..pdf`     | `data/vehicles.ts` → catálogo, `/tabela-de-precos` (o PDF não é publicado) |
| `apresentacao_carflow.pdf`          | `data/brand.ts` → jornada, ecossistema, serviços |
| Folha de logotipo AutosFlow         | `public/brand/`, cores em `globals.css`         |

### Duas observações sobre a origem

1. **Nome da marca.** O manifesto e a folha de logotipo trazem **AutosFlow**;
   a apresentação comercial foi produzida sob o nome anterior **CarFlow**. O
   site usa AutosFlow em todo lugar, e o conteúdo da apresentação foi
   reaproveitado sem as menções ao nome antigo.

2. **Fotos dos veículos são PROVISÓRIAS.** A tabela de origem registra `n/d` na
   coluna Fotos — não existe fotografia do estoque real. As imagens hoje
   publicadas são **referências do modelo**, não da unidade anunciada: cor, ano
   e estado não correspondem ao registro. Todas vêm do Wikimedia Commons sob
   Creative Commons ou domínio público, com uso comercial permitido, e estão
   creditadas em `/creditos`.

   Enquanto forem provisórias, cada carrossel exibe a nota "Imagem de
   referência do modelo — não é a unidade anunciada". Ver
   [Substituir as fotos](#substituir-as-fotos-dos-veículos).

---

## Arquitetura da conversão

A home é deliberadamente curta: hero com busca, vitrine de 6 veículos, um
resumo da marca e o CTA. O institucional completo — manifesto, jornada,
ecossistema, verificação — vive em `/sobre`, fora do caminho de quem veio
procurar carro.

**Busca e filtros** (`/veiculos`) são links e um formulário GET sobre search
params: funcionam sem JavaScript, sobrevivem ao refresh e podem ser
compartilhados. Filtram por texto, preço, ano, quilometragem, marca,
combustível e origem.

**Cada veículo tem sua conversão.** O bloco de proposta monta a mensagem do
WhatsApp com entrada, prazo e troca já preenchidos, e o anúncio identificado
pela referência de estoque. O atendimento recebe a conversa pronta e dá para
medir depois quais veículos geram interesse.

### Prova social

A seção de confiança da home mostra o que já é verdadeiro: os critérios de
verificação, os compromissos da marca e os números do estoque. Ela absorve
depoimentos reais automaticamente — preencha
[`src/data/testimonials.ts`](src/data/testimonials.ts) e eles aparecem acima
dos compromissos, sem mexer em mais nada.

> Nunca cadastre depoimento inventado. Além de ser publicidade enganosa (CDC,
> art. 37), é o tipo de coisa que quebra a confiança exatamente no momento em
> que o cliente ia decidir confiar.

> O bloco **não calcula parcela**. Não há taxa, seguro nem tarifa cadastrados
> no site, e um número estimado viraria uma promessa que o atendimento teria de
> desfazer. Para calcular de verdade, é preciso cadastrar as condições reais.

### Placa e referência

A placa completa identifica veículo e proprietário em consultas públicas. O
site publica apenas o prefixo (`PZI-1G••`) e usa a **referência de estoque**
(`AF-1234`, derivada do slug em `lib/stock.ts`) como identificação comercial —
nas páginas, na tabela e nas mensagens de WhatsApp.

> O PDF original da tabela **não é publicado**: ele traz as placas completas,
> inclusive de veículos consignados de pessoas físicas. A tabela pública é a
> página `/tabela-de-precos`, com a placa mascarada. Não volte a colocar o PDF
> em `public/`.

---

## Editar os dados do estoque

Tudo vive em [`src/data/vehicles.ts`](src/data/vehicles.ts). Catálogo, filtros,
páginas individuais, tabela de preços, sitemap e JSON-LD derivam desse arquivo —
não há duplicação em nenhum outro lugar.

### Adicionar um veículo

```ts
{
  slug: "marca-modelo-versao",   // único; vira a URL /veiculos/<slug>
  make: "Nissan",                // fabricante, como no agrupamento da tabela
  model: "Kicks",
  version: "Advance 1.6 16V Flex Aut.",
  sourceName: "KICKS ADVANCE 1.6 16V FLEX AUT.", // literal da tabela de origem
  yearShort: "24/24",            // como impresso
  year: "2024/2024",             // expandido, para leitura
  yearSort: 2024,                // usado para ordenar/filtrar
  fuel: "Flex",                  // "Flex" | "Gasolina"
  color: "Preta",
  km: 35600,                     // 0 quando não informada
  plate: "TLY-5A01",
  price: 109990,                 // reais inteiros
  origin: "loja",                // "loja" | "consignado" (o "*" da tabela)
  featured: true,                // aparece em destaque na home
}
```

`sourceName` existe para que a tabela publicada nunca se afaste do documento:
`make`/`model`/`version` são apenas a forma de exibição do mesmo texto.

### Atualizar a tabela inteira

1. Substitua as entradas de `vehicles.ts` pelo novo export.
2. Atualize `STOCK_ISSUED_AT` no topo do arquivo com a data de emissão.
3. `npm run build` — as 17 rotas (ou quantas houver) são regeradas sozinhas.

Se um veículo sair do estoque, remova-o: a rota deixa de existir e passa a
responder a página 404 do site.

### Editar textos institucionais

[`src/data/brand.ts`](src/data/brand.ts) — manifesto, jornada, serviços,
ecossistema, critérios de verificação, contato e endereço. Cada bloco indica em
comentário de onde veio.

### Trocar contato ou endereço

Apenas `contact` em `src/data/brand.ts`. Telefone, WhatsApp, `tel:`, rodapé,
JSON-LD e link do mapa são todos derivados dali.

---

## Substituir as fotos dos veículos

As imagens do catálogo vivem em
[`src/data/vehicle-images.ts`](src/data/vehicle-images.ts). Cada veículo aponta
para um conjunto pelo campo `imageSet`; o carrossel, as linhas do catálogo, o
trilho da home e o JSON-LD leem tudo dali.

Para trocar por fotos reais:

1. Salve as fotos em `public/imagens/veiculos/` (JPEG, 16:9, 1600×900 mantém o
   padrão atual).
2. Em `vehicle-images.ts`, troque os `src` do conjunto correspondente e apague
   `author`, `licence` e `source` — passam a ser fotos próprias.
3. Se um veículo passar a ter conjunto exclusivo, crie uma chave nova e ajuste
   o `imageSet` dele em `vehicles.ts`.
4. Quando **todos** os conjuntos forem reais, troque
   `ILLUSTRATIVE_IMAGES = false`. Isso remove a nota de imagem ilustrativa de
   todo o site de uma vez.

`imageOffset` gira um conjunto compartilhado para que duas unidades do mesmo
modelo não abram com o mesmo quadro.

## Adicionar imagens institucionais

Coloque os arquivos em `public/imagens/` e use `next/image` com `sizes`
adequado. As imagens institucionais têm 1920×1080, JPEG progressivo, qualidade
82.

---

## Design system

Os tokens ficam no bloco `@theme` de
[`src/app/globals.css`](src/app/globals.css): cores, escala tipográfica fluida
(`clamp()`), espaçamento, container e curvas de animação. **Não** espalhe
valores fixos pelos componentes — ajuste o token.

As cores vêm da folha de logotipo: azul `#1460F2` e azul-marinho `#1B2E4F`,
com uma rampa neutra derivada do marinho.

### Motion

O reveal é feito com `animation-timeline: view()` — CSS puro, sem observer e
sem JavaScript. Onde `animation-timeline` não existe, o conteúdo simplesmente
aparece. `prefers-reduced-motion: reduce` desliga tudo.

---

## Acessibilidade

Alvo: WCAG 2.2 AA. Skip link, landmarks, hierarquia de headings correta, foco
visível único em todo o site, `aria-current` na navegação, menu mobile com
trava de rolagem, `Escape` e devolução de foco, e a tabela de preços com
semântica preservada (`caption`, `scope`, `tfoot`) em qualquer largura.

---

## Performance

Lighthouse desktop, build de produção:

| Página              | Performance | Acessibilidade | Boas práticas | SEO |
| ------------------- | ----------- | -------------- | ------------- | --- |
| `/`                 | 100         | 100            | 100           | 100 |
| `/veiculos`         | 100         | 100            | 100           | 100 |
| `/veiculos/[slug]`  | 100         | 100            | 100           | 100 |
| `/tabela-de-precos` | 100         | 100            | 100           | 100 |
| `/sobre`            | 100         | 96             | 100           | 100 |
| `/contato`          | 100         | 96             | 100           | 100 |

Os 96 vêm do contraste medido em elementos que ainda estão no início da
animação de entrada, abaixo da dobra — o contraste em repouso passa em AA, e
leitores de tela leem o conteúdo normalmente.

O carrossel segue o padrão ARIA de carousel: `aria-roledescription`, slides
como `role="group"`, botões rotulados e anúncio `aria-live` da imagem atual.

---

## Compartilhamento e medição

**Prévia de link.** `app/opengraph-image.tsx` e
`app/veiculos/[slug]/opengraph-image.tsx` geram no build a imagem que aparece
quando alguém cola o link no WhatsApp: uma da marca e uma por veículo, com
modelo, ano, km e preço. São só tipografia — enquanto as fotos forem
ilustrativas, uma prévia com foto pareceria a unidade anunciada.

**Analytics.** `components/analytics.tsx` liga o Vercel Web Analytics (sem
cookies) e registra o evento `whatsapp` a cada clique num link `wa.me`, com a
página de origem. Ative em *Vercel → projeto → Analytics*. Eventos
personalizados exigem o plano Pro; no Hobby, só as visitas são contadas.

---

## Deploy

Projeto Next.js padrão, sem configuração especial.

```bash
vercel          # preview
vercel --prod   # produção
```

Ou conecte o repositório em [vercel.com/new](https://vercel.com/new) — a
detecção automática já basta.

### Domínio

Defina `NEXT_PUBLIC_SITE_URL` com a URL final (ex.: `https://autosflow.com.br`)
para fixar canonical, Open Graph, `sitemap.xml` e `robots.txt`. Sem ela, o
projeto usa o domínio de produção da própria Vercel — e, localmente,
`http://localhost:3000`.

---

## Manutenção

- **Rotina do estoque:** atualizar `vehicles.ts` e publicar.
- **Antes de publicar:** `npm run lint && npm run typecheck && npm run build`.
- **Ao mexer em cor ou espaçamento:** alterar o token, não o componente.
- **Ao acrescentar página:** incluí-la em `src/app/sitemap.ts` e, se for de
  navegação principal, em `nav` dentro de `src/lib/site.ts`.
- **Regra de conteúdo:** se um dado não existe no material de origem, ele não
  vai para o site.

---

## O que falta dado para existir

Estes itens estão pendentes de informação real, não de código:

| Item | O que é preciso |
| ---- | --------------- |
| Filtro de câmbio | Só 6 dos 17 registros trazem indicação (MT, AT, CVT, Aut.). Precisa do campo na exportação do estoque. |
| Filtro de carroceria | Não existe na tabela de origem. |
| Simulador de parcela | Taxa, tarifas e prazos reais da financeira. |
| Depoimentos | Avaliações reais de clientes. A seção de confiança já está no ar com a prova factual; basta preencher `src/data/testimonials.ts` e os depoimentos aparecem sozinhos. |
| Horário, e-mail, atendente, prazo de resposta | Não constam em nenhum material recebido. |
| Formulário sem WhatsApp | Um e-mail de destino ou um serviço de formulário. |

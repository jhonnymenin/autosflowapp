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
    vender/                 venda assistida (página própria)
    sobre/ · contato/       institucional
    icon.svg · apple-icon.png · sitemap.ts · robots.ts · not-found.tsx
  components/
    site-header.tsx         única parte "use client" relevante (menu + scroll)
    site-footer.tsx · logo.tsx · icons.tsx · ui.tsx · reveal.tsx
    vehicle-card.tsx        painel de veículo (home, relacionados)
    filter-sheet.tsx        filtros: coluna no desktop, folha no celular
    stock-filters.tsx       busca e filtros em listas suspensas (form GET)
    filter-form.tsx         aplica o filtro ao mudar a lista, sem recarregar
    vehicle-lead.tsx        proposta por veículo (entrada, prazo, troca)
    trust-section.tsx       prova social — depoimentos reais + prova factual
    price-table.tsx         tabela de preços semântica
    vehicle-gallery.tsx     carrossel (scroll-snap nativo, sem dependência)
    cta-section.tsx         bloco comercial compartilhado
    home/                   hero, busca rápida, vitrine, perfil, diferenciais, venda, loja
  data/
    vehicles.ts             ← fonte única do estoque (dados verificados)
    testimonials.ts         ← depoimentos de clientes (só reais)
    vehicle-photos.ts       ← FOTOS REAIS das unidades, em ordem
    vehicle-images.ts       ← imagens de referência (provisórias) + escolha
    brand.ts                ← fonte única do conteúdo institucional
    body-types.ts           ← carroceria por modelo (SUV, hatch, sedã, picape)
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

2. **Fotos reais e provisórias.** 8 veículos têm fotos da própria unidade
   (`data/vehicle-photos.ts`, pasta enviada pela equipe em 30/09/2026). Os
   demais ainda usam **referências do modelo** do Wikimedia Commons, creditadas
   em `/creditos`; nesses, o carrossel exibe a nota "Imagem de referência do
   modelo — não é a unidade anunciada". Ver
   [Substituir as fotos](#substituir-as-fotos-dos-veículos).

---

## Arquitetura da conversão

A home segue a ordem de quem chega querendo um carro, sem esconder quem quer
vender: abertura em painel marinho com um carro real do estoque (o destaque com
fotos da unidade, escolhido em `heroVehicle()`), os dois caminhos lado a lado
("Explorar veículos" e "Quero vender meu carro") e a busca rápida por marca,
preço e tipo; depois a vitrine, os atalhos por perfil (carroceria e
orçamento), os diferenciais, a venda assistida, os depoimentos e a loja.

**Busca e filtros** (`/veiculos`): busca e ordem no topo, filtros em listas
suspensas — marca, tipo de carro, preço, ano, quilometragem e combustível —
numa coluna fixa no desktop e numa folha em tela cheia no celular (com "Ver N
veículos" no rodapé). Com JavaScript o filtro se aplica ao mudar a lista, sem
recarregar; a URL guarda tudo e os filtros aplicados viram chips removíveis. A
ordem padrão põe os veículos com fotos reais primeiro. A carroceria é do
modelo, não da tabela: fica em `src/data/body-types.ts`.

**Vender meu carro** (`/vender`) tem página própria: o desafio da venda
particular, as seis etapas da jornada, os diferenciais e os serviços — tudo da
apresentação comercial, em `data/brand.ts`.

**Cada veículo tem sua conversão.** Galeria primeiro (miniaturas e tela
cheia), depois identificação, preço e as ações: "Tenho interesse", agendar
visita e, sob demanda, a proposta com entrada, prazo e troca. No celular, uma
barra fixa mantém preço e WhatsApp ao alcance do polegar. A mensagem chega ao
atendimento com o anúncio identificado pela referência de estoque. O atendimento recebe a conversa pronta e dá para
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

Fotos reais vivem em [`src/data/vehicle-photos.ts`](src/data/vehicle-photos.ts),
uma lista por slug, e os arquivos em `public/imagens/veiculos/reais/<slug>/`.
Quando um veículo tem fotos reais, elas substituem o conjunto de referência
sozinhas — carrossel, catálogo, vitrine, JSON-LD e a prévia de link (que passa
a mostrar a capa) — e a nota de imagem ilustrativa some daquele veículo.

Para adicionar fotos:

1. Exporte em JPEG, lado maior 1600 px, sem metadados, e salve como `01.jpg`,
   `02.jpg`… na pasta do slug. A ordem é a de exibição: frente em três
   quartos primeiro (vira a capa), depois laterais e traseira, interior e
   detalhes. Fotos em pé funcionam: a galeria mostra o quadro inteiro.
2. Acrescente a lista em `vehicle-photos.ts` com `width` e `height` de cada
   arquivo.
3. Marque a qualidade no mesmo arquivo: `professionalPhotos` (ensaio
   profissional) abre a home — o carro da abertura sai daqui —, a vitrine e a
   ordem padrão do estoque; depois vêm `showroomPhotos` (celular, na loja), as
   demais fotos da unidade e, por último, as imagens de referência. Use nomes com hash (`01-<hash>.jpg`) ao
   trocar fotos de um carro, para que nenhum cache sirva a imagem antiga.
4. Se o conjunto de referência do modelo não for mais usado por ninguém, apague
   a chave em `vehicle-images.ts` e os arquivos em `public/imagens/veiculos/`.

**Preço sob consulta.** `price: 0` publica "Sob consulta" no card, na página,
na prévia de link e na tabela; o carro fica fora das faixas de preço e no fim
da ordem por preço, e a mensagem do WhatsApp sai sem valor.

`imageOffset` gira um conjunto de referência compartilhado para que duas
unidades do mesmo modelo não abram com o mesmo quadro.

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

As cores vêm da folha de logotipo: azul `#1460F2` e azul-marinho `#1B2E4F`.
A direção é **premium claro**: superfícies claras (`#F8FAFC` de base, cards
brancos, texto `#111827`) na maior parte do site, e o marinho concentrado onde
cria profundidade — abertura da home, venda assistida, fechamento e rodapé.

As seções escuras usam a utility `theme-dark`, que redefine os mesmos tokens
semânticos (`background`, `surface`, `foreground`, `border`, `accent`…) dentro
dela. Um componente escrito com tokens funciona nos dois fundos sem variante.
O azul orienta a ação (botão principal) e o acento de texto; não pinta a
interface.

Cards e controles têm cantos arredondados (`rounded-card`, `rounded-control`)
e sombra suave (`shadow-card`, `shadow-lift`). Áreas de toque têm no mínimo
44–48 px.

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

Lighthouse 12, build de produção local (desempenho · acessibilidade · SEO):

| Página              | Celular        | Desktop         |
| ------------------- | -------------- | --------------- |
| `/`                 | 92 · 100 · 100 | 100 · 96 · 100  |
| `/veiculos`         | 92 · 100 · 100 | 100 · 100 · 100 |
| `/veiculos/[slug]`  | 93 · 100 · 100 | 99 · 100 · 100  |
| `/vender`           | 97 · 100 · 100 | 100 · 96 · 100  |
| `/sobre`            | 96 · 96 · 100  | 100 · 96 · 100  |
| `/contato`          | 95 · 100 · 100 | 100 · 96 · 100  |
| `/tabela-de-precos` | 96 · 100 · 100 | 100 · 100 · 100 |

CLS 0 em todas. LCP no celular (rede simulada lenta) entre 2,6 e 3,4 s — acima
da meta de 2,5 s na home e no estoque, onde a primeira imagem é uma foto real
grande; no desktop fica abaixo de 1 s. Os 96 de acessibilidade vêm do contraste
medido em elementos no meio da animação de entrada; em repouso passam em AA.

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
| Simulador de parcela | Taxa, tarifas e prazos reais da financeira. |
| Depoimentos | Avaliações reais de clientes. A seção de confiança já está no ar com a prova factual; basta preencher `src/data/testimonials.ts` e os depoimentos aparecem sozinhos. |
| Horário, e-mail, atendente, prazo de resposta | Não constam em nenhum material recebido. |
| Formulário sem WhatsApp | Um e-mail de destino ou um serviço de formulário. |

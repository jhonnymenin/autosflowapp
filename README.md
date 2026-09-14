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

Não há dependências além de `next`, `react` e `react-dom`. Não há backend,
banco de dados nem variáveis de ambiente obrigatórias.

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
    veiculos/page.tsx       catálogo com filtros por search params
    veiculos/[slug]/        página de cada veículo (estática, 17 rotas)
    tabela-de-precos/       tabela de preços completa em HTML
    sobre/ · contato/       institucional
    icon.svg · apple-icon.png · sitemap.ts · robots.ts · not-found.tsx
  components/
    site-header.tsx         única parte "use client" relevante (menu + scroll)
    site-footer.tsx · logo.tsx · icons.tsx · ui.tsx · reveal.tsx
    vehicle-card.tsx        painel de veículo (home, relacionados)
    vehicle-row.tsx         linha editorial do catálogo
    stock-filters.tsx       filtros — links, sem JavaScript
    price-table.tsx         tabela de preços semântica
    cta-section.tsx         bloco comercial compartilhado
    home/                   seções da home
  data/
    vehicles.ts             ← fonte única do estoque
    brand.ts                ← fonte única do conteúdo institucional
  lib/
    stock.ts                filtros, ordenação, relacionados
    format.ts · site.ts     formatação pt-BR, rotas e links de WhatsApp
  types/vehicle.ts

public/
  brand/                    símbolo em SVG e logotipo em PNG (claro/escuro)
  imagens/                  fotografia de marca
  documentos/               PDFs originais servidos ao público
```

---

## Conteúdo

Todo o conteúdo vem dos materiais da marca. **Nada é inventado**: não há
especificação, opcional, garantia, preço ou número que não esteja nos
documentos de origem.

| Origem                              | Onde aparece                                    |
| ----------------------------------- | ----------------------------------------------- |
| `Manifesto_Autosflow.pdf`           | `data/brand.ts` → home, `/sobre`                |
| `Tabela de Preços (Venda)..pdf`     | `data/vehicles.ts` → catálogo, `/tabela-de-precos` |
| `apresentacao_carflow.pdf`          | `data/brand.ts` → jornada, ecossistema, serviços |
| Folha de logotipo AutosFlow         | `public/brand/`, cores em `globals.css`         |

### Duas observações sobre a origem

1. **Nome da marca.** O manifesto e a folha de logotipo trazem **AutosFlow**;
   a apresentação comercial foi produzida sob o nome anterior **CarFlow**. O
   site usa AutosFlow em todo lugar, e o conteúdo da apresentação foi
   reaproveitado sem as menções ao nome antigo.

2. **Fotos dos veículos.** A tabela de origem registra `n/d` na coluna Fotos —
   não existe fotografia do estoque real. Por isso o catálogo e as páginas de
   veículo são construídos sobre o **registro** (nome, ano, km, cor, placa,
   valor) e sobre o símbolo da marca, e nunca sobre a foto de outro carro. A
   fotografia cinematográfica da apresentação aparece apenas como imagem
   institucional, jamais identificada como um veículo do estoque. As páginas
   dizem, de forma clara, que fotos e laudo estão sob consulta.

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
3. Troque `public/documentos/autosflow-tabela-de-precos.pdf` pelo novo PDF.
4. `npm run build` — as 17 rotas (ou quantas houver) são regeradas sozinhas.

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

## Adicionar imagens

Coloque os arquivos em `public/imagens/` e use `next/image` com `sizes`
adequado. As imagens atuais têm 1920×1080 e foram salvas como JPEG progressivo
com qualidade 82.

Se um dia houver fotografia real do estoque:

1. Salve como `public/imagens/veiculos/<slug>-1.jpg`.
2. Acrescente `heroImage` e `gallery` à interface em `src/types/vehicle.ts`.
3. Preencha nos registros e renderize na página do veículo — a estrutura já
   está preparada para isso.

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

- **Rotina do estoque:** atualizar `vehicles.ts` + o PDF, e publicar.
- **Antes de publicar:** `npm run lint && npm run typecheck && npm run build`.
- **Ao mexer em cor ou espaçamento:** alterar o token, não o componente.
- **Ao acrescentar página:** incluí-la em `src/app/sitemap.ts` e, se for de
  navegação principal, em `nav` dentro de `src/lib/site.ts`.
- **Regra de conteúdo:** se um dado não existe no material de origem, ele não
  vai para o site.

# AutosFlow — direção de arte do protótipo (v2 · "Fluxo")

## A ideia

**O fluxo de São Paulo à noite vira a linha que conduz a pessoa pelo site.**
"Flow" é fluxo: as luzes dos carros correndo na Marginal Pinheiros, com a Ponte
Estaiada ao fundo. O topo abre com esse vídeo; o rastro de luz volta como a
linha que se desenha na rolagem, como o contador de progresso, como o brilho que
atravessa a placa. Nenhum concorrente (Webmotors, OLX, Kavak, Mobiauto) pode dizer
essa frase: ela vem do nome.

Três coisas só da AutosFlow sustentam a página:

1. **O nome** (Flow → rastros de luz, movimento contínuo).
2. **Os carros reais do estoque**, recortados (fundo removido) e postos num palco
   escuro: a vitrine é a unidade de verdade, não ilustração.
3. **A placa Mercosul**, objeto que todo brasileiro reconhece, como a peça viva de
   "Vender".

## Regra número um: o esquema do time manda

A estrutura vem do material de apoio de 23/11/2026 e do wireframe navegável
(FE-01 a FE-13). Esta direção de arte decide **como** cada bloco aparece, nunca
**quais** blocos existem, em que ordem, nem o fluxo de cada um.

- Ordem da home: 1 Carrossel institucional (3 banners: vender, lojista,
  serviços) · 2 Busca rápida (cartão logo abaixo do carrossel) · 3 Faixa de
  serviços (ícones) · 4 Destaques (5 por linha) · 5 Perfil e atalhos ·
  6 Por que a AutosFlow (4 cartões + como funciona + números) · 7 Venda seu
  carro · 8 Depoimentos (carrossel contínuo) · 9 Banner Selo Verified ·
  10 Visite a loja · 11 Continue sua busca · 12 Rodapé (o do site, sem mudanças).
- Blocos escuros: só o carrossel, a venda (7) e o banner Verified (9). O resto
  é claro.
- Navegação: Comprar · Vender · Serviços · Sou lojista · Entrar · Criar conta.
- Textos dos banners, títulos e atalhos seguem o wireframe; ajuste de texto
  segue por outro caminho (como diz o material).
- Ideia nova fora do esquema vira **proposta extra**, em página separada
  (ex.: `/prototipo/vitrine`), nunca dentro da home.

## Paleta (tokens em `prototipo.css`)

| Papel | Token | Valor |
| --- | --- | --- |
| Noite (fundo escuro) | `--night` | `#05080f` |
| Noite elevada | `--night-2` | `#0b111d` |
| Degrau na noite | `--night-3` | `#141c2c` |
| Texto na noite | `--on-night` | `#f4f2ee` |
| Texto secundário na noite | `--on-night-mute` | `rgb(244 242 238 / 0.62)` |
| Papel (fundo claro, neutro) | `--paper` | `#ebebe8` |
| Papel elevado | `--paper-2` | `#f6f6f4` |
| Degrau no papel | `--paper-3` | `#dededa` |
| Tinta | `--ink` | `#0b0f17` |
| Tinta secundária | `--ink-mute` | `#585d68` |
| Azul da marca (ação) | `--blue` | `#1460f2` |
| Azul brilho (na noite) | `--blue-glow` | `#4d8dff` |
| Amarelo sinalização (faixa de estrada) | `--signal` | `#ffd60a` |

Regras: uma seção é **noite** ou **papel** (campo inteiro). Azul = ação. Amarelo
= sinalização rara (preço em destaque na noite, "Super preço", trechos da linha do
fluxo, item ativo na noite). Nada de cinza-azulado "SaaS" (`#f2f4f8`), nada de
gradiente decorativo. O único degradê permitido é véu escuro sobre foto/vídeo.

## Tipografia — uma família só: Archivo (variável, eixos `wdth` 62–125 e `wght`)

Classes em `prototipo.css`:

- `.t-mega` — Archivo larga (wdth 125), 800, CAIXA ALTA, `clamp(3.5rem, 11vw, 12rem)`,
  entrelinha 0.84, tracking −0.045em. Uma ou duas por página.
- `.t-display` — wdth 112, 700, `clamp(2.6rem, 6vw, 6.5rem)`, entrelinha 0.92,
  tracking −0.04em. Títulos de seção. Máximo 2 linhas.
- `.t-title` — wdth 100, 650, `clamp(1.6rem, 2.6vw, 2.6rem)`, entrelinha 1.02, tracking −0.03em.
- `.t-lead` — wdth 100, 400, `clamp(1.125rem, 1.35vw, 1.375rem)`, entrelinha 1.5.
- Corpo — 17px, wdth 100, 400, entrelinha 1.6 (definido no `.proto`).
- `.t-spec` — wdth 87 (semicondensada), 600, 12.5px, caixa alta, tracking 0.08em.
  SÓ para rótulos de ficha técnica (ANO, KM, CÂMBIO) e para a placa.
- `.t-num` — wdth 125, 800, números tabulares. Preços, contadores, odômetro.

Proibido: Inter, fonte mono, palavra de destaque em itálico/serifa/cor no título,
rótulo minúsculo acima de título ("eyebrow"), numeração 01/02/03.

## Forma

- Mídia: cantos de **6px** (`rounded-[6px]`), quase reta, automotiva. Nada de 24px.
- Botões: **pílula** (`rounded-full`), com o círculo da seta que desliza no hover.
  Componente `PillLink`/`PillButton` em `_components/ui.tsx`. Um botão primário por tela.
- Cards de carro e de serviço **sem caixa**: imagem + texto aberto embaixo, como
  editorial. Separação por espaço e degrau de tom, nunca borda de 1px nem sombra
  em coisa parada. Sombra só no que flutua (menu, diálogo, barra fixa, a busca).
- Grade de 12 colunas, margens `clamp(20px, 4vw, 64px)` (classe `.container-p`),
  espaço entre seções 140–200px no desktop (`.section-y`).

## Movimento (Motion + Lenis)

- Rolagem suave com **Lenis** (já no shell).
- Entradas: título por palavra com máscara (`WordReveal`), mídia por cortina
  (`MediaReveal`: clip-path de baixo para cima + escala 1.15→1), escalonamento de
  60–90ms. Tudo com fallback de `prefers-reduced-motion`.
- Assinaturas: vídeo da Marginal no topo; linha de luz que se desenha; letreiro
  gigante que inclina com a velocidade da rolagem (`VelocityMarquee`); odômetro
  com dígitos que rolam (`Odometer`); vitrine com o carro entrando de lado;
  placa 3D que inclina com o mouse; cursor próprio com rótulo ("Ver", "Arraste").
- Cursor: elementos com `data-cursor="Ver"` mostram o rótulo no cursor.

## Voz

Português do Brasil, frases curtas, sem jargão. "A gente" em vez de "nós".
Promessa central: **Seu carro no fluxo certo.** Nada de "garantia" (jurídico).
Prova só real: estoque, fotos e depoimentos autorizados. Exemplo é rotulado.

import type { Vehicle } from "@/types/vehicle";

/**
 * Single source of truth for the published stock.
 *
 * Desde 10/11/2026 a fonte é a planilha "AutosFlow | Central de Estoque e
 * Anúncios" (aba ESTOQUE), mantida pela equipe. O site publica exatamente os
 * veículos com status "Disponível" ali, com o código AF-### da planilha como
 * referência pública. Os carros de venda assistida (de terceiros, que ficam
 * com o proprietário) vêm da planilha "02 — Central de Estoque Online | Venda
 * Assistida", com código AO-### e `origin: "assistida"`. Preço e quilometragem são os da planilha; placa e
 * origem (loja/consignado), que a planilha não traz, vêm das tabelas de preços
 * anteriores (26/08 a 13/10/2026), cujo PDF não é publicado por trazer placas
 * completas.
 *
 * `sourceName` guarda a descrição como veio da fonte; `make`, `model` e
 * `version` são a mesma descrição normalizada para exibição. Nenhuma
 * especificação, opcional ou garantia é acrescentada sem estar na fonte.
 *
 * Só entra no site carro com fotos da própria unidade: nada de imagem
 * ilustrativa de modelo.
 *
 * A ORDEM desta lista é a vitrine: é a ordem padrão do estoque ("Destaques")
 * e a dos carros da home. Abre com os mais desejados e recentes, alterna
 * tipo de carro e faixa de preço nas primeiras posições e fecha com os de
 * entrada. Para atualizar, veja README.md.
 */
export const STOCK_ISSUED_AT = "12/11/2026";

/**
 * Revisões:
 * - 13/11: entra o primeiro carro de venda assistida, Corolla Cross XRX
 *   Hybrid 2024 (AO-001), no topo da vitrine. Quilometragem sob consulta
 *   até o proprietário confirmar; placa coberta nas fotos.
 * - 12/11: sai o Fiesta (vendido); entram Fit LX 2016 (AF-016), Nivus preto
 *   2022 (AF-017) e Etios Sedan Platinum 2018 (AF-018). Q3, X1, Creta
 *   Attitude e HB20 com fotos novas, feitas na AutosFlow. Lista em ordem de
 *   vitrine.
 * - 10/11: site alinhado à Central de Estoque. Saem os vendidos (Cerato e
 *   Creta Limited) e os que não constam na planilha (Eclipse Cross, Tracker,
 *   Onix LT Turbo 2024, Onix LT2, Onix LS, Sonic e Picanto). Entra o Compass
 *   Limited T270 (AF-015). Fiesta e Creta Attitude com valores novos; Fiesta,
 *   Nivus e EcoSport com a quilometragem da planilha.
 * - 26/10: saem Kicks e HR-V, que não estavam na loja.
 * - 21/10: saem 8 veículos fora da tabela; fotos profissionais.
 * - 13/10, 06/10, 30/09: tabelas de preços e pastas de fotos da equipe.
 */
export const STOCK_UPDATED_AT = "13/11/2026";

export const vehicles: Vehicle[] = [
  {
    ref: "AO-001",
    slug: "toyota-corolla-cross-xrx-hybrid",
    make: "Toyota",
    model: "Corolla Cross",
    version: "XRX Hybrid 1.8",
    sourceName: "TOYOTA COROLLA CROSS XRX HYBRID 1.8",
    yearShort: "24",
    year: "2024",
    yearSort: 2024,
    fuel: "Híbrido",
    color: "Branco",
    // A planilha deixa a quilometragem em branco até o proprietário confirmar.
    km: 0,
    price: 155990,
    origin: "assistida",
    featured: false,
  },
  {
    ref: "AF-015",
    slug: "jeep-compass-limited-t270",
    make: "Jeep",
    model: "Compass",
    version: "Limited T270 1.3 Turbo AT",
    sourceName: "JEEP COMPASS LIMITED T270 FLEX",
    yearShort: "22",
    year: "2022",
    yearSort: 2022,
    fuel: "Flex",
    color: "Preta",
    km: 18000,
    price: 123990,
    featured: true,
  },
  {
    ref: "AF-011",
    slug: "volkswagen-nivus-highline-1-0-tsi",
    make: "Volkswagen",
    model: "Nivus",
    version: "Highline 1.0 TSI",
    sourceName: "VW/NIVUS HL TSI",
    yearShort: "24/25",
    year: "2024/2025",
    yearSort: 2024,
    fuel: "Flex",
    color: "Azul",
    km: 26000,
    plate: "TJF-0I26",
    price: 132990,
    origin: "consignado",
    featured: false,
  },
  {
    ref: "AF-001",
    slug: "toyota-corolla-cross-xre-2-0",
    make: "Toyota",
    model: "Corolla Cross",
    version: "XRE 2.0",
    sourceName: "TOYOTA / CCROSS XRE 20",
    yearShort: "23/24",
    year: "2023/2024",
    yearSort: 2023,
    fuel: "Flex",
    color: "Cinza",
    km: 58000,
    plate: "EXR-5H55",
    price: 147990,
    origin: "consignado",
    featured: true,
  },
  {
    ref: "AF-006",
    slug: "hyundai-creta-16a-attitude",
    make: "Hyundai",
    model: "Creta",
    version: "16A Attitude",
    sourceName: "HYUNDAI / CRETA 16A ATTITUDE",
    yearShort: "20/21",
    year: "2020/2021",
    yearSort: 2020,
    fuel: "Flex",
    color: "Preta",
    km: 85137,
    plate: "ERZ-4H31",
    price: 86990,
    origin: "consignado",
    featured: false,
  },
  {
    ref: "AF-004",
    slug: "bmw-x1-s20i-active-flex",
    make: "BMW",
    model: "X1",
    version: "S20i Active Flex",
    sourceName: "BMW/X1 S20I ACTIVE FLEX",
    yearShort: "17/17",
    year: "2017/2017",
    yearSort: 2017,
    fuel: "Flex",
    color: "Prata",
    km: 97198,
    plate: "GEF-8H55",
    price: 105990,
    origin: "loja",
    featured: true,
  },
  {
    ref: "AF-003",
    slug: "audi-q3-1-4-tfsi",
    make: "Audi",
    model: "Q3",
    version: "1.4 TFSI",
    sourceName: "AUDI/Q3 1.4TFSI",
    yearShort: "17/17",
    year: "2017/2017",
    yearSort: 2017,
    fuel: "Flex",
    color: "Azul",
    km: 92261,
    plate: "PZI-1G13",
    price: 91990,
    origin: "loja",
    featured: true,
  },
  {
    ref: "AF-017",
    slug: "volkswagen-nivus-highline-tsi-2022",
    make: "Volkswagen",
    model: "Nivus",
    version: "Highline 1.0 TSI",
    sourceName: "VW NIVUS HIGHLINE TSI",
    yearShort: "22",
    year: "2022",
    yearSort: 2022,
    fuel: "Flex",
    color: "Preta",
    km: 53671,
    price: 107990,
    featured: false,
  },
  {
    ref: "AF-010",
    slug: "ford-ecosport-1-5-at",
    make: "Ford",
    model: "EcoSport",
    version: "SE 1.5 AT",
    sourceName: "FORD / ECOSPORT SE ATDT1.5",
    yearShort: "20/21",
    year: "2020/2021",
    yearSort: 2020,
    fuel: "Flex",
    color: "Prata",
    km: 52000,
    plate: "GAK-2F04",
    price: 79990,
    origin: "consignado",
    featured: false,
  },
  {
    ref: "AF-018",
    slug: "toyota-etios-sedan-platinum",
    make: "Toyota",
    model: "Etios",
    version: "Sedan Platinum 1.5 AT",
    sourceName: "TOYOTA ETIOS SEDAN PLATINUM",
    yearShort: "18",
    year: "2018",
    yearSort: 2018,
    fuel: "Flex",
    color: "Prata",
    km: 72216,
    price: 68990,
    featured: false,
  },
  {
    ref: "AF-016",
    slug: "honda-fit-lx-cvt",
    make: "Honda",
    model: "Fit",
    version: "LX 1.5 CVT",
    sourceName: "HONDA FIT LX FLEX CVT",
    yearShort: "16",
    year: "2016",
    yearSort: 2016,
    fuel: "Flex",
    color: "Prata",
    km: 100069,
    price: 67990,
    featured: false,
  },
  {
    ref: "AF-002",
    slug: "fiat-argo-1-0-mt",
    make: "Fiat",
    model: "Argo",
    version: "1.0 MT",
    sourceName: "FIAT/ARGO 1.0",
    yearShort: "22/22",
    year: "2022/2022",
    yearSort: 2022,
    fuel: "Flex",
    color: "Branca",
    km: 65298,
    plate: "RUH-4F38",
    price: 61990,
    origin: "consignado",
    featured: false,
  },
  {
    ref: "AF-008",
    slug: "hyundai-hb20-1-0-mt",
    make: "Hyundai",
    model: "HB20",
    version: "1.0 MT Comfort",
    sourceName: "HYUNDAI / HB20 10M COMFORT",
    yearShort: "17/17",
    year: "2017/2017",
    yearSort: 2017,
    fuel: "Flex",
    color: "Cinza",
    km: 133841,
    plate: "PZS-0C98",
    price: 49990,
    origin: "loja",
    featured: false,
  },
];

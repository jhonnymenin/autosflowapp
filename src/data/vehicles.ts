import type { Vehicle } from "@/types/vehicle";

/**
 * Single source of truth for the published stock.
 *
 * Desde 10/11/2026 a fonte é a planilha "AutosFlow | Central de Estoque e
 * Anúncios" (aba ESTOQUE), mantida pela equipe. O site publica exatamente os
 * veículos com status "Disponível" ali, com o código AF-### da planilha como
 * referência pública. Preço e quilometragem são os da planilha; placa e
 * origem (loja/consignado), que a planilha não traz, vêm das tabelas de preços
 * anteriores (26/08 a 13/10/2026), cujo PDF não é publicado por trazer placas
 * completas.
 *
 * `sourceName` guarda a descrição como veio da fonte; `make`, `model` e
 * `version` são a mesma descrição normalizada para exibição. Nenhuma
 * especificação, opcional ou garantia é acrescentada sem estar na fonte.
 *
 * Só entra no site carro com fotos da própria unidade: nada de imagem
 * ilustrativa de modelo. Para atualizar, veja README.md.
 */
export const STOCK_ISSUED_AT = "10/11/2026";

/**
 * Revisões:
 * - 10/11: site alinhado à Central de Estoque. Saem os vendidos (Cerato e
 *   Creta Limited) e os que não constam na planilha (Eclipse Cross, Tracker,
 *   Onix LT Turbo 2024, Onix LT2, Onix LS, Sonic e Picanto). Entra o Compass
 *   Limited T270 (AF-015). Fiesta e Creta Attitude com valores novos; Fiesta,
 *   Nivus e EcoSport com a quilometragem da planilha.
 * - 26/10: saem Kicks e HR-V, que não estavam na loja.
 * - 21/10: saem 8 veículos fora da tabela; fotos profissionais.
 * - 13/10, 06/10, 30/09: tabelas de preços e pastas de fotos da equipe.
 */
export const STOCK_UPDATED_AT = "10/11/2026";

export const vehicles: Vehicle[] = [
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
    ref: "AF-007",
    slug: "ford-fiesta-ha-1-6l-titanium",
    make: "Ford",
    model: "Fiesta",
    version: "HA 1.6L Titanium",
    sourceName: "FIESTA HA 1,6L TITANIUM",
    yearShort: "15/16",
    year: "2015/2016",
    yearSort: 2015,
    fuel: "Flex",
    color: "Branco",
    km: 108343,
    plate: "FGX-5E24",
    price: 48990,
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
];

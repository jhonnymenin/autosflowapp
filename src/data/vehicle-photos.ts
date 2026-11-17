/**
 * FOTOS REAIS do estoque — da própria unidade anunciada, não do modelo.
 *
 * Arquivos em public/imagens/veiculos/reais/<slug>/, já na ordem de exibição:
 * frente em três quartos primeiro (vira a capa no catálogo), depois laterais e
 * traseira, interior e detalhes. Largura e altura vêm do arquivo e permitem à
 * galeria mostrar fotos em pé sem cortar o carro.
 *
 * Para adicionar: salve as fotos na pasta do slug, em ordem (01.jpg, 02.jpg…),
 * e acrescente a lista aqui. O veículo deixa de exibir a nota de imagem
 * ilustrativa automaticamente.
 */

export interface VehiclePhoto {
  src: string;
  width: number;
  height: number;
}

/**
 * Fotos profissionais, tiradas no showroom com a placa da marca.
 * São a melhor apresentação do estoque: abrem a home, a vitrine e o catálogo.
 */
export const professionalPhotos = new Set([
  "fiat-argo-1-0-mt",
  "ford-ecosport-1-5-at",
  "hyundai-creta-16a-attitude",
  "hyundai-hb20-1-0-mt",
  "chevrolet-onix-lt-1-0-turbo-mt",
]);

/** Fotos de celular na loja da AutosFlow, com a placa da marca. */
export const showroomPhotos = new Set([
  "toyota-corolla-cross-xre-2-0",
  "volkswagen-nivus-highline-1-0-tsi",
  "volkswagen-nivus-highline-tsi-2022",
  "jeep-compass-limited-t270",
  "audi-q3-1-4-tfsi",
  "bmw-x1-s20i-active-flex",
  "honda-fit-lx-cvt",
  "toyota-etios-sedan-platinum",
  "ford-ranger-storm-xls-3-2-diesel",
  "kia-picanto-1-0-at",
]);

export const vehiclePhotos: Record<string, VehiclePhoto[]> = {
  "audi-q3-1-4-tfsi": [
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/01-679d5f24.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/02-f6a883b7.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/03-1b29153d.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/04-519c69df.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/05-745e7d6f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/06-cfcc79bb.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/07-c6ff8178.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/08-0f0e5a41.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/09-26f4d800.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/10-7d2d6b6d.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/11-7c842c32.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/12-04d32c5b.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/13-4ee46215.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/14-20ff4d32.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/15-ae8e001f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/16-21434b9a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/17-8ebf49ba.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/18-953271ce.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "fiat-argo-1-0-mt": [
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/01-b2ee6b3a.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/02-c615cd3c.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/03-39d029c5.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/04-0b074c6f.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/05-5c9a8714.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/06-01bd9883.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/07-df82b523.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/08-ea789758.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/09-9ed8216f.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/10-d0afd519.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/11-e4b2efc5.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/12-9440ffb4.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/13-0786821a.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/14-000ff074.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/15-39b661bf.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/16-75a97b40.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/17-1baf9fa4.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/18-e30cc23c.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/19-483596b8.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/20-8ac7f1e1.jpg",
      width: 1280,
      height: 960,
    },
  ],
  "bmw-x1-s20i-active-flex": [
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/01-6d1281ee.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/02-2b325fbe.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/03-82e4769d.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/04-e553706a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/05-99aa49fd.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/06-a02cebb9.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/07-e680dd90.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/08-90846c0b.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/09-486655c8.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/10-9e6f248d.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/11-63d73541.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/12-baa31d56.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/13-a67bfc17.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/14-4ea0ff3f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/15-d0c3adc8.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/16-eb408f53.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/17-81378ce4.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/18-15815574.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/19-63b3a131.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "hyundai-creta-16a-attitude": [
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/01-f1d1e370.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/02-ce902266.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/03-511eaf3f.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/04-7454cd9a.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/05-2c3917c6.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/06-00939dc8.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/07-aaa7cd4b.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/08-da6810c2.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/09-11dfe724.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/10-56507cde.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/11-cb6c8020.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/12-204aee25.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/13-e0473bdc.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/14-f652e23d.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/15-c8e73c43.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/16-f368edcc.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/17-a7379564.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/18-ad13d12c.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/19-5794eba3.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/20-2d996c69.jpg",
      width: 1280,
      height: 960,
    },
  ],
  "hyundai-hb20-1-0-mt": [
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/01-6f9d7f41.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/02-43efc875.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/03-1353bf24.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/04-1da45cef.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/05-036a6b1b.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/06-b6944cf2.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/07-58d9a714.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/08-b2c2b836.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/09-a3a5cf78.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/10-eb427e8a.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/11-80dc5cb3.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/12-feb7c1d8.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/13-0abdc4b8.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/14-38c0982d.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/15-204a48b1.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/16-07700291.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/17-c3a18b99.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/18-017fe170.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/19-97021df4.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/20-d473a3f2.jpg",
      width: 1280,
      height: 960,
    },
  ],
  "toyota-corolla-cross-xre-2-0": [
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/01-08a7d72e.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/02-15d64527.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/03-052b8408.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/04-8b20441d.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/05-1d596544.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/06-c5cae260.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/07-b3038ff3.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/08-d14e5bba.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/09-57ba46ef.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/10-f043ad09.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/11-1f9560f5.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/12-74ddaa71.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/13-3a4d9b1b.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/14-0fe88170.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/15-0cfd44b9.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/16-7b3c8bac.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/17-6c92d27a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/18-3fe8e9fa.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/19-86e9da45.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/20-e042f64b.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/21-996f60f1.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xre-2-0/22-27b16cb5.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "ford-ecosport-1-5-at": [
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/01-bec8ca2a.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/02-8c3583d2.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/03-aa4ec4e6.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/04-7245ce22.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/05-9bfb27ad.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/06-18ad29cd.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/07-a4559147.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/08-6b59c937.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/09-a11c238e.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/10-84bb1ebe.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/11-3e8ac8bc.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/12-8152be66.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/13-c36b5242.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/14-1812a00b.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/15-4bc29968.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/16-a5e7a37e.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/17-5be6581f.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/18-2ac9bde1.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/19-9ee37a74.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/20-ccdf5395.jpg",
      width: 1600,
      height: 1202,
    },
  ],
  "volkswagen-nivus-highline-1-0-tsi": [
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/01-61a46c6f.jpg",
      width: 1600,
      height: 1280,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/02-08bced3f.jpg",
      width: 1488,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/03-f82b717a.jpg",
      width: 1530,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/04-1504f6be.jpg",
      width: 1446,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/05-0f27ef74.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/06-a953f697.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/07-9f37602a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/08-2984a1e0.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/09-e975be32.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/10-d538b9b7.jpg",
      width: 1600,
      height: 1144,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/11-e0b01b67.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/12-8037139b.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/13-c3eaa5df.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/14-a52a8b52.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/15-80d8afe3.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-1-0-tsi/16-7a04e290.jpg",
      width: 1200,
      height: 1600,
    },
  ],
  "jeep-compass-limited-t270": [
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/01-0b92bb0f.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/02-096eee96.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/03-44b8c89f.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/04-2726b928.jpg",
      width: 960,
      height: 1280,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/05-267a9b8f.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/06-e74c8bf0.jpg",
      width: 960,
      height: 1280,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/07-060257ab.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/08-3fd64470.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/09-68110048.jpg",
      width: 960,
      height: 1280,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/10-4e86f9e2.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/11-842f9891.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/12-fbf36f8a.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/13-49c3131d.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/14-65b50235.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/15-e3e9212b.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/16-f9f51f1f.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/17-7871adf9.jpg",
      width: 960,
      height: 1280,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/18-1b419241.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/19-63bbf276.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/20-71724993.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/21-650fe385.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/jeep-compass-limited-t270/22-86a1f80d.jpg",
      width: 1280,
      height: 960,
    },
  ],
  "honda-fit-lx-cvt": [
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/01-3677c06a.jpg",
      width: 1600,
      height: 1310,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/02-fbc3e315.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/03-0e10ddce.jpg",
      width: 1384,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/04-0d6fa8c8.jpg",
      width: 1600,
      height: 1068,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/05-96c1a38d.jpg",
      width: 1600,
      height: 1338,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/06-91288b0a.jpg",
      width: 1600,
      height: 1590,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/07-f4b54d77.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/08-69683cb0.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/09-227a30be.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/10-2e1194b3.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/11-97b2613b.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/12-8d77519d.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/13-59dc20f4.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/14-3c0ab668.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/honda-fit-lx-cvt/15-0acea31f.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "volkswagen-nivus-highline-tsi-2022": [
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/01-fa1cab56.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/02-5310d9c7.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/03-4f258db2.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/04-d225ac88.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/05-8ab1dff2.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/06-1ab3c8da.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/07-cd9c44d5.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/08-0af74c2e.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/09-395830f4.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/10-561ca303.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/11-91c7cd94.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/12-fde90262.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/13-f967f999.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/14-7a040124.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/15-293d9510.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/volkswagen-nivus-highline-tsi-2022/16-85d16a43.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "toyota-etios-sedan-platinum": [
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/01-1afae293.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/02-fddd3bfc.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/03-fcd9a249.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/04-e038a428.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/05-58222243.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/06-9a5985c6.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/07-488dbe42.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/08-1f671bbe.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/09-241ccf7a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/10-c7c03aa3.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/11-29aebdf9.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/12-3117ee8d.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/13-e35abc8c.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/14-88c4deaa.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/15-d185b585.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/16-a5e531b2.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/17-528fd0ee.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/toyota-etios-sedan-platinum/18-d340f775.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "toyota-corolla-cross-xrx-hybrid": [
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/01-1f54353e.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/02-89124508.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/03-2a0ad177.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/04-8dc10a96.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/05-14b7bced.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/06-3ae0ff1b.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/07-3ee32934.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/08-7d845f9c.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/09-3faf9da1.jpg",
      width: 900,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/toyota-corolla-cross-xrx-hybrid/10-7dea4826.jpg",
      width: 1600,
      height: 900,
    },
  ],
  "chevrolet-onix-lt-1-0-turbo-mt": [
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/01-5158248e.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/02-becb43e9.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/03-fda188dc.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/04-4701603a.jpg",
      width: 1280,
      height: 962,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/05-19de84ab.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/06-bb4ad03b.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/07-60344a32.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/08-b08a09cd.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/09-c2decc07.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/10-1f22cf65.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/11-4001b69c.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/12-2cb27224.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/13-3dfee657.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/14-98ab0cbc.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/15-8b43d2f3.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/16-23a27d96.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/17-4c3b500d.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/18-0600c2ca.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/19-81565a82.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-lt-1-0-turbo-mt/20-ca3d4e71.jpg",
      width: 1280,
      height: 960,
    },
  ],
  "ford-ranger-storm-xls-3-2-diesel": [
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/01-785a1af7.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/02-488a472b.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/03-1f5b6987.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/04-c0cbd23f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/05-881ba7d2.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/06-aa8aadf2.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/07-7c55aad4.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/08-b01c34b8.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/09-31bb3e1e.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/10-44f5f5b8.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/11-b344709a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/12-dc0b2754.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/13-eacd92ba.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/14-7a97c4f5.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/15-71bcf0bd.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/16-67209ee8.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/17-4e0c813d.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/18-907931fe.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/19-e6727713.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/20-bd6a10f9.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/21-577e058e.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/22-336bf0c5.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/23-30333ff3.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/24-615c3588.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-ranger-storm-xls-3-2-diesel/25-e2271cd7.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "kia-picanto-1-0-at": [
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/01-cb54d40d.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/02-47360d70.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/03-94e9c34c.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/04-6f6df1a8.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/05-3da524d5.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/06-d890e8fe.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/07-f8ab4ea9.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/08-1a02af70.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/09-e1b3e430.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/10-2a30b8eb.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/11-d63fbcf6.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/12-0a5ad15f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/13-eafe480d.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/14-ae95c055.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/15-6671001a.jpg",
      width: 1600,
      height: 1200,
    },
  ],
};

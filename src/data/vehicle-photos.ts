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
 * Unidades fotografadas no showroom da AutosFlow, com a placa da marca. Têm a
 * melhor apresentação do estoque e abrem a vitrine e o catálogo.
 */
/**
 * Fotos profissionais (21/10/2026), tiradas no showroom com a placa da marca.
 * São a melhor apresentação do estoque: abrem a home, a vitrine e o catálogo.
 */
export const professionalPhotos = new Set([
  "fiat-argo-1-0-mt",
  "ford-ecosport-1-5-at",
  "ford-fiesta-ha-1-6l-titanium",
]);

export const showroomPhotos = new Set([
  "toyota-corolla-cross-xre-2-0",
  "volkswagen-nivus-highline-1-0-tsi",
  "jeep-compass-limited-t270",
  "fiat-argo-1-0-mt",
  "ford-ecosport-1-5-at",
  "ford-fiesta-ha-1-6l-titanium",
]);

export const vehiclePhotos: Record<string, VehiclePhoto[]> = {
  "audi-q3-1-4-tfsi": [
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/01.jpg",
      width: 1600,
      height: 1546,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/02.jpg",
      width: 1552,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/03.jpg",
      width: 1348,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/04.jpg",
      width: 1600,
      height: 1484,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/05.jpg",
      width: 1486,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/06.jpg",
      width: 1398,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/07.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/08.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/09.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/10.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/11.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/12.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/13.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/14.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/15.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/16.jpg",
      width: 1200,
      height: 1600,
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
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/01.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/02.jpg",
      width: 480,
      height: 848,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/03.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/04.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/05.jpg",
      width: 480,
      height: 848,
    },
    {
      src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/06.jpg",
      width: 480,
      height: 848,
    },
  ],
  "hyundai-creta-16a-attitude": [
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/01.jpg",
      width: 1528,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/02.jpg",
      width: 480,
      height: 848,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/03.jpg",
      width: 480,
      height: 848,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/04.jpg",
      width: 480,
      height: 848,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/05.jpg",
      width: 480,
      height: 848,
    },
  ],
  "ford-fiesta-ha-1-6l-titanium": [
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/01-dbe4173c.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/02-3d08369b.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/03-e6a79bfa.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/04-56d602f6.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/05-1b1dd374.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/06-a4719caa.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/07-9130b884.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/08-21b37dff.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/09-31d23441.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/10-102a52a1.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/11-02602e0c.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/12-79e45b3d.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/13-99657ad0.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/14-1cfae43f.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/15-c3f4c498.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/16-6d93458e.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/17-11a679ea.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/18-e541e942.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/19-b0b4430d.jpg",
      width: 1600,
      height: 1202,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/20-be50a8e6.jpg",
      width: 1600,
      height: 1202,
    },
  ],
  "hyundai-hb20-1-0-mt": [
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/01.jpg",
      width: 1600,
      height: 1340,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/02.jpg",
      width: 1600,
      height: 1456,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/03.jpg",
      width: 1600,
      height: 1332,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/04.jpg",
      width: 1600,
      height: 1212,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/05.jpg",
      width: 1600,
      height: 1342,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/06.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/07.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/08.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/09.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/10.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/11.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/12.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/13.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/14.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/15.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/16.jpg",
      width: 1316,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/17.jpg",
      width: 1256,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/18.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/19.jpg",
      width: 1600,
      height: 1200,
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
};

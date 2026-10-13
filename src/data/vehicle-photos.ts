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
export const showroomPhotos = new Set([
  "toyota-corolla-cross-xre-2-0",
  "volkswagen-nivus-highline-1-0-tsi",
  "fiat-argo-1-0-mt",
  "kia-cerato-1-6-at",
  "chevrolet-onix-10mt-lt2",
  "ford-ecosport-1-5-at",
  "kia-picanto-1-0-at",
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
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/01-8e58992f.jpg",
      width: 1600,
      height: 1448,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/02-6e8eb143.jpg",
      width: 1600,
      height: 1486,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/03-a5785077.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/04-d148ca87.jpg",
      width: 1600,
      height: 998,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/05-f354d608.jpg",
      width: 1600,
      height: 980,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/06-a4a0f6d0.jpg",
      width: 1600,
      height: 1158,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/07-5e2a81a6.jpg",
      width: 1600,
      height: 1352,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/08-d59ffdc3.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/09-5c4905c5.jpg",
      width: 1600,
      height: 1524,
    },
    {
      src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/10-e99b6e1d.jpg",
      width: 1600,
      height: 1200,
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
  "kia-cerato-1-6-at": [
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/01-a925e5aa.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/02-9821bc73.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/03-624c247c.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/04-bbc5a426.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/05-ae13ea10.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/06-fcab1b12.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/07-1b2a79bb.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/08-338b2efe.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/09-770b64c4.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/10-0a850151.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/11-15975092.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/12-be575f22.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/13-e2aa43bb.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/14-0f5ed993.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/15-9b336db2.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/16-a2a85e6f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/17-e8c93378.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/18-e1186d7a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-cerato-1-6-at/19-fb787cfa.jpg",
      width: 1600,
      height: 1200,
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
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/01.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/02.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/03.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/04.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/05.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/06.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/07.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/08.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/09.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/10.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/11.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/12.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/13.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/14.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/15.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/16.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/17.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/18.jpg",
      width: 1280,
      height: 960,
    },
    {
      src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/19.jpg",
      width: 1280,
      height: 960,
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
  "ford-territory-1-5-ecoboost": [
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/01.jpg",
      width: 1600,
      height: 1472,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/02.jpg",
      width: 1600,
      height: 1240,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/03.jpg",
      width: 1570,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/04.jpg",
      width: 1420,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/05.jpg",
      width: 1222,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/06.jpg",
      width: 1394,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/07.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/08.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/09.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/10.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/11.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/12.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/13.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/14.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/15.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/16.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/17.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/18.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/19.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/20.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/21.jpg",
      width: 1200,
      height: 1600,
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
  "chevrolet-onix-10mt-lt2": [
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/01-8d1052f2.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/02-de389de6.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/03-064e6bd9.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/04-6b2bdc9c.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/05-9cd0e2a7.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/06-4851be59.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/07-bce3ecc0.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/08-ca01442b.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/09-db0e4a89.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/10-22637945.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/11-2c2d6db4.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/12-6d5ac0b7.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/13-648f968d.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/14-e75980c5.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/15-fae6ff5e.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/16-cfcf7ca0.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/chevrolet-onix-10mt-lt2/17-3fd1e800.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "kia-picanto-1-0-at": [
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/01-8d3496f2.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/02-48342e7f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/03-39dfe85f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/04-b388046a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/05-25a970dd.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/06-5e386a04.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/07-40f21b96.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/08-8d7adc2f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/09-313254a2.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/10-841136d7.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/11-2e2906b5.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/12-a27d7eaa.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/13-a11eaa0b.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/14-825d3cae.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/15-26d2a820.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/16-7a007575.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/kia-picanto-1-0-at/17-e1df9a2a.jpg",
      width: 1600,
      height: 1200,
    },
  ],
  "ford-ecosport-1-5-at": [
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/01-3292625a.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/02-e2b3883f.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/03-0a2e4eb7.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/04-58fcd8b2.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/05-74f936be.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/06-f8495088.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/07-8696544c.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/08-b69e7211.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/09-7ceb0591.jpg",
      width: 1200,
      height: 1600,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/10-d7e05b58.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/11-f772854f.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/12-fa20f854.jpg",
      width: 1600,
      height: 1200,
    },
    {
      src: "/imagens/veiculos/reais/ford-ecosport-1-5-at/13-82651b13.jpg",
      width: 1200,
      height: 1600,
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
};

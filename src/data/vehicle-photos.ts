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

export const vehiclePhotos: Record<string, VehiclePhoto[]> = {
  "audi-q3-1-4-tfsi": [
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/01.jpg", width: 1600, height: 1546 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/02.jpg", width: 1552, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/03.jpg", width: 1348, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/04.jpg", width: 1600, height: 1484 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/05.jpg", width: 1486, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/06.jpg", width: 1398, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/07.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/08.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/09.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/10.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/11.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/12.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/13.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/14.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/15.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/audi-q3-1-4-tfsi/16.jpg", width: 1200, height: 1600 },
  ],
  "fiat-argo-1-0-mt": [
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/01.jpg", width: 1600, height: 1368 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/02.jpg", width: 1600, height: 1362 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/03.jpg", width: 1526, height: 1600 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/04.jpg", width: 1600, height: 1142 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/05.jpg", width: 1600, height: 1386 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/06.jpg", width: 1600, height: 1524 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/07.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/08.jpg", width: 1600, height: 1114 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/09.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/10.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/11.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/fiat-argo-1-0-mt/12.jpg", width: 1200, height: 1600 },
  ],
  "bmw-x1-s20i-active-flex": [
    { src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/01.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/02.jpg", width: 480, height: 848 },
    { src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/03.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/04.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/05.jpg", width: 480, height: 848 },
    { src: "/imagens/veiculos/reais/bmw-x1-s20i-active-flex/06.jpg", width: 480, height: 848 },
  ],
  "kia-cerato-1-6-at": [
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/01.jpg", width: 1600, height: 1544 },
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/02.jpg", width: 1600, height: 1122 },
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/03.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/04.jpg", width: 1450, height: 1600 },
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/05.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/06.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/07.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/08.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/kia-cerato-1-6-at/09.jpg", width: 1600, height: 1200 },
  ],
  "hyundai-creta-16a-attitude": [
    { src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/01.jpg", width: 1528, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/02.jpg", width: 480, height: 848 },
    { src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/03.jpg", width: 480, height: 848 },
    { src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/04.jpg", width: 480, height: 848 },
    { src: "/imagens/veiculos/reais/hyundai-creta-16a-attitude/05.jpg", width: 480, height: 848 },
  ],
  "ford-fiesta-ha-1-6l-titanium": [
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/01.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/02.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/03.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/04.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/05.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/06.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/07.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/08.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/09.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/10.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/11.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/12.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/13.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/14.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/15.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/16.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/17.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/18.jpg", width: 1280, height: 960 },
    { src: "/imagens/veiculos/reais/ford-fiesta-ha-1-6l-titanium/19.jpg", width: 1280, height: 960 },
  ],
  "hyundai-hb20-1-0-mt": [
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/01.jpg", width: 1600, height: 1340 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/02.jpg", width: 1600, height: 1456 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/03.jpg", width: 1600, height: 1332 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/04.jpg", width: 1600, height: 1212 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/05.jpg", width: 1600, height: 1342 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/06.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/07.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/08.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/09.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/10.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/11.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/12.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/13.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/14.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/15.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/16.jpg", width: 1316, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/17.jpg", width: 1256, height: 1600 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/18.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/hyundai-hb20-1-0-mt/19.jpg", width: 1600, height: 1200 },
  ],
  "ford-territory-1-5-ecoboost": [
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/01.jpg", width: 1600, height: 1472 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/02.jpg", width: 1600, height: 1240 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/03.jpg", width: 1570, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/04.jpg", width: 1420, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/05.jpg", width: 1222, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/06.jpg", width: 1394, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/07.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/08.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/09.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/10.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/11.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/12.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/13.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/14.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/15.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/16.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/17.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/18.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/19.jpg", width: 1600, height: 1200 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/20.jpg", width: 1200, height: 1600 },
    { src: "/imagens/veiculos/reais/ford-territory-1-5-ecoboost/21.jpg", width: 1200, height: 1600 },
  ],
};

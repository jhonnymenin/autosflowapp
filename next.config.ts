import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Sem Image Optimization da Vercel: o loader aponta para as versões WebP
    // geradas por `scripts/build-images.mjs` em `public/_img/`. As larguras
    // abaixo são exatamente as geradas — o `srcset` só usa estas.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 750, 828, 1200, 1600],
    imageSizes: [160, 384],
  },
  async headers() {
    return [
      {
        // Fotos de veículos têm o hash do conteúdo no nome: nunca mudam.
        source: "/_img/imagens/veiculos/reais/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

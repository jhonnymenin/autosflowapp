"use client";

import { getImageProps, type ImageProps } from "next/image";
import { preload } from "react-dom";

import { avifLoader } from "@/lib/image-loader";

/**
 * `next/image` servido por arquivos estáticos, em AVIF com WebP de reserva.
 *
 * Mesma API do `<Image>` do Next (src, alt, fill, sizes, priority, loading,
 * className…) e o mesmo `<img>` no fim — layout, recorte e `srcset` não
 * mudam. A diferença: o `<img>` vem dentro de um `<picture>` cujo `<source>`
 * oferece AVIF a quem suporta; quem não suporta fica com o WebP do `<img>`.
 * Os dois apontam para versões pré-geradas (ver `lib/image-loader.ts`), então
 * nada passa pelo `/_next/image` nem pelo Image Optimization da Vercel.
 *
 * É componente de cliente, como o `<Image>` do Next: num Server Component, a
 * pré-carga da imagem principal viajaria nos dados de prefetch dos links e o
 * navegador baixaria imagens de páginas que o visitante nem abriu.
 */
export default function Image(props: ImageProps) {
  const { props: img } = getImageProps(props);
  const {
    props: { srcSet: avifSrcSet, src: avifSrc },
  } = getImageProps({ ...props, loader: avifLoader });

  // Imagem principal (priority/preload): pré-carregada como o Next faz, com
  // as mesmas opções — só que em AVIF, que é o que o navegador vai pedir.
  if (props.priority || props.preload) {
    preload(avifSrc, {
      as: "image",
      type: "image/avif",
      imageSrcSet: avifSrcSet,
      imageSizes: img.sizes,
      ...(img.fetchPriority ? { fetchPriority: img.fetchPriority } : {}),
    });
  }

  return (
    // `display: contents`: o <picture> não cria caixa — o <img> se posiciona
    // exatamente como antes (inclusive com `fill`).
    <picture style={{ display: "contents" }}>
      {/* <source> não tem `display: none` no estilo padrão do navegador; com
          o <picture> em `contents`, ele viraria item de flex/grid e ganharia
          o `gap` do pai. Escondido, a escolha do formato não muda. */}
      <source
        type="image/avif"
        srcSet={avifSrcSet}
        sizes={img.sizes}
        style={{ display: "none" }}
      />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vem de getImageProps */}
      <img {...img} />
    </picture>
  );
}

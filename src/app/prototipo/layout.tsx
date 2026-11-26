import type { Metadata } from "next";
import { Archivo } from "next/font/google";

import { ProtoShell } from "./_components/shell";

import "lenis/dist/lenis.css";
import "./prototipo.css";

/**
 * Protótipo da nova home e das páginas de serviços.
 *
 * Isolado do site: rota própria (/prototipo), fora do sitemap, com
 * `noindex`, cabeçalho e rodapé próprios. Nada do site em produção importa
 * daqui; apagar a pasta `src/app/prototipo` remove o protótipo inteiro.
 */
const wide = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-proto-wide",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Protótipo · Nova home",
    template: "%s · Protótipo",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PrototypeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="proto-root" className={`proto ${wide.variable}`}>
      <ProtoShell>{children}</ProtoShell>
    </div>
  );
}

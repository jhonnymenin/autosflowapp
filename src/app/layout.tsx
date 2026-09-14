import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand, contact } from "@/data/brand";
import { siteUrl } from "@/lib/site";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description:
    "AutosFlow é o autoshopping digital do proprietário: compra, venda e troca de veículos com avaliação, negociação assistida, documentação e entrega. Seu carro no fluxo certo.",
  applicationName: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "O autoshopping digital do proprietário. Veículos selecionados com critério, avaliados com responsabilidade e apresentados com transparência.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: "O autoshopping digital do proprietário.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#05080f",
  colorScheme: "dark",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: brand.name,
  slogan: brand.tagline,
  description: brand.descriptor,
  url: siteUrl,
  telephone: `+${contact.phoneE164}`,
  image: `${siteUrl}/brand/autosflow-wordmark.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressRegion: contact.address.state,
    postalCode: contact.address.postalCode,
    addressCountry: "BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input reaches this string.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd),
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { JetBrains_Mono, Unbounded } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFlutuante } from "@/components/ui/WhatsAppFlutuante";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { AvisoCookies } from "@/components/ui/AvisoCookies";
import { ModalPrivacidade } from "@/components/ui/ModalPrivacidade";
import { site } from "@/site.config";
import { SEO, grafoDoEstudio, robotsDoSite, urlDoSite } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jbmono",
  display: "swap",
});

// Fonte do logotipo: usada nos momentos da marca (key visual), não no texto corrido.
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(urlDoSite),
  title: { default: SEO.tituloPadrao, template: `%s | ${site.nomeCompleto}` },
  description: SEO.descricao,
  applicationName: site.nomeCompleto,
  authors: [{ name: site.titular.nome, url: `${urlDoSite}/sobre` }],
  creator: site.titular.nome,
  publisher: site.nomeCompleto,
  keywords: [...SEO.palavrasChave],
  category: "design",
  alternates: { canonical: "/" },
  robots: robotsDoSite,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.nomeCompleto,
    title: SEO.tituloPadrao,
    description: SEO.descricao,
    images: [{ url: SEO.imagemOg, width: 1200, height: 630, alt: SEO.imagemOgAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.tituloPadrao,
    description: SEO.descricao,
    images: [SEO.imagemOg],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${jetbrainsMono.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        {/* Quem já escolheu sobre os cookies não vê o aviso nem por um instante. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('rl-cookies'))document.documentElement.dataset.cookieOk='1'}catch(e){}",
          }}
        />
        {/* Satoshi e Clash Display não estão no Google Fonts — via Fontshare, com display=swap. */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=clash-display@600,700&display=swap"
        />
      </head>
      <body>
        <JsonLd dados={grafoDoEstudio()} />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFlutuante />
        </SmoothScroll>
        <GoogleAnalytics />
        <AvisoCookies />
        <ModalPrivacidade />
      </body>
    </html>
  );
}

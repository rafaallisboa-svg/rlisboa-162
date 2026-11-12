import type { Metadata } from "next";
import { SEO, urlAbsoluta, urlDoSite } from "@/lib/seo";
import { slugServico } from "@/lib/servicos";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjetosDestaque } from "@/components/sections/ProjetosDestaque";
import { PerguntasFrequentes } from "@/components/sections/PerguntasFrequentes";

export const metadata: Metadata = {
  title: "Serviços de design: identidade visual, sites, apresentações e motion",
  description:
    "Identidade visual, sites, apresentações, social media kit, vídeo e motion graphics, eventos e materiais gráficos. Estúdio de design em Itapema, SC, com atendimento em todo o Brasil.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    url: "/servicos",
    images: [{ url: "/og/og-servicos.png", width: 1200, height: 630, alt: "Serviços do estúdio R. Lisboa: identidade visual, sites, apresentações, redes, vídeo e motion, eventos e materiais gráficos" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/og-servicos.png"] },
};

export default function ServicosLayout({ children }: { children: React.ReactNode }) {
  const lista = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Serviços de design do estúdio R. Lisboa",
    itemListElement: SEO.servicos.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.nome,
        description: s.descricao,
        url: urlAbsoluta(`/servicos#${slugServico(s.nome)}`),
        provider: { "@id": `${urlDoSite}/#estudio` },
        areaServed: "BR",
      },
    })),
  };
  return (
    <>
      <JsonLd dados={lista} />
      {children}
      {/* Os projetos entram depois da animação dos quadradinhos, no mesmo fundo amarelo. */}
      <ProjetosDestaque fundo="amarelo" />
      <PerguntasFrequentes />
    </>
  );
}

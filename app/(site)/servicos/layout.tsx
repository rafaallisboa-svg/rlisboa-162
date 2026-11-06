import type { Metadata } from "next";
import { SEO, urlAbsoluta, urlDoSite } from "@/lib/seo";
import { slugServico } from "@/lib/servicos";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Serviços de design: identidade visual, sites, apresentações e motion",
  description:
    "Identidade visual, sites, apresentações, social media kit, vídeo e motion graphics, eventos e materiais gráficos. Estúdio de design em Itapema, SC, com atendimento em todo o Brasil.",
  alternates: { canonical: "/servicos" },
  openGraph: { url: "/servicos" },
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
    </>
  );
}

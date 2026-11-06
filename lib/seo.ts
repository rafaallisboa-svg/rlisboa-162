import { site } from "@/site.config";
import { SITE_LIVE } from "@/lib/env";

/** Textos e dados usados por metadados, sitemap e dados estruturados. Uma fonte só. */
export const SEO = {
  tituloPadrao: "R. Lisboa — Estúdio 162 | Identidade visual, sites e motion",
  descricao:
    "Estúdio de design em Itapema, SC: identidade visual, sites, apresentações, redes sociais e motion graphics para marcas e eventos, com atendimento em todo o Brasil.",
  imagemOg: "/og/og-padrao.png",
  imagemOgAlt: "R. Lisboa — Estúdio 162, estúdio de design em Itapema, SC",
  palavrasChave: [
    "estúdio de design",
    "designer em Itapema",
    "identidade visual",
    "design de marca",
    "criação de logotipo",
    "criação de sites",
    "motion graphics",
    "design para eventos",
    "apresentações corporativas",
    "social media kit",
    "Itapema SC",
  ],
  servicos: [
    { nome: "Identidade Visual", descricao: "Logotipo, paleta, tipografia, manual e aplicações para marcas e eventos." },
    { nome: "Website", descricao: "Sites institucionais, portfólios, hotsites e landing pages de eventos." },
    { nome: "Apresentação", descricao: "Apresentações e pitch decks com narrativa visual e template mestre." },
    { nome: "Social Media Kit", descricao: "Posts, carrosséis, stories e capas de destaque para redes sociais." },
    { nome: "Vídeo & Motion Graphics", descricao: "Vídeos, animações e cenografia animada para painéis de LED." },
    { nome: "Eventos", descricao: "Identidade, cenografia, credenciamento e materiais para eventos." },
    { nome: "Materiais Gráficos", descricao: "Papelaria, impressos, anúncios e peças publicitárias." },
  ],
} as const;

export const urlDoSite = site.url.replace(/\/$/, "");

export function urlAbsoluta(caminho: string) {
  if (/^https?:\/\//.test(caminho)) return caminho;
  return `${urlDoSite}${caminho.startsWith("/") ? caminho : `/${caminho}`}`;
}

/** Robôs: só liberados quando NEXT_PUBLIC_SITE_LIVE=true (a mesma trava do robots.txt). */
export const robotsDoSite = SITE_LIVE
  ? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    }
  : { index: false, follow: false };

/** Dados estruturados do estúdio (JSON-LD). Endereço só até a cidade. */
export function grafoDoEstudio() {
  const id = `${urlDoSite}/#estudio`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${urlDoSite}/#site`,
        url: urlDoSite,
        name: site.nomeCompleto,
        inLanguage: "pt-BR",
        publisher: { "@id": id },
      },
      {
        "@type": ["ProfessionalService", "Organization"],
        "@id": id,
        name: site.nomeCompleto,
        alternateName: ["R. Lisboa", "Estúdio 162", "R. Lisboa Design"],
        url: urlDoSite,
        logo: urlAbsoluta("/idv/assinatura-horizontal-menor.svg"),
        image: urlAbsoluta(SEO.imagemOg),
        description: SEO.descricao,
        email: site.contato.email,
        telephone: site.contato.telefone,
        foundingDate: String(site.anoFundacao),
        founder: { "@id": `${urlDoSite}/#rafael-lisboa` },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.local.cidade,
          addressRegion: site.local.estado,
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.local.coordenadas.lat,
          longitude: site.local.coordenadas.lng,
        },
        areaServed: [
          { "@type": "Country", name: "Brasil" },
          ...site.local.atendimento.map((c) => ({ "@type": "City", name: c })),
        ],
        knowsAbout: [...SEO.palavrasChave],
        sameAs: site.redes.map((r) => r.url),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de design",
          itemListElement: SEO.servicos.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.nome,
              description: s.descricao,
              provider: { "@id": id },
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": `${urlDoSite}/#rafael-lisboa`,
        name: site.titular.nome,
        jobTitle: site.titular.cargo,
        url: `${urlDoSite}/sobre`,
        worksFor: { "@id": id },
        homeLocation: { "@type": "Place", name: `${site.local.cidade}, ${site.local.estado}` },
        sameAs: site.redes.map((r) => r.url),
      },
    ],
  };
}

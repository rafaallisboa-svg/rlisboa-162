import re

def edit(p, pairs):
    t = open(p, encoding='utf-8').read()
    for a, b in pairs:
        assert t.count(a) == 1, (p, a[:60])
        t = t.replace(a, b)
    open(p, 'w', encoding='utf-8').write(t)

edit('site.config.ts', [(
'''  descricao:
    "[[ TODO: 155 caracteres. Incluir 'identidade visual', 'construtoras' e 'Itapema'. ]]",''',
'''  descricao:
    "Estúdio de design em Itapema, SC: identidade visual, sites, apresentações, redes sociais e motion graphics para marcas e eventos, com atendimento em todo o Brasil.",''')])

edit('app/(site)/layout.tsx', [
('import { site } from "@/site.config";',
 'import { site } from "@/site.config";\nimport { SEO, grafoDoEstudio, robotsDoSite, urlDoSite } from "@/lib/seo";\nimport { JsonLd } from "@/components/seo/JsonLd";'),
('''export const metadata: Metadata = {
  title: site.nomeCompleto,
  description: site.descricao.startsWith("[[") ? undefined : site.descricao,
};''',
'''export const metadata: Metadata = {
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
};'''),
('      <body>\n        <SmoothScroll>',
 '      <body>\n        <JsonLd dados={grafoDoEstudio()} />\n        <SmoothScroll>'),
])

edit('app/(site)/page.tsx', [
('import { site } from "@/site.config";',
 'import type { Metadata } from "next";\nimport { site } from "@/site.config";\nimport { SEO } from "@/lib/seo";'),
('export default function HomePage() {',
'''export const metadata: Metadata = {
  title: { absolute: SEO.tituloPadrao },
  description: SEO.descricao,
  alternates: { canonical: "/" },
};

export default function HomePage() {'''),
('<h1 className="sr-only">{site.nomeCompleto}</h1>',
'''<h1 className="sr-only">
        {site.nomeCompleto}: estúdio de design em {site.local.cidade}, {site.local.estado}. Identidade
        visual, sites, apresentações, redes sociais e motion graphics.
      </h1>'''),
])

edit('app/(site)/sobre/page.tsx', [
('import { site } from "@/site.config";',
 'import type { Metadata } from "next";\nimport { site } from "@/site.config";'),
('export default function SobrePage() {',
'''export const metadata: Metadata = {
  title: "Sobre o estúdio e o designer Rafael Lisboa",
  description:
    "Rafael Lisboa é designer e diretor de criação, com mais de 15 anos de experiência em identidade visual, sites, apresentações e motion para marcas e eventos, em Itapema, SC.",
  alternates: { canonical: "/sobre" },
  openGraph: { url: "/sobre" },
};

export default function SobrePage() {'''),
])

edit('app/(site)/contato/page.tsx', [
('import { publicados } from "@/lib/placeholder";',
 'import type { Metadata } from "next";\nimport { publicados } from "@/lib/placeholder";'),
('export default function ContatoPage() {',
'''export const metadata: Metadata = {
  title: "Contato: fale com o estúdio de design em Itapema, SC",
  description:
    "Conta a ideia e o prazo do seu projeto de identidade visual, site, apresentação ou motion. Respondo por e-mail, WhatsApp, Instagram ou LinkedIn.",
  alternates: { canonical: "/contato" },
  openGraph: { url: "/contato" },
};

export default function ContatoPage() {'''),
])

edit('app/(site)/orcamento/page.tsx', [
('import { Suspense } from "react";',
 'import type { Metadata } from "next";\nimport { Suspense } from "react";'),
('export default function OrcamentoPage() {',
'''export const metadata: Metadata = {
  title: "Solicitar orçamento de design",
  description: "Conta sobre o projeto e receba o orçamento por e-mail.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/orcamento" },
};

export default function OrcamentoPage() {'''),
])

edit('app/(site)/projetos/page.tsx', [
('import Link from "next/link";',
 'import type { Metadata } from "next";\nimport Link from "next/link";'),
('export default function ProjetosPage() {',
'''export const metadata: Metadata = {
  title: "Projetos: cases de identidade visual, sites e motion",
  description:
    "Cases do estúdio: identidade visual, sites, eventos e motion graphics para marcas como Security Leaders, Inovativos e Priscila Andrade.",
  alternates: { canonical: "/projetos" },
  openGraph: { url: "/projetos" },
};

export default function ProjetosPage() {'''),
])

# robots
p = 'app/robots.ts'
t = open(p, encoding='utf-8').read()
t = t.replace('export default function robots', 'import { urlDoSite } from "@/lib/seo";\n\nexport default function robots', 1)
t = t.replace('    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,',
              '    sitemap: `${urlDoSite}/sitemap.xml`,\n    host: urlDoSite,')
t = t.replace('rules: { userAgent: "*", allow: "/" },',
              'rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/propostas/"] },')
open(p, 'w', encoding='utf-8').write(t)
print('ok')

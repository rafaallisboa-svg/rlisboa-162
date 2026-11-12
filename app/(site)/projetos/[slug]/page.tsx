import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjeto, categoriaCurta, getProjetos } from "@/lib/projetos";
import { Galeria } from "@/components/ui/Galeria";
import { CoberturaCase } from "@/components/ui/CoberturaCase";
import { EmbedAutoAltura } from "@/components/ui/EmbedAutoAltura";
import { real, isTodo, isPlaceholderImg } from "@/lib/placeholder";
import { SEO, urlAbsoluta, urlDoSite } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { OutrosProjetos } from "@/components/sections/OutrosProjetos";

function VisitarSite({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 border border-sinal px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-sinal transition-colors duration-200 hover:bg-sinal/10"
    >
      Visitar o site
      <span
        aria-hidden="true"
        className="inline-block text-base transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}

export function generateStaticParams() {
  return getProjetos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projeto = await getProjeto(slug);
  if (!projeto) return {};
  const f = projeto.frontmatter;
  const titulo = isTodo(f.titulo) ? "Projeto" : f.titulo;
  const sub = isTodo(f.subtitulo) ? "" : f.subtitulo;
  const resultado = f.resultado && !isTodo(f.resultado) ? ` ${f.resultado}` : "";
  const descricao =
    `${titulo}${sub ? `: ${sub}` : ""}. Case do estúdio R. Lisboa — Estúdio 162, em Itapema, SC.${resultado}`.slice(0, 200);
  const capa = f.thumb ?? f.capa;
  const imagem = capa && !isPlaceholderImg(capa) ? capa : SEO.imagemOg;
  return {
    title: sub ? `${titulo}: ${sub}` : titulo,
    description: descricao,
    alternates: { canonical: `/projetos/${slug}` },
    openGraph: {
      type: "article",
      url: `/projetos/${slug}`,
      title: `${titulo} | ${SEO.tituloPadrao.split(" | ")[0]}`,
      description: descricao,
      images: [{ url: imagem, alt: `${titulo}: ${sub}` }],
    },
    twitter: { card: "summary_large_image", title: titulo, description: descricao, images: [imagem] },
    ...(f.pendente ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function ProjetoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projeto = await getProjeto(slug);
  if (!projeto) notFound();

  const { frontmatter, contexto, direcao } = projeto;
  const publicados = getProjetos().filter((p) => !p.pendente || p.slug === slug);
  const indice = publicados.findIndex((p) => p.slug === slug);
  const proximo =
    publicados.length > 1
      ? publicados[(indice + 1) % publicados.length]
      : null;

  const tituloSeo = isTodo(frontmatter.titulo) ? "Projeto" : frontmatter.titulo;
  const capaSeo = frontmatter.thumb ?? frontmatter.capa;
  const dadosSeo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: tituloSeo,
        description: isTodo(frontmatter.subtitulo) ? undefined : frontmatter.subtitulo,
        url: urlAbsoluta(`/projetos/${slug}`),
        image: capaSeo && !isPlaceholderImg(capaSeo) ? urlAbsoluta(capaSeo) : undefined,
        dateCreated: String(frontmatter.ano),
        creator: { "@id": `${urlDoSite}/#estudio` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: urlDoSite },
          { "@type": "ListItem", position: 2, name: "Projetos", item: urlAbsoluta("/projetos") },
          { "@type": "ListItem", position: 3, name: tituloSeo, item: urlAbsoluta(`/projetos/${slug}`) },
        ],
      },
    ],
  };

  return (
    <article>
      <JsonLd dados={dadosSeo} />
      <Link
        href="/#projetos"
        aria-label="Voltar para projetos"
        className="group fixed right-6 top-24 z-50 flex h-10 w-10 items-center justify-center border border-cal/20 bg-concreto/80 text-cal backdrop-blur-sm transition-colors hover:border-sinal hover:text-sinal md:right-[clamp(1.5rem,5vw,6rem)]"
      >
        <span aria-hidden="true" className="font-mono text-base leading-none">
          ✕
        </span>
      </Link>

      {frontmatter.heroEmbed && frontmatter.heroAuto ? (
        // No celular o topo é baixo: desce a altura do menu fixo para o vídeo aparecer inteiro.
        <div className="pt-[65px] md:pt-0">
          <EmbedAutoAltura
            src={frontmatter.heroEmbed}
            title={`Hero — ${frontmatter.titulo}`}
            alturaInicial={700}
            className="block w-full border-0"
          />
        </div>
      ) : frontmatter.heroEmbed ? (
        <div className="relative h-[640px] w-full overflow-hidden bg-blueprint md:h-[760px]">
          <iframe
            src={frontmatter.heroEmbed}
            title={`Hero — ${frontmatter.titulo}`}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      ) : frontmatter.capaCompleta ? (
        <div className="w-full overflow-hidden bg-blueprint">
          <img
            src={frontmatter.capa}
            alt={frontmatter.titulo}
            className="block h-auto w-full"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-blueprint md:aspect-[21/9]">
          <img
            src={frontmatter.capa}
            alt={frontmatter.titulo}
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}

      <div className="grid gap-6 border-b border-white/10 px-6 py-10 font-mono text-xs uppercase tracking-[0.12em] text-maresia sm:grid-cols-2 md:grid-cols-4 md:px-[clamp(1.5rem,5vw,6rem)]">
        <div>
          <p className="text-cal">Cliente</p>
          <p className="mt-1 tracking-normal normal-case">{frontmatter.cliente ?? frontmatter.titulo}</p>
          {frontmatter.clienteDescricao && (
            <p className="mt-0.5 text-[0.7rem] leading-snug tracking-normal normal-case opacity-70">{frontmatter.clienteDescricao}</p>
          )}
        </div>
        <div>
          <p className="text-cal">Setor</p>
          <p className="mt-1 tracking-normal normal-case">{frontmatter.setor}</p>
        </div>
        <div>
          <p className="text-cal">Ano</p>
          <p className="mt-1 tabular-nums">{frontmatter.ano}</p>
        </div>
        <div>
          <p className="text-cal">Escopo</p>
          <p className="mt-1 tracking-normal normal-case">
            {frontmatter.escopo.join(", ")}
          </p>
        </div>
      </div>

      <div className="grid gap-x-16 gap-y-10 px-6 py-10 md:grid-cols-2 md:px-[clamp(1.5rem,5vw,6rem)]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
            {frontmatter.rotuloContexto ?? (direcao ? "Contexto" : "O projeto")}
          </p>
          <div className="prose-case">{contexto}</div>
        </div>
        {direcao && (
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
              {frontmatter.rotuloDirecao ?? "Direção"}
            </p>
            <div className="prose-case">{direcao}</div>
          </div>
        )}
      </div>

      {frontmatter.siteExterno && (
        <div className="px-6 pb-10 md:px-[clamp(1.5rem,5vw,6rem)]">
          <VisitarSite href={frontmatter.siteExterno} />
        </div>
      )}

      {frontmatter.galeria && frontmatter.galeria.length > 0 && (
        <div
          className={`px-6 md:px-[clamp(1.5rem,5vw,6rem)] ${
            frontmatter.galeriaFundo === "branco" ? "bg-white py-16" : "py-4"
          }`}
        >
          <p
            className={`font-mono text-xs uppercase tracking-[0.12em] ${
              frontmatter.galeriaFundo === "branco" ? "text-concreto/70" : "text-sinal"
            }`}
          >
            Aplicações
          </p>
          <Galeria imagens={frontmatter.galeria} claro={frontmatter.galeriaFundo === "branco"} />
        </div>
      )}

      {frontmatter.cobertura && <CoberturaCase cobertura={frontmatter.cobertura} />}

      {real(frontmatter.resultado) && (
        <div className="px-6 py-10 md:px-[clamp(1.5rem,5vw,6rem)]">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
            Resultado
          </p>
          <div className="prose-case">
            <p>{frontmatter.resultado}</p>
          </div>
        </div>
      )}

      {frontmatter.siteExterno && (
        <div className="px-6 py-10 md:px-[clamp(1.5rem,5vw,6rem)]">
          <VisitarSite href={frontmatter.siteExterno} />
        </div>
      )}

      {proximo && (
        <div className="border-t border-white/10 px-6 py-10 md:px-[clamp(1.5rem,5vw,6rem)]">
          <Link
            href={`/projetos/${proximo.slug}`}
            className="font-mono text-xs uppercase tracking-[0.12em] text-maresia transition-colors hover:text-sinal"
          >
            Próximo — {proximo.titulo} →
          </Link>
        </div>
      )}

      <OutrosProjetos
        projetos={getProjetos()
          .filter((p) => !p.pendente && p.slug !== slug)
          .map((p) => ({
            slug: p.slug,
            titulo: p.titulo,
            categoria: categoriaCurta(p),
            imagem: p.thumb ?? p.capa,
          }))}
      />
    </article>
  );
}

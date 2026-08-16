import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjeto, getProjetos } from "@/lib/projetos";
import { Galeria } from "@/components/ui/Galeria";
import { real } from "@/lib/placeholder";

export function generateStaticParams() {
  return getProjetos().map((p) => ({ slug: p.slug }));
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

  return (
    <article>
      <Link
        href="/#projetos"
        aria-label="Voltar para projetos"
        className="group fixed right-6 top-24 z-50 flex h-10 w-10 items-center justify-center border border-cal/20 bg-concreto/80 text-cal backdrop-blur-sm transition-colors hover:border-sinal hover:text-sinal md:right-[clamp(1.5rem,5vw,6rem)]"
      >
        <span aria-hidden="true" className="font-mono text-base leading-none">
          ✕
        </span>
      </Link>

      {frontmatter.heroEmbed ? (
        <div className="relative h-[640px] w-full overflow-hidden bg-blueprint md:h-[760px]">
          <iframe
            src={frontmatter.heroEmbed}
            title={`Hero — ${frontmatter.titulo}`}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-blueprint md:aspect-[21/9]">
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
          <p className="mt-1 tracking-normal normal-case">{frontmatter.titulo}</p>
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

      {frontmatter.siteExterno && (
        <div className="px-6 py-6 md:px-[clamp(1.5rem,5vw,6rem)]">
          <a
            href={frontmatter.siteExterno}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-sinal"
          >
            Ver site
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        </div>
      )}

      <div className="grid gap-x-16 gap-y-10 px-6 py-4 md:grid-cols-2 md:px-[clamp(1.5rem,5vw,6rem)]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
            Contexto
          </p>
          <div className="prose-case">{contexto}</div>
        </div>
        {direcao && (
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
              Direção
            </p>
            <div className="prose-case">{direcao}</div>
          </div>
        )}
      </div>

      {frontmatter.galeria && frontmatter.galeria.length > 0 && (
        <div className="px-6 py-4 md:px-[clamp(1.5rem,5vw,6rem)]">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
            Aplicações
          </p>
          <Galeria imagens={frontmatter.galeria} />
        </div>
      )}

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
    </article>
  );
}

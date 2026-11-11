import type { Metadata } from "next";
import Link from "next/link";
import { getProjetos } from "@/lib/projetos";
import { OutrosProjetos } from "@/components/sections/OutrosProjetos";
import { Cruz } from "@/components/ui/IdvElementos";
import { Anel404 } from "@/components/motion/Anel404";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NaoEncontrada() {
  return (
    <>
      <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-36 md:px-16 md:pt-44 lg:px-0">
        <Cruz className="absolute left-6 top-28 h-5 w-5 text-idv-grafite md:left-0" />
        <Cruz className="absolute right-6 top-28 h-5 w-5 text-idv-grafite md:right-0" />

        <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
          Erro<span className="text-idv-laranja">.</span>
        </p>

        <p
          aria-hidden="true"
          className="mt-4 flex items-center gap-[0.04em] font-mono text-[clamp(6rem,26vw,16rem)] font-medium leading-none tabular-nums text-cal"
        >
          <span>4</span>
          <Anel404 className="h-[0.78em] w-[0.78em] shrink-0" />
          <span>4</span>
        </p>

        <h1 className="mt-10 max-w-2xl font-display uppercase leading-none text-h2">
          Esse endereço não&nbsp;existe<span className="text-idv-laranja">.</span>
        </h1>
        <p className="mt-5 max-w-md text-body text-cal">
          O link pode estar quebrado ou a página mudou de lugar. Que tal começar
          de&nbsp;novo?
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center bg-sinal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sinal"
          >
            Voltar para a home
          </Link>
          <Link
            href="/#projetos"
            className="inline-flex items-center border border-cal/40 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-cal transition-colors hover:border-cal hover:bg-cal hover:text-concreto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cal"
          >
            Ver projetos
          </Link>
        </div>
      </div>

      <OutrosProjetos
        titulo="Talvez você procure"
        projetos={getProjetos()
          .filter((p) => !p.pendente)
          .map((p) => ({
            slug: p.slug,
            titulo: p.titulo,
            subtitulo: p.subtitulo,
            imagem: p.thumb ?? p.capa,
          }))}
      />
    </>
  );
}

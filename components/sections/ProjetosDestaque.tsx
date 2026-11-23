import Link from "next/link";
import { getProjetosDestaque } from "@/lib/projetos";
import { responsiva } from "@/lib/imagens";
import { Cruz } from "@/components/ui/IdvElementos";
/**
 * Pavimento 02 — projetos em destaque. Construído fora de ordem do
 * roadmap a pedido do Rafael, pra ele ver o conteúdo assim que entra.
 */
// Duas variações do mesmo bloco: sobre o fundo escuro (Home) e sobre o amarelo (página de Serviços).
const TEMAS = {
  escuro: {
    secao: "bg-concreto",
    cruz: "text-idv-grafite",
    rotulo: "text-maresia",
    nome: "text-idv-off",
    ano: "text-maresia group-hover:text-idv-off",
    sub: "text-maresia group-hover:text-idv-off",
  },
  amarelo: {
    secao: "bg-idv-amarelo text-idv-preto",
    cruz: "text-idv-preto/40",
    rotulo: "text-idv-preto/60",
    nome: "text-idv-preto",
    ano: "text-idv-preto/60 group-hover:text-idv-preto",
    sub: "text-idv-preto/60 group-hover:text-idv-preto",
  },
} as const;

export function ProjetosDestaque({ fundo = "escuro" }: { fundo?: keyof typeof TEMAS }) {
  const tema = TEMAS[fundo];
  const projetos = getProjetosDestaque();
  if (projetos.length === 0) return null;

  return (
    <section
      id="projetos"
      aria-label="Projetos em destaque"
      className={`relative ${tema.secao} px-6 py-20 md:px-[clamp(1.5rem,5vw,6rem)]`}
    >
      <Cruz className={`absolute right-6 top-8 h-5 w-5 ${tema.cruz} md:right-[clamp(1.5rem,5vw,6rem)]`} />
      <p className={`font-mono text-xs uppercase tracking-[0.12em] ${tema.rotulo}`}>
        Projetos<span className="text-idv-laranja">.</span>
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {projetos.map((p) => {
          // Desktop: 3 colunas, 2 linhas, todos os cards do mesmo tamanho.
          return (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            className="group block"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-md bg-blueprint">
              <img
                {...responsiva(p.thumb ?? p.capa)}
                sizes="(min-width: 768px) 30vw, 100vw"
                alt={p.titulo}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            {/* Legenda discreta: nome, descrição e ano numa linha só (no celular a descrição desce). */}
            <div className="mt-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 text-[0.8rem] leading-snug md:grid-cols-[1fr_1fr_auto]">
              <span className={`min-w-0 font-medium ${tema.nome}`}>{p.titulo}</span>
              <span className={`col-span-2 row-start-2 transition-colors md:col-span-1 md:row-start-auto ${tema.sub}`}>
                {p.subtitulo}
              </span>
              <span className={`col-start-2 row-start-1 font-mono tabular-nums transition-colors md:col-start-3 ${tema.ano}`}>
                {p.ano}
              </span>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}

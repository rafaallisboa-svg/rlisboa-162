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
    titulo: "text-idv-amarelo",
    caixa: "border-idv-amarelo [@media(hover:hover)]:group-hover:border-idv-off [@media(hover:hover)]:group-hover:text-idv-off",
    ano: "text-idv-amarelo group-hover:text-idv-off",
    sub: "text-idv-pedra group-hover:text-idv-off",
  },
  amarelo: {
    secao: "bg-idv-amarelo text-idv-preto",
    cruz: "text-idv-preto/40",
    rotulo: "text-idv-preto/60",
    titulo: "text-idv-preto",
    caixa: "border-idv-preto [@media(hover:hover)]:group-hover:bg-idv-preto [@media(hover:hover)]:group-hover:text-idv-amarelo",
    ano: "text-idv-preto",
    sub: "text-idv-preto/75 group-hover:text-idv-preto",
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

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {projetos.map((p, i) => {
          const ultimo = projetos.length - 1;
          const destaque = i === 0 || (i === ultimo && ultimo % 2 === 1);
          return (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            className={`group block ${destaque ? "md:col-span-2" : ""}`}
          >
            <div
              className={`-mx-6 overflow-hidden bg-blueprint md:mx-0 ${
                destaque ? "aspect-[3/2] md:aspect-[21/9]" : "aspect-[3/2]"
              }`}
            >
              <img
                {...responsiva(p.thumb ?? p.capa)}
                sizes={destaque ? "(min-width: 768px) 90vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
                alt={p.titulo}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <p className={`min-w-0 font-display text-[0.65rem] uppercase leading-[2.6] tracking-[0.16em] ${tema.titulo} md:text-xs md:leading-[2.6]`}>
                <span className={`border px-2 py-0.5 transition-colors duration-200 md:px-3 md:py-1 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] ${tema.caixa}`}>
                  {p.titulo}
                </span>
              </p>
              <span className={`shrink-0 pt-2 font-mono text-xs tabular-nums md:pt-3 transition-colors ${tema.ano}`}>{p.ano}</span>
            </div>
            <p className={`mt-2 text-sm font-medium transition-colors ${tema.sub}`}>
              {p.subtitulo}
            </p>
          </Link>
          );
        })}
      </div>
    </section>
  );
}

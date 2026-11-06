import Link from "next/link";
import { getProjetosDestaque } from "@/lib/projetos";
import { Cruz } from "@/components/ui/IdvElementos";

/**
 * Pavimento 02 — projetos em destaque. Construído fora de ordem do
 * roadmap a pedido do Rafael, pra ele ver o conteúdo assim que entra.
 */
export function ProjetosDestaque() {
  const projetos = getProjetosDestaque();
  if (projetos.length === 0) return null;

  return (
    <section
      id="projetos"
      aria-label="Projetos em destaque"
      className="relative bg-concreto px-6 py-20 md:px-[clamp(1.5rem,5vw,6rem)]"
    >
      <Cruz className="absolute right-6 top-8 h-5 w-5 text-idv-grafite md:right-[clamp(1.5rem,5vw,6rem)]" />
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Projetos em destaque<span className="text-idv-laranja">.</span>
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
                src={p.thumb ?? p.capa}
                alt={p.titulo}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <p className="min-w-0 font-display text-sm uppercase leading-[2.2] tracking-tight text-idv-preto md:text-xl md:leading-[2.1]">
                <span className="bg-idv-amarelo px-2 py-0.5 transition-colors md:px-3 md:py-1 duration-200 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] group-hover:bg-idv-off">
                  {p.titulo}
                </span>
              </p>
              <span className="shrink-0 pt-2 font-mono text-xs tabular-nums md:pt-3 text-idv-amarelo transition-colors group-hover:text-idv-off">{p.ano}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-idv-pedra transition-colors group-hover:text-idv-off">
              {p.subtitulo}
            </p>
          </Link>
          );
        })}
      </div>
    </section>
  );
}

import Link from "next/link";
import { getProjetosDestaque } from "@/lib/projetos";

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
      className="border-t border-white/10 bg-concreto px-6 py-20 md:px-[clamp(1.5rem,5vw,6rem)]"
    >
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Pav. 02 — Projetos em destaque
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {projetos.map((p) => (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            className="group block"
          >
            <div className="aspect-[3/2] overflow-hidden bg-blueprint">
              <img
                src={p.thumb ?? p.capa}
                alt={p.titulo}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <div>
                <p className="font-display text-xl uppercase tracking-tight">
                  {p.titulo}
                </p>
                <p className="mt-1 text-sm text-maresia">{p.subtitulo}</p>
              </div>
              <span className="shrink-0 font-mono text-xs tabular-nums text-maresia">
                {p.ano}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

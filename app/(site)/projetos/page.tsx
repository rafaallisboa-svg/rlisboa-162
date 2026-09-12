import Link from "next/link";
import { getProjetos } from "@/lib/projetos";
import { isTodo, todoClass } from "@/lib/placeholder";

export default function ProjetosPage() {
  const projetos = getProjetos();

  return (
    <div className="px-6 pb-20 pt-32 md:px-[clamp(1.5rem,5vw,6rem)]">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Projetos
      </p>
      <h1 className="mt-2 font-display uppercase leading-none text-h1">
        Índice
      </h1>

      <div className="mt-12 border-t border-white/10">
        {projetos.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            className="group flex items-center justify-between gap-6 border-b border-white/10 py-6"
          >
            <span className="font-mono text-xs tabular-nums text-maresia">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 font-display text-xl uppercase tracking-tight transition-colors group-hover:text-sinal md:text-2xl">
              {isTodo(p.titulo) ? (
                <span className={todoClass}>{p.titulo}</span>
              ) : (
                p.titulo
              )}
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.12em] text-maresia sm:block">
              {p.disciplinas.join(", ")}
            </span>
            {p.pendente && (
              <span className={todoClass}>pendente</span>
            )}
            <span className="font-mono text-xs tabular-nums text-maresia">
              {p.ano}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

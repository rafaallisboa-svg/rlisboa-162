"use client";

import Link from "next/link";
import { responsiva } from "@/lib/imagens";
import { useEffect, useState } from "react";

export type ProjetoCard = {
  slug: string;
  titulo: string;
  subtitulo: string;
  ano: string | number;
  imagem: string;
};

const QUANTIDADE = 3;

function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Fim da página de cada case: 3 outros projetos sorteados a cada visita.
 * O servidor entrega os 3 primeiros (sem flash vazio); o sorteio roda no
 * navegador, então cresce sozinho conforme novos projetos entram no site.
 */
export function OutrosProjetos({
  projetos,
  titulo = "Outros projetos",
}: {
  projetos: ProjetoCard[];
  titulo?: string;
}) {
  const [lista, setLista] = useState(() => projetos.slice(0, QUANTIDADE));

  useEffect(() => {
    setLista(embaralhar(projetos).slice(0, QUANTIDADE));
  }, [projetos]);

  if (lista.length === 0) return null;

  return (
    <section
      aria-label={titulo}
      className="border-t border-white/10 py-16 md:py-20"
    >
      <p className="px-6 font-mono text-xs uppercase tracking-[0.12em] text-maresia md:px-[clamp(1.5rem,5vw,6rem)]">
        {titulo}<span className="text-idv-laranja">.</span>
      </p>

      <div className="mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-[clamp(1.5rem,5vw,6rem)] [&::-webkit-scrollbar]:hidden">
        {lista.map((p) => (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            className="group block w-[78%] shrink-0 snap-start md:w-auto"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-md bg-blueprint">
              <img
                {...responsiva(p.imagem)}
                sizes="(min-width: 768px) 30vw, 78vw"
                alt={p.titulo}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <p className="min-w-0 font-display text-[0.65rem] uppercase leading-[2.6] tracking-[0.16em] text-idv-amarelo md:text-xs md:leading-[2.6]">
                <span className="border border-idv-amarelo px-2 py-0.5 transition-colors duration-200 md:px-3 md:py-1 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] [@media(hover:hover)]:group-hover:border-idv-off [@media(hover:hover)]:group-hover:text-idv-off">
                  {p.titulo}
                </span>
              </p>
              <span className="shrink-0 pt-2 font-mono text-xs tabular-nums text-idv-amarelo transition-colors group-hover:text-idv-off md:pt-3">
                {p.ano}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-idv-pedra transition-colors group-hover:text-idv-off">
              {p.subtitulo}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type ProjetoCard = {
  slug: string;
  titulo: string;
  subtitulo: string;
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

      <div className="mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-[clamp(1.5rem,5vw,6rem)] [&::-webkit-scrollbar]:hidden">
        {lista.map((p) => (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            className="group block w-[78%] shrink-0 snap-start md:w-auto"
          >
            <div className="aspect-square overflow-hidden bg-blueprint">
              <img
                src={p.imagem}
                alt={p.titulo}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-5 font-display text-sm uppercase tracking-[0.04em] text-cal transition-colors group-hover:text-idv-amarelo md:text-base">
              {p.titulo}
            </p>
            <p className="mt-1.5 text-sm font-medium text-idv-pedra">
              {p.subtitulo}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

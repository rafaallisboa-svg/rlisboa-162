"use client";

import Link from "next/link";
import { responsiva } from "@/lib/imagens";
import { useEffect, useState } from "react";

export type ProjetoCard = {
  slug: string;
  titulo: string;
  /** Categoria curta do trabalho: "Website", "Identidade visual"… */
  categoria: string;
  imagem: string;
  /** Endereço do site do cliente: o card ganha a barra de navegador com o domínio. */
  site?: string | null;
};

const dominio = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

// Mesmas cores dos cartões de serviço. A cor vai pela posição (1º, 2º, 3º),
// não pelo projeto: off-white e pedra se alternam.
const CORES = ["bg-idv-off", "bg-idv-pedra"] as const;

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
        {lista.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projetos/${p.slug}`}
            className={`group flex w-[78%] shrink-0 snap-start flex-col p-2 text-idv-preto transition-transform duration-300 hover:-translate-y-1 md:w-auto md:p-2.5 ${p.site ? "rounded-[8px] !pt-0" : "rounded-[3px]"} ${CORES[i % CORES.length]}`}
          >
            {p.site && (
              // Card de website: barra de navegador com o domínio real do cliente.
              <div className="flex h-[34px] items-center gap-2.5 px-1" aria-hidden="true">
                <span className="flex gap-[5px]">
                  <i className="size-2 rounded-full bg-idv-preto/20 transition-colors duration-300 group-hover:bg-idv-laranja" />
                  <i className="size-2 rounded-full bg-idv-preto/20 transition-colors duration-300 group-hover:bg-idv-amarelo" />
                  <i className="size-2 rounded-full bg-idv-preto/20" />
                </span>
                <span className="mr-6 flex h-5 min-w-0 flex-1 items-center justify-center truncate rounded-full bg-idv-preto/[0.07] px-2.5 font-mono text-[10px] tracking-[0.02em] text-idv-preto/60">
                  {dominio(p.site)}
                </span>
              </div>
            )}
            <div className="aspect-[3/2] overflow-hidden rounded-[2px] bg-blueprint">
              <img
                {...responsiva(p.imagem)}
                sizes="(min-width: 768px) 30vw, 78vw"
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center px-3 pb-4 pt-5 text-center md:pb-5 md:pt-6">
              <p className="text-balance font-display text-sm uppercase leading-tight tracking-[0.04em] md:text-base">
                {p.titulo}
              </p>
              <p className="mt-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] opacity-70">
                {p.categoria}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

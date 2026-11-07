"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { slugServico } from "@/lib/servicos";
import { ESPACOS, INDICE_DESTAQUE, SERVICOS, TILES } from "./dados";
import { Adorno, CartaoFechadoConteudo } from "./CartaoFechado";

// Home, só no celular: cópia da grade da página de Serviços (mesmos dados, mesmos cartões, mesmas animações),
// sem abrir/expandir: tocar num cartão leva à página de Serviços já com aquele serviço aberto. Qualquer mudança em ./dados ou em ./CartaoFechado aparece nas duas telas.
export function ServicosHomeCelular() {
  const [destaque, setDestaque] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setDestaque((d) => (d + 1) % SERVICOS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section aria-label="Serviços" className="relative bg-idv-amarelo px-6 pb-16 pt-24 text-idv-preto md:hidden">
      <ul className="grid grid-flow-dense grid-cols-2 gap-3">
        {SERVICOS.map((s, i) => {
          const c = TILES[i % TILES.length];
          const destaqueTile = i === INDICE_DESTAQUE;
          return (
            <li
              key={s.nome}
              className={`group/row relative isolate flex flex-col rounded-[3px] ${ESPACOS[i % ESPACOS.length]} ${c.bg} ${c.fg}`}
            >
              <Adorno i={i} />
              <Link
                href={`/servicos#${slugServico(s.nome)}`}
                aria-label={`${s.nome}: ver na página de serviços`}
                className={`relative z-10 flex min-h-[17rem] flex-1 flex-col justify-between gap-3 p-4 ${
                  destaqueTile ? "min-h-[24rem]" : ""
                }`}
              >
                <CartaoFechadoConteudo i={i} piscando={destaque === i} />
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/servicos"
        className="mt-8 inline-flex items-center gap-3 bg-idv-preto py-2 pl-6 pr-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-off"
      >
        Ver o que está incluído
        <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center bg-idv-amarelo text-base text-idv-preto">
          →
        </span>
      </Link>
    </section>
  );
}

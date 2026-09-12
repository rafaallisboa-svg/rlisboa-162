"use client";

import { useDirecao } from "./DirecaoContext";
import { DIRECOES } from "./direcoes";
import { CONTAINER, ACENTO, TINTA_SUAVE, LINHA } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

const SECOES = [
  { titulo: "Hero", descricao: "Posicionamento + CTA" },
  { titulo: "O momento de virada", descricao: "A dor: sucesso que virou complexidade" },
  {
    titulo: "Como atuamos",
    descricao: "3 pilares: copiloto estratégico / governança prática / sustentabilidade aplicada",
  },
  { titulo: "Para quem é", descricao: "Perfil de PME ideal" },
  { titulo: "Sobre a Sandra", descricao: "Trajetória e autoridade" },
  { titulo: "Prova social", descricao: "Espaço reservado para depoimentos/logos" },
  { titulo: "CTA final", descricao: "Agendar conversa estratégica" },
  { titulo: "Rodapé", descricao: "Contato, LinkedIn, localização" },
];

export function EstruturaPreview() {
  const { direcao } = useDirecao();
  const atual = DIRECOES[direcao];
  const a = DIRECOES.a;

  return (
    <section className="textura-branca relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative`}>
        <GhostNumber numero="05" />
        <SectionLabel numero="05" categoria="Estrutura proposta" />
        <h2
          className="relative mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Como a landing page se organiza
        </h2>
        <p className="relative mt-4 text-base" style={{ color: TINTA_SUAVE }}>
          Prévia na {atual.nome} — {atual.subnome}.
        </p>

        <ol className="relative mt-12 flex flex-col">
          {SECOES.map((secao, i) => (
            <li
              key={secao.titulo}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t py-6 last:border-b md:grid-cols-[3rem_16rem_1fr]"
              style={{ borderColor: LINHA }}
            >
              <span className="font-mono text-sm tabular-nums" style={{ color: ACENTO }}>
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <p className="text-xl font-semibold" style={{ fontFamily: a.fontTitulo }}>
                {secao.titulo}
              </p>
              <p className="text-base md:text-right" style={{ color: TINTA_SUAVE }}>
                {secao.descricao}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

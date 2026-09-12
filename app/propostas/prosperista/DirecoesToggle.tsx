"use client";

import { useDirecao } from "./DirecaoContext";
import { DIRECOES, type DirecaoId } from "./direcoes";
import { CONTAINER, TINTA_SUAVE } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

export function DirecoesToggle() {
  const { direcao, setDirecao } = useDirecao();
  const atual = DIRECOES[direcao];
  const a = DIRECOES.a;

  return (
    <section className="textura-branca relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative`}>
        <GhostNumber numero="06" />
        <SectionLabel numero="06" categoria="Direções criativas" />
        <h2
          className="relative mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Quatro direções para comparar
        </h2>

        <div
          role="group"
          aria-label="Alternar entre as direções criativas"
          className="relative mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-1"
        >
          {(Object.keys(DIRECOES) as DirecaoId[]).map((id) => {
            const d = DIRECOES[id];
            const ativo = id === direcao;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={ativo}
                onClick={() => setDirecao(id)}
                className="shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-medium transition-colors md:px-5 md:text-sm"
                style={{
                  backgroundColor: ativo ? "#221F1D" : "transparent",
                  color: ativo ? "#F3EFE6" : "#221F1D",
                  borderColor: ativo ? "#221F1D" : "rgba(34,31,29,0.2)",
                }}
              >
                {d.nome} — {d.subnome}
              </button>
            );
          })}
        </div>

        <p className="relative mt-4 max-w-xl text-base" style={{ color: TINTA_SUAVE }}>
          Clique pra comparar como cor, fonte e atmosfera mudam completamente
          entre as duas direções.
        </p>

        {/* Paleta — retângulos verticais grandes, do jeito pedido: dá pra
            avaliar a cor de verdade, não um chip minúsculo. */}
        <div className="relative mt-6 flex gap-3 md:gap-4">
          {[
            { rotulo: "Fundo", hex: atual.fundo },
            { rotulo: "Texto", hex: atual.texto },
            { rotulo: "Âncora", hex: atual.ancora },
            { rotulo: "Apoio", hex: atual.apoio },
          ].map((chip) => (
            <div key={chip.rotulo} className="flex flex-1 flex-col gap-2">
              <div
                className="h-28 w-full border border-black/10 transition-colors duration-500 md:h-40"
                style={{ backgroundColor: chip.hex }}
                aria-hidden="true"
              />
              <div className="text-xs opacity-70">{chip.rotulo}</div>
              <div className="font-mono text-xs uppercase opacity-90">{chip.hex}</div>
            </div>
          ))}
        </div>

        {/* Kit de aplicação — várias peças isoladas (não uma única tela),
            pra dar noção de possibilidades: botões, cor sólida, gradiente,
            tipografia, etiqueta. */}
        <div className="relative mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div
            className="flex aspect-square flex-col items-center justify-center gap-2 border border-black/10 p-4 transition-colors duration-500"
            style={{ backgroundColor: atual.fundo }}
          >
            <button
              type="button"
              tabIndex={-1}
              className="pointer-events-none px-5 py-2.5 text-sm font-medium transition-colors duration-500"
              style={{ backgroundColor: atual.ancora, color: atual.texto }}
            >
              Agendar conversa
            </button>
            <span className="text-[0.65rem] uppercase tracking-wide opacity-50" style={{ color: atual.texto }}>
              Botão primário
            </span>
          </div>

          <div
            className="flex aspect-square flex-col items-center justify-center gap-2 border border-black/10 p-4 transition-colors duration-500"
            style={{ backgroundColor: atual.fundo }}
          >
            <button
              type="button"
              tabIndex={-1}
              className="pointer-events-none border px-5 py-2.5 text-sm font-medium transition-colors duration-500"
              style={{ borderColor: atual.texto, color: atual.texto }}
            >
              Ver serviços
            </button>
            <span className="text-[0.65rem] uppercase tracking-wide opacity-50" style={{ color: atual.texto }}>
              Botão secundário
            </span>
          </div>

          <div
            className="flex aspect-square flex-col items-center justify-center gap-2 border border-black/10 p-4 transition-colors duration-500"
            style={{ backgroundColor: atual.fundo }}
          >
            <span
              className="pointer-events-none text-sm font-medium underline underline-offset-4 transition-colors duration-500"
              style={{ color: atual.ancora }}
            >
              Saiba mais →
            </span>
            <span className="text-[0.65rem] uppercase tracking-wide opacity-50" style={{ color: atual.texto }}>
              Link / ação leve
            </span>
          </div>

          <div
            className="flex aspect-square flex-col items-center justify-center gap-2 border border-black/10 p-4 transition-colors duration-500"
            style={{ backgroundColor: atual.fundo }}
          >
            <span
              className="pointer-events-none inline-block px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-500"
              style={{ backgroundColor: atual.apoio, color: atual.fundo }}
            >
              Copiloto estratégico
            </span>
            <span className="text-[0.65rem] uppercase tracking-wide opacity-50" style={{ color: atual.texto }}>
              Etiqueta / tag
            </span>
          </div>

          <div
            className="flex aspect-square flex-col items-center justify-center border border-black/10 transition-colors duration-500"
            style={{ backgroundColor: atual.ancora }}
          >
            <span className="text-[0.65rem] uppercase tracking-wide opacity-70" style={{ color: atual.texto }}>
              Cor sólida
            </span>
          </div>

          <div
            className="flex aspect-square flex-col items-center justify-center border border-black/10 transition-colors duration-500"
            style={{ backgroundImage: `linear-gradient(135deg, ${atual.ancora}, ${atual.apoio})` }}
          >
            <span className="text-[0.65rem] uppercase tracking-wide opacity-70" style={{ color: atual.fundo }}>
              Gradiente
            </span>
          </div>

          <div
            className="flex aspect-square flex-col items-center justify-center gap-1 border border-black/10 p-4 transition-colors duration-500"
            style={{ backgroundColor: atual.fundo }}
          >
            <span
              className="text-2xl font-semibold leading-none transition-all duration-500"
              style={{ fontFamily: atual.fontTitulo, color: atual.texto }}
            >
              Aa
            </span>
            <span className="text-[0.65rem] uppercase tracking-wide opacity-50" style={{ color: atual.texto }}>
              {atual.fontTituloNome}
            </span>
          </div>

          <div
            className="flex aspect-square flex-col items-center justify-center gap-1 border border-black/10 p-4 transition-colors duration-500"
            style={{ backgroundColor: atual.fundo }}
          >
            <span
              className="text-2xl leading-none transition-all duration-500"
              style={{ fontFamily: atual.fontTexto, color: atual.texto }}
            >
              Aa
            </span>
            <span className="text-[0.65rem] uppercase tracking-wide opacity-50" style={{ color: atual.texto }}>
              {atual.fontTextoNome}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { AbstractShape } from "./AbstractShape";
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
        <GhostNumber numero="04" />
        <SectionLabel numero="04" categoria="Direções criativas" />
        <h2
          className="relative mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Quatro direções para comparar
        </h2>

        <div
          role="group"
          aria-label="Alternar entre as direções criativas"
          className="relative mt-8 flex flex-wrap gap-2.5"
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
                className="rounded-full border px-6 py-3 text-sm font-medium transition-colors"
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

        <p className="relative mt-6 max-w-xl text-base" style={{ color: TINTA_SUAVE }}>
          Clique pra comparar como cor, fonte e atmosfera mudam completamente
          entre as duas direções.
        </p>

        <div className="relative mt-10 overflow-hidden rounded-2xl">
          <div
            className="px-8 py-12 transition-colors duration-500 md:px-14 md:py-16"
            style={{ backgroundColor: atual.ancora, color: atual.texto }}
          >
            <h3
              className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] transition-all duration-500"
              style={{ fontFamily: atual.fontTitulo }}
            >
              Governança que preserva a essência
            </h3>
            <p
              className="mt-6 max-w-md text-lg leading-relaxed opacity-90 transition-all duration-500"
              style={{ fontFamily: atual.fontTexto }}
            >
              A Prosperista atua como copiloto estratégico — o empresário
              permanece no comando, enquanto a gestão ganha estrutura e
              sustentabilidade, sem fórmulas prontas.
            </p>
          </div>

          <div
            className="grid gap-10 p-8 transition-colors duration-500 md:grid-cols-[1.2fr_1fr] md:p-14"
            style={{ backgroundColor: atual.fundo, color: atual.texto }}
          >
            <div>
              <p className="text-base italic opacity-70">{atual.tom}</p>

              <div className="mt-8 flex gap-1.5">
                {[
                  { rotulo: "Fundo", hex: atual.fundo },
                  { rotulo: "Texto", hex: atual.texto },
                  { rotulo: "Âncora", hex: atual.ancora },
                  { rotulo: "Apoio", hex: atual.apoio },
                ].map((chip) => (
                  <div key={chip.rotulo} className="flex flex-1 flex-col gap-2">
                    <div
                      className="h-24 w-full border md:h-28"
                      style={{ backgroundColor: chip.hex, borderColor: `${atual.texto}22` }}
                      aria-hidden="true"
                    />
                    <div className="text-[0.65rem] leading-tight opacity-70">{chip.rotulo}</div>
                    <div className="font-mono text-[0.65rem] uppercase leading-tight opacity-90">
                      {chip.hex}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.12em] opacity-60">
                {atual.fontTituloNome} + {atual.fontTextoNome}
              </p>
            </div>

            <div
              className="relative aspect-square w-full overflow-hidden border"
              style={{ borderColor: `${atual.texto}22` }}
            >
              <AbstractShape
                corFundo={atual.fundo}
                corAncora={atual.ancora}
                corApoio={atual.apoio}
                corTexto={atual.texto}
                className="h-full w-full transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

        {/* Mockup de interface — não é só cor em bloco, é a paleta
            funcionando como site de verdade: nav, botão primário, botão
            secundário, tag. É pra dar noção de comportamento, não só de
            hex. */}
        <div
          className="relative mt-10 overflow-hidden rounded-2xl border transition-colors duration-500"
          style={{ backgroundColor: atual.fundo, borderColor: `${atual.texto}1a` }}
        >
          <div
            className="flex items-center justify-between border-b px-6 py-4 transition-colors duration-500 md:px-10"
            style={{ borderColor: `${atual.texto}1a`, color: atual.texto }}
          >
            <span
              className="text-lg font-bold uppercase leading-none"
              style={{ fontFamily: atual.fontTitulo }}
            >
              Prosperista
            </span>
            <div className="hidden items-center gap-6 text-sm opacity-80 sm:flex" style={{ fontFamily: atual.fontTexto }}>
              <span>Sobre</span>
              <span>Serviços</span>
              <span>Contato</span>
            </div>
            <button
              type="button"
              tabIndex={-1}
              className="pointer-events-none px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-500"
              style={{ backgroundColor: atual.ancora, color: atual.fundo }}
            >
              Agendar
            </button>
          </div>

          <div className="px-6 py-14 text-center transition-colors duration-500 md:px-10 md:py-20" style={{ color: atual.texto }}>
            <span
              className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-500"
              style={{ backgroundColor: atual.apoio, color: atual.fundo }}
            >
              Copiloto estratégico
            </span>
            <h3
              className="mx-auto mt-6 max-w-lg text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.1] transition-all duration-500"
              style={{ fontFamily: atual.fontTitulo }}
            >
              Governança que preserva a essência
            </h3>
            <p
              className="mx-auto mt-5 max-w-md text-base leading-relaxed opacity-80 transition-all duration-500"
              style={{ fontFamily: atual.fontTexto }}
            >
              A Prosperista atua como copiloto estratégico — o empresário
              permanece no comando, enquanto a gestão ganha estrutura e
              sustentabilidade, sem fórmulas prontas.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                tabIndex={-1}
                className="pointer-events-none px-6 py-3 text-sm font-medium transition-colors duration-500"
                style={{ backgroundColor: atual.ancora, color: atual.fundo }}
              >
                Agendar conversa
              </button>
              <button
                type="button"
                tabIndex={-1}
                className="pointer-events-none border px-6 py-3 text-sm font-medium transition-colors duration-500"
                style={{ borderColor: atual.texto, color: atual.texto }}
              >
                Ver serviços
              </button>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-2.5 border-t px-6 py-5 transition-colors duration-500 md:px-10"
            style={{ borderColor: `${atual.texto}1a` }}
          >
            {[
              { rotulo: "Fundo", hex: atual.fundo },
              { rotulo: "Texto", hex: atual.texto },
              { rotulo: "Âncora", hex: atual.ancora },
              { rotulo: "Apoio", hex: atual.apoio },
            ].map((chip) => (
              <div
                key={chip.rotulo}
                className="flex items-center gap-2 border px-2.5 py-1.5 text-xs transition-colors duration-500"
                style={{ borderColor: `${atual.texto}22`, color: atual.texto }}
              >
                <span
                  className="h-3 w-3 shrink-0 border"
                  style={{ backgroundColor: chip.hex, borderColor: `${atual.texto}33` }}
                  aria-hidden="true"
                />
                <span className="opacity-70">{chip.rotulo}</span>
                <span className="font-mono uppercase opacity-90">{chip.hex}</span>
              </div>
            ))}
            <div
              className="ml-auto font-mono text-xs uppercase tracking-[0.1em] opacity-60"
              style={{ color: atual.texto }}
            >
              {atual.fontTituloNome} + {atual.fontTextoNome}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

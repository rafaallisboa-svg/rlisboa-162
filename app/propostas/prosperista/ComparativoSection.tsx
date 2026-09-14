import { DIRECOES } from "./direcoes";
import { CONTAINER, ACENTO, TINTA_SUAVE, LINHA } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

const CORES_CONVENCIONAL = ["#1B2A4A", "#2C3E5C", "#0F1F3D"];
const CORES_AUTORAIS = [DIRECOES.a.ancora, DIRECOES.b.ancora, DIRECOES.c.ancora, DIRECOES.d.ancora];

export function ComparativoSection() {
  const a = DIRECOES.a;
  return (
    <section className="textura-branca relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative`}>
        <GhostNumber numero="05" />
        <SectionLabel numero="05" categoria="Dois caminhos" />
        <h2
          className="relative mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Convencional ou autoral — qual caminho faz mais sentido?
        </h2>
        <p className="relative mt-4 max-w-xl text-base leading-relaxed" style={{ color: TINTA_SUAVE }}>
          A maioria das consultorias segue um mesmo padrão visual — seguro
          e testado. Existe também um caminho mais autoral, com mais
          personalidade. Colocamos os dois lado a lado pra você decidir
          qual direção a Prosperista deve seguir nas quatro opções a
          seguir.
        </p>

        <div className="relative mt-12">
          <div
            className="grid grid-cols-[1fr] gap-3 border-b pb-4 md:grid-cols-[8rem_1fr_1fr] md:gap-8"
            style={{ borderColor: LINHA }}
          >
            <span className="hidden text-xs uppercase tracking-[0.1em] opacity-50 md:block">
              &nbsp;
            </span>
            <span className="text-xs uppercase tracking-[0.1em]" style={{ color: TINTA_SUAVE }}>
              Caminho convencional
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: ACENTO }}>
              Caminho autoral
            </span>
          </div>

          {/* Cores — amostra real, não só o nome da cor. */}
          <div
            className="grid grid-cols-1 gap-3 border-b py-6 md:grid-cols-[8rem_1fr_1fr] md:gap-8"
            style={{ borderColor: LINHA }}
          >
            <p className="text-lg font-semibold" style={{ fontFamily: a.fontTitulo }}>
              Cores
            </p>
            <div>
              <div className="flex gap-2">
                {CORES_CONVENCIONAL.map((hex) => (
                  <span key={hex} className="h-10 w-10 border border-black/10" style={{ backgroundColor: hex }} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed opacity-60 md:text-base" style={{ color: "#221F1D" }}>
                Azul-marinho — o tom mais comum entre consultorias, seguro e reconhecível.
              </p>
            </div>
            <div>
              <div className="flex gap-2">
                {CORES_AUTORAIS.map((hex) => (
                  <span key={hex} className="h-10 w-10 border border-black/10" style={{ backgroundColor: hex }} />
                ))}
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed md:text-base" style={{ color: "#221F1D" }}>
                Paleta autoral com âncora própria: petróleo, terracota, ardósia ou índigo — mais distintiva.
              </p>
            </div>
          </div>

          {/* Tipografia — amostra viva, não descrição. */}
          <div
            className="grid grid-cols-1 gap-3 border-b py-6 md:grid-cols-[8rem_1fr_1fr] md:gap-8"
            style={{ borderColor: LINHA }}
          >
            <p className="text-lg font-semibold" style={{ fontFamily: a.fontTitulo }}>
              Tipografia
            </p>
            <div>
              <p className="text-3xl" style={{ fontFamily: "var(--font-inter)" }}>
                Prosperista
              </p>
              <p className="mt-3 text-sm leading-relaxed opacity-60 md:text-base" style={{ color: "#221F1D" }}>
                Sans neutra — discreta, funciona bem em qualquer contexto, mas não marca posição.
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>
                Prosperista
              </p>
              <p className="mt-3 text-sm font-medium leading-relaxed md:text-base" style={{ color: "#221F1D" }}>
                Serifa de peso (Fraunces ou Newsreader) + sans de apoio — tem ponto de vista.
              </p>
            </div>
          </div>

          {/* Imagens */}
          <div
            className="grid grid-cols-1 gap-3 border-b py-6 md:grid-cols-[8rem_1fr_1fr] md:gap-8"
            style={{ borderColor: LINHA }}
          >
            <p className="text-lg font-semibold" style={{ fontFamily: a.fontTitulo }}>
              Imagens
            </p>
            <p className="text-sm leading-relaxed opacity-60 md:text-base" style={{ color: "#221F1D" }}>
              Aperto de mão, gráfico subindo, escritório de vidro — linguagem já conhecida do setor.
            </p>
            <p className="text-sm font-medium leading-relaxed md:text-base" style={{ color: "#221F1D" }}>
              Fotografia de aplicação real e texturas próprias — como no moodboard, mais específico da marca.
            </p>
          </div>

          {/* Grafismos */}
          <div
            className="grid grid-cols-1 gap-3 border-b py-6 md:grid-cols-[8rem_1fr_1fr] md:gap-8"
            style={{ borderColor: LINHA }}
          >
            <p className="text-lg font-semibold" style={{ fontFamily: a.fontTitulo }}>
              Grafismos
            </p>
            <div>
              <div className="flex h-20 w-32 items-center justify-center gap-2 border border-black/10 text-2xl opacity-50">
                <span>↗</span>
                <span>⚙</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed opacity-60 md:text-base" style={{ color: "#221F1D" }}>
                Setas, engrenagens, ícones típicos de apresentação de consultoria.
              </p>
            </div>
            <div>
              <div className="flex h-20 w-32 flex-col justify-between border border-black/10 p-3">
                <span className="font-mono text-xs" style={{ color: ACENTO }}>
                  05.
                </span>
                <span className="ml-auto h-8 w-8 border" style={{ borderColor: ACENTO }} />
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed md:text-base" style={{ color: "#221F1D" }}>
                Espaço negativo generoso, grids expostos, numeração editorial — como nesta própria proposta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

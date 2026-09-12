import { DIRECOES } from "./direcoes";
import { CONTAINER, ACENTO, TINTA_SUAVE, LINHA } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

const LINHAS = [
  {
    tema: "Cores",
    convencional: "Azul-marinho corporativo — o tom mais comum entre consultorias, seguro e reconhecível.",
    autoral: "Paleta autoral com âncora própria: petróleo, terracota, ardósia ou índigo — mais distintiva.",
  },
  {
    tema: "Tipografia",
    convencional: "Fonte sem serifa neutra — discreta, funciona bem em qualquer contexto.",
    autoral: "Contraste editorial: serifa de peso (Fraunces ou Newsreader) + sans de apoio — mais autoral.",
  },
  {
    tema: "Imagens",
    convencional: "Aperto de mão, gráfico subindo, escritório de vidro — linguagem já conhecida do setor.",
    autoral: "Fotografia de aplicação real e texturas próprias — como no moodboard, mais específico da marca.",
  },
  {
    tema: "Grafismos",
    convencional: "Setas, engrenagens, ícones típicos de apresentação de consultoria.",
    autoral: "Espaço negativo generoso, grids expostos, numeração editorial — como nesta própria proposta.",
  },
];

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

          {LINHAS.map((linha) => (
            <div
              key={linha.tema}
              className="grid grid-cols-1 gap-3 border-b py-6 md:grid-cols-[8rem_1fr_1fr] md:gap-8"
              style={{ borderColor: LINHA }}
            >
              <p className="text-lg font-semibold" style={{ fontFamily: a.fontTitulo }}>
                {linha.tema}
              </p>
              <p className="text-sm leading-relaxed opacity-60 md:text-base" style={{ color: "#221F1D" }}>
                {linha.convencional}
              </p>
              <p className="text-sm font-medium leading-relaxed md:text-base" style={{ color: "#221F1D" }}>
                {linha.autoral}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

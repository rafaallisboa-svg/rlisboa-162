import { DIRECOES } from "./direcoes";
import { CONTAINER, ACENTO, TINTA_SUAVE, TINTA_FRACA, LINHA } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

const FASES = [
  {
    numero: "01",
    nome: "Descoberta",
    descricao: "Levantamento de informações + análise e pesquisa semântica.",
    detalhes: [
      "Briefing e análise",
      "Estudo de concorrentes",
      "Estudo de segmento",
      "Painel de referências",
      "Pesquisa semântica",
    ],
  },
  {
    numero: "02",
    nome: "Conceito",
    descricao: "Definição de personalidade, símbolo, cores e tipografia.",
    detalhes: [
      "Personalidade e arquétipo",
      "Busca por símbolos e significados",
      "Rascunhos",
      "Desenho tipográfico",
    ],
  },
  {
    numero: "03",
    nome: "Construção",
    descricao: "Elementos gráficos + aplicação (landing page e materiais).",
    detalhes: [
      "Vetorização",
      "Definição de cores",
      "Texturas e elementos gráficos",
      "Tipografia de apoio",
      "Versões e aplicações",
    ],
  },
  {
    numero: "04",
    nome: "Entrega",
    descricao: "Apresentação, ajustes e entrega final.",
    detalhes: ["Mockups", "Apresentação", "Ajustes", "Entrega final"],
  },
];

const FASE_ATUAL_INDEX = 0;

const MAPA_SEMANTICO = [
  { chave: "Copiloto", sinonimos: ["orientação", "acompanhamento", "parceria", "apoio contínuo"] },
  { chave: "Governança", sinonimos: ["estrutura", "clareza", "disciplina", "solidez"] },
  {
    chave: "Sustentabilidade aplicada",
    sinonimos: ["continuidade", "consistência", "maturidade", "raiz"],
  },
];

export function ProcessoTimeline() {
  const a = DIRECOES.a;
  return (
    <section className="textura-branca relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative`}>
        <GhostNumber numero="03" />
        <SectionLabel numero="03" categoria="Processo" />
        <h2
          className="relative mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Como chegamos até a entrega
        </h2>
        <p className="relative mt-4 max-w-xl text-base" style={{ color: TINTA_SUAVE }}>
          Estamos hoje entre a Fase 1 e 2 — este documento fecha a Descoberta
          e abre o Conceito.
        </p>

        <div className="relative mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {FASES.map((fase, i) => {
            const ativa = i === FASE_ATUAL_INDEX || i === FASE_ATUAL_INDEX + 1;
            return (
              <div key={fase.numero} className="relative pt-6" style={{ opacity: ativa ? 1 : 0.45 }}>
                <div
                  className="absolute left-0 top-0 h-[3px] w-10"
                  style={{ backgroundColor: ativa ? ACENTO : TINTA_FRACA }}
                  aria-hidden="true"
                />
                <span className="font-mono text-sm tabular-nums" style={{ color: ACENTO }}>
                  {fase.numero}
                </span>
                <h3 className="mt-3 text-2xl font-semibold" style={{ fontFamily: a.fontTitulo }}>
                  {fase.nome}
                </h3>
                <p className="mt-3 text-base leading-relaxed" style={{ color: TINTA_SUAVE }}>
                  {fase.descricao}
                </p>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {fase.detalhes.map((d) => (
                    <li key={d} className="text-sm" style={{ color: TINTA_SUAVE }}>
                      — {d}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="relative mt-14 h-px w-full" style={{ backgroundColor: LINHA }} />

        <div className="relative mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.1em]" style={{ color: ACENTO }}>
            Dentro da Descoberta: pesquisa semântica
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: TINTA_SUAVE }}>
            Antes de desenhar qualquer símbolo, mapeamos as palavras do seu
            próprio briefing — sinônimos e conceitos correlatos a cada uma —
            pra explorar o território verbal da marca. É esse mapa que guia
            as decisões de tom, cor e tipografia nas fases seguintes.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {MAPA_SEMANTICO.map((item) => (
              <div key={item.chave}>
                <p className="text-lg font-semibold" style={{ fontFamily: a.fontTitulo }}>
                  {item.chave}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {item.sinonimos.map((s) => (
                    <li key={s} className="text-sm" style={{ color: TINTA_SUAVE }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

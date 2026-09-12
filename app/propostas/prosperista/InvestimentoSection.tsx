import { DIRECOES } from "./direcoes";
import { CONTAINER, ACENTO, LINHA } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

const ITENS = [
  { titulo: "Identidade Visual + Manual de Aplicação da Marca", valor: 2500 },
  { titulo: "Landing Page", valor: 1500 },
];

function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function InvestimentoSection() {
  const a = DIRECOES.a;
  const total = ITENS.reduce((soma, item) => soma + item.valor, 0);

  return (
    <section className="textura-cinza relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative max-w-3xl`}>
        <GhostNumber numero="07" />
        <SectionLabel numero="07" categoria="Investimento" />
        <h2
          className="relative mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Valores desta proposta
        </h2>

        <div className="relative mt-12">
          {ITENS.map((item) => (
            <div
              key={item.titulo}
              className="flex items-baseline justify-between border-t py-6"
              style={{ borderColor: LINHA }}
            >
              <span className="text-lg text-[#221F1D]">{item.titulo}</span>
              <span className="font-mono text-lg tabular-nums" style={{ color: ACENTO }}>
                {formatarReal(item.valor)}
              </span>
            </div>
          ))}
          <div
            className="flex items-baseline justify-between border-t border-b py-6"
            style={{ borderColor: LINHA }}
          >
            <span className="text-lg font-semibold" style={{ fontFamily: a.fontTitulo }}>
              Total
            </span>
            <span className="font-mono text-2xl tabular-nums text-[#221F1D]">
              {formatarReal(total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Textura decorativa: arcos finos verticais, em looping horizontal lento —
// mesma ideia de fundo em movimento por trás de um bloco de manifesto,
// adaptada ao traço reto/geométrico do site (sem curva "orgânica" nem
// border-radius, só o path do SVG).
const UNIDADE = 90;
const ALTURA = 640;
const REPETICOES = 24;

function arco(i: number) {
  const x = i * UNIDADE;
  return `M${x},${ALTURA} Q${x + UNIDADE / 2},-40 ${x + UNIDADE},${ALTURA}`;
}

export function LinhasFundo() {
  const largura = UNIDADE * REPETICOES;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]"
    >
      <div
        className="absolute inset-y-0 left-0 flex w-max"
        style={{ animation: "linhas-fundo 90s linear infinite" }}
      >
        {[0, 1].map((copia) => (
          <svg
            key={copia}
            width={largura}
            height={ALTURA}
            viewBox={`0 0 ${largura} ${ALTURA}`}
            fill="none"
            className="block h-full w-auto shrink-0"
          >
            {Array.from({ length: REPETICOES }, (_, i) => (
              <path
                key={i}
                d={arco(i)}
                stroke="var(--color-cal)"
                strokeWidth="1"
              />
            ))}
          </svg>
        ))}
      </div>
    </div>
  );
}

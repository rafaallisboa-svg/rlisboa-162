import { DIRECOES } from "./direcoes";
import { CONTAINER } from "./chrome";

export function ManifestoSection() {
  const a = DIRECOES.a;
  return (
    <section className="px-6 py-24 md:px-16 md:py-32" style={{ backgroundColor: "#C7D6D1" }}>
      <div className={`${CONTAINER} max-w-3xl text-center`}>
        <p
          className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.3] text-[#221F1D]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Enxergamos o que trava a evolução de negócios que cresceram pelo
          talento do fundador — e construímos a governança que sustenta o
          próximo salto, mantendo o empresário no comando.
        </p>
      </div>
    </section>
  );
}

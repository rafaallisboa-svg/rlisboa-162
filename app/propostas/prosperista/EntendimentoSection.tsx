import { DIRECOES } from "./direcoes";
import { CONTAINER, TINTA_SUAVE } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

export function EntendimentoSection() {
  const a = DIRECOES.a;
  return (
    <section className="textura-branca relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative`}>
        <GhostNumber numero="01" />
        <SectionLabel numero="01" categoria="Entendimento" />
        <h2
          className="relative mt-6 max-w-3xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          O que a Prosperista faz — e por que a marca precisa dizer isso
        </h2>
        <div
          className="relative mt-10 grid gap-8 text-lg leading-relaxed md:grid-cols-2"
          style={{ color: TINTA_SUAVE }}
        >
          <p>
            A Prosperista é uma consultoria boutique que atua como{" "}
            <em style={{ fontStyle: "italic", color: "#221F1D" }}>
              copiloto estratégico
            </em>{" "}
            de pequenas e médias empresas na transição de &ldquo;sucesso pelo
            talento do fundador&rdquo; para governança estruturada e
            sustentável. O empresário permanece no comando — a Prosperista
            fortalece a gestão, sem fórmulas prontas, partindo sempre do
            entendimento profundo de cada negócio.
          </p>
          <p>
            Fundada por Sandra Lia Morassutti, executiva com 35+ anos de
            carreira, sendo 20+ no mercado financeiro, desenvolvimento de
            negócios e projetos internacionais.
          </p>
        </div>
      </div>
    </section>
  );
}

import { DIRECOES } from "./direcoes";
import { CONTAINER, ACENTO, TINTA_SUAVE, LINHA } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

const IDENTIDADE = [
  "Marca: símbolo, logotipo e assinatura",
  "Paleta de cores",
  "Tipografia",
  "Elementos gráficos de apoio",
  "Manual de aplicação da marca",
  "Arquivos em diferentes extensões",
  "Aplicações: banner/capa LinkedIn, template de post/carrossel, one-pager institucional",
];

const LANDING = [
  "Design responsivo",
  "Otimização de imagens",
  "Publicação e domínio",
  "SEO básico",
];

function ListaEscopo({ titulo, itens }: { titulo: string; itens: string[] }) {
  const a = DIRECOES.a;
  return (
    <div>
      <p
        className="border-b pb-4 text-2xl font-semibold"
        style={{ fontFamily: a.fontTitulo, borderColor: LINHA }}
      >
        {titulo}
      </p>
      <ul className="mt-6 flex flex-col gap-4">
        {itens.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed" style={{ color: TINTA_SUAVE }}>
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0" style={{ backgroundColor: ACENTO }} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EscopoSection() {
  const a = DIRECOES.a;
  return (
    <section className="textura-cinza relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative`}>
        <GhostNumber numero="02" />
        <SectionLabel numero="02" categoria="Escopo" />
        <h2
          className="relative mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          O que está incluso nesta proposta
        </h2>
        <div className="relative mt-14 grid gap-12 md:grid-cols-2">
          <ListaEscopo titulo="Identidade Visual" itens={IDENTIDADE} />
          <ListaEscopo titulo="Landing Page" itens={LANDING} />
        </div>
      </div>
    </section>
  );
}

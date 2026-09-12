import { DIRECOES } from "./direcoes";

// Numeral gigante e translúcido atrás do título de cada seção — o fio
// condutor visual que dá identidade própria à proposta, amarrando a
// numeração editorial das referências sem virar "card decorativo".
export function GhostNumber({ numero }: { numero: string }) {
  const a = DIRECOES.a;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-6 right-0 select-none text-[clamp(6rem,14vw,11rem)] leading-none text-[#221F1D]/[0.05] md:-top-10"
      style={{ fontFamily: a.fontTitulo }}
    >
      {numero}
    </span>
  );
}

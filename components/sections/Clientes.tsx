import { publicados } from "@/lib/placeholder";
import clientesData from "@/content/clientes.json";

/**
 * Pavimento 04 — marquee infinito. Cartões brancos com contorno preto e os
 * logos nas cores originais, sem mudança no hover (a pedido do Rafael).
 */
export function Clientes() {
  const itens = publicados(clientesData.itens);
  if (itens.length === 0) return null;

  const loop = [...itens, ...itens];

  return (
    <section
      aria-label="Clientes"
      className="border-t border-white/10 bg-concreto py-20"
    >
      <p className="px-6 font-mono text-xs uppercase tracking-[0.12em] text-maresia md:px-[clamp(1.5rem,5vw,6rem)]">
        Clientes
      </p>

      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee flex w-max items-center gap-5">
          {loop.map((c, i) => (
            // Cartão uniforme — todo logo cabe inteiro (object-contain) dentro
            // do mesmo tamanho de caixa, então nada corta e o espaçamento entre
            // os itens fica sempre igual, independente da proporção do logo.
            // "escala" ajusta o tamanho do logo dentro da caixa (não a caixa).
            <div
              key={`${c.nome}-${i}`}
              className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black bg-white p-6 md:h-28 md:w-44"
            >
              <img
                src={c.logo}
                alt={c.nome}
                style={{ transform: `scale(${c.escala ?? 1})` }}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

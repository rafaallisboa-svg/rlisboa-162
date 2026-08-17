import { publicados, isPlaceholderImg } from "@/lib/placeholder";
import clientesData from "@/content/clientes.json";

/**
 * Pavimento 04 — marquee infinito, monocromático em --maresia, sem
 * mudança de cor no hover (a pedido do Rafael). Construído fora de
 * ordem do roadmap pra validar o conteúdo real assim que entra.
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
          {loop.map((c, i) => {
            const escala = c.escala ?? 1;
            const cheio = c.tecnica === "cheio";
            return (
              // Cartão quadrado uniforme — todo logo cabe inteiro (object-contain)
              // dentro do mesmo tamanho de caixa, então nada corta e o espaçamento
              // entre os itens fica sempre igual, independente da proporção do logo.
              // "escala" ajusta o tamanho do logo dentro da caixa (não a caixa em si).
              // "cheio" = a própria imagem já vem com fundo/margem prontos —
              // preenche a caixa de ponta a ponta, sem o padding padrão.
              <div
                key={`${c.nome}-${i}`}
                className={`flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black md:h-28 md:w-44 ${
                  cheio ? "" : "p-6"
                }`}
              >
                {cheio ? (
                  <img
                    src={c.logo}
                    alt={c.nome}
                    className="h-full w-full object-cover"
                  />
                ) : isPlaceholderImg(c.logo) ? (
                  <img
                    src={c.logo}
                    alt={c.nome}
                    style={{ transform: `scale(${escala})` }}
                    className="max-h-full max-w-full object-contain opacity-70"
                  />
                ) : /\.jpe?g$/i.test(c.logo) || c.tecnica === "cinza" ? (
                  // Sem alfa (JPG) ou com detalhe interno por cor (ex.:
                  // ícone com linhas de outra cor por cima do preenchimento,
                  // não por transparência) — máscara achataria isso numa
                  // mancha. Dessaturar preserva o contraste interno.
                  <img
                    src={c.logo}
                    alt={c.nome}
                    style={{ transform: `scale(${escala})` }}
                    className="max-h-full max-w-full object-contain grayscale"
                  />
                ) : (
                  // Padrão: máscara por alfa. Recolore qualquer cor
                  // (inclusive preto) pra --cal — branco cheio, de contraste
                  // máximo contra o cartão --blueprint escuro.
                  <span
                    role="img"
                    aria-label={c.nome}
                    className="block h-full w-full bg-cal [-webkit-mask-image:var(--logo-mask)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] [mask-image:var(--logo-mask)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                    style={{
                      ["--logo-mask" as string]: `url(${c.logo})`,
                      transform: `scale(${escala})`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

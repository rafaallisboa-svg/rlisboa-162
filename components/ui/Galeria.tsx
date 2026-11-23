import { responsiva } from "@/lib/imagens";
// `linha: true` em imagens seguidas as reúne lado a lado, numa só linha (2 a 4 colunas).
type Imagem = { src: string; alt: string; linha?: boolean };

function Figura({
  img,
  claro,
  className = "",
  sizes = "(min-width: 768px) 60vw, 100vw",
}: {
  img: Imagem;
  claro?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={`reveal-scroll ${className}`}>
      <img
        {...responsiva(img.src)}
        sizes={sizes}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        className={`w-full object-cover ${claro ? "bg-white" : "bg-blueprint"}`}
      />
      <figcaption
        className={`mt-3 font-mono text-xs ${claro ? "text-concreto/60" : "text-maresia"}`}
      >
        {img.alt}
      </figcaption>
    </figure>
  );
}

export function Galeria({
  imagens,
  claro,
  semPares,
}: {
  imagens: Imagem[];
  claro?: boolean;
  /** Desliga a alternância automática de pares: cada imagem fica numa linha, salvo as marcadas com `linha`. */
  semPares?: boolean;
}) {
  // Diagramação editorial: alterna imagem cheia e par lado a lado —
  // ritmo de destaque/detalhe, como uma revista.
  const blocos: Imagem[][] = [];
  let i = 0;
  let par = false;
  while (i < imagens.length) {
    if (imagens[i].linha) {
      const grupo: Imagem[] = [];
      while (i < imagens.length && imagens[i].linha && grupo.length < 4) grupo.push(imagens[i++]);
      blocos.push(grupo);
      par = false;
      continue;
    }
    if (!semPares && par && imagens.length - i >= 2) {
      blocos.push([imagens[i], imagens[i + 1]]);
      i += 2;
    } else {
      blocos.push([imagens[i]]);
      i += 1;
    }
    par = !par;
  }

  return (
    <div className="mt-8 flex flex-col gap-16">
      {blocos.map((bloco) =>
        bloco.length >= 3 ? (
          <div
            key={bloco[0].src}
            className={`grid grid-cols-2 gap-4 sm:gap-6 ${bloco.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}
          >
            {bloco.map((b) => (
              <Figura key={b.src} img={b} claro={claro} sizes="(min-width: 768px) 30vw, 50vw" />
            ))}
          </div>
        ) : bloco.length === 2 ? (
          <div
            key={bloco[0].src}
            className="grid gap-6 sm:grid-cols-2 sm:gap-8"
          >
            <Figura img={bloco[0]} claro={claro} />
            <Figura img={bloco[1]} claro={claro} />
          </div>
        ) : (
          <Figura key={bloco[0].src} img={bloco[0]} claro={claro} />
        ),
      )}
    </div>
  );
}

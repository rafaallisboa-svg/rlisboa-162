import { responsiva } from "@/lib/imagens";
type Imagem = { src: string; alt: string };

function Figura({
  img,
  claro,
  className = "",
}: {
  img: Imagem;
  claro?: boolean;
  className?: string;
}) {
  return (
    <figure className={`reveal-scroll ${className}`}>
      <img
        {...responsiva(img.src)}
        sizes="(min-width: 768px) 60vw, 100vw"
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

export function Galeria({ imagens, claro }: { imagens: Imagem[]; claro?: boolean }) {
  // Diagramação editorial: alterna imagem cheia e par lado a lado —
  // ritmo de destaque/detalhe, como uma revista.
  const blocos: Imagem[][] = [];
  let i = 0;
  let par = false;
  while (i < imagens.length) {
    if (par && imagens.length - i >= 2) {
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
        bloco.length === 2 ? (
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

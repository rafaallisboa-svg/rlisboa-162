import manifesto from "@/lib/imagens-manifest.json";

type Variante = { w: number; src: string };
const MANIFESTO = manifesto as Record<string, Variante[]>;

/**
 * Devolve src + srcSet com as versões WebP geradas por scripts/otimizar-imagens.mjs.
 * Se a imagem não tiver versões (placeholder, imagem externa), devolve só o src original.
 */
export function responsiva(src: string): { src: string; srcSet?: string } {
  const vs = MANIFESTO[src];
  if (!vs || vs.length === 0) return { src };
  return {
    src: vs[vs.length - 1].src,
    srcSet: vs.map((v) => `${v.src} ${v.w}w`).join(", "),
  };
}

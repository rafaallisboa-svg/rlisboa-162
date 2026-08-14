/**
 * Utilitários de conteúdo pendente.
 * Em dev, marca visualmente. Em produção, o build falha se sobrar pendência.
 */

const TODO = /\[\[\s*TODO:?([^\]]*)\]\]/g;

export const isTodo = (v: unknown): v is string =>
  typeof v === "string" && /\[\[\s*TODO/.test(v);

export const isPlaceholderImg = (v: unknown): v is string =>
  typeof v === "string" && v.startsWith("/api/ph");

/** Retorna o valor, ou null se for pendência. Use para esconder blocos vazios. */
export const real = <T,>(v: T): T | null => (isTodo(v) ? null : v);

/** Extrai a descrição de dentro do marcador. */
export const todoLabel = (v: string): string => {
  const m = /\[\[\s*TODO:?([^\]]*)\]\]/.exec(v);
  return m?.[1]?.trim() || "pendente";
};

/** Remove itens marcados como pendente na build de produção. */
export function publicados<T extends { pendente?: boolean }>(
  itens: readonly T[],
): readonly T[] {
  if (process.env.NODE_ENV === "development") return itens;
  return itens.filter((i) => !i.pendente);
}

/** Classe utilitária para o marcador visual em dev. */
export const todoClass =
  "bg-[--sinal] text-[--concreto] px-1.5 py-0.5 font-mono text-[0.7em] " +
  "uppercase tracking-widest not-italic";

export { TODO };

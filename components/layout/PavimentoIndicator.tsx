/**
 * Sprint 1: estático. A partir do Sprint 4 passa a atualizar com o scroll
 * (contagem de dígito rolante, efeito display de elevador) — ver BRIEF §3.4.
 */
export function PavimentoIndicator() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 font-mono text-xs uppercase tracking-[0.12em] text-maresia md:block"
    >
      <span className="tabular-nums text-sinal">PAV. 00</span> / 08
    </div>
  );
}

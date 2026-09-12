import { ACENTO, TINTA_FRACA } from "./chrome";

export function SectionLabel({ numero, categoria }: { numero: string; categoria: string }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em]">
      <span style={{ color: ACENTO }}>{numero}.</span>
      <span style={{ color: TINTA_FRACA }}>{categoria}</span>
    </div>
  );
}

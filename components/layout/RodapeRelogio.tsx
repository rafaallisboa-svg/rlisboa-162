"use client";

import { usePathname } from "next/navigation";
import { SeloRegua } from "@/components/ui/IdvElementos";

// Páginas que já têm um selo perto do rodapé: o relógio fica de fora para não repetir.
const SEM_RELOGIO = ["/sobre", "/contato"];

/** Relógio (selo de régua) pequeno do rodapé, ao lado do botão de orçamento. */
export function RodapeRelogio() {
  const caminho = usePathname();
  if (SEM_RELOGIO.some((p) => caminho === p || caminho.startsWith(`${p}/`))) return null;
  return <SeloRegua className="h-14 w-14 shrink-0 md:h-16 md:w-16" />;
}

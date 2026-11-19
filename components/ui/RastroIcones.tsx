"use client";

import { useEffect, useRef, useState } from "react";
import { IconeServico, type NomeIconeServico } from "@/components/ui/IconeServico";

/**
 * Rastro do mouse: enquanto o cursor se move sobre o bloco pai, solta de tempos em tempos um ícone de serviço
 * dentro de um círculo colorido. O ícone entra com um pulinho, fica um instante e some. Cores só da IDV.
 * Não pega clique (pointer-events: none). Desligado com "reduzir movimento". Os ícones saem na ordem dos serviços.
 */

const ICONES: NomeIconeServico[] = ["identidade", "site", "slide", "redes", "video", "eventos", "materiais"];
const CORES = [
  { bg: "bg-idv-amarelo", fg: "text-idv-preto" },
  { bg: "bg-idv-off", fg: "text-idv-preto" },
  { bg: "bg-idv-laranja", fg: "text-idv-preto" },
  { bg: "bg-idv-pedra", fg: "text-idv-preto" },
];
const DISTANCIA = 90; // px de caminho do mouse entre um ícone e o próximo
const INTERVALO = 70; // ms mínimos entre dois ícones
const VIDA = 1500; // ms que o ícone fica na tela
const MAXIMO = 14;

type Item = { id: number; x: number; y: number; icone: NomeIconeServico; cor: number; giro: number };

export function RastroIcones({ className = "" }: { className?: string }) {
  const raiz = useRef<HTMLDivElement>(null);
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    const el = raiz.current;
    const pai = el?.parentElement;
    if (!el || !pai) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id = 0;
    let n = 0;
    let ultimo = { x: -9999, y: -9999, t: 0 };
    let acumulado = 0;
    const timers: number[] = [];

    const mover = (e: PointerEvent) => {
      const r = pai.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (ultimo.x > -9000) acumulado += Math.hypot(x - ultimo.x, y - ultimo.y);
      ultimo = { x, y, t: ultimo.t };
      const agora = performance.now();
      if (acumulado < DISTANCIA || agora - ultimo.t < INTERVALO) return;
      acumulado = 0;
      ultimo.t = agora;
      const novo: Item = {
        id: id++,
        x,
        y,
        icone: ICONES[n % ICONES.length],
        cor: n % CORES.length,
        giro: (n % 2 === 0 ? -1 : 1) * (6 + (n % 3) * 4),
      };
      n++;
      setItens((prev) => [...prev.slice(-(MAXIMO - 1)), novo]);
      timers.push(window.setTimeout(() => setItens((prev) => prev.filter((i) => i.id !== novo.id)), VIDA));
    };
    const sair = () => {
      ultimo = { x: -9999, y: -9999, t: ultimo.t };
      acumulado = 0;
    };

    pai.addEventListener("pointermove", mover, { passive: true });
    pai.addEventListener("pointerleave", sair);
    return () => {
      pai.removeEventListener("pointermove", mover);
      pai.removeEventListener("pointerleave", sair);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={raiz} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {itens.map((i) => (
        <span
          key={i.id}
          className={`absolute flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14 ${CORES[i.cor].bg} ${CORES[i.cor].fg}`}
          style={{
            left: i.x,
            top: i.y,
            animation: `rastro-ico ${VIDA}ms cubic-bezier(0.22,1,0.36,1) forwards`,
            ["--giro" as string]: `${i.giro}deg`,
          }}
        >
          <IconeServico nome={i.icone} className="h-6 w-6 md:h-7 md:w-7" />
        </span>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

export type Segmento = { t: string; d?: boolean };
type Parte = { t: string; d?: boolean };

const OPACIDADE_BASE = 0.15;
const JANELA = 4;

function tokenizar(segmentos: Segmento[]): Parte[][] {
  const tokens: Parte[][] = [];
  let atual: Parte[] = [];
  for (const seg of segmentos) {
    for (const pedaco of seg.t.split(/(\s+)/)) {
      if (pedaco === "") continue;
      if (/^\s+$/.test(pedaco)) {
        if (atual.length) {
          tokens.push(atual);
          atual = [];
        }
      } else {
        atual.push({ t: pedaco, d: seg.d });
      }
    }
  }
  if (atual.length) tokens.push(atual);
  return tokens;
}

function Palavra({ partes }: { partes: Parte[] }) {
  return (
    <span data-w style={{ opacity: OPACIDADE_BASE }}>
      {partes.map((p, i) =>
        p.d ? (
          <span key={i} className="text-sinal">
            {p.t}
          </span>
        ) : (
          p.t
        ),
      )}
    </span>
  );
}

/**
 * Texto grande que se acende palavra por palavra conforme a rolagem.
 * As duas últimas palavras de cada parágrafo ficam juntas (sem órfã).
 */
export function TextoRevelar({
  paragrafos,
  className,
}: {
  paragrafos: Segmento[][];
  className?: string;
}) {
  const raizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;
    const palavras = Array.from(raiz.querySelectorAll<HTMLElement>("[data-w]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      palavras.forEach((w) => (w.style.opacity = "1"));
      return;
    }

    const total = palavras.length;
    let frame = 0;

    const aplicar = () => {
      frame = 0;
      const r = raiz.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (vh * 0.2 + r.height)));
      for (let i = 0; i < total; i++) {
        const wp = Math.min(1, Math.max(0, (p * (total + JANELA) - i) / JANELA));
        palavras[i].style.opacity = String(OPACIDADE_BASE + (1 - OPACIDADE_BASE) * wp);
      }
    };
    const aoRolar = () => {
      if (!frame) frame = requestAnimationFrame(aplicar);
    };

    aplicar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, []);

  return (
    <div ref={raizRef} className={className}>
      {paragrafos.map((segmentos, pi) => {
        const tokens = tokenizar(segmentos);
        const corte = Math.max(0, tokens.length - 2);
        return (
          <p key={pi}>
            {tokens.slice(0, corte).map((t, i) => (
              <span key={i}>
                <Palavra partes={t} />{" "}
              </span>
            ))}
            <span className="whitespace-nowrap">
              {tokens.slice(corte).map((t, i, arr) => (
                <span key={i}>
                  <Palavra partes={t} />
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </p>
        );
      })}
    </div>
  );
}

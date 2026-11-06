"use client";

import { useEffect, useRef } from "react";

type Celula = { cor?: string; ponto?: "laranja" | "amarelo" | "quadrado" };

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Grafismo de rodapé com parallax. Montado quando a seção chega ao fim da página;
 * ao rolar para longe dele, cada peça vai para a extremidade do seu lado
 * (esquerda ou direita) e some. Sem movimento, fica montado.
 */
const GRAFISMOS = {
  // Anéis em grade, com dois pontos de cor (Contato).
  aneis: {
    colunas: 6,
    largura: "min(88vw, 540px)",
    celulas: Array.from({ length: 18 }, (_, i): Celula => {
      if (i === 4) return { cor: "var(--color-idv-off)", ponto: "amarelo" };
      if (i === 8) return { cor: "var(--color-idv-off)", ponto: "laranja" };
      return { cor: "var(--color-idv-off)" };
    }),
  },
  // Pavimento de quadrados (Serviços).
  pavimento: {
    colunas: 4,
    largura: "min(88vw, 640px)",
    celulas: [
      { cor: "var(--color-idv-preto)" },
      { cor: "var(--color-idv-off)" },
      { cor: "var(--color-idv-pedra)" },
      { cor: "var(--color-idv-preto)" },
      { cor: "var(--color-idv-grafite)" },
      { cor: "var(--color-idv-preto)" },
      { cor: "var(--color-idv-off)", ponto: "quadrado" },
      { cor: "var(--color-idv-preto)" },
    ] as Celula[],
  },
} as const;

export function GrafismoParallax({
  tipo,
  className = "",
}: {
  tipo: keyof typeof GRAFISMOS;
  className?: string;
}) {
  const g = GRAFISMOS[tipo];
  const secaoRef = useRef<HTMLElement>(null);
  const pecasRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const secao = secaoRef.current;
    if (!secao) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pecas = pecasRef.current;
    const colunas = g.colunas;
    const linhas = Math.ceil(g.celulas.length / colunas);
    let frame = 0;

    const aplicar = () => {
      frame = 0;
      const r = secao.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Montado quando a seção encosta no rodapé (fim da página); aberto quando está longe disso.
      const rodape = document.querySelector("footer")?.getBoundingClientRect().height ?? 0;
      const repouso = vh - rodape;
      const e = clamp(Math.abs(r.bottom - repouso) / (vh * 0.85));
      pecas.forEach((el, i) => {
        if (!el) return;
        const col = i % colunas;
        const lin = Math.floor(i / colunas);
        const relX = colunas > 1 ? (col - (colunas - 1) / 2) / ((colunas - 1) / 2) : 0;
        const relY = linhas > 1 ? (lin - (linhas - 1) / 2) / ((linhas - 1) / 2) : 0;
        const lado = relX === 0 ? (i % 2 === 0 ? -1 : 1) : Math.sign(relX);
        const dx = lado * (0.45 + Math.abs(relX)) * e * vw * 0.7;
        const dy = relY * e * 60;
        const giro = relX * e * 25;
        const opacidade = 1 - clamp((e - 0.55) / 0.45);
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${giro}deg)`;
        el.style.opacity = String(opacidade);
      });
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
  }, [g]);

  return (
    <section
      ref={secaoRef}
      aria-hidden="true"
      className={`relative flex justify-center overflow-hidden py-24 md:py-32 ${className}`}
    >
      <div
        className="grid gap-2 md:gap-3"
        style={{ width: g.largura, gridTemplateColumns: `repeat(${g.colunas}, minmax(0, 1fr))` }}
      >
        {g.celulas.map((c, i) => (
          <div
            key={i}
            ref={(el) => {
              pecasRef.current[i] = el;
            }}
            className="relative aspect-square"
            style={{ willChange: "transform, opacity" }}
          >
            {tipo === "aneis" ? (
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle cx="50" cy="50" r="37" fill="none" stroke={c.cor} strokeWidth="24" />
                {c.ponto === "laranja" && <circle cx="50" cy="50" r="9" fill="var(--color-idv-laranja)" />}
                {c.ponto === "amarelo" && <circle cx="50" cy="50" r="8" fill="var(--color-idv-amarelo)" />}
              </svg>
            ) : (
              <div className="h-full w-full" style={{ background: c.cor }}>
                {c.ponto === "quadrado" && (
                  <span
                    className="absolute bottom-[8%] right-[8%] h-[9%] w-[9%]"
                    style={{ background: "var(--color-idv-laranja)" }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

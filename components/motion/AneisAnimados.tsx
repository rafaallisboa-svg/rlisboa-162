"use client";

import { useEffect, useRef } from "react";

const R_EXT = 252;
const R_INT = 126;
const CY = 252;
const LARGURA = 738;
const ALTURA = 322;
const TOPO = -60;
const CENTROS = { a: 252, b: 486 };

const anel = (cx: number) =>
  `M${cx - R_EXT} ${CY}A${R_EXT} ${R_EXT} 0 1 0 ${cx + R_EXT} ${CY}A${R_EXT} ${R_EXT} 0 1 0 ${cx - R_EXT} ${CY}Z` +
  `M${cx - R_INT} ${CY}A${R_INT} ${R_INT} 0 1 0 ${cx + R_INT} ${CY}A${R_INT} ${R_INT} 0 1 0 ${cx - R_INT} ${CY}Z`;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Dois anéis (amarelo e off-white) que se cruzam, o cruzamento em laranja, cortados pela borda de
 * baixo. Chegando ao fim da página eles sobem de trás do rodapé, um depois do outro, e assentam.
 * Rolando para cima, descem de volta.
 */
export function AneisAnimados({ className = "" }: { className?: string }) {
  const secaoRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const secao = secaoRef.current;
    const svg = svgRef.current;
    if (!secao || !svg) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const desenhar = () => {
      frame = 0;
      const r = secao.getBoundingClientRect();
      const vh = window.innerHeight;
      const rodape = document.querySelector("footer")?.getBoundingClientRect().height ?? 0;
      const e = reduzido ? 0 : clamp(Math.abs(r.bottom - (vh - rodape)) / (vh * 0.85));
      const p = clamp(1 - e / 0.55);
      const sai = (v: number) => {
        // easeOutBack: passa um pouco do ponto e assenta.
        const c1 = 1.4;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(v - 1, 3) + c1 * Math.pow(v - 1, 2);
      };
      const y = {
        a: (1 - sai(clamp(p / 0.8))) * 300,
        b: (1 - sai(clamp((p - 0.2) / 0.8))) * 300,
      };
      (["a", "b"] as const).forEach((k) => {
        svg.querySelectorAll(`[data-r="${k}"]`).forEach((el) => {
          el.setAttribute("transform", `translate(0 ${y[k]})`);
        });
      });
    };
    const aoMudar = () => {
      if (!frame) frame = requestAnimationFrame(desenhar);
    };
    desenhar();
    window.addEventListener("scroll", aoMudar, { passive: true });
    window.addEventListener("resize", aoMudar);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", aoMudar);
      window.removeEventListener("resize", aoMudar);
    };
  }, []);

  const a = anel(CENTROS.a);
  const b = anel(CENTROS.b);

  return (
    <section
      ref={secaoRef}
      aria-hidden="true"
      className={`relative flex justify-center overflow-hidden px-6 md:px-0 ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox={`0 ${TOPO} ${LARGURA} ${ALTURA}`}
        className="block w-full max-w-3xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="aneis-clip-b" clipPathUnits="userSpaceOnUse">
            <path data-r="b" d={b} clipRule="evenodd" />
          </clipPath>
        </defs>
        <g data-r="a">
          <path d={a} fillRule="evenodd" fill="var(--color-idv-amarelo)" />
        </g>
        <g data-r="b">
          <path d={b} fillRule="evenodd" fill="var(--color-idv-off)" />
        </g>
        <g clipPath="url(#aneis-clip-b)">
          <g data-r="a">
            <path d={a} fillRule="evenodd" fill="var(--color-idv-laranja)" />
          </g>
        </g>
      </svg>
    </section>
  );
}

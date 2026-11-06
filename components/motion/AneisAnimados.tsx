"use client";

import { useEffect, useRef } from "react";

const R_EXT = 252;
const R_INT = 126;
const CY = 252;
const CX_A = 252;
const CX_B = 486;
const LARGURA = 738;

const anel = (cx: number) =>
  `M${cx - R_EXT} ${CY}A${R_EXT} ${R_EXT} 0 1 0 ${cx + R_EXT} ${CY}A${R_EXT} ${R_EXT} 0 1 0 ${cx - R_EXT} ${CY}Z` +
  `M${cx - R_INT} ${CY}A${R_INT} ${R_INT} 0 1 0 ${cx + R_INT} ${CY}A${R_INT} ${R_INT} 0 1 0 ${cx - R_INT} ${CY}Z`;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Dois anéis (amarelo e off-white) que se cruzam, o cruzamento em laranja, cortados pela borda
 * de baixo. Chegando ao fim da página eles sobem de trás do rodapé, um depois do outro, e
 * assentam; parados, sobem e descem de leve em sentidos opostos, então o laranja do cruzamento
 * muda de forma o tempo todo.
 */
export function AneisAnimados({ className = "" }: { className?: string }) {
  const secaoRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gARef = useRef<SVGGElement>(null);
  const gBRef = useRef<SVGGElement>(null);
  const clipRef = useRef<SVGPathElement>(null);
  const laranjaRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const secao = secaoRef.current;
    const svg = svgRef.current;
    if (!secao || !svg) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let visivel = true;
    const inicio = performance.now();

    const desenhar = (agora: number) => {
      frame = 0;
      const r = secao.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rodape = document.querySelector("footer")?.getBoundingClientRect().height ?? 0;
      // Chegando ao fim da página os anéis sobem de trás do rodapé, um depois do outro;
      // rolando para cima eles descem de volta. Parados, sobem e descem de leve, em sentidos opostos.
      const e = reduzido ? 0 : clamp(Math.abs(r.bottom - (vh - rodape)) / (vh * 0.85));
      const p = clamp(1 - e / 0.55);
      const sai = (v: number) => {
        // easeOutBack: passa um pouco do ponto e assenta.
        const c1 = 1.4;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(v - 1, 3) + c1 * Math.pow(v - 1, 2);
      };
      const t = (agora - inicio) / 1000;
      const pa = sai(clamp(p / 0.8));
      const pb = sai(clamp((p - 0.2) / 0.8));
      const bob = reduzido ? 0 : Math.sin(t * 1.1) * 10 * p;
      const ay = (1 - pa) * 300 + bob;
      const by = (1 - pb) * 300 - bob;
      const ax = 0;
      const bx = 0;
      void vw;

      gARef.current?.setAttribute("transform", `translate(${ax} ${ay})`);
      gBRef.current?.setAttribute("transform", `translate(${bx} ${by})`);
      // O laranja é o anel A recortado pelo anel B, então os dois se movem juntos.
      clipRef.current?.setAttribute("transform", `translate(${bx} ${by})`);
      laranjaRef.current?.setAttribute("transform", `translate(${ax} ${ay})`);

      if (!reduzido && visivel) frame = requestAnimationFrame(desenhar);
    };

    const observador = new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;
        if (visivel && !frame) frame = requestAnimationFrame(desenhar);
      },
      { rootMargin: "200px" },
    );
    observador.observe(secao);

    frame = requestAnimationFrame(desenhar);
    const aoRedimensionar = () => {
      if (!frame) frame = requestAnimationFrame(desenhar);
    };
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observador.disconnect();
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  return (
    <section
      ref={secaoRef}
      aria-hidden="true"
      className={`relative flex justify-center overflow-hidden px-6 md:px-0 ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${LARGURA} 262`}
        className="block w-full max-w-3xl"
        style={{ overflow: "visible" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="aneis-anim-b" clipPathUnits="userSpaceOnUse">
            <path ref={clipRef} d={anel(CX_B)} clipRule="evenodd" />
          </clipPath>
        </defs>
        <g ref={gARef}>
          <path d={anel(CX_A)} fillRule="evenodd" fill="var(--color-idv-amarelo)" />
        </g>
        <g ref={gBRef}>
          <path d={anel(CX_B)} fillRule="evenodd" fill="var(--color-idv-off)" />
        </g>
        <g clipPath="url(#aneis-anim-b)">
          <g ref={laranjaRef}>
            <path d={anel(CX_A)} fillRule="evenodd" fill="var(--color-idv-laranja)" />
          </g>
        </g>
      </svg>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

const R_EXT = 140;
const R_INT = 70;
const CY = 140;
const LARGURA = 520;
const ALTURA = 210;
const TOPO = -60;
const CENTROS = { a: 140, b: 260, c: 380 };

const anel = (cx: number) =>
  `M${cx - R_EXT} ${CY}A${R_EXT} ${R_EXT} 0 1 0 ${cx + R_EXT} ${CY}A${R_EXT} ${R_EXT} 0 1 0 ${cx - R_EXT} ${CY}Z` +
  `M${cx - R_INT} ${CY}A${R_INT} ${R_INT} 0 1 0 ${cx + R_INT} ${CY}A${R_INT} ${R_INT} 0 1 0 ${cx - R_INT} ${CY}Z`;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Cores de cada anel e do que nasce quando eles se cruzam, como na mistura de cores primárias.
const COR = {
  a: "var(--color-idv-amarelo)",
  b: "var(--color-idv-off)",
  c: "var(--color-idv-grafite)",
  ab: "var(--color-idv-laranja)", // amarelo + off-white
  bc: "var(--color-idv-cinza)", // off-white + grafite
  ac: "#9c7e1c", // amarelo + grafite: ocre
  abc: "var(--color-idv-preto)", // os três juntos
};

/**
 * Três anéis em linha (amarelo, off-white e grafite), cortados pela borda de baixo. Chegando ao
 * fim da página eles sobem de trás do rodapé, um depois do outro; onde se cruzam nascem cores
 * novas: laranja, cinza, ocre e, no meio dos três, preto. Rolando para cima, descem de volta.
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
      const p = clamp(1 - e / 0.6);
      const sai = (v: number) => {
        // easeOutBack: passa um pouco do ponto e assenta.
        const c1 = 1.3;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(v - 1, 3) + c1 * Math.pow(v - 1, 2);
      };
      const y = {
        a: (1 - sai(clamp(p / 0.7))) * 260,
        b: (1 - sai(clamp((p - 0.15) / 0.7))) * 260,
        c: (1 - sai(clamp((p - 0.3) / 0.7))) * 260,
      };
      (["a", "b", "c"] as const).forEach((k) => {
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
  const c = anel(CENTROS.c);

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
          <clipPath id="aneis-clip-c" clipPathUnits="userSpaceOnUse">
            <path data-r="c" d={c} clipRule="evenodd" />
          </clipPath>
        </defs>

        <g data-r="a">
          <path d={a} fillRule="evenodd" fill={COR.a} />
        </g>
        <g data-r="b">
          <path d={b} fillRule="evenodd" fill={COR.b} />
        </g>
        <g data-r="c">
          <path d={c} fillRule="evenodd" fill={COR.c} />
        </g>

        {/* amarelo + off-white */}
        <g clipPath="url(#aneis-clip-b)">
          <g data-r="a">
            <path d={a} fillRule="evenodd" fill={COR.ab} />
          </g>
        </g>
        {/* off-white + grafite */}
        <g clipPath="url(#aneis-clip-c)">
          <g data-r="b">
            <path d={b} fillRule="evenodd" fill={COR.bc} />
          </g>
        </g>
        {/* amarelo + grafite */}
        <g clipPath="url(#aneis-clip-c)">
          <g data-r="a">
            <path d={a} fillRule="evenodd" fill={COR.ac} />
          </g>
        </g>
        {/* os três */}
        <g clipPath="url(#aneis-clip-b)">
          <g clipPath="url(#aneis-clip-c)">
            <g data-r="a">
              <path d={a} fillRule="evenodd" fill={COR.abc} />
            </g>
          </g>
        </g>
      </svg>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { NOMES_SERVICOS, slugServico } from "@/lib/servicos";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Palavras gigantes, uma por serviço. Cada uma ocupa a largura da coluna
 * (fonte ajustada por medição) e desliza na horizontal em sentido oposto
 * ao da vizinha conforme a seção cruza a tela. A palavra que está no meio
 * da tela acende na cor de acento.
 */
export function ServicosPalavras() {
  const secaoRef = useRef<HTMLElement>(null);
  const colunaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const secao = secaoRef.current;
    const coluna = colunaRef.current;
    if (!secao || !coluna) return;
    const links = linksRef.current.filter(Boolean) as HTMLAnchorElement[];
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let amplitude = 0;
    let ativa = -1;
    let frame = 0;

    const ajustarFonte = () => {
      const vw = window.innerWidth;
      amplitude = Math.min(110, vw * 0.06);
      const largura = coluna.clientWidth * 0.92;
      const maxima = Math.min(vw * 0.17, 260);
      for (const link of links) {
        link.style.fontSize = "100px";
        const w = link.getBoundingClientRect().width;
        link.style.fontSize = `${Math.min(maxima, (100 * largura) / w)}px`;
      }
    };

    const aplicar = () => {
      frame = 0;
      if (reduzido) return;
      const r = secao.getBoundingClientRect();
      const vh = window.innerHeight;
      const q = clamp((vh - r.top) / (vh + r.height));
      links.forEach((link, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        link.style.transform = `translate3d(${dir * (q - 0.5) * 2 * amplitude}px, 0, 0)`;
      });

      let melhor = -1;
      let menor = Infinity;
      links.forEach((link, i) => {
        const b = link.getBoundingClientRect();
        const d = Math.abs(b.top + b.height / 2 - vh / 2);
        if (d < menor) {
          menor = d;
          melhor = i;
        }
      });
      const dentro = r.top < vh * 0.5 && r.bottom > vh * 0.5 ? melhor : -1;
      if (dentro !== ativa) {
        ativa = dentro;
        links.forEach((link, i) => (link.dataset.ativa = String(i === dentro)));
      }
    };
    const aoRolar = () => {
      if (!frame) frame = requestAnimationFrame(aplicar);
    };
    const aoRedimensionar = () => {
      ajustarFonte();
      aoRolar();
    };

    ajustarFonte();
    aplicar();
    document.fonts?.ready.then(aoRedimensionar);
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  return (
    <section
      ref={secaoRef}
      aria-label="Serviços"
      className="overflow-hidden border-t border-white/10 bg-concreto py-20 md:py-32"
    >
      <div
        ref={colunaRef}
        className="mx-auto flex w-full flex-col gap-3 px-6 md:px-[clamp(1.5rem,5vw,6rem)]"
      >
        {NOMES_SERVICOS.map((nome, i) => (
          <Link
            key={nome}
            href={`/servicos#${slugServico(nome)}`}
            ref={(el) => {
              linksRef.current[i] = el;
            }}
            className={`block w-max whitespace-nowrap font-display uppercase leading-[0.9] tracking-tight text-cal transition-colors duration-300 data-[ativa=true]:text-sinal [@media(hover:hover)]:hover:text-sinal ${
              i % 2 === 0 ? "self-start" : "self-end"
            }`}
            style={{ fontSize: "min(14vw, 9rem)", willChange: "transform" }}
          >
            {nome}
          </Link>
        ))}
      </div>
    </section>
  );
}

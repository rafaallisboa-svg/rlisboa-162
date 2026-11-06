"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { NOMES_SERVICOS, rotuloServico, slugServico } from "@/lib/servicos";
import { Cruz, Sticker162 } from "@/components/ui/IdvElementos";

// O fundo troca de cor enquanto as palavras passam e termina escuro. Em cada fundo, as palavras ficam em
// cinzas (par/ímpar) e só a que está no centro da tela acende, com um ponto laranja no fim.
const TEMAS = [
  { bg: "#ffc300", par: "#3a3a38", impar: "#85857f", on: "#0e0e0d" },
  { bg: "#f1f0eb", par: "#c9c8c2", impar: "#85857f", on: "#0e0e0d" },
  // Os dois últimos usam o mesmo fundo do bloco seguinte (concreto), para a transição fluir.
  { bg: "#1c1c1b", par: "#3a3a38", impar: "#85857f", on: "#ffc300" },
  { bg: "#1c1c1b", par: "#3a3a38", impar: "#85857f", on: "#ffc300" },
];
const temaDaPalavra = (i: number) => Math.min(TEMAS.length - 1, Math.floor(i / 2));

function aplicarTema(el: HTMLElement, i: number) {
  const tema = TEMAS[temaDaPalavra(Math.max(0, i))];
  el.style.setProperty("--sp-bg", tema.bg);
  el.style.setProperty("--sp-par", tema.par);
  el.style.setProperty("--sp-impar", tema.impar);
  el.style.setProperty("--sp-on", tema.on);
}

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
        if (dentro >= 0) aplicarTema(secao, dentro);
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
      className="relative overflow-hidden bg-[var(--sp-bg)] pb-20 pt-28 transition-colors duration-700 md:pb-32 md:pt-40"
      style={{
        "--sp-bg": TEMAS[0].bg,
        "--sp-par": TEMAS[0].par,
        "--sp-impar": TEMAS[0].impar,
        "--sp-on": TEMAS[0].on,
      } as React.CSSProperties}
    >
      <Cruz className="absolute left-6 top-24 h-5 w-5 text-[var(--sp-impar)] md:left-[clamp(1.5rem,5vw,6rem)]" />
      <Cruz className="absolute right-6 top-24 hidden h-5 w-5 text-[var(--sp-impar)] md:right-[clamp(1.5rem,5vw,6rem)] md:block" />
      <Sticker162 className="absolute bottom-6 right-6 h-20 w-auto md:bottom-10 md:right-[clamp(1.5rem,5vw,6rem)] md:h-28" />
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
            className={`group block w-max whitespace-nowrap font-display uppercase leading-[0.9] tracking-tight transition-colors duration-500 data-[ativa=true]:text-[var(--sp-on)] [@media(hover:hover)]:hover:text-[var(--sp-on)] ${
              i % 2 === 0 ? "text-[var(--sp-par)] self-start" : "text-[var(--sp-impar)] self-end"
            }`}
            style={{ fontSize: "min(14vw, 9rem)", willChange: "transform" }}
          >
            {rotuloServico(nome)}
            <span aria-hidden="true" className="text-idv-laranja opacity-0 transition-opacity duration-500 group-data-[ativa=true]:opacity-100">.</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

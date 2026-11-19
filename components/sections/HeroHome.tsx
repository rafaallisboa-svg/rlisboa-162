"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import hero from "@/content/hero.json";
import { FundoPalavras } from "@/components/ui/FundoPalavras";
import { SeloRegua } from "@/components/ui/IdvElementos";

/**
 * Hero da Home. Fundo de letras que acendem perto do mouse, régua fina, 162 gigante (Unbounded Bold, a fonte do logotipo)
 * cortado pela borda e título que entra letra por letra depois de um loading curto com o relógio da marca.
 * O loading roda uma vez por visita (sessionStorage) e não roda com "reduzir movimento".
 * Amarelo só em três pontos: o 162, a frase em destaque e o botão. Textos em content/hero.json.
 */

const CHAVE = "rl-hero-intro";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Mantém as duas últimas palavras juntas, para nunca sobrar uma palavra sozinha na linha. */
function semOrfa(texto: string) {
  return texto.replace(/ ([^ ]+)$/, " $1");
}

function Linha({ texto, destaque }: { texto: string; destaque?: boolean }) {
  const palavras = semOrfa(texto).split(" ");
  return (
    <div className="-mb-[0.12em] overflow-hidden pb-[0.12em]">
      <span className={destaque ? "text-idv-amarelo" : undefined}>
        {palavras.map((p, i) => (
          <Fragment key={i}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(p).map((c, j) => (
                <span key={j} data-l className="inline-block whitespace-pre">
                  {c}
                </span>
              ))}
            </span>
            {i < palavras.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </div>
  );
}

export function HeroHome() {
  const raiz = useRef<HTMLElement>(null);
  const cortina = useRef<HTMLDivElement>(null);
  const numero = useRef<HTMLSpanElement>(null);
  const anel = useRef<SVGCircleElement>(null);
  const texto = useRef<HTMLDivElement>(null);
  const numeral = useRef<HTMLSpanElement>(null);
  const [mostrarCortina, setMostrarCortina] = useState(true);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visto = false;
    try {
      visto = sessionStorage.getItem(CHAVE) === "1";
    } catch {
      /* sem storage: roda a animação */
    }

    if (reduz || visto) {
      setMostrarCortina(false);
      return;
    }

    const letras = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    const blocos = Array.from(el.querySelectorAll<HTMLElement>("[data-bloco]"));
    const regua = el.querySelector<HTMLElement>("[data-regua]");
    const numeral = el.querySelector<HTMLElement>("[data-numeral]");

    // Estado inicial (a cortina preta ainda cobre tudo).
    letras.forEach((l) => (l.style.transform = "translateY(110%)"));
    [...blocos, ...(regua ? [regua] : [])].forEach((b) => (b.style.opacity = "0"));
    if (numeral) numeral.style.opacity = "0";

    const animacoes: Animation[] = [];
    const timers: number[] = [];
    let raf = 0;

    const intro = () => {
      const run = (alvo: HTMLElement | null, kf: Keyframe[], opt: KeyframeAnimationOptions) => {
        if (!alvo) return;
        animacoes.push(alvo.animate(kf, { duration: 900, easing: EASE, fill: "forwards", ...opt }));
      };
      run(regua, [{ opacity: 0 }, { opacity: 1 }], { duration: 1200, easing: "ease-out" });
      letras.forEach((l, i) => run(l, [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }], { duration: 800, delay: 350 + i * 35 }));
      const t = 350 + letras.length * 35 + 150;
      blocos.forEach((b, i) =>
        run(b, [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { delay: i === 0 ? 150 : t + (i - 1) * 160 }),
      );
      run(numeral, [{ opacity: 0, translate: "0 -60px", scale: "1.1" }, { opacity: 1, translate: "0 0", scale: "1" }], { duration: 1100, delay: 200 });
    };

    const C = 2 * Math.PI * 46;
    if (anel.current) {
      anel.current.style.strokeDasharray = String(C);
      anel.current.style.strokeDashoffset = String(C);
    }
    const inicio = performance.now();
    const DUR = 1500;
    const passo = (agora: number) => {
      const p = Math.min(Math.max((agora - inicio) / DUR, 0), 1);
      const e = 1 - Math.pow(1 - p, 3);
      if (numero.current) numero.current.textContent = String(Math.round(e * 100)).padStart(2, "0");
      if (anel.current) anel.current.style.strokeDashoffset = String(C * (1 - e));
      if (p < 1) {
        raf = requestAnimationFrame(passo);
        return;
      }
      timers.push(
        window.setTimeout(() => {
          const c = cortina.current;
          if (!c) return;
          const sobe = c.animate([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], {
            duration: 800,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
          });
          animacoes.push(sobe);
          sobe.onfinish = () => {
            try {
              sessionStorage.setItem(CHAVE, "1");
            } catch {
              /* ok */
            }
            setMostrarCortina(false);
          };
          timers.push(window.setTimeout(intro, 350));
        }, 250),
      );
    };
    raf = requestAnimationFrame(passo);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      animacoes.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <section
      ref={raiz}
      aria-label="Apresentação"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-idv-preto"
    >
      {/* Fundo: palavras em cinza bem discreto; de tempos em tempos uma acende em amarelo. Fica apagado atrás do texto e do 162. */}
      <FundoPalavras
        className="absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]"
        evitar={[texto, numeral]}
      />

      {/* Base do hero: desce do preto até o cinza-carvão da seção seguinte, para a emenda não aparecer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-b from-transparent to-concreto"
      />

      {/* Régua: linhas finas nas margens e na base */}
      <div data-regua aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-6 w-px bg-idv-grafite/50 md:left-[clamp(1.5rem,5vw,6rem)]" />
        <div className="absolute inset-y-0 right-6 w-px bg-idv-grafite/50 md:right-[clamp(1.5rem,5vw,6rem)]" />
        <div className="absolute inset-x-0 bottom-16 h-px bg-idv-grafite/70" />
      </div>

      {/* 162 gigante em Unbounded Bold (a fonte do logotipo), cortado pela borda, inclinado como um adesivo */}
      <span
        ref={numeral}
        data-numeral
        aria-hidden="true"
        className="pointer-events-none absolute -right-[22%] top-[5.25rem] -z-10 block -rotate-6 font-marca text-[42vw] font-bold leading-none tracking-[-0.03em] text-idv-amarelo md:-right-[9%] md:top-[8%] md:text-[min(23.8vw,23.8rem)]"
      >
        162
      </span>

      {/* No celular o texto começa abaixo do 162 (altura dele + folga), então nunca fica por cima do número. */}
      <div className="relative w-full px-6 pb-40 pt-[calc(5.25rem+42vw+1.75rem)] md:px-[clamp(1.5rem,5vw,6rem)] md:pb-24 md:pt-28">
        <div ref={texto} className="w-fit max-w-full">
        <p data-bloco className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-idv-cinza">
          <span aria-hidden="true" className="h-px w-3 bg-idv-pedra" />
          <span>
            {hero.rotulo[0]} <span className="mx-1">/</span> {hero.rotulo[1]}
          </span>
        </p>

        <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.25rem,5.2vw,4.75rem)] font-semibold uppercase leading-[1.04] tracking-tight text-idv-off">
          {hero.linhas.map((l, i) => (
            <Linha key={i} texto={l.texto} destaque={l.destaque} />
          ))}
        </h2>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-10">
          <div data-bloco>
            <Link
              href={hero.botao.href}
              className="inline-flex items-center gap-3 bg-idv-amarelo px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-preto transition-transform hover:-translate-y-0.5"
            >
              {hero.botao.texto}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p data-bloco className="max-w-md border-l border-idv-grafite pl-5 text-idv-pedra">
            {semOrfa(hero.subtitulo)}
          </p>
        </div>
        </div>
      </div>

      {/* Loading: o relógio da marca (com o 162 no centro), girando, e a contagem. Só na primeira vez da visita. */}
      {mostrarCortina && (
        <div
          ref={cortina}
          aria-hidden="true"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-idv-preto md:flex-row md:gap-7"
        >
          {/* O anel amarelo enchendo de 00 a 100 (como antes), agora dentro do relógio da marca */}
          <div className="relative flex h-[168px] w-[168px] items-center justify-center md:h-[196px] md:w-[196px]">
            <SeloRegua tinta="var(--color-idv-off)" numero={false} className="absolute inset-0 h-full w-full" />
            <div className="relative h-[104px] w-[104px] md:h-[120px] md:w-[120px]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-idv-grafite)" strokeWidth="1" />
                <circle ref={anel} cx="50" cy="50" r="46" fill="none" stroke="var(--color-idv-amarelo)" strokeWidth="1.5" />
              </svg>
              <span
                ref={numero}
                className="absolute inset-0 flex items-center justify-center font-mono text-3xl tabular-nums text-idv-off"
              >
                00
              </span>
            </div>
          </div>
          <p className="text-center font-mono text-[10px] uppercase leading-[1.7] tracking-[0.2em] text-idv-cinza md:text-left">
            <span className="text-idv-off">
              R<span className="text-idv-laranja">.</span> Lisboa
            </span>
            <br />
            Estúdio 162
          </p>
        </div>
      )}
    </section>
  );
}

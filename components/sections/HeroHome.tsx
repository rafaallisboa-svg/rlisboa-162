"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import hero from "@/content/hero.json";
import { FundoLiquido } from "@/components/ui/FundoLiquido";
import { SeloRegua } from "@/components/ui/IdvElementos";

/**
 * Hero da Home. Fundo vivo que segue o mouse, régua fina, 162 gigante (Unbounded Bold, a fonte do logotipo)
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

    const inicio = performance.now();
    const DUR = 1700;
    const passo = (agora: number) => {
      const p = Math.min(Math.max((agora - inicio) / DUR, 0), 1);
      const e = 1 - Math.pow(1 - p, 3);
      if (numero.current) numero.current.textContent = String(Math.round(e * 100)).padStart(2, "0");
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
      {/* Fundo vivo, segue o mouse */}
      <FundoLiquido className="absolute inset-0 -z-20" />

      {/* Régua: linhas finas nas margens e na base */}
      <div data-regua aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-6 w-px bg-idv-grafite/50 md:left-[clamp(1.5rem,5vw,6rem)]" />
        <div className="absolute inset-y-0 right-6 w-px bg-idv-grafite/50 md:right-[clamp(1.5rem,5vw,6rem)]" />
        <div className="absolute inset-x-0 bottom-16 h-px bg-idv-grafite/70" />
      </div>

      {/* 162 gigante em Unbounded Bold (a fonte do logotipo), cortado pela borda, inclinado como um adesivo */}
      <span
        data-numeral
        aria-hidden="true"
        className="pointer-events-none absolute -right-[24%] top-[6rem] -z-10 block -rotate-6 font-marca text-[50vw] font-bold leading-none tracking-[-0.03em] text-idv-amarelo md:-right-[9%] md:top-[8%] md:text-[min(23.8vw,23.8rem)]"
      >
        162
      </span>

      <div className="relative w-full px-6 pb-24 pt-28 md:px-[clamp(1.5rem,5vw,6rem)]">
        <p data-bloco className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-idv-cinza">
          <span aria-hidden="true" className="h-px w-3 bg-idv-pedra" />
          <span>
            {hero.rotulo[0]} <span className="mx-1">/</span> {hero.rotulo[1]}
          </span>
        </p>

        <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-idv-off">
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

      {/* Loading: o relógio da marca (com o 162 no centro), girando, e a contagem. Só na primeira vez da visita. */}
      {mostrarCortina && (
        <div
          ref={cortina}
          aria-hidden="true"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-idv-preto"
        >
          <SeloRegua tinta="var(--color-idv-off)" className="h-36 w-36 md:h-44 md:w-44" />
          <p className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-idv-cinza">
            <span ref={numero} className="text-3xl tabular-nums tracking-normal text-idv-off">
              00
            </span>
            <span>
              R<span className="text-idv-laranja">.</span> Lisboa / Estúdio 162
            </span>
          </p>
        </div>
      )}
    </section>
  );
}

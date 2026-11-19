"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo do hero: um campo de letras e números em mono (R. LISBOA, ESTÚDIO, 162…) que se embaralham devagar,
 * cinza apagado sobre o preto. Perto do mouse as letras acendem em amarelo e embaralham mais rápido; de vez em
 * quando uma letra acende sozinha. Sem mouse (celular), uma "lanterna" invisível vagueia pelo campo.
 * Atrás do bloco de texto (`evitar`) o campo fica mais discreto, para o título continuar legível.
 * Canvas 2D, 30 quadros por segundo, pausa fora da tela e com a aba escondida. Com "reduzir movimento"
 * desenha um único quadro parado.
 */

const LETRAS = "R.LISBOA162ESTÚDIO·/+—0123456789";
const CELULA_W = 26;
const CELULA_H = 34;
const RAIO = 200;

export function FundoLetras({
  className = "",
  evitar,
}: {
  className?: string;
  /** Bloco de texto do hero: atrás dele o campo é atenuado. */
  evitar?: React.RefObject<HTMLElement | null>;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current;
    const wrap = caixa.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let largura = 0;
    let altura = 0;
    let colunas = 0;
    let linhas = 0;
    let letra = new Uint8Array(0);
    let proxima = new Float32Array(0);
    let brilho = new Float32Array(0);
    let zona = { x0: 0, y0: 0, x1: 0, y1: 0 };
    let familia = "monospace";

    const medir = () => {
      const r = wrap.getBoundingClientRect();
      largura = r.width;
      altura = r.height;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colunas = Math.ceil(largura / CELULA_W);
      linhas = Math.ceil(altura / CELULA_H);
      const n = colunas * linhas;
      letra = new Uint8Array(n);
      proxima = new Float32Array(n);
      brilho = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        letra[i] = Math.floor(Math.random() * LETRAS.length);
        proxima[i] = Math.random() * 4000;
      }
      const alvo = evitar?.current?.getBoundingClientRect();
      zona = alvo
        ? { x0: alvo.left - r.left - 24, y0: alvo.top - r.top - 16, x1: alvo.right - r.left + 24, y1: alvo.bottom - r.top + 16 }
        : { x0: 0, y0: 0, x1: 0, y1: 0 };
      familia = getComputedStyle(wrap).fontFamily || "monospace";
    };

    // Mouse: posição suavizada. Sem ponteiro, a lanterna vagueia sozinha.
    const alvoM = { x: 0.7, y: 0.4 };
    const atual = { x: 0.7, y: 0.4 };
    let ponteiro = false;
    const mover = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      alvoM.x = (e.clientX - r.left) / r.width;
      alvoM.y = (e.clientY - r.top) / r.height;
      ponteiro = true;
    };
    if (!reduz) window.addEventListener("pointermove", mover, { passive: true });

    const desenhar = (t: number) => {
      ctx.clearRect(0, 0, largura, altura);
      ctx.font = `500 15px ${familia}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const px = atual.x * largura;
      const py = atual.y * altura;
      for (let r = 0; r < linhas; r++) {
        for (let c = 0; c < colunas; c++) {
          const i = r * colunas + c;
          const x = c * CELULA_W + CELULA_W / 2;
          const y = r * CELULA_H + CELULA_H / 2;
          const d = Math.hypot(x - px, y - py);
          const k = d < RAIO ? Math.pow(1 - d / RAIO, 2) : 0;

          if (!reduz) {
            if (t > proxima[i] || (k > 0.08 && Math.random() < 0.12)) {
              letra[i] = Math.floor(Math.random() * LETRAS.length);
              proxima[i] = t + 500 + Math.random() * 4500;
            }
            if (brilho[i] > 0) brilho[i] *= 0.955;
            else if (Math.random() < 0.0005) brilho[i] = 1;
          }

          let a = 0.16 + k * 0.72 + brilho[i] * 0.55;
          if (x > zona.x0 && x < zona.x1 && y > zona.y0 && y < zona.y1) a *= 0.3;
          ctx.fillStyle = k > 0.12 || brilho[i] > 0.15 ? `rgba(255,195,0,${Math.min(a, 0.85)})` : `rgba(133,133,127,${a})`;
          ctx.fillText(LETRAS[letra[i]], x, y);
        }
      }
    };

    medir();
    const ro = new ResizeObserver(() => {
      medir();
      if (reduz) desenhar(0);
    });
    ro.observe(wrap);

    let visivel = true;
    const io = new IntersectionObserver(([en]) => (visivel = en.isIntersecting), { threshold: 0 });
    io.observe(wrap);

    let raf = 0;
    let ultimo = 0;
    const t0 = performance.now();
    const quadro = (agora: number) => {
      raf = requestAnimationFrame(quadro);
      if (!visivel || document.hidden || agora - ultimo < 33) return;
      ultimo = agora;
      const t = agora - t0;
      if (!ponteiro) {
        alvoM.x = 0.62 + 0.25 * Math.sin(t / 3400);
        alvoM.y = 0.45 + 0.28 * Math.cos(t / 2700);
      }
      atual.x += (alvoM.x - atual.x) * 0.12;
      atual.y += (alvoM.y - atual.y) * 0.12;
      desenhar(t);
    };

    // Espera a fonte carregar para desenhar com ela.
    document.fonts.ready.then(() => {
      medir();
      if (reduz) desenhar(0);
      else raf = requestAnimationFrame(quadro);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", mover);
      ro.disconnect();
      io.disconnect();
    };
  }, [evitar]);

  return (
    <div ref={caixa} aria-hidden="true" className={`font-mono ${className}`}>
      <canvas ref={tela} className="block h-full w-full" />
    </div>
  );
}

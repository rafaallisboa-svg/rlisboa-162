"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo do hero: um monte de palavras do universo do design, em mono e cinza bem apagado, que vão trocando
 * devagar. De tempos em tempos UMA palavra acende em amarelo com um serviço do estúdio (identidade visual,
 * design system, website…), sempre numa posição diferente, e some. Sem mouse. Atrás do bloco de texto e do
 * 162 (`evitar`) as palavras ficam ainda mais apagadas e nunca acendem, para não atrapalhar a leitura.
 * Canvas 2D, ~20 quadros por segundo, pausa fora da tela. Com "reduzir movimento" desenha um quadro parado.
 */

const SERVICOS = [
  "identidade visual",
  "design system",
  "website",
  "apresentação",
  "social media kit",
  "vídeo & motion",
  "eventos",
  "materiais gráficos",
];

const FUNDO = [
  "marca", "logotipo", "tipografia", "paleta", "grid", "layout", "branding", "editorial", "landing page",
  "naming", "guia de marca", "iconografia", "key visual", "mockup", "wireframe", "motion", "tom de voz",
  "papelaria", "estratégia", "criação", "pesquisa", "conceito", "símbolo", "assinatura", "ícones", "sistema",
  "componentes", "diretrizes", "fotografia", "social", "evento", "cores", "versões", "aplicações", "briefing",
  "proporção", "contraste", "kit", "template", "campanha",
];

const SLOT_W = 200;
const ROW_H = 40;
const FPS = 20;
const LUZ_DURACAO = 1900; // ms que a palavra amarela fica visível
const LUZ_INTERVALO = 2200; // ms entre uma palavra amarela e a próxima

type Zona = { x0: number; y0: number; x1: number; y1: number };

export function FundoPalavras({
  className = "",
  evitar = [],
}: {
  className?: string;
  /** Elementos do hero (texto, 162) atrás dos quais o fundo fica mais apagado e nada acende. */
  evitar?: React.RefObject<HTMLElement | null>[];
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const evitarRef = useRef(evitar);
  evitarRef.current = evitar;

  useEffect(() => {
    const canvas = tela.current;
    const wrap = caixa.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fonte = Math.max(11, Math.min(13, window.innerWidth / 110));

    let largura = 0;
    let altura = 0;
    let colunas = 0;
    let linhas = 0;
    let palavra = new Int16Array(0);
    let ultimaTroca = new Float32Array(0);
    let proximaTroca = new Float32Array(0);
    let proibido = new Uint8Array(0); // 1 = está atrás de texto/162
    let familia = "monospace";

    const slotX = (c: number, r: number) => c * SLOT_W - (r % 2 === 0 ? 0 : SLOT_W / 2) + 8;
    const slotY = (r: number) => r * ROW_H + ROW_H / 2;

    const medir = () => {
      const r = wrap.getBoundingClientRect();
      largura = r.width;
      altura = r.height;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colunas = Math.ceil(largura / SLOT_W) + 1;
      linhas = Math.ceil(altura / ROW_H);
      const n = colunas * linhas;
      palavra = new Int16Array(n);
      ultimaTroca = new Float32Array(n);
      proximaTroca = new Float32Array(n);
      proibido = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        palavra[i] = Math.floor(Math.random() * FUNDO.length);
        proximaTroca[i] = 1200 + Math.random() * 6000;
      }
      const zonas: Zona[] = [];
      for (const ref of evitarRef.current) {
        const b = ref.current?.getBoundingClientRect();
        if (b) zonas.push({ x0: b.left - r.left - 20, y0: b.top - r.top - 14, x1: b.right - r.left + 20, y1: b.bottom - r.top + 14 });
      }
      for (let rr = 0; rr < linhas; rr++) {
        for (let c = 0; c < colunas; c++) {
          const x = slotX(c, rr);
          const y = slotY(rr);
          const dentro = zonas.some((z) => x + SLOT_W - 24 > z.x0 && x < z.x1 && y + ROW_H / 2 > z.y0 && y - ROW_H / 2 < z.y1);
          proibido[rr * colunas + c] = dentro ? 1 : 0;
        }
      }
      familia = getComputedStyle(wrap).fontFamily || "monospace";
    };

    // Palavra amarela: um slot por vez, posição sempre diferente das últimas.
    let luz: { slot: number; texto: string; inicio: number } | null = null;
    const recentes: number[] = [];
    let proximoServico = 0;
    let proximaLuz = 1200;

    const acender = (t: number) => {
      for (let tentativa = 0; tentativa < 60; tentativa++) {
        const c = Math.floor(Math.random() * colunas);
        const r = Math.floor(Math.random() * linhas);
        const i = r * colunas + c;
        const x = slotX(c, r);
        if (proibido[i] || recentes.includes(i) || x < 0 || x + SLOT_W - 24 > largura) continue;
        luz = { slot: i, texto: SERVICOS[proximoServico % SERVICOS.length], inicio: t };
        proximoServico++;
        recentes.push(i);
        if (recentes.length > 8) recentes.shift();
        return;
      }
    };

    const desenhar = (t: number) => {
      ctx.clearRect(0, 0, largura, altura);
      ctx.font = `400 ${fonte}px ${familia}`;
      // Caixa alta, com um respiro entre as letras (o canto de uma palavra de 18 letras ainda cabe no espaço).
      if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0.06em";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      if (!reduz) {
        if (!luz && t > proximaLuz) acender(t);
        if (luz && t - luz.inicio > LUZ_DURACAO) {
          luz = null;
          proximaLuz = t + (LUZ_INTERVALO - LUZ_DURACAO);
        }
      }

      for (let r = 0; r < linhas; r++) {
        for (let c = 0; c < colunas; c++) {
          const i = r * colunas + c;
          if (!reduz && t > proximaTroca[i]) {
            palavra[i] = Math.floor(Math.random() * FUNDO.length);
            ultimaTroca[i] = t;
            proximaTroca[i] = t + 2500 + Math.random() * 6000;
          }
          const x = slotX(c, r);
          const y = slotY(r);
          const eLuz = luz !== null && luz.slot === i;

          if (eLuz && luz) {
            const idade = t - luz.inicio;
            const a = Math.min(1, idade / 450, (LUZ_DURACAO - idade) / 700);
            ctx.fillStyle = `rgba(255,195,0,${Math.max(0, a) * 0.9})`;
            ctx.fillText(luz.texto.toUpperCase(), x, y);
            continue;
          }

          // some um pouco antes e volta um pouco depois de trocar de palavra
          const fade = reduz ? 1 : Math.min(1, (t - ultimaTroca[i]) / 500, (proximaTroca[i] - t) / 500);
          const base = proibido[i] ? 0.05 : 0.17;
          ctx.fillStyle = `rgba(133,133,127,${base * Math.max(0, fade)})`;
          ctx.fillText(FUNDO[palavra[i]].toUpperCase(), x, y);
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
      if (!visivel || document.hidden || agora - ultimo < 1000 / FPS) return;
      ultimo = agora;
      desenhar(agora - t0);
    };

    document.fonts.ready.then(() => {
      medir();
      if (reduz) desenhar(0);
      else raf = requestAnimationFrame(quadro);
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={caixa} aria-hidden="true" className={`font-mono ${className}`}>
      <canvas ref={tela} className="block h-full w-full" />
    </div>
  );
}

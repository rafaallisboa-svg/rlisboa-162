"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo do hero: linhas de palavras do universo do design, TODAS COLADAS, sem espaço, em caixa alta e cinza
 * apagado, correndo de lado como um carrossel (cada linha numa direção e velocidade). Ninguém lê nada ali:
 * a leitura só acontece quando uma palavra de serviço (identidade visual, design system, website…) fica
 * amarela (o amarelo discreto aprovado) e acompanha a linha enquanto ela corre. Nunca fica amarela atrás do texto do hero
 * nem do 162 (`evitar`); atrás deles as linhas ficam quase apagadas.
 * Canvas 2D, ~30 quadros por segundo, pausa fora da tela. Com "reduzir movimento": quadro parado, sem destaque.
 */

const SERVICOS = [
  "IDENTIDADE VISUAL",
  "DESIGN SYSTEM",
  "WEBSITE",
  "APRESENTAÇÃO",
  "SOCIAL MEDIA KIT",
  "VÍDEO & MOTION",
  "EVENTOS",
  "MATERIAIS GRÁFICOS",
];

const FUNDO = [
  "MARCA", "LOGOTIPO", "TIPOGRAFIA", "PALETA", "GRID", "LAYOUT", "BRANDING", "EDITORIAL", "LANDING PAGE",
  "NAMING", "GUIA DE MARCA", "ICONOGRAFIA", "KEY VISUAL", "MOCKUP", "WIREFRAME", "MOTION", "TOM DE VOZ",
  "PAPELARIA", "ESTRATÉGIA", "CRIAÇÃO", "PESQUISA", "CONCEITO", "SÍMBOLO", "ASSINATURA", "ÍCONES", "SISTEMA",
  "COMPONENTES", "DIRETRIZES", "FOTOGRAFIA", "SOCIAL", "EVENTO", "CORES", "VERSÕES", "APLICAÇÕES", "BRIEFING",
  "PROPORÇÃO", "CONTRASTE", "KIT", "TEMPLATE", "CAMPANHA",
];

const ROW_H = 30;
const FPS = 30;
const LUZ_DURACAO = 3200; // ms que a palavra fica amarela
const LUZ_INTERVALO = 1500; // ms entre o começo de uma e de outra
const LUZ_MAXIMO = 2; // palavras amarelas ao mesmo tempo

type Palavra = { texto: string; x: number; w: number; servico: boolean };
type Linha = { palavras: Palavra[]; total: number; vel: number };
type Zona = { x0: number; y0: number; x1: number; y1: number };
type Luz = { linha: number; palavra: number; inicio: number };

const aleatorio = <T,>(lista: T[]) => lista[Math.floor(Math.random() * lista.length)];

export function FundoPalavras({
  className = "",
  evitar = [],
}: {
  className?: string;
  /** Elementos do hero (texto, 162) atrás dos quais o fundo fica apagado e nada acende. */
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
    const tamanho = Math.max(12, Math.min(15, window.innerWidth / 100));

    let largura = 0;
    let altura = 0;
    let linhas: Linha[] = [];
    let zonas: Zona[] = [];
    let familia = "monospace";
    let charW = 8;

    const montar = () => {
      const r = wrap.getBoundingClientRect();
      largura = r.width;
      altura = r.height;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      familia = getComputedStyle(wrap).fontFamily || "monospace";
      ctx.font = `500 ${tamanho}px ${familia}`;
      charW = ctx.measureText("M").width;

      zonas = [];
      for (const ref of evitarRef.current) {
        const b = ref.current?.getBoundingClientRect();
        if (b) zonas.push({ x0: b.left - r.left - 16, y0: b.top - r.top - 10, x1: b.right - r.left + 16, y1: b.bottom - r.top + 10 });
      }

      const n = Math.ceil(altura / ROW_H);
      linhas = [];
      for (let i = 0; i < n; i++) {
        const palavras: Palavra[] = [];
        let x = 0;
        let contador = 0;
        // as palavras ficam coladas: cada uma começa onde a anterior termina
        while (x < largura * 1.15 + 260) {
          contador++;
          const servico = contador % 5 === 0;
          const texto = servico ? aleatorio(SERVICOS) : aleatorio(FUNDO);
          const w = texto.length * charW;
          palavras.push({ texto, x, w, servico });
          x += w;
        }
        const sentido = i % 2 === 0 ? 1 : -1;
        linhas.push({ palavras, total: x, vel: sentido * (18 + ((i * 7) % 5) * 7) });
      }
    };

    // distância de uma caixa até as zonas de texto (0 = dentro)
    const distanciaZona = (x0: number, x1: number, y: number) => {
      let menor = Infinity;
      for (const z of zonas) {
        const dx = Math.max(z.x0 - x1, 0, x0 - z.x1);
        const dy = Math.max(z.y0 - (y + ROW_H / 2), 0, y - ROW_H / 2 - z.y1);
        menor = Math.min(menor, Math.hypot(dx, dy));
      }
      return menor;
    };

    const deslocamento = (l: Linha, t: number) => {
      const o = ((t / 1000) * l.vel) % l.total;
      return (o + l.total) % l.total;
    };

    // Palavras amarelas
    let luzes: Luz[] = [];
    let proximaLuz = 600;
    const recentes: string[] = [];

    const acender = (t: number) => {
      for (let tentativa = 0; tentativa < 80; tentativa++) {
        const li = Math.floor(Math.random() * linhas.length);
        if (luzes.some((l) => l.linha === li)) continue;
        const linha = linhas[li];
        const off = deslocamento(linha, t);
        const y = li * ROW_H + ROW_H / 2;
        const candidatas = linha.palavras
          .map((p, pi) => ({ p, pi }))
          .filter(({ p }) => p.servico && !recentes.includes(p.texto));
        if (candidatas.length === 0) continue;
        const { p, pi } = aleatorio(candidatas);
        // posição visível agora: a cópia 0 ou a cópia 1 da linha
        for (const k of [0, 1]) {
          const x = p.x - off + k * linha.total;
          if (x > 24 && x + p.w < largura - 24 && distanciaZona(x, x + p.w, y) > 50) {
            luzes.push({ linha: li, palavra: pi, inicio: t });
            recentes.push(p.texto);
            if (recentes.length > 5) recentes.shift();
            return;
          }
        }
      }
    };

    const desenhar = (t: number) => {
      ctx.clearRect(0, 0, largura, altura);
      ctx.font = `500 ${tamanho}px ${familia}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      if (!reduz) {
        luzes = luzes.filter((l) => t - l.inicio < LUZ_DURACAO);
        if (luzes.length < LUZ_MAXIMO && t > proximaLuz) {
          acender(t);
          proximaLuz = t + LUZ_INTERVALO;
        }
      }

      for (let li = 0; li < linhas.length; li++) {
        const linha = linhas[li];
        const off = reduz ? 0 : deslocamento(linha, t);
        const y = li * ROW_H + ROW_H / 2;
        for (let pi = 0; pi < linha.palavras.length; pi++) {
          const p = linha.palavras[pi];
          for (const k of [0, 1]) {
            const x = p.x - off + k * linha.total;
            if (x + p.w < 0 || x > largura) continue;
            const perto = zonas.length ? Math.min(1, distanciaZona(x, x + p.w, y) / 70) : 1;
            const luz = luzes.find((l) => l.linha === li && l.palavra === pi);
            if (luz) {
              const idade = t - luz.inicio;
              const a = Math.max(0, Math.min(1, idade / 350, (LUZ_DURACAO - idade) / 600));
              // a palavra amarela: o mesmo amarelo discreto de antes, sem negrito nem sublinhado
              ctx.fillStyle = `rgba(255,195,0,${a * 0.9 * (0.35 + 0.65 * perto)})`;
              ctx.fillText(p.texto, x, y);
              continue;
            }
            ctx.fillStyle = `rgba(133,133,127,${0.2 * (0.18 + 0.82 * perto)})`;
            ctx.fillText(p.texto, x, y);
          }
        }
      }
    };

    montar();
    const ro = new ResizeObserver(() => {
      montar();
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
      montar();
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

"use client";

import { useEffect } from "react";

/**
 * Depois de alguns segundos parado no topo da página, rola sozinho até o elemento indicado.
 * Cancela na hora se a pessoa mexer (roda, toca, clica ou aperta uma tecla) antes ou durante.
 * Não faz nada com "reduzir movimento" ligado.
 */
export function AutoRolar({
  alvoId,
  atraso = 3000,
  deslocamento = 56,
  duracao = 1500,
}: {
  alvoId: string;
  atraso?: number;
  deslocamento?: number;
  duracao?: number;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.location.hash) return;

    let cancelado = false;
    let frame = 0;
    let temporizador = 0;
    const eventos = ["wheel", "touchstart", "keydown", "pointerdown", "mousedown"] as const;

    const cancelar = () => {
      cancelado = true;
      window.clearTimeout(temporizador);
      if (frame) cancelAnimationFrame(frame);
      eventos.forEach((e) => window.removeEventListener(e, cancelar));
    };
    eventos.forEach((e) => window.addEventListener(e, cancelar, { passive: true }));

    temporizador = window.setTimeout(() => {
      if (cancelado || window.scrollY > 40) return;
      const alvo = document.getElementById(alvoId);
      if (!alvo) return;
      const inicio = window.scrollY;
      const fim = alvo.getBoundingClientRect().top + window.scrollY - deslocamento;
      const t0 = performance.now();
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const passo = (agora: number) => {
        if (cancelado) return;
        const p = Math.min(1, (agora - t0) / duracao);
        window.scrollTo(0, inicio + (fim - inicio) * ease(p));
        if (p < 1) frame = requestAnimationFrame(passo);
        else cancelar();
      };
      frame = requestAnimationFrame(passo);
    }, atraso);

    return cancelar;
  }, [alvoId, atraso, deslocamento, duracao]);

  return null;
}

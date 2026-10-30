"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useSmoothScroll } from "./SmoothScroll";

const ATRASO_MS = 2000;
const VISIBILIDADE_MINIMA = 0.6;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Sempre que o hero aparece na tela (carga da página ou volta ao topo), espera
 * 2s e desliza sozinho até `alvo`. Enquanto a página rola, o conteúdo esmaece,
 * desfoca e sobe de leve. Qualquer interação durante a espera cancela a descida
 * daquela vez; ela volta a valer quando o hero reaparecer.
 */
export function HeroTransicao({
  alvo,
  className,
  children,
}: {
  alvo: string;
  className?: string;
  children: ReactNode;
}) {
  const lenisRef = useSmoothScroll();
  const conteudoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conteudo = conteudoRef.current;
    const secao = conteudo?.closest("section");
    if (!conteudo || !secao) return;

    let frame = 0;
    const aplicar = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.7)));
      conteudo.style.opacity = String(1 - p);
      conteudo.style.transform = `translate3d(0, ${-p * 48}px, 0) scale(${1 - p * 0.04})`;
      conteudo.style.filter = p > 0 ? `blur(${p * 10}px)` : "none";
    };
    const aoRolar = () => {
      if (!frame) frame = requestAnimationFrame(aplicar);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    aplicar();

    const eventos = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const cancelar = () => {
      clearTimeout(timer);
      timer = undefined;
      eventos.forEach((e) => window.removeEventListener(e, cancelar));
    };

    const descer = () => {
      const destino = document.querySelector<HTMLElement>(alvo);
      if (!destino) return;
      if (lenisRef?.current) {
        const distancia = destino.getBoundingClientRect().top;
        lenisRef.current.scrollTo(destino, {
          duration: Math.min(4.8, Math.max(2.2, distancia / 650)),
          easing: easeInOutCubic,
        });
      } else {
        destino.scrollIntoView({ behavior: "smooth" });
      }
    };

    const iniciar = () => {
      if (timer) return;
      timer = setTimeout(() => {
        cancelar();
        descer();
      }, ATRASO_MS);
      eventos.forEach((e) => window.addEventListener(e, cancelar, { passive: true }));
    };

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.intersectionRatio >= VISIBILIDADE_MINIMA) iniciar();
        else cancelar();
      },
      { threshold: [0, VISIBILIDADE_MINIMA, 1] },
    );
    observador.observe(secao);

    return () => {
      observador.disconnect();
      cancelar();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", aoRolar);
    };
  }, [alvo, lenisRef]);

  return (
    <div
      ref={conteudoRef}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </div>
  );
}

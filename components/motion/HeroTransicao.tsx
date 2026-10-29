"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useSmoothScroll } from "./SmoothScroll";

const ATRASO_MS = 2000;
const DURACAO_S = 2;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * O hero aparece, espera 2s e desliza sozinho até `alvo`. Enquanto a página
 * rola (sozinha ou pelo usuário), o conteúdo esmaece, desfoca e sobe de leve.
 * Qualquer interação do usuário cancela o avanço automático.
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
    let frame = 0;

    const aplicar = () => {
      frame = 0;
      if (!conteudo) return;
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

    const jaRolou = window.scrollY > 50 || window.location.hash !== "";
    const timer = jaRolou
      ? undefined
      : setTimeout(() => {
          const destino = document.querySelector<HTMLElement>(alvo);
          if (!destino) return;
          if (lenisRef?.current) {
            lenisRef.current.scrollTo(destino, {
              duration: DURACAO_S,
              easing: easeInOutCubic,
            });
          } else {
            destino.scrollIntoView({ behavior: "smooth" });
          }
        }, ATRASO_MS);

    const cancelar = () => clearTimeout(timer);
    const eventos = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    eventos.forEach((e) =>
      window.addEventListener(e, cancelar, { passive: true, once: true }),
    );

    return () => {
      clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", aoRolar);
      eventos.forEach((e) => window.removeEventListener(e, cancelar));
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

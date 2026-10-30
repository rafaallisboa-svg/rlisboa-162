"use client";

import { useEffect, useRef } from "react";

/**
 * Foto que se revela de cima pra baixo conforme entra na tela e se move
 * mais devagar que a rolagem (parallax). A imagem é 30% mais alta que o
 * quadro pra ter folga de deslocamento.
 */
export function FotoParallax({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const quadroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const aplicar = () => {
      frame = 0;
      const quadro = quadroRef.current;
      const img = imgRef.current;
      if (!quadro || !img) return;
      const r = quadro.getBoundingClientRect();
      const vh = window.innerHeight;
      const revelar = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5)));
      const progresso = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      quadro.style.clipPath = `inset(0 0 ${(1 - revelar) * 100}% 0)`;
      img.style.transform = `translate3d(0, ${(progresso - 0.5) * r.height * 0.3}px, 0) scale(${1 + (1 - revelar) * 0.08})`;
    };
    const aoRolar = () => {
      if (!frame) frame = requestAnimationFrame(aplicar);
    };

    aplicar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, []);

  return (
    <div
      ref={quadroRef}
      className={`relative aspect-[4/5] w-full overflow-hidden bg-blueprint md:aspect-[16/9] ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute left-0 w-full object-cover opacity-70"
        style={{ top: "-15%", height: "130%", willChange: "transform" }}
      />
    </div>
  );
}

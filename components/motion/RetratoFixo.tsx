"use client";

import { useEffect, useRef } from "react";

/**
 * Retrato que fica fixo no topo e vai sumindo conforme a página rola,
 * enquanto o texto sobe por cima dele, sem fundo próprio.
 */
export function RetratoFixo({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
}) {
  const quadroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const aplicar = () => {
      frame = 0;
      const quadro = quadroRef.current;
      if (!quadro) return;
      const vh = window.innerHeight;
      const t = Math.min(1, Math.max(0, (window.scrollY - vh * 0.12) / (vh * 0.7)));
      quadro.style.opacity = String(1 - t);
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
    <section
      ref={quadroRef}
      aria-label={alt}
      className="sticky top-0 z-0 hidden h-[100svh] w-full overflow-hidden bg-[#1a1c1b] pt-[65px] md:block"
      style={{ willChange: "opacity" }}
    >
      <picture className="block h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover object-top lg:object-contain" />
      </picture>
      {children}
    </section>
  );
}

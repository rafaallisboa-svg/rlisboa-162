"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { IconeWhatsApp } from "@/components/ui/SocialIcon";

/** Primeira cor de fundo opaca no ponto, ignorando o próprio botão. */
function fundoNoPonto(x: number, y: number, ignorar: Element | null): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (ignorar && (el === ignorar || ignorar.contains(el))) continue;
    // Foto ou vídeo por baixo: trata como fundo escuro (ícone branco).
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) return null;
    const cor = getComputedStyle(el).backgroundColor;
    const m = cor.match(/[\d.]+/g);
    if (!m) continue;
    const alfa = m[3] === undefined ? 1 : Number(m[3]);
    if (alfa < 0.5) continue;
    return cor;
  }
  return null;
}

function eClaro(cor: string | null) {
  if (!cor) return false;
  const [r, g, b] = (cor.match(/[\d.]+/g) ?? []).map(Number);
  // Luminância percebida (0–255).
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

/**
 * Atalho discreto para o WhatsApp, só no celular: só o ícone da biblioteca
 * da IDV, sem caixa. Branco sobre fundo escuro, preto sobre fundo claro.
 * Aparece depois que a página desce um pouco e fica fora do orçamento.
 */
export function WhatsAppFlutuante() {
  const caminho = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [claro, setClaro] = useState(false);

  useEffect(() => {
    const atualizar = () => {
      setVisivel(window.scrollY > 240);
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      setClaro(eClaro(fundoNoPonto(r.left + r.width / 2, r.top + r.height / 2, el)));
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, [caminho]);

  if (caminho.startsWith("/orcamento")) return null;

  const href = `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(
    site.contato.whatsappMensagem,
  )}`;

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      className={`whatsapp-flutuante fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 flex h-11 w-11 items-center justify-center transition-[opacity,transform,color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-reduce:transition-none md:hidden ${
        claro ? "text-idv-preto" : "text-idv-off"
      }`}
      style={{
        opacity: visivel ? 1 : 0,
        transform: visivel ? "none" : "translateY(8px)",
        pointerEvents: visivel ? "auto" : "none",
      }}
    >
      <IconeWhatsApp className="h-7 w-7" />
    </a>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { IconeWhatsApp } from "@/components/ui/SocialIcon";

/**
 * Atalho discreto para o WhatsApp, só no celular. Aparece depois que a
 * página desce um pouco e fica fora da página de orçamento (o formulário
 * já é o caminho ali). Ícone da biblioteca da IDV.
 */
export function WhatsAppFlutuante() {
  const caminho = usePathname();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 240);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  if (caminho.startsWith("/orcamento")) return null;

  const href = `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(
    site.contato.whatsappMensagem,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 flex h-11 w-11 items-center justify-center border border-idv-off/15 bg-idv-carbono/90 text-idv-off/80 backdrop-blur-sm transition-[opacity,transform,color] duration-300 hover:text-idv-amarelo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-idv-amarelo motion-reduce:transition-none md:hidden"
      style={{
        opacity: visivel ? 1 : 0,
        transform: visivel ? "none" : "translateY(8px)",
        pointerEvents: visivel ? "auto" : "none",
      }}
    >
      <IconeWhatsApp className="h-5 w-5" />
    </a>
  );
}

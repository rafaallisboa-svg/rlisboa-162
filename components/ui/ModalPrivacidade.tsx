"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { POLITICA_ATUALIZADA, PoliticaConteudo } from "@/components/ui/PoliticaConteudo";

/**
 * Pop-up da política de privacidade. Qualquer link para /privacidade dentro do
 * site (rodapé, aviso de cookies, formulário) abre este painel por cima da página,
 * sem sair dela. O endereço /privacidade continua existindo para links diretos.
 * Fecha no X, clicando fora ou com Esc.
 */
export function ModalPrivacidade() {
  const [aberto, setAberto] = useState(false);
  const caminho = usePathname();
  const fechar = useRef<HTMLButtonElement>(null);
  const origem = useRef<Element | null>(null);

  // Intercepta os cliques antes do roteador (e antes do "volta ao topo" do scroll suave).
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/privacidade") return;
      if (window.location.pathname === "/privacidade") return; // já está na página
      e.preventDefault();
      e.stopPropagation();
      origem.current = a;
      setAberto(true);
    };
    window.addEventListener("click", aoClicar, true);
    return () => window.removeEventListener("click", aoClicar, true);
  }, []);

  // Trocou de página: fecha.
  useEffect(() => setAberto(false), [caminho]);

  useEffect(() => {
    if (!aberto) return;
    const raiz = document.documentElement;
    const antes = raiz.style.overflow;
    raiz.style.overflow = "hidden";
    fechar.current?.focus();
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => {
      raiz.style.overflow = antes;
      window.removeEventListener("keydown", aoTeclar);
      // devolve o foco ao link sem rolar a página até ele
      (origem.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div
      className="modal-privacidade fixed inset-0 z-[70] flex items-end justify-center bg-black/60 backdrop-blur-[2px] md:items-center md:p-6"
      data-lenis-prevent
      onClick={(e) => e.target === e.currentTarget && setAberto(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-politica"
        className="painel-privacidade flex h-[100dvh] w-full flex-col bg-idv-preto text-cal shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:h-[82vh] md:max-w-3xl md:border md:border-white/10"
      >
        <div className="flex shrink-0 items-start justify-between gap-6 border-b border-white/10 px-6 pb-5 pt-6 md:px-10 md:pt-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
              Privacidade<span className="text-idv-laranja">.</span> · Atualizada em {POLITICA_ATUALIZADA}
            </p>
            <h2 id="titulo-politica" className="mt-2 font-display text-3xl uppercase leading-none md:text-4xl">
              Política de privacidade
            </h2>
          </div>
          <button
            ref={fechar}
            type="button"
            onClick={() => setAberto(false)}
            aria-label="Fechar a política de privacidade"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-cal/20 text-cal transition-colors hover:border-sinal hover:text-sinal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sinal"
          >
            <span aria-hidden="true" className="font-mono text-base leading-none">✕</span>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-14 md:px-10" data-lenis-prevent>
          <PoliticaConteudo />
        </div>
      </div>
    </div>
  );
}

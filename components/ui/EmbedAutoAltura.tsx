"use client";

import { useEffect, useRef } from "react";

/**
 * Iframe do mesmo domínio que acompanha a altura real do conteúdo: os widgets
 * mudam de tamanho com a largura, então uma altura fixa corta no celular e
 * sobra espaço no desktop. `alturaInicial` evita salto antes da primeira medição.
 */
export function EmbedAutoAltura({
  src,
  title,
  alturaInicial,
  className,
}: {
  src: string;
  title: string;
  alturaInicial: number;
  className?: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    let observador: ResizeObserver | undefined;

    const raiz = () => {
      const doc = iframe.contentDocument;
      return (doc?.querySelector(".fic26-pc") ??
        doc?.body.firstElementChild ??
        null) as HTMLElement | null;
    };

    const medir = () => {
      const doc = iframe.contentDocument;
      const conteudo = raiz();
      if (!doc || !conteudo) return;
      const estilo = doc.defaultView?.getComputedStyle(doc.body);
      const folga =
        (parseFloat(estilo?.paddingTop ?? "0") || 0) +
        (parseFloat(estilo?.paddingBottom ?? "0") || 0);
      iframe.style.height = `${Math.ceil(conteudo.getBoundingClientRect().height + folga)}px`;
    };

    const aoCarregar = () => {
      medir();
      const conteudo = raiz();
      const RO = (iframe.contentWindow as (Window & typeof globalThis) | null)
        ?.ResizeObserver;
      if (conteudo && RO) {
        observador?.disconnect();
        observador = new RO(medir);
        observador.observe(conteudo);
      }
    };

    iframe.addEventListener("load", aoCarregar);
    window.addEventListener("resize", medir);
    if (iframe.contentDocument?.readyState === "complete") aoCarregar();

    return () => {
      iframe.removeEventListener("load", aoCarregar);
      window.removeEventListener("resize", medir);
      observador?.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading="lazy"
      className={className}
      style={{ height: alturaInicial }}
    />
  );
}

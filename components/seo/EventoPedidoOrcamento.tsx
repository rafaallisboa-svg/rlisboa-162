"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Avisa o Analytics que um pedido de orçamento foi concluído
 * (evento recomendado do GA4 "generate_lead"). Fica na página de obrigado.
 */
export function EventoPedidoOrcamento() {
  useEffect(() => {
    const enviar = () => window.gtag?.("event", "generate_lead", { form: "orcamento" });
    // O script do Analytics carrega depois da página; espera um pouco se preciso.
    if (window.gtag) enviar();
    else {
      const t = window.setTimeout(enviar, 2500);
      return () => window.clearTimeout(t);
    }
  }, []);
  return null;
}

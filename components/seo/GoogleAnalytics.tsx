"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { EVENTO_CONSENTIMENTO, lerEscolha } from "@/lib/consentimento";

const LIVE = process.env.NEXT_PUBLIC_SITE_LIVE === "true";
const DEV = process.env.NODE_ENV === "development";

/**
 * Google Analytics 4. Só carrega no site publicado e depois que o visitante
 * clica em "Aceitar" no aviso de cookies (LGPD). A troca de página sem
 * recarregar é medida pelo próprio GA4 (eventos do histórico do navegador).
 */
export function GoogleAnalytics() {
  const id = site.analyticsId;
  const [aceito, setAceito] = useState(false);

  useEffect(() => {
    const ler = () => setAceito(lerEscolha() === "aceito");
    ler();
    window.addEventListener(EVENTO_CONSENTIMENTO, ler);
    return () => window.removeEventListener(EVENTO_CONSENTIMENTO, ler);
  }, []);

  if (!id || DEV || !LIVE || !aceito) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}

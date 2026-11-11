import Script from "next/script";
import { site } from "@/site.config";
import { IS_DEV, SITE_LIVE } from "@/lib/env";

/**
 * Google Analytics 4. Só carrega no site publicado (nunca no preview local
 * nem com a trava SITE_LIVE desligada), para não sujar os números.
 * A troca de página sem recarregar é medida pelo próprio GA4
 * ("mudanças de página com base em eventos do histórico do navegador").
 */
export function GoogleAnalytics() {
  const id = site.analyticsId;
  if (!id || IS_DEV || !SITE_LIVE) return null;

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

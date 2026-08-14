import type { MetadataRoute } from "next";

/**
 * Enquanto NEXT_PUBLIC_SITE_LIVE não for "true", o site inteiro fica
 * bloqueado para buscadores. Trava de segurança contra indexação acidental
 * de preview ou de conteúdo com placeholder.
 */
export default function robots(): MetadataRoute.Robots {
  const live = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

  if (!live) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}

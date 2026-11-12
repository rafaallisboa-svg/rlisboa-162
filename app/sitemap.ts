import type { MetadataRoute } from "next";
import { getProjetos } from "@/lib/projetos";
import { urlAbsoluta } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  const fixas: MetadataRoute.Sitemap = [
    { url: urlAbsoluta("/"), lastModified: agora, changeFrequency: "monthly", priority: 1 },
    { url: urlAbsoluta("/servicos"), lastModified: agora, changeFrequency: "monthly", priority: 0.9 },
    { url: urlAbsoluta("/projetos"), lastModified: agora, changeFrequency: "monthly", priority: 0.8 },
    { url: urlAbsoluta("/sobre"), lastModified: agora, changeFrequency: "yearly", priority: 0.7 },
    { url: urlAbsoluta("/contato"), lastModified: agora, changeFrequency: "yearly", priority: 0.7 },
    { url: urlAbsoluta("/privacidade"), lastModified: agora, changeFrequency: "yearly", priority: 0.3 },
  ];
  const projetos: MetadataRoute.Sitemap = getProjetos().map((p) => ({
    url: urlAbsoluta(`/projetos/${p.slug}`),
    lastModified: agora,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...fixas, ...projetos];
}

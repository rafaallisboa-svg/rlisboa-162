import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite rodar dois servidores de teste ao mesmo tempo sem um
  // corromper os arquivos temporários do outro. Na Vercel fica ".next".
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Páginas geradas na hora (ex.: 404 dentro de /servicos) leem os cases de
  // content/; sem isso a Vercel não leva a pasta e a página quebra (erro 500).
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "rlisboa-162.vercel.app" }],
        destination: "https://www.rlisboadesign.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

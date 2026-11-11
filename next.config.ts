import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite rodar dois servidores de teste ao mesmo tempo sem um
  // corromper os arquivos temporários do outro. Na Vercel fica ".next".
  distDir: process.env.NEXT_DIST_DIR || ".next",
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

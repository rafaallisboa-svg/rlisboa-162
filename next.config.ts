import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

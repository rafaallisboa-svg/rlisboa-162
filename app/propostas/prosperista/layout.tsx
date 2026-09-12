import type { Metadata } from "next";
import { Fraunces, Inter, Newsreader, Public_Sans } from "next/font/google";
import "./prosperista.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Proposta — Identidade Visual & Landing Page | Prosperista Consultoria",
  robots: { index: false, follow: false },
};

export default function PropostaProsperistaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} ${newsreader.variable} ${publicSans.variable}`}
    >
      <body
        className="bg-white text-[#221F1D]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {children}
      </body>
    </html>
  );
}

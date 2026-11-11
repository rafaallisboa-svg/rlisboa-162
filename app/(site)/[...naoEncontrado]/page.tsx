import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

// Qualquer endereço que não existe cai aqui e mostra a 404 do site
// (com menu e rodapé), em vez da página padrão do Next.
export default function RotaInexistente() {
  notFound();
}

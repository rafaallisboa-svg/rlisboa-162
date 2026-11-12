import type { Metadata } from "next";
import Link from "next/link";
import { POLITICA_ATUALIZADA, PoliticaConteudo } from "@/components/ui/PoliticaConteudo";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como o site do estúdio R. Lisboa trata os seus dados: formulário de orçamento, cookies de medição e os seus direitos pela LGPD.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-28 pt-40 md:px-0">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Privacidade<span className="text-idv-laranja">.</span>
      </p>
      <h1 className="mt-2 font-display uppercase leading-none text-h1">Política de privacidade</h1>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Atualizada em {POLITICA_ATUALIZADA}
      </p>
      <PoliticaConteudo />

      <p className="mt-16">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.12em] text-maresia transition-colors hover:text-sinal">
          ← Voltar para a home
        </Link>
      </p>
    </div>
  );
}

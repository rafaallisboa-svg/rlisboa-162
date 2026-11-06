import { Suspense } from "react";
import Link from "next/link";
import { OrcamentoForm } from "@/components/ui/OrcamentoForm";
import { StickerR } from "@/components/ui/IdvElementos";

export default function OrcamentoPage() {
  return (
    <div className="relative mx-auto max-w-2xl px-6 pb-28 pt-40 md:px-0">
      <Link
        href="/contato"
        aria-label="Fechar formulário"
        className="group fixed right-6 top-24 z-50 flex h-10 w-10 items-center justify-center border border-cal/20 bg-concreto/80 text-cal backdrop-blur-sm transition-colors hover:border-sinal hover:text-sinal md:right-[clamp(1.5rem,5vw,6rem)]"
      >
        <span aria-hidden="true" className="font-mono text-base leading-none">
          ✕
        </span>
      </Link>

      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
            Orçamento<span className="text-idv-laranja">.</span>
          </p>
          <h1 className="mt-2 font-display uppercase leading-none text-h1">
            Conte o projeto
          </h1>
        </div>
        <StickerR className="hidden h-28 w-auto shrink-0 md:block" />
      </div>

      <Suspense fallback={null}>
        <OrcamentoForm />
      </Suspense>
    </div>
  );
}

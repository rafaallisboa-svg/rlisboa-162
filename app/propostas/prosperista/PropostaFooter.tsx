import { site } from "@/site.config";
import { CONTAINER } from "./chrome";

export function PropostaFooter() {
  return (
    <footer className="bg-[#221F1D] px-6 py-14 text-[#F3EFE6] md:px-16">
      <div className={`${CONTAINER} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
        <div>
          <p className="text-sm font-medium">R. Lisboa — Estúdio 162</p>
          <p className="mt-1 text-xs text-[#F3EFE6]/55">
            Proposta preparada por Rafael Lisboa, designer e diretor de arte
          </p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-[#F3EFE6]/55 md:items-end">
          <span>{site.contato.email}</span>
          <span>{site.contato.telefone}</span>
        </div>
      </div>
    </footer>
  );
}

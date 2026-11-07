import { Cruz } from "@/components/ui/IdvElementos";
import { CartoesServicos } from "./CartoesServicos";

// Home, tablet e desktop: depois dos projetos, o widget de cards na variação interativa (abre na própria grade,
// como na página de Serviços).
export function ServicosHomeGrande() {
  return (
    <section
      id="servicos"
      aria-label="Serviços"
      className="relative hidden bg-idv-amarelo px-6 py-20 text-idv-preto md:block md:px-[clamp(1.5rem,5vw,6rem)]"
    >
      <Cruz className="absolute right-6 top-8 h-5 w-5 text-idv-preto/40 md:right-[clamp(1.5rem,5vw,6rem)]" />
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-idv-preto/60">
        Serviços<span className="text-idv-laranja">.</span>
      </p>
      <CartoesServicos modo="interativo" offsetTopo={84} className="mt-10" />
    </section>
  );
}

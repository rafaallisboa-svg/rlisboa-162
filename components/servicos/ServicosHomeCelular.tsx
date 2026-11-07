import { CartoesServicos } from "./CartoesServicos";

// Home, só no celular: o widget de cards. Tocar num card abre os detalhes na própria Home (não sai da página).
export function ServicosHomeCelular() {
  return (
    <section aria-label="Serviços" className="relative bg-idv-amarelo px-6 pb-16 pt-24 text-idv-preto md:hidden">
      <CartoesServicos modo="interativo" offsetTopo={76} />
    </section>
  );
}

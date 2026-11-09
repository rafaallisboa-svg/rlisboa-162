"use client";

import { useEffect, useRef, useState } from "react";
import { Cruz, StickerRafa } from "@/components/ui/IdvElementos";
import { HeadlineRotator } from "@/components/ui/HeadlineRotator";
import { GrafismoParallax } from "@/components/motion/GrafismoParallax";
import { CartoesServicos } from "@/components/servicos/CartoesServicos";

// Fora do componente: a lista precisa ser sempre a mesma referência.
const PALAVRAS_TITULO = ["Design Gráfico", "Web Design", "Motion Design"];

export default function ServicosPage() {
  const cabecalhoRef = useRef<HTMLDivElement>(null);
  const [compactoRolagem, setCompacto] = useState(false);
  const [servicoAberto, setServicoAberto] = useState<number | null>(null);
  const [telaGrande, setTelaGrande] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const f = () => setTelaGrande(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  // Com um serviço aberto a barra fica sempre encolhida: assim o card pode ser alinhado logo abaixo dela,
  // mesmo quando está perto do topo da página (o primeiro).
  const compacto = compactoRolagem || (telaGrande && servicoAberto !== null);

  // O título fica fixo no topo e encolhe quando a página rola.
  useEffect(() => {
    // Histerese: encolher passa de 140 px, voltar ao tamanho cheio só abaixo de 60 px. Sem isso, a mudança
    // de altura da barra empurra a rolagem e ela fica piscando entre os dois tamanhos.
    const aoRolar = () => setCompacto((c) => (c ? window.scrollY > 60 : window.scrollY > 140));
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <>
    <div className="relative min-h-screen bg-idv-amarelo px-6 pb-24 text-idv-preto md:px-[clamp(1.5rem,5vw,6rem)]">
      <Cruz className="absolute right-6 top-28 hidden h-5 w-5 text-idv-preto/40 md:right-[clamp(1.5rem,5vw,6rem)] md:block" />
      <div
        ref={cabecalhoRef}
        className={`sticky top-0 z-20 -mx-6 px-6 pb-5 transition-[padding,background-color] duration-300 md:-mx-[clamp(1.5rem,5vw,6rem)] md:px-[clamp(1.5rem,5vw,6rem)] ${
          compacto ? "bg-idv-amarelo pt-[76px]" : "bg-idv-amarelo pt-32"
        }`}
      >
        <div className="relative flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p
              className={`font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-300 ${
                compacto ? "text-idv-preto/60" : "text-idv-preto/60"
              }`}
            >
              Serviços
            </p>
            <h1
              className={`mt-2 font-display uppercase leading-none transition-[font-size,color] duration-300 ${
                compacto ? "text-idv-preto" : "text-idv-preto"
              } ${
                compacto
                  ? "text-[clamp(1.25rem,5.5vw,1.75rem)] md:text-4xl"
                  : "text-[clamp(1.5rem,7.2vw,2.5rem)] sm:text-h1"
              }`}
            >
              <HeadlineRotator palavras={PALAVRAS_TITULO} />
            </h1>
          </div>
          <StickerRafa
            className={`absolute right-0 w-auto transition-[height] duration-300 sm:static sm:shrink-0 ${
              compacto ? "-top-1 h-10 sm:mt-0 sm:h-12 md:h-14" : "-top-3 h-14 sm:mt-2 sm:h-24 md:h-36"
            }`}
          />
        </div>
      </div>

      <CartoesServicos
        modo="interativo"
        lerHash
        onAbrir={setServicoAberto}
        offsetTopo={() => cabecalhoRef.current?.offsetHeight ?? 84}
        className="mt-8"
      />
    </div>
    <GrafismoParallax tipo="pavimento" className="bg-idv-amarelo" />
    </>
  );
}

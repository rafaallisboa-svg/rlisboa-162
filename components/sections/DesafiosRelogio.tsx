import { SeloRegua } from "@/components/ui/IdvElementos";

/**
 * Relógio "Quais são seus desafios?" com o botão de orçamento. Bloco global: Contato e fim da Home usam este.
 */
export function DesafiosRelogio({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative mx-auto flex h-[22rem] w-[22rem] items-center justify-center md:h-[30rem] md:w-[30rem]">
        <SeloRegua tinta="var(--color-idv-off)" numero={false} className="absolute inset-0 h-full w-full" />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <p className="max-w-[11rem] text-2xl leading-tight text-cal md:max-w-[13rem] md:text-3xl">
            Quais são seus desafios?
          </p>
          <p className="-mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-maresia">
            Chama o Rafa<span className="text-idv-laranja">.</span>
          </p>
          <a
            href="/orcamento"
            className="inline-flex items-center justify-center rounded-full bg-sinal px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5"
          >
            Solicitar orçamento
          </a>
        </div>
      </div>
    </div>
  );
}

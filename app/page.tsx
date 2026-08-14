import { site } from "@/site.config";
import { isTodo } from "@/lib/placeholder";
import { Clientes } from "@/components/sections/Clientes";
import { ProjetosDestaque } from "@/components/sections/ProjetosDestaque";

/**
 * Fundação (Sprint 1) + Clientes adiantado a pedido do Rafael, pra ele ver
 * o conteúdo real assim que entra. Os outros 7 pavimentos ainda vêm no
 * Sprint 2.
 */
export default function HomePage() {
  return (
    <>
      <section className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
          Sprint 1 — fundação
        </p>
        <h1 className="font-display uppercase leading-none text-hero">
          {site.marca}
          <span className="block font-mono text-mono tabular-nums text-sinal">
            {site.numero}
          </span>
        </h1>
        <p className="max-w-md text-body text-cal/80">
          {isTodo(site.hero.headline) ? "Headline pendente." : site.hero.headline}
        </p>
      </section>
      <ProjetosDestaque />
      <Clientes />
    </>
  );
}

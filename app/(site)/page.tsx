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
      <section className="relative flex min-h-dvh flex-col items-center justify-center gap-6 overflow-hidden px-6 pt-24 text-center">
        {site.hero.video && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          >
            <source src={site.hero.video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-concreto/40 via-concreto/70 to-concreto" />

        <p className="relative font-mono text-xs uppercase tracking-[0.12em] text-maresia">
          Sprint 1 — fundação
        </p>
        <h1 className="relative font-display uppercase leading-none text-hero">
          {site.marca}
          <span className="block font-mono text-mono tabular-nums text-sinal">
            {site.numero}
          </span>
        </h1>
        <p className="relative max-w-md text-body text-cal/80">
          {isTodo(site.hero.headline) ? "Headline pendente." : site.hero.headline}
        </p>
      </section>
      <ProjetosDestaque />
      <Clientes />
    </>
  );
}

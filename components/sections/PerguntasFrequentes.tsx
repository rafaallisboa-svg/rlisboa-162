import Link from "next/link";
import { PERGUNTAS } from "@/content/perguntas-frequentes";
import { JsonLd } from "@/components/seo/JsonLd";
import { Cruz } from "@/components/ui/IdvElementos";
import { IconeServico } from "@/components/ui/IconeServico";

/**
 * Perguntas frequentes no fim de Serviços. Abre e fecha com <details> (funciona
 * sem JavaScript) e leva a marcação FAQPage, que o Google e as IAs leem.
 */
/** Liga as duas últimas palavras para nenhuma ficar sozinha na linha. */
const semOrfa = (t: string) => t.replace(/ (\S+)$/, " $1");

export function PerguntasFrequentes() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map(({ p, r }) => ({
      "@type": "Question",
      name: p,
      acceptedAnswer: { "@type": "Answer", text: r },
    })),
  };

  return (
    <section
      id="perguntas"
      aria-labelledby="titulo-perguntas"
      className="relative bg-concreto px-6 py-20 text-cal md:px-[clamp(1.5rem,5vw,6rem)] md:py-28"
    >
      <JsonLd dados={dados} />
      <Cruz className="absolute right-6 top-8 h-5 w-5 text-idv-grafite md:right-[clamp(1.5rem,5vw,6rem)]" />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
            Dúvidas<span className="text-idv-laranja">.</span>
          </p>
          <h2 id="titulo-perguntas" className="mt-2 font-display uppercase leading-none text-h2">
            Perguntas frequentes
          </h2>
          <p className="mt-6 max-w-sm text-body leading-relaxed text-cal/70">
            Não achou a sua? Me chama que eu respondo em até&nbsp;24&nbsp;horas.
          </p>
          <Link
            href="/orcamento"
            className="mt-8 inline-flex items-center bg-sinal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sinal"
          >
            Pedir orçamento
          </Link>
        </div>

        <div className="border-t border-white/10">
          {PERGUNTAS.map(({ p, r }) => (
            <details
              key={p}
              className="faq group relative border-b border-white/10 transition-colors duration-300 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:origin-top before:scale-y-0 before:bg-sinal before:transition-transform before:duration-500 open:bg-white/[0.035] open:before:scale-y-100"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-4 py-6 pl-4 pr-2 text-cal transition-colors hover:text-sinal md:gap-6 md:pl-6 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-xl leading-snug transition-colors group-open:text-sinal md:text-2xl">{semOrfa(p)}</span>
                <span
                  aria-hidden="true"
                  className="relative block h-5 w-5 shrink-0 text-cal/80 transition-colors duration-300 group-hover:text-sinal group-open:text-sinal"
                >
                  <IconeServico nome="mais" className="absolute inset-0 h-full w-full group-open:hidden" />
                  <IconeServico nome="menos" className="absolute inset-0 hidden h-full w-full group-open:block" />
                </span>
              </summary>
              <p className="faq-r max-w-2xl pb-8 pl-4 pr-10 text-body leading-relaxed text-cal/75 md:pl-6">{r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

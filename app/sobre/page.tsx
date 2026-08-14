import { site } from "@/site.config";
import { LinhasFundo } from "@/components/ui/LinhasFundo";

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-28 pt-40 md:px-16 lg:px-0">
      <div className="relative flex flex-col items-center border-b border-white/10 pb-24 text-center">
        <LinhasFundo />
        <p className="relative font-mono text-xs uppercase tracking-[0.12em] text-maresia">
          Estúdio 162 — desde {site.anoFundacao}
        </p>
        <h2 className="relative mt-6 max-w-2xl font-display uppercase leading-[0.95] text-h1">
          Criar é como eu penso.
        </h2>
      </div>

      <div className="mt-24 grid gap-12 md:grid-cols-[300px_1fr] md:gap-20">
        <div>
          <div className="aspect-[4/5] w-full overflow-hidden bg-blueprint">
            <img
              src="/api/ph?w=800&h=1000&label=Foto Rafael Lisboa"
              alt="Rafael Lisboa"
              className="h-full w-full object-cover opacity-70"
            />
          </div>
          <p className="mt-4 font-display text-base uppercase tracking-tight text-cal">
            Rafael Lisboa
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-maresia">
            Designer e diretor de arte
          </p>
        </div>

        <div className="flex max-w-md flex-col gap-8">
          <p className="text-body text-cal">
            Paulista, casado, pai da Gabi. 43 anos entre publicidade, motion
            graphics e design editorial — sempre com o mesmo objetivo:
            projetos que agregam valor e conectam marcas a pessoas.
          </p>

          <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
                Formação
              </p>
              <p className="mt-2 text-sm text-maresia">
                Motion Graphics — Panamericana (2010–2012)
              </p>
              <p className="mt-1 text-sm text-maresia">
                Publicidade — Oswaldo Cruz (2002–2005)
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
                Atuação
              </p>
              <p className="mt-2 text-sm text-maresia">
                Designer — Conteúdo Editorial
              </p>
              <p className="mt-1 text-sm text-maresia">
                Gerente de Design — Inovativos
              </p>
            </div>
          </div>

          <p className="text-body text-cal">
            Autogestão e vontade constante de aprender guiam o processo — é
            esse impulso que também está por trás do R. Lisboa 162, o espaço
            dos projetos autorais fora da rotina fixa.
          </p>
        </div>
      </div>
    </div>
  );
}

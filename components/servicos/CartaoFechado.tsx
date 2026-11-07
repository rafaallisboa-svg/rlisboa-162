import { IconeServico } from "@/components/ui/IconeServico";
import { ADORNOS, ICONE_DO_SERVICO, INDICE_DESTAQUE, SERVICOS, TILES } from "./dados";

// Elemento pequeno e animado que passa da margem do pôster (só no cartão fechado).
export function Adorno({ i }: { i: number }) {
  const adorno = ADORNOS[i % ADORNOS.length];
  if (!adorno) return null;
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute z-20 ${adorno.pos}`}>
      <span className={`block ${adorno.forma} ${adorno.anim}`} />
    </span>
  );
}

// Miolo do cartão fechado. É o mesmo na página de Serviços (dentro de um botão) e na Home do celular (sem clique).
export function CartaoFechadoConteudo({ i, piscando }: { i: number; piscando: boolean }) {
  const s = SERVICOS[i];
  const c = TILES[i % TILES.length];
  const destaqueTile = i === INDICE_DESTAQUE;
  return (
    <>
      {destaqueTile && (
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-70 md:text-[0.7rem]">Em movimento</span>
      )}
      <span className="relative flex min-h-0 flex-1 items-center justify-center py-1">
        {destaqueTile && (
          <>
            <span aria-hidden="true" className="absolute right-0 top-1 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
              <span className="h-2.5 w-2.5 rounded-full bg-idv-laranja [animation:rec_1.2s_steps(1)_infinite]" />
              rec
            </span>
            <span aria-hidden="true" className="absolute inset-x-0 bottom-1 h-[3px] bg-current/15">
              <span className="block h-full origin-left bg-idv-amarelo [animation:progresso_6s_linear_infinite]" />
            </span>
          </>
        )}
        <IconeServico
          nome={ICONE_DO_SERVICO[s.nome]}
          className={`h-full w-auto max-w-[90%] transition-transform duration-500 ${destaqueTile ? "max-h-[36rem] [animation:flutuar_5s_ease-in-out_infinite]" : "max-h-[19rem]"} group-hover/row:-rotate-3 group-hover/row:scale-105 ${c.icone}`}
        />
      </span>
      <span className="flex items-end justify-between gap-2">
        <span
          className={`block font-display uppercase leading-tight tracking-tight ${
            destaqueTile ? "text-xl md:text-4xl lg:text-5xl" : "text-[0.78rem] md:text-xl lg:text-2xl"
          }`}
        >
          {s.nome}
          <span className="text-idv-laranja">.</span>
        </span>
        <span
          aria-hidden="true"
          style={piscando ? { animation: "piscar 1.4s ease-in-out infinite" } : undefined}
          className="font-mono text-2xl leading-none md:text-3xl"
        >
          +
        </span>
      </span>
    </>
  );
}

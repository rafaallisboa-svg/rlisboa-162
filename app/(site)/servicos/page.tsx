"use client";

import { useEffect, useRef, useState } from "react";
import { slugServico } from "@/lib/servicos";
import { Cruz, StickerRafa } from "@/components/ui/IdvElementos";
import { HeadlineRotator } from "@/components/ui/HeadlineRotator";
import { GrafismoParallax } from "@/components/motion/GrafismoParallax";
import { IconeServico } from "@/components/ui/IconeServico";
import { ICONE_DO_SERVICO, SERVICOS, TILES, ESPACOS, INDICE_DESTAQUE } from "@/components/servicos/dados";
import { Adorno, CartaoFechadoConteudo } from "@/components/servicos/CartaoFechado";

// Fora do componente: a lista precisa ser sempre a mesma referência.
const PALAVRAS_TITULO = ["Design Gráfico", "Web Design", "Motion Design"];

export default function ServicosPage() {
  const [aberto, setAberto] = useState<number | null>(null);
  const [destaque, setDestaque] = useState(0);
  const linhasRef = useRef<(HTMLDivElement | null)[]>([]);
  const cabecalhoRef = useRef<HTMLDivElement>(null);
  const [compacto, setCompacto] = useState(false);

  // O título fica fixo no topo e encolhe quando a página rola.
  useEffect(() => {
    const aoRolar = () => setCompacto(window.scrollY > 140);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Ao abrir um serviço, leva a tela até ele (logo abaixo do menu), para não precisar rolar.
  // Espera a animação de abrir/fechar terminar para medir a posição final.
  useEffect(() => {
    if (aberto === null) return;
    const id = window.setTimeout(() => {
      const el = linhasRef.current[aberto];
      if (!el) return;
      const alturaFixa = cabecalhoRef.current?.offsetHeight ?? 84;
      const topo = el.getBoundingClientRect().top + window.scrollY - alturaFixa - 4;
      window.scrollTo({ top: Math.max(0, topo), behavior: "smooth" });
    }, 340);
    return () => window.clearTimeout(id);
  }, [aberto]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const indice = SERVICOS.findIndex((s) => slugServico(s.nome) === hash);
    if (indice >= 0) setAberto(indice);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDestaque((d) => (d + 1) % SERVICOS.length);
    }, 2200);
    return () => clearInterval(id);
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

      <div className="mt-8 grid grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[minmax(22rem,auto)] md:grid-cols-4">
        {SERVICOS.map((s, i) => {
          const isOpen = aberto === i;
          const c = TILES[i % TILES.length];
          const escuro = c.fg === "text-idv-off";
          const rotulo = "rotuloIncluido" in s ? s.rotuloIncluido : "O que está incluído";
          const destaqueTile = i === INDICE_DESTAQUE;
          const largura = isOpen ? "col-span-2 md:col-span-4" : ESPACOS[i % ESPACOS.length];
          const grupos = "grupos" in s ? s.grupos : [{ nome: rotulo || "Entregas", incluido: s.incluido }];
          const numero = String(i + 1).padStart(2, "0");
          return (
            <div
              key={s.nome}
              ref={(el) => {
                linhasRef.current[i] = el;
              }}
              className={`group/row relative isolate flex flex-col rounded-[3px] transition-[background-color] duration-500 ${largura} ${c.bg} ${c.fg}`}
            >
              {isOpen && <Cruz className="pointer-events-none absolute bottom-5 left-5 h-4 w-4 opacity-50" />}

              {!isOpen && <Adorno i={i} />}

              <button
                type="button"
                onClick={() => setAberto(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`relative z-10 flex w-full text-left ${
                  isOpen
                    ? "min-h-[7.5rem] flex-row items-center justify-between gap-4 p-5 md:min-h-[9rem] md:p-7"
                    : `min-h-[17rem] flex-1 flex-col justify-between gap-3 p-4 md:p-6 ${destaqueTile ? "min-h-[24rem] md:p-9" : ""}`
                }`}
              >
                {isOpen ? (
                  <>
                    <span className="flex min-w-0 items-center gap-4 md:gap-6">
                      <IconeServico nome={ICONE_DO_SERVICO[s.nome]} className={`h-12 w-12 shrink-0 md:h-20 md:w-20 ${c.icone}`} />
                      <span className="font-display text-xl uppercase leading-tight tracking-tight md:text-3xl">
                        {s.nome}
                        <span className="text-idv-laranja">.</span>
                      </span>
                    </span>
                    <span aria-hidden="true" className="rotate-45 font-mono text-4xl leading-none">
                      +
                    </span>
                  </>
                ) : (
                  <CartaoFechadoConteudo i={i} piscando={destaque === i} />
                )}
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 300ms cubic-bezier(0.22,1,0.36,1)",
                  overflow: "hidden",
                }}
              >
                <div style={{ minHeight: 0, overflow: "hidden" }}>
                  <div className="relative z-10 grid gap-10 px-5 pb-16 pt-2 md:grid-cols-12 md:gap-12 md:px-7 md:pb-20">
                    <div className="flex flex-col gap-8 md:col-span-5">
                      <div>
                        <p className={`font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] ${c.rotulo}`}>01 · Sobre o serviço</p>
                        <p className="mt-3 text-xl font-medium leading-snug md:text-2xl">{s.descricao}</p>
                      </div>
                      <div className="border-t border-current/20 pt-6">
                        <p className={`font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] ${c.rotulo}`}>03 · Investimento</p>
                        <p className="mt-2 font-display text-2xl uppercase leading-none tracking-tight">Sob consulta</p>
                        <a
                          href={`/orcamento?servico=${encodeURIComponent(s.nome)}`}
                          className={`mt-5 inline-flex items-center gap-3 py-2 pl-6 pr-2 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5 ${
                            escuro ? "bg-idv-amarelo text-idv-preto" : "bg-idv-preto text-idv-off"
                          }`}
                        >
                          Solicitar orçamento
                          <span
                            aria-hidden="true"
                            className={`flex h-8 w-8 items-center justify-center text-base ${
                              escuro ? "bg-idv-preto text-idv-amarelo" : "bg-idv-amarelo text-idv-preto"
                            }`}
                          >
                            ↗
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col gap-8 md:col-span-7">
                      {grupos.map((g, gi) => (
                        <div key={g.nome} className={gi > 0 ? "border-t border-current/20 pt-6" : ""}>
                          <p className={`font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] ${c.rotulo}`}>
                            02 · {g.nome} · {g.incluido.length}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {g.incluido.map((item) => (
                              <li
                                key={item}
                                className={`cursor-default px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:bg-idv-amarelo hover:text-idv-preto md:text-[0.95rem] ${c.chip}`}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <GrafismoParallax tipo="pavimento" className="bg-idv-amarelo" />
    </>
  );
}

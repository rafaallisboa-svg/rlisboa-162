"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { slugServico } from "@/lib/servicos";
import { Cruz } from "@/components/ui/IdvElementos";
import { IconeServico } from "@/components/ui/IconeServico";
import { ICONE_DO_SERVICO, SERVICOS, TILES, PORTE } from "./dados";
import { Adorno, CartaoFechadoConteudo } from "./CartaoFechado";

/**
 * Widget global dos cards de serviço. Um desenho só, com duas variações:
 *  - "interativo": o card abre na própria grade (sobre o serviço, entregas e orçamento). Página de Serviços e Home grande.
 *  - "estatico": sem abrir; tocar leva à página de Serviços já com aquele serviço aberto. Home do celular.
 * Qualquer mudança de desenho (cores, tamanhos, animações, textos) vale para todas as telas.
 */
export function CartoesServicos({
  modo = "interativo",
  lerHash = false,
  offsetTopo = 84,
  onAbrir,
  className = "",
}: {
  modo?: "interativo" | "estatico";
  /** Abre o serviço indicado no #endereço da página (só na página de Serviços). */
  lerHash?: boolean;
  /** Altura da barra fixa por cima do card aberto, para alinhar a rolagem. */
  offsetTopo?: number | (() => number);
  /** Avisa a página qual card está aberto (null = nenhum). A página de Serviços usa isso para manter a barra fixa encolhida. */
  onAbrir?: (indice: number | null) => void;
  className?: string;
}) {
  const [aberto, setAberto] = useState<number | null>(null);
  const [destaque, setDestaque] = useState(0);
  const linhasRef = useRef<(HTMLDivElement | null)[]>([]);

  // Ao abrir um serviço, leva a tela até ele (logo abaixo do menu), para não precisar rolar.
  // Espera a animação de abrir/fechar terminar para medir a posição final.
  useEffect(() => {
    if (modo !== "interativo" || aberto === null) return;
    // No celular a tela não é movida sozinha: o card abre onde está e a pessoa rola como quiser.
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    // Várias passadas: a barra fixa da página de Serviços encolhe depois que a tela rola, então a primeira medida
    // pode ficar curta (o primeiro card, por exemplo). As seguintes corrigem com a barra já no tamanho final.
    const alinhar = () => {
      const el = linhasRef.current[aberto];
      if (!el) return;
      const alturaFixa = typeof offsetTopo === "function" ? offsetTopo() : offsetTopo;
      const topo = el.getBoundingClientRect().top + window.scrollY - alturaFixa - 4;
      if (Math.abs(Math.max(0, topo) - window.scrollY) < 4) return;
      window.scrollTo({ top: Math.max(0, topo), behavior: "smooth" });
    };
    const ids = [340, 1100, 1900, 2700].map((ms) => window.setTimeout(alinhar, ms));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [aberto, modo, offsetTopo]);

  useEffect(() => {
    onAbrir?.(aberto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto]);

  useEffect(() => {
    if (!lerHash) return;
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const indice = SERVICOS.findIndex((s) => slugServico(s.nome) === hash);
    if (indice >= 0) setAberto(indice);
  }, [lerHash]);

  useEffect(() => {
    const id = setInterval(() => setDestaque((d) => (d + 1) % SERVICOS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="list"
      className={`grid grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[minmax(22rem,auto)] md:grid-cols-4 ${className}`}
    >
      {SERVICOS.map((s, i) => {
        const isOpen = aberto === i;
        const c = TILES[i % TILES.length];
        const escuro = c.fg === "text-idv-off";
        const rotulo = "rotuloIncluido" in s ? s.rotuloIncluido : "O que está incluído";
        const porte = PORTE[i % PORTE.length];
        const ordem = porte.espaco.split(" ").find((k) => k.startsWith("md:order-")) ?? "";
        const largura = isOpen ? `col-span-2 md:col-span-4 ${ordem}` : porte.espaco;
        const grupos = "grupos" in s ? s.grupos : "incluido" in s ? [{ nome: rotulo || "Entregas", incluido: s.incluido }] : [];

          if (modo === "estatico") {
            return (
              <div key={s.nome} className={`group/row relative isolate flex flex-col rounded-[3px] ${porte.espaco} ${c.bg} ${c.fg}`}>
                <Adorno i={i} />
                <Link
                  href={`/servicos#${slugServico(s.nome)}`}
                  aria-label={`${s.nome}: ver na página de serviços`}
                  className={`relative z-10 flex ${porte.altura} flex-1 flex-col justify-between gap-3 p-4`}
                >
                  <CartaoFechadoConteudo i={i} piscando={destaque === i} />
                </Link>
              </div>
            );
          }
        return (
          <div
            role="listitem"
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
                  : `${porte.altura} flex-1 flex-col justify-between gap-3 p-4 ${porte.pad}`
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
                      <p className={`font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] ${c.rotulo}`}>Sobre o serviço</p>
                      <p className="mt-3 text-xl font-medium leading-snug md:text-2xl">{s.descricao}</p>
                    </div>
                    <div className="border-t border-current/20 pt-6">
                      <p className={`font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] ${c.rotulo}`}>Investimento</p>
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
                          {g.nome}
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
  );
}

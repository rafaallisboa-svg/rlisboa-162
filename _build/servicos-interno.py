import re

p = 'app/(site)/servicos/page.tsx'
t = open(p, encoding='utf-8').read()

a = t.index('        {SERVICOS.map((s, i) => {')
b = t.index('      </div>\n    </div>\n    <GrafismoParallax tipo="pavimento"')

novo = '''        {SERVICOS.map((s, i) => {
          const isOpen = aberto === i;
          const c = CARTOES[i % CARTOES.length];
          const f = FORMAS[i % FORMAS.length];
          const espelho = i % 2 === 1;
          const escuro = c.fg === "text-idv-off";
          const rotulo = "rotuloIncluido" in s ? s.rotuloIncluido : "O que está incluído";
          const largura = isOpen || i === SERVICOS.length - 1 ? "md:col-span-6" : "md:col-span-2";
          const grupos = "grupos" in s ? s.grupos : [{ nome: rotulo || "Entregas", incluido: s.incluido }];
          return (
            <div
              key={s.nome}
              ref={(el) => {
                linhasRef.current[i] = el;
              }}
              className={`group/row relative isolate flex flex-col overflow-hidden rounded-[2.25rem] transition-all duration-500 ease-out ${largura} ${c.bg} ${c.fg} ${
                isOpen ? "" : `hover:-translate-y-1 ${c.forma}`
              }`}
            >
              {/* Fechado: formas sobrepostas. Aberto: grade à vista, cruzes e pavimento do key visual, num fundo só. */}
              {!isOpen && (
                <>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-14 h-44 w-44 rounded-full md:h-60 md:w-60 ${espelho ? "-left-14" : "-right-14"} ${f.a}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-16 h-28 w-28 rounded-[2rem] md:top-20 md:h-40 md:w-40 ${espelho ? "left-10 -rotate-12" : "right-10 rotate-12"} ${f.b}`}
                  />
                </>
              )}
              {isOpen && (
                <>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:56px_56px]"
                  />
                  <Cruz className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 opacity-50" />
                  <Pavimento className="pointer-events-none absolute bottom-5 right-5 hidden h-12 w-auto md:block" />
                </>
              )}

              <button
                type="button"
                onClick={() => setAberto(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`relative z-10 flex w-full flex-col justify-between gap-6 p-5 text-left md:p-7 ${
                  isOpen ? "min-h-[7.5rem] md:min-h-[9rem]" : "min-h-[8.5rem] md:min-h-[13rem]"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover/row:-rotate-6 group-hover/row:scale-105 md:h-20 md:w-20 md:rounded-3xl ${c.selo}`}
                  >
                    {ICONE_DO_SERVICO[s.nome] && (
                      <IconeServico nome={ICONE_DO_SERVICO[s.nome]} className="h-8 w-8 md:h-11 md:w-11" />
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    style={
                      destaque === i && !isOpen
                        ? { animation: "piscar 1.4s ease-in-out infinite" }
                        : undefined
                    }
                    className={`flex h-9 w-9 shrink-0 items-center justify-center font-mono text-4xl leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </span>
                <span className="font-display text-[clamp(1rem,4.6vw,1.25rem)] uppercase leading-tight tracking-tight md:text-xl lg:text-3xl">
                  {s.nome}
                </span>
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
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-60">01 · Sobre o serviço</p>
                        <p className="mt-3 text-xl font-medium leading-snug md:text-2xl">{s.descricao}</p>
                      </div>
                      <div className="border-t border-current/20 pt-6">
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-60">03 · Investimento</p>
                        <p className="mt-2 font-display text-2xl uppercase leading-none tracking-tight">Sob consulta</p>
                        <a
                          href={`/orcamento?servico=${encodeURIComponent(s.nome)}`}
                          className={`mt-5 inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5 ${
                            escuro ? "bg-idv-amarelo text-idv-preto" : "bg-idv-preto text-idv-off"
                          }`}
                        >
                          Solicitar orçamento
                          <span
                            aria-hidden="true"
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${
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
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-60">
                            02 · {g.nome} · {g.incluido.length}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {g.incluido.map((item) => (
                              <li
                                key={item}
                                className="cursor-default rounded-full border border-current/35 px-4 py-2 text-sm font-medium transition-colors duration-150 hover:border-transparent hover:bg-idv-laranja hover:text-idv-preto md:text-[0.95rem]"
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
'''
t = t[:a] + novo + t[b:]

# componentes antigos sem uso (TONS e CartaoLista)
i0 = t.index('const TONS = {')
i1 = t.index('// Formas sobrepostas atrás')
t = t[:i0] + t[i1:]

t = t.replace('import { Cruz, StickerRafa } from "@/components/ui/IdvElementos";',
              'import { Cruz, Pavimento, StickerRafa } from "@/components/ui/IdvElementos";')

# sem inclinação nos cartões (parecia cartão de crédito): só diferença de altura e de posição
t = re.sub(r' md:-?rotate-\[[0-9.]+deg\]', '', t)
t = re.sub(r'(forma: ")([^"]*)(")', lambda m: m.group(1) + m.group(2).replace('md:-rotate-[1.2deg]', '') + m.group(3), t)

open(p, 'w', encoding='utf-8').write(t)
print('ok')

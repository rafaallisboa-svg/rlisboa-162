import re

p = 'app/(site)/servicos/page.tsx'
t = open(p, encoding='utf-8').read()

# 1) troca FORMAS + CARTOES por TILES (pôsteres do key visual)
a = t.index('// Formas sobrepostas atrás')
b = t.index('] as const;', t.index('const CARTOES = [')) + len('] as const;')
tiles = '''// Cada serviço é um pôster do key visual: fundo chapado, grade à vista, cruz de mira, mono em caixa alta e um
// elemento animado ou geométrico do sistema (selo de régua, selo de órbitas, pavimento) cortado pelo quadro.
type Selo = "regua" | "orbitas" | "pavimento";
const TILES: readonly {
  bg: string;
  fg: string;
  selo: Selo;
  tinta?: string;
  pavimento?: "claro" | "escuro";
}[] = [
  { bg: "bg-idv-preto", fg: "text-idv-off", selo: "regua", tinta: "var(--color-idv-off)" },
  { bg: "bg-idv-off", fg: "text-idv-preto", selo: "regua", tinta: "var(--color-idv-preto)" },
  { bg: "bg-idv-laranja", fg: "text-idv-preto", selo: "pavimento", pavimento: "escuro" },
  { bg: "bg-idv-pedra", fg: "text-idv-preto", selo: "regua", tinta: "var(--color-idv-preto)" },
  { bg: "bg-idv-grafite", fg: "text-idv-off", selo: "orbitas" },
  { bg: "bg-[#FFE27A]", fg: "text-idv-preto", selo: "pavimento", pavimento: "claro" },
  { bg: "bg-idv-cinza", fg: "text-idv-preto", selo: "regua", tinta: "var(--color-idv-off)" },
];

function ElementoDoTile({ tile }: { tile: (typeof TILES)[number] }) {
  if (tile.selo === "regua") return <SeloRegua numero={false} tinta={tile.tinta} className="h-full w-full" />;
  if (tile.selo === "orbitas") return <SeloAneis className="h-full w-full" />;
  return <Pavimento className="h-full w-full" />;
}
'''
t = t[:a] + tiles + t[b:]

# 2) bloco dos itens
a = t.index('        {SERVICOS.map((s, i) => {')
b = t.index('      </div>\n    </div>\n    <GrafismoParallax tipo="pavimento"')
novo = '''        {SERVICOS.map((s, i) => {
          const isOpen = aberto === i;
          const c = TILES[i % TILES.length];
          const escuro = c.fg === "text-idv-off";
          const rotulo = "rotuloIncluido" in s ? s.rotuloIncluido : "O que está incluído";
          const largura = isOpen ? "md:col-span-4" : "md:col-span-1";
          const grupos = "grupos" in s ? s.grupos : [{ nome: rotulo || "Entregas", incluido: s.incluido }];
          const numero = String(i + 1).padStart(2, "0");
          return (
            <div
              key={s.nome}
              ref={(el) => {
                linhasRef.current[i] = el;
              }}
              className={`group/row relative isolate flex flex-col overflow-hidden rounded-[3px] transition-[background-color] duration-500 ${largura} ${c.bg} ${c.fg}`}
            >
              {/* grade à vista e cruz de mira, como nos pôsteres */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:56px_56px]"
              />
              <Cruz className="pointer-events-none absolute right-4 top-4 h-5 w-5 opacity-60" />

              {/* elemento do key visual cortado pelo quadro (só quando fechado) */}
              {!isOpen && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-14 -right-14 h-44 w-44 opacity-90 transition-transform duration-700 group-hover/row:scale-110 md:-bottom-20 md:-right-20 md:h-72 md:w-72"
                >
                  <ElementoDoTile tile={c} />
                </span>
              )}

              <button
                type="button"
                onClick={() => setAberto(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`relative z-10 flex w-full text-left ${
                  isOpen
                    ? "min-h-[7.5rem] flex-col justify-between gap-6 p-5 md:min-h-[9rem] md:p-7"
                    : "min-h-[6.5rem] flex-row items-center gap-4 p-5 md:min-h-[27rem] md:flex-col md:items-start md:justify-between md:p-7"
                }`}
              >
                <span className="flex items-start gap-4 md:w-full md:justify-between">
                  <IconeServico
                    nome={ICONE_DO_SERVICO[s.nome]}
                    className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover/row:-rotate-6 group-hover/row:scale-110 md:h-14 md:w-14"
                  />
                  <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-70 md:block">
                    {numero} / 07
                  </span>
                </span>
                <span className="flex min-w-0 flex-1 items-center justify-between gap-3 md:block md:flex-none">
                  <span className="block font-display text-[clamp(0.95rem,4.4vw,1.2rem)] uppercase leading-tight tracking-tight md:text-2xl lg:text-3xl">
                    {s.nome}
                    <span className="text-idv-laranja">.</span>
                  </span>
                  <span
                    aria-hidden="true"
                    style={
                      destaque === i && !isOpen
                        ? { animation: "piscar 1.4s ease-in-out infinite" }
                        : undefined
                    }
                    className={`font-mono text-3xl leading-none transition-transform duration-300 md:hidden ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
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
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-60">
                            02 · {g.nome} · {g.incluido.length}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {g.incluido.map((item) => (
                              <li
                                key={item}
                                className="cursor-default border border-current/35 px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:border-transparent hover:bg-idv-laranja hover:text-idv-preto md:text-[0.95rem]"
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

# grade: 4 colunas em pôsteres retos
t = t.replace('<div className="mt-8 grid items-start gap-x-4 gap-y-4 md:grid-cols-6 md:gap-x-5 md:gap-y-12">',
              '<div className="mt-8 grid items-start gap-3 md:grid-cols-4">')
t = t.replace('import { Cruz, Pavimento, StickerRafa } from "@/components/ui/IdvElementos";',
              'import { Cruz, Pavimento, SeloAneis, SeloRegua, StickerRafa } from "@/components/ui/IdvElementos";')
open(p, 'w', encoding='utf-8').write(t)
print('ok')

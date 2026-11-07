import re

p = 'app/(site)/servicos/page.tsx'
t = open(p, encoding='utf-8').read()

# 1) TILES: so cor do icone (o icone gigante e o elemento principal)
a = t.index('// Cada serviço é um pôster do key visual')
b = t.index('function ElementoDoTile')
b = t.index('}\n', t.index('return <Pavimento', b)) + 2
tiles = '''// Cada serviço é um pôster vertical do key visual: fundo chapado, grade à vista, cruz de mira, mono em caixa
// alta e o ícone gigante, quase na largura toda do quadro.
const TILES: readonly { bg: string; fg: string; icone: string }[] = [
  { bg: "bg-idv-preto", fg: "text-idv-off", icone: "text-idv-amarelo" },
  { bg: "bg-idv-off", fg: "text-idv-preto", icone: "text-idv-preto" },
  { bg: "bg-idv-laranja", fg: "text-idv-preto", icone: "text-idv-preto" },
  { bg: "bg-idv-pedra", fg: "text-idv-preto", icone: "text-idv-preto" },
  { bg: "bg-idv-grafite", fg: "text-idv-off", icone: "text-idv-amarelo" },
  { bg: "bg-[#FFE27A]", fg: "text-idv-preto", icone: "text-idv-preto" },
  { bg: "bg-idv-cinza", fg: "text-idv-preto", icone: "text-idv-off" },
];
'''
t = t[:a] + tiles + t[b:]

# 2) grade 2 colunas no celular, 4 no desktop
t = t.replace('<div className="mt-8 grid items-start gap-3 md:grid-cols-4">',
              '<div className="mt-8 grid grid-cols-2 items-start gap-3 md:grid-cols-4">')
t = t.replace('const largura = isOpen ? "md:col-span-4" : "md:col-span-1";',
              'const largura = isOpen ? "col-span-2 md:col-span-4" : i === SERVICOS.length - 1 ? "col-span-2" : "col-span-1";')

# 3) tira o elemento cortado e refaz o botao
a = t.index('              {/* elemento do key visual cortado pelo quadro (só quando fechado) */}')
b = t.index('              <div\n                style={{\n                  display: "grid",')
botao = '''              <button
                type="button"
                onClick={() => setAberto(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`relative z-10 flex w-full text-left ${
                  isOpen
                    ? "min-h-[7.5rem] flex-row items-center justify-between gap-4 p-5 md:min-h-[9rem] md:p-7"
                    : "min-h-[17rem] flex-col justify-between gap-3 p-4 md:min-h-[31rem] md:p-6"
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
                  <>
                    <span className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-70 md:text-[0.7rem]">
                      <span>
                        {numero} / 07
                      </span>
                    </span>
                    <span className="flex flex-1 items-center justify-center py-1">
                      <IconeServico
                        nome={ICONE_DO_SERVICO[s.nome]}
                        className={`h-full max-h-[19rem] w-auto max-w-[90%] transition-transform duration-500 group-hover/row:-rotate-3 group-hover/row:scale-105 ${c.icone}`}
                      />
                    </span>
                    <span className="flex items-end justify-between gap-2">
                      <span className="block font-display text-[0.78rem] uppercase leading-tight tracking-tight md:text-xl lg:text-2xl">
                        {s.nome}
                        <span className="text-idv-laranja">.</span>
                      </span>
                      <span
                        aria-hidden="true"
                        style={
                          destaque === i
                            ? { animation: "piscar 1.4s ease-in-out infinite" }
                            : undefined
                        }
                        className="font-mono text-2xl leading-none md:text-3xl"
                      >
                        +
                      </span>
                    </span>
                  </>
                )}
              </button>

'''
t = t[:a] + botao + t[b:]

# 4) imports e utilitarios que nao servem mais
t = t.replace('import { Cruz, Pavimento, SeloAneis, SeloRegua, StickerRafa } from "@/components/ui/IdvElementos";',
              'import { Cruz, StickerRafa } from "@/components/ui/IdvElementos";')
open(p, 'w', encoding='utf-8').write(t)
print('ok')

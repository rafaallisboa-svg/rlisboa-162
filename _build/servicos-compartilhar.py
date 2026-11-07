p = 'app/(site)/servicos/page.tsx'
t = open(p, encoding='utf-8').read()
lines = t.split('\n')
# trechos (indices 0-based)
i_icone = t.index('const ICONE_DO_SERVICO')
i_pal = t.index('// Fora do componente')
i_serv = t.index('const SERVICOS = [')
i_comp = t.index('export default function ServicosPage()')
icone = t[i_icone:i_pal]
dados = t[i_serv:i_comp]
dados = dados.replace('const SERVICOS = [', 'export const SERVICOS = [', 1)
dados = dados.replace('const TILES:', 'export const TILES:', 1)
dados = dados.replace('const ADORNOS:', 'export const ADORNOS:', 1)
icone = icone.replace('const ICONE_DO_SERVICO', 'export const ICONE_DO_SERVICO', 1)
espacos = '''
// Espaço de cada cartão na grade da página de Serviços (celular / desktop).
export const ESPACOS = [
  "col-span-2 md:col-span-2", // Identidade Visual: larga
  "col-span-1", // Website
  "col-span-1 md:row-span-2", // Apresentação: alta
  "col-span-1", // Social Media Kit
  "col-span-2 md:col-span-2 md:row-span-2", // Vídeo e Motion: o grande, único animado por dentro
  "col-span-1", // Eventos
  "col-span-2 md:col-span-1", // Materiais Gráficos
];

// Vídeo e Motion Graphics: o grande, o único animado por dentro.
export const INDICE_DESTAQUE = 4;
'''
head = '''// Fonte única dos cartões de serviço: a página /servicos e a Home (celular) leem daqui.
import type { NomeIconeServico } from "@/components/ui/IconeServico";

'''
open('components/servicos/dados.ts','w',encoding='utf-8').write(head + icone + '\n' + dados + espacos)

# page: remove definicoes e importa
t = t[:i_icone] + '// Fora do componente: a lista precisa ser sempre a mesma referência.\nconst PALAVRAS_TITULO = ["Design Gráfico", "Web Design", "Motion Design"];\n\n' + t[i_comp:]
t = t.replace('import { IconeServico, type NomeIconeServico } from "@/components/ui/IconeServico";',
 'import { IconeServico } from "@/components/ui/IconeServico";\nimport { ICONE_DO_SERVICO, SERVICOS, TILES, ESPACOS, INDICE_DESTAQUE } from "@/components/servicos/dados";\nimport { Adorno, CartaoFechadoConteudo } from "@/components/servicos/CartaoFechado";')
# espacos dentro do map
a = t.index('          const ESPACOS = [')
b = t.index('          const largura =')
t = t[:a] + t[b:]
t = t.replace('const destaqueTile = i === 4; // Vídeo e Motion Graphics: o grande, o único animado por dentro\n          const adorno = ADORNOS[i % ADORNOS.length];', 'const destaqueTile = i === INDICE_DESTAQUE;')
# adorno
a = t.index('              {/* elementos pequenos e animados')
b = t.index('              <button\n                type="button"\n                onClick={() => setAberto')
t = t[:a] + '              {!isOpen && <Adorno i={i} />}\n\n' + t[b:]
# conteudo fechado
a = t.index('                ) : (\n                  <>\n                    <span className="flex items-center justify-between font-mono')
b = t.index('                )}\n              </button>')
t = t[:a] + '                ) : (\n                  <CartaoFechadoConteudo i={i} piscando={destaque === i} />\n' + t[b:]
open(p,'w',encoding='utf-8').write(t)
print('ok')

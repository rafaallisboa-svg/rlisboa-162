import re, textwrap
p='app/(site)/servicos/page.tsx'
t=open(p,encoding='utf-8').read()
a=t.index('      <div className="mt-8 grid grid-flow-dense')
b=t.index('    </div>\n    <GrafismoParallax')
grade=t[a:b]
# trecho interno do map (tiles interativos)
m0=grade.index('        {SERVICOS.map((s, i) => {')
m1=grade.index('        })}\n')+len('        })}\n')
mapa=grade[m0:m1]
mapa=textwrap.dedent(mapa)
mapa=textwrap.indent(mapa,'      ')
mapa=mapa.replace('return (\n        <div\n          key={s.nome}','return (\n        <div\n          key={s.nome}')
# insere ramo estático logo depois das constantes iniciais do map
estatico='''
          if (modo === "estatico") {
            return (
              <div key={s.nome} role="listitem" className={`group/row relative isolate flex flex-col rounded-[3px] ${ESPACOS[i % ESPACOS.length]} ${c.bg} ${c.fg}`}>
                <Adorno i={i} />
                <Link
                  href={`/servicos#${slugServico(s.nome)}`}
                  aria-label={`${s.nome}: ver na página de serviços`}
                  className={`relative z-10 flex min-h-[17rem] flex-1 flex-col justify-between gap-3 p-4 ${destaqueTile ? "min-h-[24rem]" : ""}`}
                >
                  <CartaoFechadoConteudo i={i} piscando={destaque === i} />
                </Link>
              </div>
            );
          }
'''
mapa=mapa.replace('const numero = String(i + 1).padStart(2, "0");\n','const numero = String(i + 1).padStart(2, "0");\n'+estatico,1) if 'const numero = String(i + 1).padStart(2, "0");\n' in mapa else mapa
open('_build/_mapa.txt','w',encoding='utf-8').write(mapa)
print(mapa[:900])

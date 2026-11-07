p = 'app/(site)/servicos/page.tsx'
t = open(p, encoding='utf-8').read()

def rep(a, b):
    global t
    assert t.count(a) == 1, a[:70]
    t = t.replace(a, b)

# 1) tamanhos: Vídeo e Motion grande (único card animado); Identidade larga
a = t.index('          const ESPACOS = [')
b = t.index('          const largura =')
t = t[:a] + '''          const ESPACOS = [
            "col-span-2 md:col-span-2", // Identidade Visual: larga
            "col-span-1", // Website
            "col-span-1 md:row-span-2", // Apresentação: alta
            "col-span-1", // Social Media Kit
            "col-span-2 md:col-span-2 md:row-span-2", // Vídeo e Motion: o grande, único animado por dentro
            "col-span-1", // Eventos
            "col-span-2 md:col-span-1", // Materiais Gráficos
          ];
''' + t[b:]
rep('const destaqueTile = i === 0; // Identidade Visual: o serviço principal, o maior',
    'const destaqueTile = i === 4; // Vídeo e Motion Graphics: o grande, o único animado por dentro\n          const adorno = ADORNOS[i % ADORNOS.length];')
rep('{numero} / 07{destaqueTile ? " · serviço principal" : ""}', '{numero} / 07{destaqueTile ? " · em movimento" : ""}')

# 2) tiles sem overflow-hidden (elementos pequenos passam da margem)
rep('group/row relative isolate flex flex-col overflow-hidden rounded-[3px]', 'group/row relative isolate flex flex-col rounded-[3px]')

# 3) adornos pequenos animados que ultrapassam a margem + animação do tile de vídeo
a = t.index('              {/* cruz de mira do key visual')
b = t.index('              <button\n                type="button"\n                onClick={() => setAberto(isOpen ? null : i)}')
t = t[:a] + '''              {isOpen && <Cruz className="pointer-events-none absolute bottom-5 left-5 h-4 w-4 opacity-50" />}

              {/* elementos pequenos e animados que passam da margem do pôster (só fechado) */}
              {!isOpen && adorno && (
                <span aria-hidden="true" className={`pointer-events-none absolute z-20 ${adorno.pos}`}>
                  <span className={`block ${adorno.forma} ${adorno.anim}`} />
                </span>
              )}

''' + t[b:]

# 4) icone do video animado: pulso + barra de progresso + REC
rep('''                    <span className="flex min-h-0 flex-1 items-center justify-center py-1">
                      <IconeServico''', '''                    <span className="relative flex min-h-0 flex-1 items-center justify-center py-1">
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
                      <IconeServico''')
rep('className={`h-full w-auto max-w-[90%] transition-transform duration-500 ${destaqueTile ? "max-h-[36rem]" : "max-h-[19rem]"}',
    'className={`h-full w-auto max-w-[90%] transition-transform duration-500 ${destaqueTile ? "max-h-[36rem] [animation:flutuar_5s_ease-in-out_infinite]" : "max-h-[19rem]"}')

# 5) definicao dos adornos
rep('function ElementoDoTile', 'function ElementoDoTile') if 'function ElementoDoTile' in t else None
marker = 'export default function ServicosPage() {'
adornos = '''// Pequenos elementos animados que ultrapassam a margem de cada pôster. Só o de Vídeo e Motion é animado por dentro.
const ADORNOS: readonly ({ pos: string; forma: string; anim: string } | null)[] = [
  { pos: "-right-2 -top-2", forma: "h-5 w-5 rounded-full bg-idv-laranja", anim: "[animation:pulsar_2.2s_ease-in-out_infinite]" },
  { pos: "-right-3 top-10", forma: "h-5 w-5 rotate-45 border-2 border-idv-preto", anim: "[animation:girar_9s_linear_infinite]" },
  { pos: "-left-2 bottom-24", forma: "h-3.5 w-3.5 bg-idv-preto", anim: "[animation:quicar_2.4s_ease-in-out_infinite]" },
  { pos: "-right-3 bottom-10", forma: "h-6 w-6 rounded-full border-2 border-idv-preto", anim: "[animation:girar_7s_linear_infinite]" },
  null,
  { pos: "-left-2 -top-2", forma: "h-4 w-4 rounded-full bg-idv-laranja", anim: "[animation:pulsar_2.6s_ease-in-out_infinite]" },
  { pos: "-bottom-2 -right-2", forma: "h-4 w-4 bg-idv-laranja", anim: "[animation:girar_8s_linear_infinite]" },
];

'''
t = t.replace(marker, adornos + marker, 1)
open(p, 'w', encoding='utf-8').write(t)

# keyframes globais
g = 'app/(site)/globals.css'
c = open(g, encoding='utf-8').read()
c += '''
/* Serviços: pequenos elementos animados e o ícone de vídeo em movimento. */
@keyframes pulsar {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

@keyframes quicar {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-9px);
  }
}

@keyframes flutuar {
  0%,
  100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-10px) rotate(1.5deg);
  }
}

@keyframes progresso {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes rec {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.15;
  }
}

@media (prefers-reduced-motion: reduce) {
  [class*="animation:pulsar"],
  [class*="animation:girar"],
  [class*="animation:quicar"],
  [class*="animation:flutuar"],
  [class*="animation:progresso"],
  [class*="animation:rec"] {
    animation: none !important;
  }
}
'''
open(g, 'w', encoding='utf-8').write(c)
print('ok')

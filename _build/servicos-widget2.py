mapa=open('_build/_mapa.txt',encoding='utf-8').read()
cabeca='''"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { slugServico } from "@/lib/servicos";
import { Cruz } from "@/components/ui/IdvElementos";
import { IconeServico } from "@/components/ui/IconeServico";
import { ICONE_DO_SERVICO, SERVICOS, TILES, ESPACOS, INDICE_DESTAQUE } from "./dados";
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
  className = "",
}: {
  modo?: "interativo" | "estatico";
  /** Abre o serviço indicado no #endereço da página (só na página de Serviços). */
  lerHash?: boolean;
  /** Altura da barra fixa por cima do card aberto, para alinhar a rolagem. */
  offsetTopo?: number | (() => number);
  className?: string;
}) {
  const [aberto, setAberto] = useState<number | null>(null);
  const [destaque, setDestaque] = useState(0);
  const linhasRef = useRef<(HTMLDivElement | null)[]>([]);

  // Ao abrir um serviço, leva a tela até ele (logo abaixo do menu), para não precisar rolar.
  // Espera a animação de abrir/fechar terminar para medir a posição final.
  useEffect(() => {
    if (modo !== "interativo" || aberto === null) return;
    const id = window.setTimeout(() => {
      const el = linhasRef.current[aberto];
      if (!el) return;
      const alturaFixa = typeof offsetTopo === "function" ? offsetTopo() : offsetTopo;
      const topo = el.getBoundingClientRect().top + window.scrollY - alturaFixa - 4;
      window.scrollTo({ top: Math.max(0, topo), behavior: "smooth" });
    }, 340);
    return () => window.clearTimeout(id);
  }, [aberto, modo, offsetTopo]);

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
'''
fim='''    </div>
  );
}
'''
mapa=mapa.replace('role="listitem" ','').replace('<div\n          key={s.nome}','<div\n          role="listitem"\n          key={s.nome}')
open('components/servicos/CartoesServicos.tsx','w',encoding='utf-8').write(cabeca+mapa+fim)

# página: usa o widget
p='app/(site)/servicos/page.tsx'
t=open(p,encoding='utf-8').read()
a=t.index('      <div className="mt-8 grid grid-flow-dense')
b=t.index('    </div>\n    <GrafismoParallax')
t=t[:a]+'''      <CartoesServicos
        modo="interativo"
        lerHash
        offsetTopo={() => cabecalhoRef.current?.offsetHeight ?? 84}
        className="mt-8"
      />
'''+t[b:]
# remove estado/efeitos que foram para o widget
a=t.index('  // Ao abrir um serviço, leva a tela')
b=t.index('  return (\n    <>')
t=t[:a]+t[b:]
t=t.replace('  const [aberto, setAberto] = useState<number | null>(null);\n  const [destaque, setDestaque] = useState(0);\n  const linhasRef = useRef<(HTMLDivElement | null)[]>([]);\n','')
t=t.replace('import { useEffect, useRef, useState } from "react";\nimport { slugServico } from "@/lib/servicos";\n','import { useEffect, useRef, useState } from "react";\n')
a=t.index('import { IconeServico }')
b=t.index('// Fora do componente')
t=t[:a]+'import { CartoesServicos } from "@/components/servicos/CartoesServicos";\n\n'+t[b:]
open(p,'w',encoding='utf-8').write(t)

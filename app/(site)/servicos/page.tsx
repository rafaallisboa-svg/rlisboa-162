"use client";

import { useEffect, useRef, useState } from "react";
import { slugServico } from "@/lib/servicos";
import { Cruz, StickerRafa } from "@/components/ui/IdvElementos";
import { HeadlineRotator } from "@/components/ui/HeadlineRotator";
import { GrafismoParallax } from "@/components/motion/GrafismoParallax";
import { IconeServico, type NomeIconeServico } from "@/components/ui/IconeServico";

const ICONE_DO_SERVICO: Record<string, NomeIconeServico> = {
  "Identidade Visual": "identidade",
  Website: "site",
  "Apresentação": "slide",
  "Social Media Kit": "redes",
  "Vídeo & Motion Graphics": "video",
  Eventos: "eventos",
  "Materiais Gráficos": "materiais",
};

// Fora do componente: a lista precisa ser sempre a mesma referência.
const PALAVRAS_TITULO = ["Design Gráfico", "Web Design", "Motion Design"];

const SERVICOS = [
  {
    nome: "Identidade Visual",
    descricao:
      "Sistema de marca — do zero ou redesign — pronto pra aplicar em qualquer ponto de contato. Do essencial ao sistema completo.",
    grupos: [
      {
        nome: "Básico",
        incluido: [
          "Logotipo e variações",
          "Paleta de cores",
          "Tipografia",
          "Manual de marca",
          "Favicon e ícone de app",
          "Arquivos finais (SVG, PNG) e fontes",
        ],
      },
      {
        nome: "Completo",
        incluido: [
          "Pesquisa e briefing",
          "Conceito e símbolo",
          "Logotipo e assinaturas (horizontal, vertical, com descritor)",
          "Versões: positiva, negativa, monocromática e tons de cinza",
          "Grade de construção, área de proteção e tamanhos mínimos",
          "Paleta de cores, gradientes e contraste",
          "Tipografia e escala tipográfica",
          "Elementos gráficos e padrões",
          "Sistema de ícones",
          "Tom de voz e guia de escrita",
          "Diretrizes de fotografia",
          "Papelaria",
          "Capa de LinkedIn",
          "Templates de posts para redes sociais",
          "Template de apresentação",
          "Favicon e ícone de app",
          "Manual de marca online",
          "Arquivos finais (SVG, PNG) e fontes",
        ],
      },
    ],
  },
  {
    nome: "Website",
    descricao:
      "Site institucional, de portfólio, landing page ou de evento, do zero, com conteúdo real e performance de verdade.",
    grupos: [
      {
        nome: "Institucional, portfólio e landing page",
        incluido: [
          "Landing page",
          "Design responsivo",
          "Copywriting",
          "Estrutura de páginas",
          "Otimização de imagens",
          "Publicação e domínio",
          "SEO básico",
        ],
      },
      {
        nome: "Eventos",
        incluido: [
          "Hero com data, local e chamada de inscrição",
          "Números do evento",
          "Sobre o evento",
          "Agenda / programação por painel",
          "Palestrantes (carrossel ou grade)",
          "Depoimentos",
          "Galeria de fotos e vídeos",
          "Cobertura pós-evento",
          "Histórico de edições",
          "Patrocínio e cotas",
          "Inscrição / ingressos",
          "Newsletter e contato (WhatsApp)",
          "Atualização contínua sem refazer páginas",
        ],
      },
    ],
  },
  {
    nome: "Apresentação",
    descricao:
      "Slides que sustentam uma reunião ou um pitch, sem clichê de template.",
    incluido: [
      "Estrutura narrativa",
      "Template mestre",
      "Slides personalizados",
      "Imagens, ícones e ilustrações",
      "Exportação em PDF/PPTX",
    ],
  },
  {
    nome: "Social Media Kit",
    descricao:
      "Identidade inicial rápida e premium pra redes sociais — cada peça no formato que fizer mais sentido pro conteúdo.",
    grupos: [
      {
        nome: "Peças",
        incluido: [
          "Post Instagram",
          "Post Facebook",
          "Post LinkedIn",
          "Carrossel (até 10 slides)",
          "Post de citação/anúncio",
          "Post de venda/CTA",
          "Story",
          "Capa de Reels/Story",
          "Capas de destaque (Instagram)",
        ],
      },
      {
        nome: "Formato",
        incluido: ["Imagem estática", "Carrossel de imagens", "Vídeo"],
      },
    ],
  },
  {
    nome: "Vídeo & Motion Graphics",
    descricao:
      "Edição e motion pra tela — de um vídeo institucional a um painel de LED num evento ao vivo.",
    rotuloIncluido: "",
    incluido: [
      "Edição de vídeo",
      "Motion graphics",
      "Vinhetas e aberturas",
      "Vídeos para painéis de LED",
      "Cenografia digital",
      "Apresentações em vídeo",
    ],
  },
  {
    nome: "Eventos",
    descricao:
      "Toda a comunicação visual de um evento — palco, credenciamento, telas e material impresso — com uma linguagem só.",
    rotuloIncluido: "",
    incluido: [
      "Identidade visual do evento",
      "Apresentação/PPT",
      "Cenografia em vídeo para telas de LED",
      "Imagens em grande formato para impressão",
      "Backdrop / painel de fotos",
      "Crachá e credenciamento",
      "Convite digital / e-mail marketing",
      "Peças para redes sociais",
      "Site do evento",
      "Landing page de inscrição",
    ],
  },
  {
    nome: "Materiais Gráficos",
    descricao:
      "Peças gráficas, publicações e diagramação — do conceito ao arquivo pronto pra impressão ou tela.",
    rotuloIncluido: "",
    incluido: [
      "Diagramação editorial",
      "Revistas e catálogos",
      "Relatórios e apresentações institucionais",
      "Infográficos",
      "Anúncios e peças publicitárias",
      "Papelaria",
      "Impressos em geral",
    ],
  },
] as const;


const TONS = {
  off: {
    card: "bg-idv-off text-idv-preto",
    rotulo: "bg-idv-preto text-idv-off",
    pill: "border-idv-preto/50 text-idv-preto hover:border-idv-preto hover:bg-idv-laranja hover:text-idv-preto",
    num: "text-idv-preto/50",
  },
  pedra: {
    card: "bg-idv-pedra text-idv-preto",
    rotulo: "bg-idv-preto text-idv-off",
    pill: "border-idv-preto/30 text-idv-preto hover:border-idv-preto hover:bg-idv-laranja hover:text-idv-preto",
    num: "text-idv-preto/50",
  },
  contorno: {
    card: "border-2 border-idv-preto text-idv-preto",
    rotulo: "bg-idv-preto text-idv-amarelo",
    pill: "border-idv-preto/60 text-idv-preto hover:border-idv-preto hover:bg-idv-laranja hover:text-idv-preto",
    num: "text-idv-preto/50",
  },
  preto: {
    card: "bg-idv-preto text-idv-off",
    rotulo: "bg-idv-amarelo text-idv-preto",
    pill: "border-idv-off/45 text-idv-off hover:border-idv-laranja hover:bg-idv-laranja hover:text-idv-preto",
    num: "text-idv-cinza",
  },
} as const;

function CartaoLista({
  rotulo,
  itens,
  tom,
  className = "",
}: {
  rotulo?: string;
  itens: readonly string[];
  tom: keyof typeof TONS;
  className?: string;
}) {
  const c = TONS[tom];
  return (
    <div className={`p-6 md:p-8 ${c.card} ${className}`}>
      <div className="flex items-center justify-between gap-4">
        {rotulo ? (
          <span className={`rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] ${c.rotulo}`}>
            {rotulo}
          </span>
        ) : (
          <span />
        )}
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        {itens.map((item) => (
          <li key={item} className={`cursor-default rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 md:text-[0.95rem] ${c.pill}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicosPage() {
  const [aberto, setAberto] = useState<number | null>(null);
  const [destaque, setDestaque] = useState(0);
  const linhasRef = useRef<(HTMLDivElement | null)[]>([]);
  const cabecalhoRef = useRef<HTMLDivElement>(null);

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
        className="sticky top-0 z-20 -mx-6 bg-idv-amarelo px-6 pb-5 pt-32 md:-mx-[clamp(1.5rem,5vw,6rem)] md:px-[clamp(1.5rem,5vw,6rem)]"
      >
        <div className="relative flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-idv-preto/60">
              Serviços
            </p>
            <h1 className="mt-2 font-display text-[clamp(1.5rem,7.2vw,2.5rem)] uppercase leading-none text-idv-preto sm:text-h1">
              <HeadlineRotator palavras={PALAVRAS_TITULO} />
            </h1>
          </div>
          <StickerRafa className="absolute -top-3 right-0 h-14 w-auto sm:static sm:mt-2 sm:h-24 sm:shrink-0 md:h-36" />
        </div>
      </div>

      <div className="mt-6 border-t border-idv-preto/25">
        {SERVICOS.map((s, i) => {
          const isOpen = aberto === i;
          const rotulo = "rotuloIncluido" in s ? s.rotuloIncluido : "O que está incluído";
          return (
            <div
              key={s.nome}
              ref={(el) => {
                linhasRef.current[i] = el;
              }}
              className="group/row border-b border-idv-preto/25"
            >
              <button
                type="button"
                onClick={() => setAberto(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`flex items-center gap-4 font-display text-xl uppercase tracking-tight transition-all duration-200 md:gap-4 md:text-2xl ${
                    isOpen ? "text-idv-preto" : "text-idv-preto/80 group-hover/row:translate-x-2 group-hover/row:text-idv-preto"
                  }`}
                >
                  {ICONE_DO_SERVICO[s.nome] && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 group-hover/row:bg-idv-preto group-hover/row:text-idv-laranja md:h-12 md:w-12">
                      <IconeServico nome={ICONE_DO_SERVICO[s.nome]} className="h-6 w-6 md:h-7 md:w-7" />
                    </span>
                  )}
                  {s.nome}
                </span>
                <span
                  aria-hidden="true"
                  style={
                    destaque === i && !isOpen
                      ? {
                          outline: "1px solid transparent",
                          outlineOffset: "6px",
                          animation: "piscar 1.4s ease-in-out infinite",
                        }
                      : undefined
                  }
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-xl leading-none text-idv-preto transition-all duration-300 group-hover/row:bg-idv-preto group-hover/row:text-idv-laranja ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
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
                  <div className="mb-8 mt-1 grid gap-3 md:grid-cols-12">
                    <div className="flex flex-col gap-3 md:col-span-4">
                      <div className="flex flex-1 flex-col justify-between gap-10 rounded-[2.75rem] rounded-tr-[0.75rem] bg-idv-pedra p-6 text-idv-preto md:p-8">
                        <span className="font-mono text-xs uppercase tracking-[0.12em] text-idv-preto/60">
                          Sobre o serviço
                        </span>
                        <p className="text-lg font-medium leading-snug md:text-xl">{s.descricao}</p>
                      </div>

                      <div className="rounded-[0.75rem] rounded-br-[3rem] bg-idv-preto p-6 text-idv-off md:p-8">
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-idv-cinza">
                          Investimento
                        </p>
                        <p className="mt-1 font-display text-2xl uppercase leading-none tracking-tight">
                          Sob consulta
                        </p>
                        <a
                          href={`/orcamento?servico=${encodeURIComponent(s.nome)}`}
                          className="mt-6 inline-flex items-center gap-3 rounded-full bg-idv-amarelo py-2 pl-6 pr-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-preto transition-transform hover:-translate-y-0.5"
                        >
                          Solicitar orçamento
                          <span
                            aria-hidden="true"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-idv-preto text-base text-idv-amarelo"
                          >
                            ↗
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:col-span-8">
                      {"grupos" in s ? (
                        s.grupos.map((grupo, gi) => (
                          <CartaoLista
                            key={grupo.nome}
                            rotulo={grupo.nome}
                            itens={grupo.incluido}
                            tom={gi % 2 === 0 ? (i % 2 === 0 ? "off" : "contorno") : "preto"}
                            className={`flex-1 ${
                              gi % 2 === 0
                                ? "rounded-[0.75rem] rounded-tl-[3rem]"
                                : "rounded-[3rem] rounded-bl-[0.75rem]"
                            }`}
                          />
                        ))
                      ) : (
                        <CartaoLista
                          rotulo={rotulo || undefined}
                          itens={s.incluido}
                          tom="contorno"
                          className="flex-1 rounded-[0.75rem] rounded-tl-[3rem]"
                        />
                      )}
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

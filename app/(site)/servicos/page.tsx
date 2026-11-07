"use client";

import { useEffect, useRef, useState } from "react";
import { slugServico } from "@/lib/servicos";
import { Cruz, Pavimento, StickerRafa } from "@/components/ui/IdvElementos";
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


// Formas sobrepostas atrás do conteúdo de cada cartão (um círculo grande e um quadrado arredondado girado,
// em cores da IDV com pouca opacidade), no estilo dos cartões de referência.
const FORMAS = [
  { a: "bg-idv-amarelo/25", b: "bg-idv-laranja/30" },
  { a: "bg-idv-amarelo/55", b: "bg-idv-pedra/70" },
  { a: "bg-idv-amarelo/60", b: "bg-idv-preto/10" },
  { a: "bg-idv-off/80", b: "bg-idv-cinza/25" },
  { a: "bg-idv-cinza/40", b: "bg-idv-amarelo/25" },
  { a: "bg-idv-laranja/25", b: "bg-idv-amarelo/70" },
  { a: "bg-idv-pedra/45", b: "bg-idv-grafite/20" },
] as const;

const CARTOES = [
  { bg: "bg-idv-preto", fg: "text-idv-off", selo: "bg-idv-amarelo text-idv-preto", pontos: ["bg-idv-amarelo", "bg-idv-laranja", "bg-idv-off"], forma: "md:min-h-[15.5rem]" },
  { bg: "bg-idv-off", fg: "text-idv-preto", selo: "bg-idv-preto text-idv-amarelo", pontos: ["bg-idv-preto", "bg-idv-laranja", "bg-idv-amarelo"], forma: "md:min-h-[12rem] md:translate-y-8" },
  { bg: "bg-idv-laranja", fg: "text-idv-preto", selo: "bg-idv-off text-idv-preto", pontos: ["bg-idv-preto", "bg-idv-off", "bg-idv-amarelo"], forma: "md:min-h-[14rem] md:-translate-y-1" },
  { bg: "bg-idv-pedra", fg: "text-idv-preto", selo: "bg-idv-preto text-idv-off", pontos: ["bg-idv-preto", "bg-idv-amarelo", "bg-idv-laranja"], forma: "md:min-h-[13rem] md:translate-y-5" },
  { bg: "bg-idv-grafite", fg: "text-idv-off", selo: "bg-idv-amarelo text-idv-preto", pontos: ["bg-idv-amarelo", "bg-idv-off", "bg-idv-laranja"], forma: "md:min-h-[16.5rem] md:-translate-y-2" },
  { bg: "bg-[#FFE27A]", fg: "text-idv-preto", selo: "bg-idv-preto text-idv-off", pontos: ["bg-idv-preto", "bg-idv-laranja", "bg-idv-off"], forma: "md:min-h-[12rem] md:translate-y-7" },
  { bg: "bg-idv-cinza", fg: "text-idv-preto", selo: "bg-idv-off text-idv-preto", pontos: ["bg-idv-preto", "bg-idv-amarelo", "bg-idv-off"], forma: "md:min-h-[11rem]" },
] as const;

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

      <div className="mt-8 grid items-start gap-x-4 gap-y-4 md:grid-cols-6 md:gap-x-5 md:gap-y-12">
        {SERVICOS.map((s, i) => {
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
      </div>
    </div>
    <GrafismoParallax tipo="pavimento" className="bg-idv-amarelo" />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

const SERVICOS = [
  {
    nome: "Identidade Visual",
    descricao:
      "Sistema de marca — do zero ou redesign — pronto pra aplicar em qualquer ponto de contato. Do essencial ao sistema completo.",
    grupos: [
      {
        nome: "Básico",
        incluido: ["Logotipo e variações", "Paleta de cores", "Tipografia", "Manual de marca"],
      },
      {
        nome: "Completo",
        incluido: [
          "Pesquisa e briefing",
          "Logotipo e variações",
          "Paleta de cores",
          "Tipografia",
          "Grade de construção",
          "Elementos gráficos",
          "Manual de marca",
          "Aplicações (papelaria, redes sociais)",
        ],
      },
    ],
  },
  {
    nome: "Website",
    descricao:
      "Site institucional ou de portfólio, do zero, com conteúdo real e performance de verdade.",
    incluido: [
      "Design responsivo",
      "Copywriting",
      "Estrutura de páginas",
      "Otimização de imagens",
      "Publicação e domínio",
      "SEO básico",
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
      "Ícones e ilustrações",
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
          "Carrossel (5 slides)",
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
    rotuloIncluido: "Possibilidades",
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
    incluido: [
      "Identidade visual do evento",
      "Apresentação/PPT",
      "Cenografia em vídeo para telas de LED",
      "Imagens em grande formato para impressão",
      "Backdrop / painel de fotos",
      "Crachá e credenciamento",
      "Convite digital / e-mail marketing",
    ],
  },
  {
    nome: "Materiais Gráficos",
    descricao:
      "Peças gráficas, publicações e diagramação — do conceito ao arquivo pronto pra impressão ou tela.",
    incluido: [
      "Diagramação editorial",
      "Revistas e catálogos",
      "Relatórios e apresentações institucionais",
      "Infográficos",
      "Anúncios e peças publicitárias",
      "Impressos em geral",
    ],
  },
] as const;

export default function ServicosPage() {
  const [aberto, setAberto] = useState<number | null>(null);
  const [destaque, setDestaque] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDestaque((d) => (d + 1) % SERVICOS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="px-6 pb-20 pt-32 md:px-[clamp(1.5rem,5vw,6rem)]">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Serviços
      </p>
      <h1 className="mt-2 font-display uppercase leading-none text-h1">
        O que eu faço
      </h1>

      <div className="mt-12 border-t border-white/10">
        {SERVICOS.map((s, i) => {
          const isOpen = aberto === i;
          return (
            <div key={s.nome} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setAberto(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`font-display text-xl uppercase tracking-tight transition-colors md:text-2xl ${
                    isOpen ? "text-sinal" : "text-cal"
                  }`}
                >
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
                  className={`flex h-7 w-7 items-center justify-center font-mono text-xl leading-none text-maresia transition-transform duration-300 ${
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
                  <div className="grid gap-6 pb-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-start md:gap-10">
                    <p className="max-w-xs text-sm text-maresia">
                      {s.descricao}
                    </p>

                    <div>
                      {"grupos" in s ? (
                        <div className="flex flex-col gap-6">
                          {s.grupos.map((grupo) => (
                            <div key={grupo.nome}>
                              <p className="font-mono text-xs uppercase tracking-[0.12em] text-sinal">
                                {grupo.nome}
                              </p>
                              <ul className="mt-3 flex flex-wrap gap-2">
                                {grupo.incluido.map((item) => (
                                  <li
                                    key={item}
                                    className="rounded-full border border-white/15 px-4 py-2 text-xs text-cal"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
                            {"rotuloIncluido" in s ? s.rotuloIncluido : "O que está incluído"}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {s.incluido.map((item) => (
                              <li
                                key={item}
                                className="rounded-full border border-white/15 px-4 py-2 text-xs text-cal"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-4 md:items-end">
                      <div className="md:text-right">
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
                          Investimento
                        </p>
                        <p className="mt-1 text-sm text-cal">Sob consulta</p>
                      </div>
                      <a
                        href={`/orcamento?servico=${encodeURIComponent(s.nome)}`}
                        className="inline-flex items-center justify-center rounded-full bg-sinal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5"
                      >
                        Solicitar orçamento
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

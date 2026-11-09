// Fonte única dos cartões de serviço: a página /servicos e a Home (celular) leem daqui.
import type { NomeIconeServico } from "@/components/ui/IconeServico";

export const ICONE_DO_SERVICO: Record<string, NomeIconeServico> = {
  "Identidade Visual": "identidade",
  Website: "site",
  "Apresentação": "slide",
  "Social Media Kit": "redes",
  "Vídeo & Motion Graphics": "video",
  Eventos: "eventos",
  "Materiais Gráficos": "materiais",
};


export const SERVICOS = [
  {
    nome: "Identidade Visual",
    descricao:
      "Sistema de marca — do zero ou redesign — pronto pra aplicar em qualquer ponto de contato. Do essencial ao sistema completo.",
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


// Cada serviço é um pôster vertical do key visual: fundo chapado, grade à vista, cruz de mira, mono em caixa
// alta e o ícone gigante, quase na largura toda do quadro.
export const TILES: readonly { bg: string; fg: string; icone: string; rotulo: string; chip: string }[] = [
  { bg: "bg-idv-preto", fg: "text-idv-off", icone: "text-idv-amarelo", rotulo: "text-idv-amarelo", chip: "border border-idv-amarelo text-idv-amarelo" },
  { bg: "bg-idv-off", fg: "text-idv-preto", icone: "text-idv-preto", rotulo: "text-idv-preto", chip: "border border-idv-preto text-idv-preto" },
  { bg: "bg-idv-laranja", fg: "text-idv-preto", icone: "text-idv-preto", rotulo: "text-idv-amarelo", chip: "border border-idv-preto text-idv-preto" },
  { bg: "bg-idv-pedra", fg: "text-idv-preto", icone: "text-idv-preto", rotulo: "text-idv-preto", chip: "border border-idv-preto text-idv-preto" },
  { bg: "bg-idv-grafite", fg: "text-idv-off", icone: "text-idv-amarelo", rotulo: "text-idv-amarelo", chip: "border border-idv-amarelo text-idv-amarelo" },
  { bg: "bg-idv-amarelo-claro", fg: "text-idv-preto", icone: "text-idv-preto", rotulo: "text-idv-preto", chip: "border border-idv-preto text-idv-preto" },
  { bg: "bg-idv-cinza", fg: "text-idv-preto", icone: "text-idv-off", rotulo: "text-idv-preto", chip: "border border-idv-preto text-idv-preto" },
];


// Pequenos elementos animados que ultrapassam a margem de cada pôster. Só o de Vídeo e Motion é animado por dentro.
export const ADORNOS: readonly ({ pos: string; forma: string; anim: string } | null)[] = [
  { pos: "-right-2 -top-2", forma: "h-5 w-5 rounded-full bg-idv-laranja", anim: "[animation:pulsar_2.2s_ease-in-out_infinite]" },
  { pos: "-right-3 top-10", forma: "h-5 w-5 rotate-45 border-2 border-idv-preto", anim: "[animation:girar_9s_linear_infinite]" },
  { pos: "-left-2 bottom-24", forma: "h-3.5 w-3.5 bg-idv-preto", anim: "[animation:quicar_2.4s_ease-in-out_infinite]" },
  { pos: "-right-3 bottom-10", forma: "h-6 w-6 rounded-full border-2 border-idv-preto", anim: "[animation:girar_7s_linear_infinite]" },
  null,
  { pos: "-left-2 -top-2", forma: "h-4 w-4 rounded-full bg-idv-laranja", anim: "[animation:pulsar_2.6s_ease-in-out_infinite]" },
  { pos: "-bottom-2 -right-2", forma: "h-4 w-4 bg-idv-laranja", anim: "[animation:girar_8s_linear_infinite]" },
];


// Peso de cada serviço na grade (1 = maior). O tamanho do card segue o peso: Identidade Visual (1) > Materiais
// Gráficos (2) > Vídeo e Motion (3) > os demais (4). Desktop: grade de 4 colunas; celular: 2 colunas.
//  - espaco: ocupação na grade (o `md:order` monta a ordem visual no desktop sem mexer na ordem de leitura)
//  - altura: altura mínima do card fechado no celular
//  - titulo / icone: tamanho do nome e do ícone gigante
export const PORTE: readonly { espaco: string; altura: string; titulo: string; icone: string; pad: string }[] = [
  // 1. Identidade Visual: o maior
  { espaco: "col-span-2 md:col-span-3 md:row-span-2 md:order-1", altura: "min-h-[26rem]", titulo: "text-xl md:text-5xl lg:text-6xl", icone: "max-h-[40rem]", pad: "md:p-10" },
  // 4. Website
  { espaco: "col-span-1 md:order-2", altura: "min-h-[17rem]", titulo: "text-[0.78rem] md:text-xl lg:text-2xl", icone: "max-h-[19rem]", pad: "md:p-6" },
  // 4. Apresentação
  { espaco: "col-span-1 md:order-3", altura: "min-h-[17rem]", titulo: "text-[0.78rem] md:text-xl lg:text-2xl", icone: "max-h-[19rem]", pad: "md:p-6" },
  // 4. Social Media Kit
  { espaco: "col-span-1 md:order-6", altura: "min-h-[17rem]", titulo: "text-[0.78rem] md:text-xl lg:text-2xl", icone: "max-h-[19rem]", pad: "md:p-6" },
  // 3. Vídeo e Motion: alto e estreito, o único animado por dentro
  { espaco: "col-span-1 row-span-2 md:order-5", altura: "min-h-[17rem]", titulo: "text-base md:text-2xl lg:text-3xl", icone: "max-h-[30rem]", pad: "md:p-7" },
  // 4. Eventos
  { espaco: "col-span-1 md:order-7", altura: "min-h-[17rem]", titulo: "text-[0.78rem] md:text-xl lg:text-2xl", icone: "max-h-[19rem]", pad: "md:p-6" },
  // 2. Materiais Gráficos: o segundo maior
  { espaco: "col-span-2 md:col-span-2 md:row-span-2 md:order-4", altura: "min-h-[22rem]", titulo: "text-lg md:text-3xl lg:text-4xl", icone: "max-h-[32rem]", pad: "md:p-8" },
];

// Vídeo e Motion Graphics: o grande, o único animado por dentro.
export const INDICE_DESTAQUE = 4;

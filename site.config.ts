/**
 * Fonte única de verdade dos dados do estúdio.
 * Preencher os [[ TODO ]] conforme as informações ficarem disponíveis.
 * Nada aqui deve ser duplicado dentro de componentes.
 */

export const site = {
  // ── Identidade ──────────────────────────────────────────────
  marca: "R. LISBOA",
  numero: "162",
  descritor: "Estúdio 162",
  nomeCompleto: "R. Lisboa — Estúdio 162",
  anoFundacao: 2013,
  tagline: "[[ TODO: uma frase de tese, máx. 12 palavras ]]",

  // ── Titular ─────────────────────────────────────────────────
  titular: {
    nome: "Rafael Lisboa",
    cargo: "Designer e diretor de criação",
    foto: "/api/ph?w=1200&h=1500&label=Retrato Rafael",
    bio: "[[ TODO: 2 parágrafos em primeira pessoa. Mencionar SP e Itapema. ]]",
  },

  // ── Cadastro ────────────────────────────────────────────────
  // FASE 2. O rodapé funciona só com CNPJ — não bloqueia lançamento.
  // Sede fiscal em São Paulo; NFS-e emitida por SP também para clientes de SC.
  cadastro: {
    cnpj: "18.019.277/0001-21",
    cnpjLimpo: "18019277000121",
    sedeFiscal: { cidade: "São Paulo", estado: "SP" },
    razaoSocial: null as string | null, // preencher quando tiver o cartão CNPJ
    inscricaoMunicipal: null as string | null,
  },

  // ── Contato ─────────────────────────────────────────────────
  contato: {
    email: "rlisboadesign@gmail.com",
    telefone: "+55 11 99222-5038",
    whatsapp: "5511992225038",
    whatsappMensagem:
      "Olá Rafael, vim pelo site do Estúdio 162 e quero conversar sobre um projeto.",
    /** Prazo prometido no site (formulário, contato e página de obrigado). */
    prazoResposta: "em até 24 horas",
    agenda: "[[ TODO: link Cal.com ou Google Agenda ]]",
  },

  // ── Localização ─────────────────────────────────────────────
  // Onde o estúdio opera e atende. Não é o endereço fiscal (ver cadastro.sedeFiscal).
  local: {
    cidade: "Itapema",
    estado: "SC",
    pais: "Brasil",
    coordenadas: { lat: -27.0906, lng: -48.6114 },
    atendimento: [
      "Itapema",
      "Porto Belo",
      "Bombinhas",
      "Balneário Camboriú",
      "Itajaí",
      "São Paulo",
    ],
  },

  // ── Redes ───────────────────────────────────────────────────
  redes: [
    { label: "Instagram", url: "https://www.instagram.com/rlisboa.design/", pendente: false },
    { label: "Behance", url: "https://www.behance.net/rafaellisboa", pendente: false },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/rafaellisboa/", pendente: false },
  ],

  // ── Domínio e SEO ───────────────────────────────────────────
  url: "https://www.rlisboadesign.com.br",
  descricao:
    "Estúdio de design em Itapema, SC: identidade visual, sites, apresentações, redes sociais e motion graphics para marcas e eventos, com atendimento em todo o Brasil.",
  ogImagem: "/api/ph?w=1200&h=630&label=Open Graph",
  /** Google Analytics 4 (conta do Gmail do 162). ID público, pode ficar no código. */
  analyticsId: "G-QWK5MS88QV",

  // ── Mídia ───────────────────────────────────────────────────
  hero: {
    video: "/hero/motion-intro.mp4" as string | null,
    poster: "/api/ph?w=1920&h=1080&label=Poster do reel",
    headline: "[[ TODO: headline do hero ]]",
  },
} as const;

export const disciplinas = [
  { id: "identidade", label: "Identidade visual" },
  { id: "website", label: "Websites" },
  { id: "motion", label: "Motion & vídeo" },
  { id: "ambientacao", label: "Ambientação" },
  { id: "social", label: "Social" },
  { id: "impressos", label: "Impressos" },
] as const;

export type DisciplinaId = (typeof disciplinas)[number]["id"];

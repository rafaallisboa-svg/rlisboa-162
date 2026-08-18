export type TrajetoriaPapel = {
  role: string;
  org: string;
  periodo: string;
  tag?: string;
  description?: string;
};

export type TrajetoriaEra = {
  id: string;
  year: string;
  label?: string;
  papeis: TrajetoriaPapel[];
  image?: string;
};

// Blocos por período: cada slide junta todos os vínculos ativos naquele
// intervalo (ex: 2019–2020 tem Conteúdo Editorial + Tandera + Inovativos +
// Movimento Inovação Digital rodando ao mesmo tempo), em vez de um slide
// por vínculo — as datas se sobrepõem, então tratar como sequência linear
// não fazia sentido. Cada papel carrega seu próprio `periodo` (a duração
// real do vínculo, não o período do slide) pra ficar claro em QUALQUER
// slide que, por exemplo, Conteúdo Editorial e Security Leaders é
// contínuo desde 2010 até hoje — não um vínculo novo a cada bloco.
export const trajetoria: TrajetoriaEra[] = [
  {
    id: "2002-2012",
    year: "2002–2012",
    label: "Formação",
    papeis: [
      {
        role: "Publicidade e Propaganda",
        org: "Oswaldo Cruz",
        periodo: "2002–2005",
      },
      {
        role: "Design Gráfico",
        org: "Panamericana · Escola de Arte e Design · São Paulo",
        periodo: "2010–2012",
        description: "Pós em Motion Graphics",
      },
    ],
  },
  {
    id: "2010-2018",
    year: "2010–2018",
    papeis: [
      {
        role: "Designer",
        org: "Conteúdo Editorial e Security Leaders",
        periodo: "2010 → hoje",
        description:
          "Do papel ao palco. Identidade visual de eventos de tecnologia e segurança da informação, em grande formato impresso e cenografia para telas de LED.",
      },
    ],
  },
  {
    id: "2018-2019",
    year: "2018–2019",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders", periodo: "2010 → hoje" },
      { role: "Designer", org: "Agência Tandera", periodo: "2018–2020", tag: "freelancer" },
    ],
  },
  {
    id: "2019-2020",
    year: "2019–2020",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders", periodo: "2010 → hoje" },
      { role: "Designer", org: "Agência Tandera", periodo: "2018–2020", tag: "freelancer" },
      {
        role: "Gerente de design e criação",
        org: "Inovativos",
        periodo: "2019 → hoje",
        description:
          "Gestão de projetos de comunicação para planejamento estratégico de conteúdo, inteligência e networking.",
      },
      {
        role: "Designer",
        org: "Movimento Inovação Digital",
        periodo: "2019–2025",
        tag: "freelancer",
      },
    ],
  },
  {
    id: "2020-2024",
    year: "2020–2024",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders", periodo: "2010 → hoje" },
      { role: "Gerente de design e criação", org: "Inovativos", periodo: "2019 → hoje" },
      {
        role: "Designer",
        org: "Movimento Inovação Digital",
        periodo: "2019–2025",
        tag: "freelancer",
      },
    ],
  },
  {
    id: "2024-2025",
    year: "2024–2025",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders", periodo: "2010 → hoje" },
      { role: "Gerente de design e criação", org: "Inovativos", periodo: "2019 → hoje" },
      {
        role: "Designer",
        org: "Movimento Inovação Digital",
        periodo: "2019–2025",
        tag: "freelancer",
      },
      {
        role: "Designer",
        org: "Rede Líderes",
        periodo: "2024 → hoje",
        tag: "freelancer",
        description: "Soluções visuais com consistência e alinhamento estratégico.",
      },
      {
        role: "Fundador",
        org: "R. Lisboa — Estúdio 162",
        periodo: "hoje",
        description: "Espaço dos projetos autorais, fora da rotina fixa.",
      },
    ],
  },
  {
    id: "2025-hoje",
    year: "2025 → hoje",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders", periodo: "2010 → hoje" },
      { role: "Gerente de design e criação", org: "Inovativos", periodo: "2019 → hoje" },
      { role: "Designer", org: "Rede Líderes", periodo: "2024 → hoje", tag: "freelancer" },
      { role: "Fundador", org: "R. Lisboa — Estúdio 162", periodo: "hoje" },
    ],
  },
];

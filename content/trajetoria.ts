export type TrajetoriaPapel = {
  role: string;
  org: string;
  tag?: string;
  description?: string;
};

export type TrajetoriaEra = {
  id: string;
  year: string;
  papeis: TrajetoriaPapel[];
  image?: string;
};

// Blocos por período: cada slide junta todos os vínculos ativos naquele
// intervalo (ex: 2019–2020 tem Conteúdo Editorial + Tandera + Inovativos +
// Movimento Inovação Digital rodando ao mesmo tempo), em vez de um slide
// por vínculo — as datas se sobrepõem, então tratar como sequência linear
// não fazia sentido. Fronteiras derivadas das datas de início/fim de cada
// vínculo original; ajuste os anos se algo não bater com a realidade.
export const trajetoria: TrajetoriaEra[] = [
  {
    id: "2010-2018",
    year: "2010–2018",
    papeis: [
      {
        role: "Designer",
        org: "Conteúdo Editorial e Security Leaders",
        description:
          "Do papel ao palco. Identidade visual de eventos de tecnologia e segurança da informação, em grande formato impresso e cenografia para telas de LED.",
      },
    ],
  },
  {
    id: "2018-2019",
    year: "2018–2019",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders" },
      { role: "Designer", org: "Agência Tandera", tag: "freelancer" },
    ],
  },
  {
    id: "2019-2020",
    year: "2019–2020",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders" },
      { role: "Designer", org: "Agência Tandera", tag: "freelancer" },
      {
        role: "Gerente de design e criação",
        org: "Inovativos",
        description:
          "Gestão de projetos de comunicação para planejamento estratégico de conteúdo, inteligência e networking.",
      },
      { role: "Designer", org: "Movimento Inovação Digital", tag: "freelancer" },
    ],
  },
  {
    id: "2020-2024",
    year: "2020–2024",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders" },
      { role: "Gerente de design e criação", org: "Inovativos" },
      { role: "Designer", org: "Movimento Inovação Digital", tag: "freelancer" },
    ],
  },
  {
    id: "2024-2025",
    year: "2024–2025",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders" },
      { role: "Gerente de design e criação", org: "Inovativos" },
      { role: "Designer", org: "Movimento Inovação Digital", tag: "freelancer" },
      {
        role: "Designer",
        org: "Rede Líderes",
        tag: "freelancer",
        description: "Soluções visuais com consistência e alinhamento estratégico.",
      },
      {
        role: "Fundador",
        org: "R. Lisboa — Estúdio 162",
        description: "Espaço dos projetos autorais, fora da rotina fixa.",
      },
    ],
  },
  {
    id: "2025-hoje",
    year: "2025 → hoje",
    papeis: [
      { role: "Designer", org: "Conteúdo Editorial e Security Leaders" },
      { role: "Gerente de design e criação", org: "Inovativos" },
      { role: "Designer", org: "Rede Líderes", tag: "freelancer" },
      { role: "Fundador", org: "R. Lisboa — Estúdio 162" },
    ],
  },
];

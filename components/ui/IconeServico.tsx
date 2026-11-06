/**
 * Ícones dos serviços, da biblioteca da IDV (grade 64, formas cheias e contraformas,
 * uma cor só: currentColor).
 */
const ICONES = {
  identidade: {
    k: 1,
    rl: true,
    d: [
      "M0 0H20V140H0Z",
      "M60 0A40 40 0 1 1 60 80A40 40 0 1 1 60 0Z M60 20A20 20 0 1 0 60 60A20 20 0 1 0 60 20Z",
      "M52 78H72L100 140H80Z",
      "M100 0H120V140H100Z",
      "M119 120H160V140H119Z",
    ],
  },
  site: {
    k: 0.9,
    rl: false,
    d: [
      "M4 6H60V58H4ZM10 12H54V18H10ZM10 24H28V52H10ZM34 24H54V36H34Z",
    ],
  },
  slide: {
    k: 0.93,
    rl: false,
    d: [
      "M4 6H60V44H4ZM14 24H22V38H14ZM28 16H36V38H28ZM42 28H50V38H42Z",
      "M29 44H35V54H29Z",
      "M18 54H46V59H18Z",
    ],
  },
  redes: {
    k: 0.93,
    rl: false,
    d: [
      "M4 6H60V44H34L20 58V44H4ZM13.5 25A4.5 4.5 0 1 0 22.5 25A4.5 4.5 0 1 0 13.5 25ZM27.5 25A4.5 4.5 0 1 0 36.5 25A4.5 4.5 0 1 0 27.5 25ZM41.5 25A4.5 4.5 0 1 0 50.5 25A4.5 4.5 0 1 0 41.5 25Z",
    ],
  },
  video: {
    k: 0.93,
    rl: false,
    d: [
      "M4 14H44V50H4ZM20 24L32 32L20 40Z",
      "M47 28L60 20V44L47 36Z",
    ],
  },
  eventos: {
    k: 0.95,
    rl: false,
    d: [
      "M12 24A20 20 0 1 0 52 24A20 20 0 1 0 12 24ZM24 24A8 8 0 1 0 40 24A8 8 0 1 0 24 24Z",
      "M17 38L32 60L47 38Z",
    ],
  },
  materiais: {
    k: 1,
    rl: false,
    d: [
      "M17 4H22V17H17ZM42 4H47V17H42ZM17 47H22V60H17ZM42 47H47V60H42ZM4 17H17V22H4ZM47 17H60V22H47ZM4 42H17V47H4ZM47 42H60V47H47ZM22 22H42V42H22ZM28 28H36V36H28Z",
    ],
  },
} as const;

export type NomeIconeServico = keyof typeof ICONES;

export function IconeServico({
  nome,
  className = "h-7 w-7",
}: {
  nome: NomeIconeServico;
  className?: string;
}) {
  const { k, d, rl } = ICONES[nome];
  // O monograma RL vem desenhado numa grade de 160x140; encaixa na grade de 64.
  const interno = rl ? "translate(3 6.8) scale(0.36)" : undefined;
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="currentColor" fillRule="evenodd">
      <g transform={`translate(32 32) scale(${k}) translate(-32 -32)`}>
        <g transform={interno}>
          {d.map((p) => (
            <path key={p} d={p} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * Ícones do menu, da biblioteca da IDV (grade 64, formas cheias e contraformas,
 * uma cor só: currentColor).
 */
const ICONES = {
  home: {
    k: 0.95,
    d: "M32 4L2 30H10V58H54V30H62Z M26 58V40H38V58Z",
  },
  projetos: {
    k: 0.88,
    d: "M4 4H60V60H4Z M10 10H26V54H10Z M32 10H54V30H32Z M32 36H54V54H32Z",
  },
  sobre: {
    k: 1,
    d: "M8 6H18V58H8Z M35 6A16 16 0 1 1 35 38A16 16 0 1 1 35 6Z M35 14A8 8 0 1 0 35 30A8 8 0 1 0 35 14Z M29 36H42L56 58H43Z",
  },
  servicos: {
    k: 0.95,
    d: "M32 60L12 28L22 4H42L52 28Z M37 28A5 5 0 1 1 27 28A5 5 0 1 1 37 28Z M30.5 36H33.5V50H30.5Z",
  },
  contato: {
    k: 0.9,
    d: "M2 12H62V52H2Z M8 18L32 36L56 18V24L32 42L8 24Z",
  },
} as const;

export type NomeIconeMenu = keyof typeof ICONES;

export function IconeMenu({
  nome,
  className = "h-3 w-3",
}: {
  nome: NomeIconeMenu;
  className?: string;
}) {
  const { k, d } = ICONES[nome];
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="currentColor"
      fillRule="evenodd"
    >
      <g transform={`translate(32 32) scale(${k}) translate(-32 -32)`}>
        <path d={d} />
      </g>
    </svg>
  );
}

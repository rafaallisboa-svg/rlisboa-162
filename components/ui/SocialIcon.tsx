/**
 * Ícones de redes e contato da biblioteca da IDV (grade 64, formas cheias e contraformas,
 * uma cor só: currentColor). Os mesmos do manual da identidade.
 */
const ICONES = {
  "Instagram": {
    k: 0.88,
    d: [
      "M6 6H58V58H6ZM18 32A14 14 0 1 0 46 32A14 14 0 1 0 18 32ZM43.5 17A3.5 3.5 0 1 0 50.5 17A3.5 3.5 0 1 0 43.5 17Z",
      "M26 32A6 6 0 1 0 38 32A6 6 0 1 0 26 32Z"
    ],
  },
  "LinkedIn": {
    k: 0.88,
    d: [
      "M4 4H60V60H4ZM12.8 17A4.2 4.2 0 1 0 21.2 17A4.2 4.2 0 1 0 12.8 17ZM13 26H21V52H13ZM27 26H34V30C36 27 39 25.5 43 26C49 26.5 51 30 51 36V52H43V38C43 35 41.5 33.5 39 33.5C36.5 33.5 35 35.5 35 38V52H27Z"
    ],
  },
  "Behance": {
    k: 0.88,
    d: [
      "M4 4H60V60H4ZM16 16H32C38 16 42 19 42 24C42 27 40.5 29 38 30C42 31 44 33.5 44 37C44 43 39 46 32 46H16ZM22 22H30C32 22 34 23 34 25C34 27 32 28 30 28H22ZM22 34H31C33.5 34 36 35 36 37.5C36 40 33.5 41 31 41H22Z"
    ],
  },
  "WhatsApp": {
    k: 0.95,
    d: [
      "M32 4A28 28 0 1 1 18 56L6 60L10 47A28 28 0 0 1 32 4ZM22 20L27 18L31 26L28 29C30 33 33 36 37 38L40 35L48 39L46 44C42 46 36 45 29 38C22 31 20 25 22 20Z"
    ],
  },
  "YouTube": {
    k: 0.92,
    d: [
      "M4 12H60V52H4ZM26 22L42 32L26 42Z"
    ],
  },
  "E-mail": {
    k: 0.9,
    d: [
      "M2 12H62V52H2ZM8 18L32 36L56 18V24L32 42L8 24Z"
    ],
  }
} as const;

type NomeRede = keyof typeof ICONES;

function Desenho({ nome, className }: { nome: NomeRede; className: string }) {
  const { k, d } = ICONES[nome];
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="currentColor" fillRule="evenodd">
      <g transform={`translate(32 32) scale(${k}) translate(-32 -32)`}>
        {d.map((p) => (
          <path key={p} d={p} />
        ))}
      </g>
    </svg>
  );
}

export function SocialIcon({
  nome,
  className = "h-5 w-5",
}: {
  nome: string;
  className?: string;
}) {
  if (!(nome in ICONES)) return null;
  return <Desenho nome={nome as NomeRede} className={className} />;
}

export function IconeEmail({ className = "h-5 w-5" }: { className?: string }) {
  return <Desenho nome="E-mail" className={className} />;
}

export function IconeWhatsApp({ className = "h-5 w-5" }: { className?: string }) {
  return <Desenho nome="WhatsApp" className={className} />;
}

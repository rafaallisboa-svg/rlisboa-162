// Forma gráfica abstrata — substitui foto real enquanto não temos banco de
// imagens do cliente. Puramente decorativo, cores vêm de fora via props.
export function AbstractShape({
  corFundo,
  corAncora,
  corApoio,
  corTexto,
  className = "",
}: {
  corFundo: string;
  corAncora: string;
  corApoio: string;
  corTexto: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="480" fill={corFundo} />
      <circle cx="120" cy="150" r="150" fill={corAncora} opacity="0.95" />
      <circle cx="290" cy="330" r="105" fill={corApoio} opacity="0.9" />
      <path
        d="M-20 380 Q160 260 420 350 L420 500 L-20 500 Z"
        fill={corAncora}
        opacity="0.45"
      />
      <circle cx="330" cy="90" r="5" fill={corTexto} opacity="0.5" />
      <circle cx="60" cy="60" r="3" fill={corTexto} opacity="0.35" />
      <line x1="0" y1="40" x2="200" y2="40" stroke={corTexto} strokeWidth="1" opacity="0.25" />
      <line x1="0" y1="58" x2="140" y2="58" stroke={corTexto} strokeWidth="1" opacity="0.25" />
      <circle
        cx="120"
        cy="150"
        r="150"
        fill="none"
        stroke={corTexto}
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
}

/**
 * Elementos da identidade visual (IDV) usados nas páginas.
 * Formas chapadas, sem sombra. As cores vêm dos tokens idv-* (globals.css).
 */

/** Quatro células de pavimento com o quadradinho laranja. */
export function Pavimento({
  className,
  u = 36,
  style,
}: {
  className?: string;
  u?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${u * 2} ${u * 2 + 4}`}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={u} height={u} fill="var(--color-idv-off)" />
      <rect x={u} width={u} height={u} fill="var(--color-idv-amarelo)" />
      <rect y={u} width={u} height={u} fill="var(--color-idv-grafite)" />
      <rect x={u * 0.62} y={u * 1.62} width={u * 0.2} height={u * 0.2} fill="var(--color-idv-laranja)" />
    </svg>
  );
}

/** Cruz de mira, marca de construção. */
export function Cruz({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 14h28M14 0v28" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

const D162 =
  "M58.80-150L89.20-150L89.20 0L48.20 0L48.20-135.60L67.40-117.80L2.80-106.40L2.80-138.40L58.80-150Z M189.80-153.20L189.80-153.20Q209.20-153.20 224.30-147.30Q239.40-141.40 248.70-131.30Q258-121.20 260-108.60L260-108.60L221.60-108.60Q218.80-114.60 211.60-118.80Q204.40-123 190.80-123L190.80-123Q176.20-123 166.50-117.50Q156.80-112 152.10-101.80Q147.40-91.60 147.40-76.60L147.40-76.60Q147.40-60.40 152.60-49.40Q157.80-38.40 167.60-32.80Q177.40-27.20 191.60-27.20L191.60-27.20Q201.40-27.20 208.10-29.90Q214.80-32.60 218.20-37.30Q221.60-42 221.60-47.60L221.60-47.60Q221.60-53.60 218.40-58.10Q215.20-62.60 208.80-65Q202.40-67.40 192.80-67.40L192.80-67.40Q180-67.40 168.40-61.80Q156.80-56.20 147.20-45.20L147.20-45.20L133.20-54.80Q139.40-67.20 149.20-76.90Q159-86.60 172.50-92.20Q186-97.80 203-97.80L203-97.80Q221.80-97.80 235.20-91.60Q248.60-85.40 255.90-74.50Q263.20-63.60 263.20-49L263.20-49Q263.20-33.80 254.70-22Q246.20-10.20 230.20-3.50Q214.20 3.20 191 3.20L191 3.20Q163.40 3.20 145.10-6.80Q126.80-16.80 117.70-34.40Q108.60-52 108.60-74.80L108.60-74.80Q108.60-97.60 117.70-115.40Q126.80-133.20 144.90-143.20Q163-153.20 189.80-153.20Z M315.40-96L274.20-96Q275.40-113.60 285.80-126.50Q296.20-139.40 313.50-146.30Q330.80-153.20 352.60-153.20L352.60-153.20Q373.40-153.20 388.90-146.90Q404.40-140.60 413-129.40Q421.60-118.20 421.60-103.40L421.60-103.40Q421.60-92 415.40-82.10Q409.20-72.20 396-62.70Q382.80-53.20 361.40-42.80L361.40-42.80L320.20-22.20L318.60-32.80L425.80-32.80L425.80 0L277.40 0L277.40-28.80L341.80-65Q356.80-73.60 365.10-79.50Q373.40-85.40 376.90-90.40Q380.40-95.40 380.40-101L380.40-101Q380.40-107.20 377.10-111.70Q373.80-116.20 367.20-118.80Q360.60-121.40 351-121.40L351-121.40Q339-121.40 331.40-117.90Q323.80-114.40 320-108.70Q316.20-103 315.40-96L315.40-96Z";

/** Sticker 162, inclinado, como um adesivo colado. */
export function Sticker162({
  className,
  angulo = -6,
  somenteNumero = false,
}: {
  className?: string;
  angulo?: number;
  somenteNumero?: boolean;
}) {
  const largura = somenteNumero ? 190 : 176;
  const escala = largura / 423.000;
  return (
    <svg
      role="img"
      aria-label="162"
      viewBox="-24 -30 278 318"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`rotate(${angulo} 115 129)`}>
        <rect width="230" height="258" fill="var(--color-idv-amarelo)" />
        {!somenteNumero && (
          <>
            <text
              x="22"
              y="50"
              fontSize="25"
              letterSpacing="3"
              fontWeight="700"
              fill="var(--color-idv-preto)"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              R. LISBOA
            </text>
            <rect x="22" y="68" width="186" height="4" fill="var(--color-idv-preto)" />
          </>
        )}
        <g
          transform={`translate(${somenteNumero ? 14 : 20} ${somenteNumero ? 176 : 208}) scale(${escala})`}
          fill="var(--color-idv-preto)"
        >
          <path d={D162} />
        </g>
        <circle
          cx={somenteNumero ? 216 : 208}
          cy={somenteNumero ? 166 : 196}
          r="9"
          fill="var(--color-idv-laranja)"
        />
      </g>
    </svg>
  );
}

/** Selo circular: o texto gira devagar em volta do 162. */
export function Selo({ className }: { className?: string }) {
  const r = 84;
  const circ = 2 * Math.PI * r;
  const anel = `M0,${-r} A${r},${r} 0 1 1 0,${r} A${r},${r} 0 1 1 0,${-r}`;
  return (
    <svg
      role="img"
      aria-label="Estúdio 162, R. Lisboa"
      viewBox="-110 -110 220 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r="104" fill="none" stroke="var(--color-idv-off)" strokeWidth="2.5" />
      <circle r="66" fill="none" stroke="var(--color-idv-off)" strokeWidth="1.5" />
      <g className="selo-gira" style={{ transformOrigin: "0 0" }}>
        <path id="selo-anel" d={anel} fill="none" />
        <text
          fontSize="12.5"
          fontWeight="700"
          fill="var(--color-idv-off)"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <textPath href="#selo-anel" textLength={circ - 2} lengthAdjust="spacing">
            ESTÚDIO 162 · R. LISBOA · ESTÚDIO 162 · R. LISBOA ·
          </textPath>
        </text>
      </g>
      <g transform="translate(-46.61 17.01) scale(0.2175)" fill="var(--color-idv-off)">
        <path d={D162} />
      </g>
      <circle cx="50" cy="26" r="6" fill="var(--color-idv-laranja)" />
    </svg>
  );
}


const RAFA_R = "M42.60-54L42.60-84.40L97.20-84.40Q107.20-84.40 112.80-89Q118.40-93.60 118.40-101.80L118.40-101.80Q118.40-110.20 112.80-114.70Q107.20-119.20 97.20-119.20L97.20-119.20L36.80-119.20L55.40-139L55.40 0L14 0L14-150L103-150Q120.20-150 133-143.90Q145.80-137.80 153-127.10Q160.20-116.40 160.20-101.80L160.20-101.80Q160.20-87.60 153-76.80Q145.80-66 133-60Q120.20-54 103-54L103-54L42.60-54ZM117.40 0L65-70.20L111.60-70.20L165.40 0L117.40 0Z";
const RAFA_AFA = [
  "M322.80 0L280.40 0L275.20-41.20L280.60-57L275.20-72.80L280.40-114.20L322.80-114.20L315.60-57.20L322.80 0ZM290-57L290-57Q287.20-39 278.90-25.40Q270.60-11.80 257.90-4.30Q245.20 3.20 229 3.20L229 3.20Q212.20 3.20 199.50-4.30Q186.80-11.80 179.60-25.50Q172.40-39.20 172.40-57L172.40-57Q172.40-75.20 179.60-88.80Q186.80-102.40 199.50-110Q212.20-117.60 229-117.60L229-117.60Q245.20-117.60 257.90-110.10Q270.60-102.60 279-89.10Q287.40-75.60 290-57ZM213.80-57L213.80-57Q213.80-48.60 217.30-42Q220.80-35.40 227-31.70Q233.20-28 241.20-28L241.20-28Q249.60-28 257-31.70Q264.40-35.40 270-42Q275.60-48.60 278.40-57L278.40-57Q275.60-65.60 270-72.20Q264.40-78.80 257-82.60Q249.60-86.40 241.20-86.40L241.20-86.40Q233.20-86.40 227-82.60Q220.80-78.80 217.30-72.20Q213.80-65.60 213.80-57Z",
  "M419.60-126.80L419.60-126.80Q406.20-126.80 400.90-122.10Q395.60-117.40 395.60-107L395.60-107L395.60 0L354.80 0L354.80-105Q354.80-121.60 361.60-133.30Q368.40-145 381.70-151.10Q395.00-157.20 414.60-157.20L414.60-157.20Q423.40-157.20 430.30-156Q437.20-154.80 445.00-152.60L445.00-152.60L445.00-122.60Q439.00-124.80 432.70-125.80Q426.40-126.80 419.60-126.80ZM442.20-74.60L331.60-74.60L331.60-104.80L442.20-104.80L442.20-74.60Z",
  "M597.80 0L555.40 0L550.20-41.20L555.60-57L550.20-72.80L555.40-114.20L597.80-114.20L590.60-57.20L597.80 0ZM565-57L565-57Q562.20-39 553.90-25.40Q545.60-11.80 532.90-4.30Q520.20 3.20 504.00 3.20L504.00 3.20Q487.20 3.20 474.50-4.30Q461.80-11.80 454.60-25.50Q447.40-39.20 447.40-57L447.40-57Q447.40-75.20 454.60-88.80Q461.80-102.40 474.50-110Q487.20-117.60 504.00-117.60L504.00-117.60Q520.20-117.60 532.90-110.10Q545.60-102.60 554-89.10Q562.40-75.60 565-57ZM488.80-57L488.80-57Q488.80-48.60 492.30-42Q495.80-35.40 502.00-31.70Q508.20-28 516.20-28L516.20-28Q524.60-28 532-31.70Q539.40-35.40 545-42Q550.60-48.60 553.40-57L553.40-57Q550.60-65.60 545-72.20Q539.40-78.80 532-82.60Q524.60-86.40 516.20-86.40L516.20-86.40Q508.20-86.40 502.00-82.60Q495.80-78.80 492.30-72.20Q488.80-65.60 488.80-57Z"
];

/**
 * Sticker do Rafa: a placa amarela mostra "Rafa." pequeno; as letras "afa" correm para a
 * esquerda e somem atrás do R, que cresce e fica sozinho com o ponto laranja. Roda uma vez.
 * Com "reduzir movimento" ligado, já aparece o "R." final.
 */
export function StickerRafa({ className, angulo = -6 }: { className?: string; angulo?: number }) {
  return (
    <svg
      role="img"
      aria-label="Rafa."
      viewBox="-24 -30 278 318"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`rotate(${angulo} 115 129)`}>
        <rect width="230" height="258" fill="var(--color-idv-amarelo)" />
        <defs>
          <clipPath id="rafa-clip">
            <rect x="169.4" y="-200" width="900" height="260" />
          </clipPath>
        </defs>
        <g className="rafa-escala">
          <path d={RAFA_R} fill="var(--color-idv-preto)" />
          <g clipPath="url(#rafa-clip)">
            <g className="rafa-afa" fill="var(--color-idv-preto)">
              {RAFA_AFA.map((p) => (
                <path key={p} d={p} />
              ))}
            </g>
          </g>
          <g className="rafa-ponto">
            <circle cx="632.2" cy="-21" r="23" fill="var(--color-idv-laranja)" />
          </g>
        </g>
      </g>
    </svg>
  );
}

/** Selo de anéis concêntricos: os dois pontos orbitam devagar em volta do 162. */
export function SeloAneis({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="162"
      viewBox="-110 -110 220 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r="104" fill="none" stroke="var(--color-idv-off)" strokeWidth="2.5" />
      <circle r="80" fill="none" stroke="var(--color-idv-off)" strokeWidth="2.5" />
      <circle r="56" fill="none" stroke="var(--color-idv-off)" strokeWidth="2.5" />
      <g transform="translate(-46.61 17.01) scale(0.2175)" fill="var(--color-idv-off)">
        <path d={D162} />
      </g>
      <g className="orbita-a">
        <circle cx="0" cy="-80" r="6" fill="var(--color-idv-laranja)" />
      </g>
      <g className="orbita-b">
        <circle cx="56" cy="0" r="5" fill="var(--color-idv-amarelo)" />
      </g>
    </svg>
  );
}

/** Selo de régua: 60 marcas girando devagar em volta do 162, com a marca do topo em laranja. */
export function SeloRegua({
  className,
  tinta = "var(--color-idv-preto)",
  numero = true,
}: {
  className?: string;
  tinta?: string;
  /** Mostra o 162 no centro. */
  numero?: boolean;
}) {
  const marcas = Array.from({ length: 60 }, (_, i) => {
    const a = (i * 6 * Math.PI) / 180;
    const maior = i % 5 === 0;
    const r1 = maior ? 84 : 92;
    const r2 = 104;
    const x = (r: number) => (r * Math.sin(a)).toFixed(2);
    const y = (r: number) => (-r * Math.cos(a)).toFixed(2);
    return { d: `M${x(r1)} ${y(r1)}L${x(r2)} ${y(r2)}`, w: maior ? 2.6 : 1.2, topo: i === 0 };
  });
  return (
    <svg
      role="img"
      aria-label="162"
      viewBox="-110 -110 220 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="selo-gira" style={{ transformOrigin: "0 0" }}>
        {marcas.map((m, i) => (
          <path
            key={i}
            d={m.d}
            stroke={m.topo ? "var(--color-idv-laranja)" : tinta}
            strokeWidth={m.topo ? 4 : m.w}
            fill="none"
          />
        ))}
      </g>
      {numero && (
        <g transform="translate(-46.61 17.01) scale(0.2175)" fill={tinta}>
          <path d={D162} />
        </g>
      )}
    </svg>
  );
}

/**
 * Elementos da identidade visual (IDV) usados nas páginas.
 * Formas chapadas, sem sombra. As cores vêm dos tokens idv-* (globals.css).
 */

/** Quatro células de pavimento com o quadradinho laranja. */
export function Pavimento({ className, u = 36 }: { className?: string; u?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${u * 2} ${u * 2 + 4}`}
      className={className}
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

const D_R = "M42.60-54L42.60-84.40L97.20-84.40Q107.20-84.40 112.80-89Q118.40-93.60 118.40-101.80L118.40-101.80Q118.40-110.20 112.80-114.70Q107.20-119.20 97.20-119.20L97.20-119.20L36.80-119.20L55.40-139L55.40 0L14 0L14-150L103-150Q120.20-150 133-143.90Q145.80-137.80 153-127.10Q160.20-116.40 160.20-101.80L160.20-101.80Q160.20-87.60 153-76.80Q145.80-66 133-60Q120.20-54 103-54L103-54L42.60-54ZM117.40 0L65-70.20L111.60-70.20L165.40 0L117.40 0Z";

/** Sticker "R.", a placa amarela com o R e o ponto laranja. */
export function StickerR({
  className,
  angulo = -6,
  cor = "amarelo",
}: {
  className?: string;
  angulo?: number;
  cor?: "amarelo" | "off" | "preto";
}) {
  const placa =
    cor === "off" ? "var(--color-idv-off)" : cor === "preto" ? "var(--color-idv-preto)" : "var(--color-idv-amarelo)";
  const tinta = cor === "preto" ? "var(--color-idv-off)" : "var(--color-idv-preto)";
  return (
    <svg
      role="img"
      aria-label="R."
      viewBox="-24 -30 278 318"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`rotate(${angulo} 115 129)`}>
        <rect width="230" height="258" fill={placa} />
        <g transform="translate(18.60 195.00) scale(0.8000)">
          <path d={D_R} fill={tinta} />
          <circle cx="204.00" cy="-21.00" r="23.00" fill="var(--color-idv-laranja)" />
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

/**
 * Dois anéis (amarelo e off-white) que se cruzam; onde se sobrepõem fica laranja.
 * Mostra só a metade de cima, para ser cortado pela borda de baixo.
 */
export function AneisIntersecao({ className }: { className?: string }) {
  const rExt = 252;
  const rInt = 126;
  const cy = 252;
  const anel = (cx: number) =>
    `M${cx - rExt} ${cy}A${rExt} ${rExt} 0 1 0 ${cx + rExt} ${cy}A${rExt} ${rExt} 0 1 0 ${cx - rExt} ${cy}Z` +
    `M${cx - rInt} ${cy}A${rInt} ${rInt} 0 1 0 ${cx + rInt} ${cy}A${rInt} ${rInt} 0 1 0 ${cx - rInt} ${cy}Z`;
  const a = anel(252);
  const b = anel(486);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 738 262"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="aneis-b">
          <path d={b} clipRule="evenodd" />
        </clipPath>
      </defs>
      <path d={a} fillRule="evenodd" fill="var(--color-idv-amarelo)" />
      <path d={b} fillRule="evenodd" fill="var(--color-idv-off)" />
      <g clipPath="url(#aneis-b)">
        <path d={a} fillRule="evenodd" fill="var(--color-idv-laranja)" />
      </g>
    </svg>
  );
}

/** Selo de régua: 60 marcas girando devagar em volta do 162, com a marca do topo em laranja. */
export function SeloRegua({ className, tinta = "var(--color-idv-preto)" }: { className?: string; tinta?: string }) {
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
      <g transform="translate(-46.61 17.01) scale(0.2175)" fill={tinta}>
        <path d={D162} />
      </g>
    </svg>
  );
}

/** Adesivo redondo amarelo: o texto corre em volta do 162 e do ponto laranja. */
export function SeloAdesivo({ className }: { className?: string }) {
  const r = 84;
  const circ = 2 * Math.PI * r;
  const anel = `M0,${-r} A${r},${r} 0 1 1 0,${r} A${r},${r} 0 1 1 0,${-r}`;
  return (
    <svg
      role="img"
      aria-label="R. Lisboa, Estúdio 162"
      viewBox="-110 -110 220 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r="104" fill="var(--color-idv-amarelo)" />
      <g className="selo-gira" style={{ transformOrigin: "0 0" }}>
        <path id="adesivo-anel" d={anel} fill="none" />
        <text
          fontSize="12.5"
          fontWeight="700"
          fill="var(--color-idv-preto)"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <textPath href="#adesivo-anel" textLength={circ - 2} lengthAdjust="spacing">
            R. LISBOA · ESTÚDIO 162 ·{" "}
          </textPath>
        </text>
      </g>
      <circle r="64" fill="none" stroke="var(--color-idv-preto)" strokeWidth="2" />
      <g transform="translate(-46.61 17.01) scale(0.2175)" fill="var(--color-idv-preto)">
        <path d={D162} />
      </g>
      <circle cx="48" cy="22" r="6" fill="var(--color-idv-laranja)" />
    </svg>
  );
}

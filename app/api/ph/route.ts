import { NextRequest } from "next/server";

/**
 * Gerador de imagem placeholder na paleta do estúdio.
 * Uso: /api/ph?w=1600&h=900&label=Capa do projeto
 *
 * Substituir pelo caminho real do arquivo quando o asset existir.
 * Não usar em produção — o script `pnpm check` acusa cada ocorrência.
 */

const CONCRETO = "#1A1C1B";
const MARESIA = "#7A8B85";
const SINAL = "#FFC300";

export function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const w = Math.min(Math.max(parseInt(p.get("w") ?? "1600", 10) || 1600, 16), 4000);
  const h = Math.min(Math.max(parseInt(p.get("h") ?? "900", 10) || 900, 16), 4000);
  const label = (p.get("label") ?? "Pendente").slice(0, 60);

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const corner = Math.min(w, h) * 0.06;
  const fontMain = Math.max(11, Math.min(w, h) * 0.045);
  const fontMeta = Math.max(9, fontMain * 0.65);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <pattern id="d" width="12" height="12" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="12" stroke="${MARESIA}" stroke-opacity="0.14" stroke-width="4"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="${CONCRETO}"/>
  <rect width="${w}" height="${h}" fill="url(#d)"/>
  <rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="${SINAL}" stroke-opacity="0.5" stroke-width="2"/>
  <path d="M0 0 L${corner} 0 M0 0 L0 ${corner}" stroke="${SINAL}" stroke-width="6"/>
  <path d="M${w} ${h} L${w - corner} ${h} M${w} ${h} L${w} ${h - corner}" stroke="${SINAL}" stroke-width="6"/>
  <text x="50%" y="47%" fill="${SINAL}" font-family="ui-monospace, 'JetBrains Mono', monospace"
        font-size="${fontMain}" font-weight="600" letter-spacing="0.14em"
        text-anchor="middle" dominant-baseline="middle">${escape(label.toUpperCase())}</text>
  <text x="50%" y="47%" dy="${fontMain * 1.6}" fill="${MARESIA}" font-family="ui-monospace, monospace"
        font-size="${fontMeta}" letter-spacing="0.18em"
        text-anchor="middle" dominant-baseline="middle">${w} × ${h} · PENDENTE</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

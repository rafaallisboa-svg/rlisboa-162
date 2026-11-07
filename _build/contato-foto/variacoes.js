const sharp = require('sharp');
const path = require('path');
const IN = path.join(__dirname, '..', '..', 'public', 'contato', 'perfil.webp');
const OUT = __dirname;
const W = 1000, H = 1000;

const clamp = (v, a = 0, b = 255) => Math.min(b, Math.max(a, v));

async function raw(img) {
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  return { data, info };
}

(async () => {
  const base = sharp(IN).ensureAlpha();
  const { data: px } = await raw(base.clone());
  const rgb = Buffer.alloc(W * H * 3);
  const alpha = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) {
    rgb[i * 3] = px[i * 4];
    rgb[i * 3 + 1] = px[i * 4 + 1];
    rgb[i * 3 + 2] = px[i * 4 + 2];
    alpha[i] = px[i * 4 + 3];
  }

  // 1) Recorte: tira o contorno sujo (erosão leve) e dá um acabamento macio.
  const aBlur = await raw(sharp(alpha, { raw: { width: W, height: H, channels: 1 } }).blur(2.2).extractChannel(0));
  const aErod = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) {
    const v = aBlur.data[i] / 255;
    // curva: só mantém o que está bem dentro; a borda cai rápido.
    aErod[i] = clamp(Math.round(((v - 0.62) / 0.3) * 255));
  }
  const aFinal = (await raw(sharp(aErod, { raw: { width: W, height: H, channels: 1 } }).blur(0.9).extractChannel(0))).data;

  // 2) Veia da têmpora: máscara em traço (suave) e mistura com versão desfocada da pele.
  const maskSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="black"/>
    <path d="M500 150 C530 200 560 250 585 300 L600 330" stroke="white" stroke-width="78" stroke-linecap="round" fill="none"/>
    <ellipse cx="545" cy="235" rx="70" ry="95" fill="white"/>
  </svg>`;
  const mask = (await raw(sharp(Buffer.from(maskSvg)).greyscale().blur(26))).data;
  const rgbImg = sharp(rgb, { raw: { width: W, height: H, channels: 3 } });
  const soft = (await raw(rgbImg.clone().blur(9))).data;
  const medio = (await raw(rgbImg.clone().blur(3))).data;
  const suave = Buffer.alloc(W * H * 3);
  for (let i = 0; i < W * H; i++) {
    const m = (mask[i * 1] / 255) * 0.78;
    for (let c = 0; c < 3; c++) {
      const o = rgb[i * 3 + c];
      // mistura desfocada larga + desfocada curta, deixa um pouco de textura de pele
      const s = soft[i * 3 + c] * 0.7 + medio[i * 3 + c] * 0.3;
      // devolve um grão fino de pele só onde suavizou, para não ficar plástico
      const ruido = (Math.random() + Math.random() + Math.random() - 1.5) * 9 * (m / 0.78);
      suave.writeUInt8(clamp(Math.round(o * (1 - m) + s * m + ruido)), i * 3 + c);
    }
  }

  const compor = (rgbBuf, aBuf, mapa) => {
    const out = Buffer.alloc(W * H * 4);
    for (let i = 0; i < W * H; i++) {
      let r = rgbBuf[i * 3], g = rgbBuf[i * 3 + 1], b = rgbBuf[i * 3 + 2];
      if (mapa) {
        let l = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
        l = clamp((l - 0.08) * 1.25, 0, 1); // um pouco mais de contraste
        [r, g, b] = mapa(l);
      }
      out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b; out[i * 4 + 3] = aBuf[i];
    }
    return sharp(out, { raw: { width: W, height: H, channels: 4 } });
  };
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const grad = (stops) => (l) => {
    for (let k = 0; k < stops.length - 1; k++) {
      const [p0, c0] = stops[k], [p1, c1] = stops[k + 1];
      if (l <= p1) {
        const t = (l - p0) / (p1 - p0 || 1);
        return c0.map((v, j) => Math.round(v + (c1[j] - v) * t));
      }
    }
    return stops[stops.length - 1][1];
  };
  const duoAmarelo = grad([[0, hex('#0E0E0D')], [0.55, hex('#8a6a00')], [1, hex('#FFC300')]]);
  const duoCinza = grad([[0, hex('#0E0E0D')], [0.5, hex('#85857F')], [1, hex('#F1F0EB')]]);

  const versoes = {
    '1-original': await sharp(IN).ensureAlpha().png().toBuffer(),
    '2-natural': await compor(suave, aFinal).png().toBuffer(),
    '3-duotone-amarelo': await compor(suave, aFinal, duoAmarelo).png().toBuffer(),
    '4-duotone-cinza': await compor(suave, aFinal, duoCinza).png().toBuffer(),
  };
  for (const [nome, buf] of Object.entries(versoes)) {
    require('fs').writeFileSync(path.join(OUT, `${nome}.png`), buf);
  }

  // Folha de comparação sobre o fundo do site.
  const PAINEL = 520, ESPACO = 20, TOPO = 56;
  const nomes = ['Original', 'Natural: recorte e veia suavizados', 'Duotone amarelo', 'Duotone cinza e off-white'];
  const chaves = Object.keys(versoes);
  const folhaW = PAINEL * 4 + ESPACO * 5, folhaH = PAINEL + TOPO + ESPACO * 2;
  const camadas = [];
  for (let k = 0; k < 4; k++) {
    const buf = await sharp(versoes[chaves[k]]).resize(PAINEL, PAINEL).png().toBuffer();
    camadas.push({ input: buf, left: ESPACO + k * (PAINEL + ESPACO), top: TOPO + ESPACO });
    camadas.push({
      input: Buffer.from(`<svg width="${PAINEL}" height="40" xmlns="http://www.w3.org/2000/svg"><text x="0" y="26" font-family="Arial" font-size="20" fill="#F1F0EB">${k + 1} · ${nomes[k]}</text></svg>`),
      left: ESPACO + k * (PAINEL + ESPACO), top: 14,
    });
  }
  await sharp({ create: { width: folhaW, height: folhaH, channels: 3, background: '#1c1c1b' } })
    .composite(camadas).png().toFile(path.join(OUT, 'comparacao.png'));
  console.log('ok');
})();

// Gera os logos dos clientes em cor original (para cards brancos) em public/clientes.
// Rodar: node _build/logos-cor-original.js
const sharp = require("sharp");
const fs = require("fs");

const OUT = "public/clientes/";
const PALLAS = "D:/TRAMPOS/Outros/2023/2024/Pallas Juliana/PNG/Pallas_horizontal_V2-01.png";
const GSM = "D:/TRAMPOS/S I L V I O/GSM New Parking/2021/Logo-GSM.png";
const SL = "C:/Users/Rafael/OneDrive/TRAMPOS/R Lisboa Estudio 162 LTDA/clientes/image-1786139573690.png";

// troca a cor de todos os pixels visiveis mantendo o alfa (para logos brancos -> cor da marca)
async function recolorir(entrada, saida, hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) { data[i] = r; data[i + 1] = g; data[i + 2] = b; }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(saida);
}

(async () => {
  // guarda as versoes brancas originais do site caso precise voltar
  fs.mkdirSync("_build/logos-brancos-antigos", { recursive: true });
  for (const f of ["tandera.png", "inovativos.png", "conteudo-editorial.png", "pallas.png", "gsm-new-parking.png", "security-leaders.png"]) {
    if (!fs.existsSync("_build/logos-brancos-antigos/" + f)) fs.copyFileSync(OUT + f, "_build/logos-brancos-antigos/" + f);
  }

  await sharp(PALLAS, { limitInputPixels: false }).resize({ width: 640 }).png({ compressionLevel: 9 }).toFile(OUT + "pallas.png");
  await sharp(GSM, { limitInputPixels: false }).resize({ width: 640 }).png({ compressionLevel: 9 }).toFile(OUT + "gsm-new-parking.png");
  await sharp(SL, { limitInputPixels: false }).trim().resize({ height: 520 }).png({ compressionLevel: 9 }).toFile(OUT + "security-leaders.png");

  await recolorir("_build/logos-brancos-antigos/tandera.png", OUT + "tandera.png", "#432584");   // roxo do site da Tandera
  await recolorir("_build/logos-brancos-antigos/inovativos.png", OUT + "inovativos.png", "#161616"); // preto, como nos cards do Forum
  await recolorir("_build/logos-brancos-antigos/conteudo-editorial.png", OUT + "conteudo-editorial.png", "#1d1d1d");


  for (const f of ["pallas.png", "gsm-new-parking.png", "security-leaders.png", "tandera.png", "inovativos.png", "conteudo-editorial.png"]) {
    const m = await sharp(OUT + f).metadata();
    console.log(f.padEnd(26), m.width + "x" + m.height, "razao", (m.width / m.height).toFixed(3));
  }
})();

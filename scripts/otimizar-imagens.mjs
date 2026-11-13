// Gera versões menores em WebP (640, 1280 e 1920 px de largura) de cada imagem de
// public/projetos e grava um índice em lib/imagens-manifest.json. O site usa o índice
// para servir a versão certa para cada tela (srcset), sem perder qualidade visual.
// Rodar sempre que entrar imagem nova:  node scripts/otimizar-imagens.mjs
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, extname, sep } from "node:path";

const RAIZ = "public";
const PASTA = join(RAIZ, "projetos");
const LARGURAS = [640, 1280, 1920];
const manifesto = {};

function* arquivos(dir) {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) {
      if (nome === "hero") continue; // heros embutidos (iframe) já são otimizados à parte
      yield* arquivos(p);
    } else if (/\.(jpe?g|png)$/i.test(nome)) {
      yield p;
    }
  }
}

for (const arq of arquivos(PASTA)) {
  const ext = extname(arq);
  const base = arq.slice(0, -ext.length);
  const meta = await sharp(arq).metadata();
  const saidas = [];
  for (const w of LARGURAS) {
    const largura = Math.min(w, meta.width);
    const destino = `${base}-${w}.webp`;
    if (!existsSync(destino) || statSync(destino).mtimeMs < statSync(arq).mtimeMs) {
      await sharp(arq).resize({ width: largura, withoutEnlargement: true }).webp({ quality: 80 }).toFile(destino);
    }
    saidas.push({ w: largura, src: "/" + relative(RAIZ, destino).split(sep).join("/") });
    if (largura < w) break; // imagem original menor: não gera versões repetidas
  }
  manifesto["/" + relative(RAIZ, arq).split(sep).join("/")] = saidas;
}

writeFileSync("lib/imagens-manifest.json", JSON.stringify(manifesto, null, 2) + "\n");
console.log(`ok: ${Object.keys(manifesto).length} imagens`);

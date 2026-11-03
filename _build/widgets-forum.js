// Atualiza as páginas da cobertura do Fórum a partir dos widgets em "widgets claudiao/cobertura2026".
// Mantém o cabeçalho (base target, fundo, título) de cada página já publicada e troca só o corpo.
// Rodar: node _build/widgets-forum.js
const fs = require("fs");
const path = require("path");

const SRC = "C:/Users/Rafael/OneDrive/TRAMPOS/Marcos Carvalho/inovativos/FORUM DE CASES/2026/site/widgets claudiao/cobertura2026/";
const DEST = path.resolve(__dirname, "../public/projetos/forum-cases-inovativos/cobertura/");

const itens = [
  ["02-numeros.html", "numeros.html"],
  ["03-videos.html", "videos.html"],
  ["04-reportagens.html", "reportagens.html"],
  ["05-audios.html", "audios.html"],
  ["06-fotos.html", "fotos.html"],
];

for (const [origem, destino] of itens) {
  const atual = fs.readFileSync(path.join(DEST, destino), "utf8");
  const iBody = atual.indexOf("<body>");
  if (iBody < 0) throw new Error("sem <body> em " + destino);
  const cabeca = atual.slice(0, iBody + "<body>".length);
  const novo = fs.readFileSync(SRC + origem, "utf8").replace(/^\s*<meta charset[^>]*>\s*/i, "").trim();
  if (!novo.startsWith("<section")) throw new Error("fonte inesperada em " + origem);
  fs.writeFileSync(path.join(DEST, destino), cabeca + "\n" + novo + "\n</body>\n</html>\n");
  console.log("ok", destino, novo.length);
}

// Embrulha os widgets do Elementor do Prêmio Inovativos em páginas autônomas (iframe do case).
// Rodar: node _build/widgets-premio.js
const fs = require("fs");
const path = require("path");

const SRC = "C:/Users/Rafael/OneDrive/TRAMPOS/Marcos Carvalho/inovativos/PREMIO/2026/site/";
const OUT = path.resolve(__dirname, "../public/projetos/premio-inovativos/widgets/");

const widgets = [
  { arquivo: "Números-Widget-Elementor.html", saida: "numeros.html", titulo: "Números de 2025", inicio: '<section class="nm-section"', fundo: "#0b1718" },
  { arquivo: "Categorias-Widget-Elementor.html", saida: "pilares.html", titulo: "Os cinco pilares", inicio: '<div class="cat-section"', fundo: "#1c373c" },
  { arquivo: "Pilares-Widget-Carrossel-Elementor.html", saida: "contexto.html", titulo: "Contexto — Inovação no Brasil", inicio: '<div class="pilc-section"', fundo: "#0b1718" },
];

fs.mkdirSync(OUT, { recursive: true });
for (const w of widgets) {
  const bruto = fs.readFileSync(SRC + w.arquivo, "utf8");
  const i = bruto.indexOf(w.inicio);
  if (i < 0) throw new Error("início não achado em " + w.arquivo);
  // tudo antes do bloco (fontes, <style>) vai pro head; o bloco + script vão pro body,
  // de modo que body.firstElementChild seja o próprio widget (é o que o iframe mede).
  const cabeca = bruto.slice(0, i).replace(/<!doctype html>/i, "").replace(/<meta[^>]*>/gi, "");
  const corpo = bruto.slice(i);
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<base target="_blank"/>
<title>${w.titulo} · Prêmio Inovativos</title>
<style>html,body{margin:0;padding:0;background:${w.fundo};}</style>
${cabeca}
</head>
<body>
${corpo}
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, w.saida), html);
  console.log("ok", w.saida, html.length);
}

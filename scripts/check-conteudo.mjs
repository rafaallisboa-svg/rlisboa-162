#!/usr/bin/env node
/**
 * Lista todas as pendências de conteúdo.
 *   pnpm check          → relatório
 *   pnpm check --strict → sai com erro se houver pendência (usar no CI/pré-deploy)
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const RAIZ = process.cwd();
const ALVOS = ["content", "site.config.ts", "app"];
const EXT = /\.(mdx?|json|tsx?)$/;
const STRICT = process.argv.includes("--strict");

const C = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  amarelo: (s) => `\x1b[33m${s}\x1b[0m`,
  ciano: (s) => `\x1b[36m${s}\x1b[0m`,
  verde: (s) => `\x1b[32m${s}\x1b[0m`,
  neg: (s) => `\x1b[1m${s}\x1b[0m`,
};

function arquivos(dir, acc = []) {
  for (const nome of readdirSync(dir)) {
    if (nome.startsWith(".") || nome === "node_modules") continue;
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) arquivos(p, acc);
    else if (EXT.test(nome)) acc.push(p);
  }
  return acc;
}

const lista = [];
for (const alvo of ALVOS) {
  const p = join(RAIZ, alvo);
  try {
    statSync(p).isDirectory() ? arquivos(p, lista) : lista.push(p);
  } catch {}
}

const achados = [];
for (const arq of lista) {
  const linhas = readFileSync(arq, "utf8").split("\n");
  linhas.forEach((linha, i) => {
    if (/\[\[\s*TODO/.test(linha))
      achados.push({ arq, linha: i + 1, tipo: "texto", txt: linha.trim() });
    if (/pendente:\s*true/.test(linha))
      achados.push({ arq, linha: i + 1, tipo: "item", txt: linha.trim() });
    if (/["'`]\/api\/ph/.test(linha))
      achados.push({ arq, linha: i + 1, tipo: "imagem", txt: linha.trim() });
  });
}

const porArquivo = achados.reduce((acc, a) => {
  (acc[a.arq] ??= []).push(a);
  return acc;
}, {});

console.log(`\n${C.neg("R. LISBOA · 162")} ${C.dim("— pendências de conteúdo")}\n`);

if (!achados.length) {
  console.log(C.verde("  Nenhuma pendência. Conteúdo completo.\n"));
  process.exit(0);
}

const icone = { texto: C.amarelo("TXT"), item: C.ciano("ITEM"), imagem: C.dim("IMG") };

for (const [arq, itens] of Object.entries(porArquivo)) {
  console.log(`  ${C.neg(relative(RAIZ, arq))} ${C.dim(`(${itens.length})`)}`);
  for (const it of itens) {
    const corte = it.txt.length > 78 ? it.txt.slice(0, 78) + "…" : it.txt;
    console.log(`    ${C.dim(String(it.linha).padStart(4))}  ${icone[it.tipo]}  ${C.dim(corte)}`);
  }
  console.log("");
}

const contar = (t) => achados.filter((a) => a.tipo === t).length;
console.log(C.dim("  ─────────────────────────────────────────────"));
console.log(
  `  ${C.neg(achados.length)} pendências  ` +
    C.dim(`· ${contar("texto")} texto · ${contar("item")} itens · ${contar("imagem")} imagens\n`)
);

if (STRICT) {
  console.log(C.amarelo("  Modo estrito: build bloqueada até zerar as pendências.\n"));
  process.exit(1);
}

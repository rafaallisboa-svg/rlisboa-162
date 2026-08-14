import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const DIR = path.join(process.cwd(), "content", "projetos");

export type ProjetoMeta = {
  slug: string;
  titulo: string;
  subtitulo: string;
  disciplinas: string[];
  setor: string;
  ano: number | string;
  local: string;
  escopo: string[];
  destaque: boolean;
  ordem: number;
  capa: string;
  thumb?: string;
  heroEmbed?: string;
  capaVideo: string | null;
  cores: string[];
  galeria?: { src: string; alt: string }[];
  resultado: string;
  siteExterno?: string | null;
  pendente?: boolean;
};

export function getProjetos(): ProjetoMeta[] {
  const arquivos = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  return arquivos
    .map((f) => matter(fs.readFileSync(path.join(DIR, f), "utf8")).data as ProjetoMeta)
    .filter((p) => process.env.NODE_ENV === "development" || !p.pendente)
    .sort((a, b) => a.ordem - b.ordem);
}

export function getProjetosDestaque(): ProjetoMeta[] {
  return getProjetos().filter((p) => p.destaque);
}

export async function getProjeto(slug: string) {
  const arquivos = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  for (const f of arquivos) {
    const raw = fs.readFileSync(path.join(DIR, f), "utf8");
    const parsed = matter(raw);
    if (parsed.data.slug !== slug) continue;

    // Contexto e Direção viram duas colunas lado a lado na página do case —
    // separadas aqui pelo próprio heading "## Direção" que já existe no MDX.
    const marcador = /\n##\s*Direção\s*\n/i;
    const match = parsed.content.match(marcador);
    const contextoRaw = (
      match ? parsed.content.slice(0, match.index) : parsed.content
    )
      .trim()
      .replace(/^##\s*Contexto\s*\n?/i, "");
    const direcaoRaw = match
      ? parsed.content.slice((match.index ?? 0) + match[0].length).trim()
      : "";

    const frontmatter = parsed.data as ProjetoMeta;
    const { content: contexto } = await compileMDX({
      source: contextoRaw,
      options: { parseFrontmatter: false },
    });
    const direcao = direcaoRaw
      ? (await compileMDX({ source: direcaoRaw, options: { parseFrontmatter: false } })).content
      : null;

    return { frontmatter, contexto, direcao };
  }

  return null;
}

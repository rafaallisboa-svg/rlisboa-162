export const NOMES_SERVICOS = [
  "Identidade Visual",
  "Website",
  "Apresentação",
  "Social Media Kit",
  "Vídeo & Motion Graphics",
  "Materiais Gráficos",
] as const;

const ROTULOS_NA_HOME: Record<string, string> = {
  "Social Media Kit": "Redes Sociais",
};

export function rotuloServico(nome: string) {
  return ROTULOS_NA_HOME[nome] ?? nome;
}

export function slugServico(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

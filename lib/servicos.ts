export const NOMES_SERVICOS = [
  "Identidade Visual",
  "Website",
  "Apresentação",
  "Social Media Kit",
  "Vídeo & Motion Graphics",
  "Materiais Gráficos",
] as const;

export function slugServico(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

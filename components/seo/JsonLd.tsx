/** Insere dados estruturados (JSON-LD) na página. */
export function JsonLd({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo vem do código do site, não de entrada de usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}

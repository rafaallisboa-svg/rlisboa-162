import type { Cobertura } from "@/lib/projetos";
import { EmbedAutoAltura } from "@/components/ui/EmbedAutoAltura";

/**
 * Cobertura: cada item é um widget real (HTML do Elementor) embutido em largura
 * total, na ordem dos blocos. O título de cada um já vem dentro do widget.
 */
export function CoberturaCase({ cobertura }: { cobertura: Cobertura }) {
  return (
    <section aria-label="Cobertura">
      {cobertura.itens.map((item) => (
        <EmbedAutoAltura
          key={item.src}
          src={item.src}
          title={item.titulo}
          alturaInicial={item.altura}
          className="block w-full border-0"
        />
      ))}
    </section>
  );
}

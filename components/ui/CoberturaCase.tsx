import type { Cobertura } from "@/lib/projetos";
import { EmbedAutoAltura } from "@/components/ui/EmbedAutoAltura";

const ROTULO = "font-mono text-xs uppercase tracking-[0.12em] text-sinal";
const TITULO = "font-display text-h2 uppercase leading-none tracking-tight";

/**
 * Cobertura: cada item é um widget real (HTML do Elementor) embutido em largura
 * total, na ordem dos blocos. Só o carrossel de palestrantes ganha título da página;
 * os demais já trazem o próprio título dentro do widget.
 */
export function CoberturaCase({ cobertura }: { cobertura: Cobertura }) {
  return (
    <section aria-label="Cobertura" className="border-t border-white/10 pt-16">
      <p className={`${ROTULO} px-6 md:px-[clamp(1.5rem,5vw,6rem)]`}>Cobertura</p>

      <div className="mt-10">
        {cobertura.itens.map((item) => (
          <div key={item.src} className={item.mostrarTitulo ? "py-16" : ""}>
            {item.mostrarTitulo && (
              <h2 className={`${TITULO} px-6 pb-8 md:px-[clamp(1.5rem,5vw,6rem)]`}>
                {item.titulo}
              </h2>
            )}
            <EmbedAutoAltura
              src={item.src}
              title={item.titulo}
              alturaInicial={item.altura}
              className="block w-full border-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

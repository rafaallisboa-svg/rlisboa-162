import type { Cobertura } from "@/lib/projetos";
import { EmbedAutoAltura } from "@/components/ui/EmbedAutoAltura";

const ROTULO = "font-mono text-xs uppercase tracking-[0.12em] text-sinal";
const SUBTITULO = "font-display text-h2 uppercase leading-none tracking-tight";

export function CoberturaCase({ cobertura }: { cobertura: Cobertura }) {
  const { numeros, palestrantes, fotos, depoimentos, links } = cobertura;

  return (
    <section
      aria-label="Cobertura"
      className="border-t border-white/10 px-6 py-16 md:px-[clamp(1.5rem,5vw,6rem)]"
    >
      <p className={ROTULO}>Cobertura</p>

      {numeros && numeros.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
          {numeros.map((n) => (
            <div key={n.rotulo}>
              <dt className="font-mono text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tabular-nums text-sinal">
                {n.valor}
              </dt>
              <dd className="mt-3 text-sm text-maresia">{n.rotulo}</dd>
            </div>
          ))}
        </dl>
      )}

      {palestrantes && (
        <div className="mt-24">
          <h2 className={SUBTITULO}>{palestrantes.titulo}</h2>
          <EmbedAutoAltura
            src={palestrantes.src}
            title={palestrantes.titulo}
            alturaInicial={palestrantes.altura}
            className="mt-8 w-full border-0"
          />
        </div>
      )}

      {fotos && fotos.length > 0 && (
        <div className="mt-24">
          <h2 className={SUBTITULO}>O Fórum em imagens</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-6">
            {fotos.map((f, i) => (
              <figure
                key={f.src}
                className={`reveal-scroll ${i < 2 ? "md:col-span-3" : "md:col-span-2"} ${
                  i === fotos.length - 1 && fotos.length % 2 === 1 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={f.src}
                  alt={f.alt}
                  className="aspect-[3/2] w-full bg-blueprint object-cover"
                />
                <figcaption className="mt-3 font-mono text-xs text-maresia">
                  {f.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {depoimentos && depoimentos.length > 0 && (
        <div className="mt-24">
          <h2 className={SUBTITULO}>O que dizem os executivos e parceiros</h2>
          <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-10">
            {depoimentos.map((d) => (
              <figure key={d.nome} className="flex flex-col justify-between gap-8">
                <blockquote className="text-sm leading-relaxed text-cal/90">
                  “{d.texto}”
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  {d.foto && (
                    <img
                      src={d.foto}
                      alt={d.nome}
                      className="h-14 w-14 shrink-0 bg-blueprint object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm text-cal">{d.nome}</p>
                    <p className="mt-1 font-mono text-xs text-maresia">{d.cargo}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {links && links.length > 0 && (
        <div className="mt-24">
          <h2 className={SUBTITULO}>Na imprensa e em vídeo</h2>
          <ul className="mt-8 border-t border-white/10">
            {links.map((l) => (
              <li key={l.url} className="border-b border-white/10">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[96px_1fr_auto] items-center gap-5 py-5 md:grid-cols-[160px_1fr_auto] md:gap-8"
                >
                  {l.imagem ? (
                    <img
                      src={l.imagem}
                      alt=""
                      className="aspect-[16/9] w-full bg-blueprint object-cover"
                    />
                  ) : (
                    <span />
                  )}
                  <span>
                    <span className={ROTULO}>{l.rotulo}</span>
                    <span className="mt-2 block text-base text-cal transition-colors group-hover:text-sinal md:text-lg">
                      {l.titulo}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-lg text-sinal transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

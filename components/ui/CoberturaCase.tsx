import type { Cobertura, CoberturaLista } from "@/lib/projetos";
import { EmbedAutoAltura } from "@/components/ui/EmbedAutoAltura";

const ROTULO = "font-mono text-xs uppercase tracking-[0.12em] text-sinal";
const TITULO = "font-display text-h2 uppercase leading-none tracking-tight";

function Cabecalho({ kicker, titulo }: { kicker?: string; titulo: string }) {
  return (
    <>
      {kicker && <p className={ROTULO}>{kicker}</p>}
      <h2 className={`${kicker ? "mt-4 " : ""}${TITULO}`}>{titulo}</h2>
    </>
  );
}

function Lista({ bloco }: { bloco: CoberturaLista }) {
  const colunas = bloco.itens.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className="mt-24">
      <Cabecalho kicker={bloco.kicker} titulo={bloco.titulo} />
      <ul className={`mt-10 grid gap-10 ${colunas}`}>
        {bloco.itens.map((item) => (
          <li key={item.titulo}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block ${
                item.imagem
                  ? ""
                  : "border border-white/10 p-6 transition-colors hover:border-sinal"
              }`}
            >
              {item.imagem && (
                <div className="aspect-[16/9] overflow-hidden bg-blueprint">
                  <img
                    src={item.imagem}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className={item.imagem ? "mt-4" : ""}>
                {item.rotulo && <p className={ROTULO}>{item.rotulo}</p>}
                <p className="mt-2 text-base leading-snug text-cal transition-colors group-hover:text-sinal md:text-lg">
                  {item.destaque && <strong className="font-medium">{item.destaque} </strong>}
                  {item.titulo}
                </p>
                {item.nota && (
                  <p className="mt-3 font-mono text-xs text-maresia">{item.nota}</p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
      {bloco.botao && (
        <a
          href={bloco.botao.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-3 border border-sinal px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-sinal transition-colors duration-200 hover:bg-sinal/10"
        >
          {bloco.botao.rotulo}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      )}
    </div>
  );
}

export function CoberturaCase({ cobertura }: { cobertura: Cobertura }) {
  const { numeros, palestrantes, videos, reportagens, audios, fotos } = cobertura;

  return (
    <section
      aria-label="Cobertura"
      className="border-t border-white/10 px-6 py-16 md:px-[clamp(1.5rem,5vw,6rem)]"
    >
      <p className={ROTULO}>Cobertura</p>

      {numeros && (
        <div className="mt-10">
          <Cabecalho kicker={numeros.kicker} titulo={numeros.titulo} />
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
            {numeros.itens.map((n) => (
              <div key={n.rotulo}>
                <dt className="font-mono text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tabular-nums text-sinal">
                  {n.valor}
                </dt>
                <dd className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-cal">
                  {n.rotulo}
                </dd>
                <dd className="mt-1 text-sm text-maresia">{n.descricao}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {palestrantes && (
        <div className="mt-24">
          <Cabecalho titulo={palestrantes.titulo} />
          <EmbedAutoAltura
            src={palestrantes.src}
            title={palestrantes.titulo}
            alturaInicial={palestrantes.altura}
            className="mt-8 w-full border-0"
          />
        </div>
      )}

      {videos && <Lista bloco={videos} />}
      {reportagens && <Lista bloco={reportagens} />}
      {audios && <Lista bloco={audios} />}

      {fotos && (
        <div className="mt-24">
          <Cabecalho kicker={fotos.kicker} titulo={fotos.titulo} />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-6">
            {fotos.itens.map((f, i) => (
              <figure
                key={f.src}
                className={`reveal-scroll ${i < 2 ? "md:col-span-3" : "md:col-span-2"} ${
                  i === fotos.itens.length - 1 && fotos.itens.length % 2 === 1
                    ? "col-span-2"
                    : ""
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
          {fotos.legenda && (
            <p className="mt-6 font-mono text-xs text-maresia">{fotos.legenda}</p>
          )}
        </div>
      )}

    </section>
  );
}

import { site } from "@/site.config";
import { isTodo, publicados, todoClass } from "@/lib/placeholder";
import { SocialIcon } from "@/components/ui/SocialIcon";

function Campo({ value }: { value: string }) {
  return isTodo(value) ? <span className={todoClass}>{value}</span> : <>{value}</>;
}

export function Footer() {
  const redes = publicados(site.redes);
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-concreto px-6 py-16 md:px-[clamp(1.5rem,5vw,6rem)]">
      <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl uppercase tracking-tight">
            {site.nomeCompleto}
          </p>
          <address className="mt-4 font-mono text-xs not-italic leading-relaxed tracking-wide text-maresia">
            CNPJ <span className="tabular-nums">{site.cadastro.cnpj}</span>
          </address>
        </div>

        <div className="font-mono text-xs tracking-wide text-maresia">
          <p className="mb-3 uppercase tracking-[0.12em] text-cal">Contato</p>
          <p>
            <Campo value={site.contato.email} />
          </p>
          <p>
            <Campo value={site.contato.telefone} />
          </p>
        </div>

        <div className="font-mono text-xs tracking-wide text-maresia">
          <p className="mb-3 uppercase tracking-[0.12em] text-cal">Redes</p>
          {redes.length === 0 && <span className={todoClass}>Pendente</span>}
          <div className="flex gap-3">
            {redes.map((r) =>
              isTodo(r.url) ? (
                <span key={r.label} className={todoClass}>
                  {r.label}
                </span>
              ) : (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-maresia transition-colors hover:border-sinal hover:text-sinal"
                >
                  <SocialIcon nome={r.label} className="h-4 w-4" />
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      <p className="mt-16 font-mono text-[0.7rem] tabular-nums text-maresia">
        © {site.anoFundacao}–{ano} {site.nomeCompleto}
      </p>
    </footer>
  );
}

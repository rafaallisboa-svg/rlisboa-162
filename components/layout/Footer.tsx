import { site } from "@/site.config";
import { isTodo, publicados, todoClass } from "@/lib/placeholder";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { RodapeRelogio } from "@/components/layout/RodapeRelogio";

function Campo({ value }: { value: string }) {
  return isTodo(value) ? <span className={todoClass}>{value}</span> : <>{value}</>;
}

export function Footer() {
  const redes = publicados(site.redes);
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-idv-amarelo text-idv-preto px-6 py-12 md:px-[clamp(1.5rem,5vw,6rem)]">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_auto] md:items-center">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/idv/assinatura-horizontal-menor.svg"
            alt={site.nomeCompleto}
            className="h-8 w-auto md:h-11"
          />
          <address className="mt-4 font-mono text-xs not-italic leading-relaxed tracking-wide text-idv-preto/70">
            CNPJ <span className="tabular-nums">{site.cadastro.cnpj}</span>
          </address>
        </div>

        <div className="font-mono text-xs tracking-wide text-idv-preto/70">
          <p className="mb-3 font-bold uppercase tracking-[0.12em] text-idv-preto">Contato</p>
          <p>
            <Campo value={site.contato.email} />
          </p>
          <p>
            <Campo value={site.contato.telefone} />
          </p>
        </div>

        <div className="font-mono text-xs tracking-wide text-idv-preto/70">
          <p className="mb-3 font-bold uppercase tracking-[0.12em] text-idv-preto">Redes</p>
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-idv-preto/35 text-idv-preto transition-colors hover:bg-idv-preto hover:text-idv-amarelo"
                >
                  <SocialIcon nome={r.label} className="h-4 w-4" />
                </a>
              ),
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 md:justify-end">
          <RodapeRelogio />
          <a
            href="/orcamento"
            className="inline-flex items-center justify-center bg-idv-preto px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-amarelo transition-transform hover:-translate-y-0.5"
          >
            Solicitar orçamento
          </a>
        </div>
      </div>

      <p className="mt-10 font-mono text-[0.7rem] tabular-nums text-idv-preto/70">
        © {site.anoFundacao}–{ano} {site.nomeCompleto}
      </p>
    </footer>
  );
}

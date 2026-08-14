import Link from "next/link";
import { site } from "@/site.config";
import { isTodo, publicados, todoClass } from "@/lib/placeholder";

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
          {redes.map((r) =>
            isTodo(r.url) ? (
              <p key={r.label}>
                <span className={todoClass}>{r.label}</span>
              </p>
            ) : (
              <p key={r.label}>
                <Link href={r.url}>{r.label}</Link>
              </p>
            ),
          )}
        </div>
      </div>

      <p className="mt-16 font-mono text-[0.7rem] tabular-nums text-maresia">
        © {site.anoFundacao}–{ano} {site.nomeCompleto}
      </p>
    </footer>
  );
}

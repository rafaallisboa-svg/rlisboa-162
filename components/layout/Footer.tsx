import Link from "next/link";
import { site } from "@/site.config";
import { isTodo, publicados, todoClass } from "@/lib/placeholder";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { RodapeRelogio } from "@/components/layout/RodapeRelogio";

function Campo({ value }: { value: string }) {
  return isTodo(value) ? <span className={todoClass}>{value}</span> : <>{value}</>;
}

export function Footer() {
  const redes = [
    ...publicados(site.redes),
    { label: "WhatsApp", url: `https://wa.me/${site.contato.whatsapp}`, pendente: false },
  ];
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-idv-amarelo text-idv-preto px-6 py-12 md:px-[clamp(1.5rem,5vw,6rem)]">
      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1.25fr] md:items-start md:gap-10">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/idv/assinatura-horizontal-menor.svg"
            alt={site.nomeCompleto}
            className="-ml-1.5 -mt-1 h-6 w-auto md:h-8"
          />
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
          <div className="flex items-center gap-5">
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
                  className="flex h-8 w-8 items-center justify-center text-idv-preto transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110"
                >
                  <SocialIcon nome={r.label} className="h-8 w-8" />
                </a>
              ),
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 md:-mt-1">
          <RodapeRelogio />
          <Link
            href="/orcamento"
            className="inline-flex items-center justify-center bg-idv-preto px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-amarelo transition-transform hover:-translate-y-0.5"
          >
            Solicitar orçamento
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.7rem] tabular-nums text-idv-preto/70">
        <p>
          © {site.anoFundacao}–{ano} {site.nomeCompleto}
        </p>
        <Link href="/privacidade" className="underline underline-offset-4 hover:text-idv-preto">
          Política de privacidade
        </Link>
      </div>
    </footer>
  );
}

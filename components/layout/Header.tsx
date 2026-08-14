import Link from "next/link";
import { site } from "@/site.config";

const NAV = [
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
] as const;

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/10 bg-concreto/85 px-6 py-4 backdrop-blur-sm md:px-[clamp(1.5rem,5vw,6rem)]">
      <Link href="/" className="flex items-baseline gap-2">
        <span className="font-display text-lg font-bold uppercase tracking-tight">
          {site.marca}
        </span>
        <span className="font-mono text-xs tabular-nums text-maresia">
          {site.numero}
        </span>
      </Link>

      <nav aria-label="Navegação principal" className="hidden gap-8 md:flex">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative font-mono text-xs uppercase tracking-[0.12em] text-cal"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-sinal transition-[width] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
          </Link>
        ))}
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/site.config";

const NAV = [
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
] as const;

export function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-concreto/95 backdrop-blur-sm md:bg-concreto/85">
      <div className="flex items-center justify-between px-6 py-4 md:px-[clamp(1.5rem,5vw,6rem)]">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setAberto(false)}>
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

        <button
          type="button"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            aria-hidden="true"
            className="h-px w-6 bg-cal transition-transform duration-300"
            style={{
              transform: aberto ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            aria-hidden="true"
            className="h-px w-6 bg-cal transition-opacity duration-200"
            style={{ opacity: aberto ? 0 : 1 }}
          />
          <span
            aria-hidden="true"
            className="h-px w-6 bg-cal transition-transform duration-300"
            style={{
              transform: aberto ? "translateY(-6px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      <div
        className="grid md:hidden"
        style={{
          gridTemplateRows: aberto ? "1fr" : "0fr",
          transition: "grid-template-rows 280ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Navegação principal (mobile)"
            className="flex flex-col border-t border-white/10 px-6 py-2"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className="border-b border-white/5 py-4 font-display text-2xl uppercase tracking-tight text-cal last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

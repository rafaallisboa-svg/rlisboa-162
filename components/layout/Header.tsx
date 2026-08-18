"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { publicados } from "@/lib/placeholder";
import { SocialIcon, IconeEmail, IconeWhatsApp } from "@/components/ui/SocialIcon";

const NAV = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
] as const;

export function Header() {
  const [aberto, setAberto] = useState(false);
  const redes = publicados(site.redes);

  // Trava o scroll da página por trás enquanto o menu em tela cheia
  // está aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-concreto/95 backdrop-blur-sm md:bg-concreto/85">
      <div className="flex items-center justify-between px-6 py-4 md:px-[clamp(1.5rem,5vw,6rem)]">
        <Link href="/" className="flex items-baseline gap-2" onClick={fechar}>
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
          className="relative z-[60] flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
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
      </header>

      {/* Menu mobile — tela cheia. Fora do <header> de propósito: o
          backdrop-blur do header cria um novo containing block pra
          descendentes fixed, o que travava esse overlay na altura da
          barra (64px) em vez da tela inteira. z-40 (abaixo do header,
          z-50) pra o botão de fechar continuar visível por cima. */}
      <div
        className="fixed inset-0 z-40 flex flex-col bg-concreto md:hidden"
        style={{
          opacity: aberto ? 1 : 0,
          visibility: aberto ? "visible" : "hidden",
          transition: "opacity 280ms ease, visibility 0s linear " + (aberto ? "0s" : "280ms"),
        }}
      >
        <div className="h-[65px] shrink-0 border-b border-white/10" />

        <nav
          aria-label="Navegação principal (mobile)"
          className="flex flex-1 flex-col justify-center gap-1 px-6"
        >
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={fechar}
              className="group flex items-baseline gap-4 border-b border-white/10 py-5"
            >
              <span className="font-mono text-xs tabular-nums text-maresia">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-4xl uppercase tracking-tight text-cal transition-colors group-hover:text-sinal">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-8">
          <a
            href={`mailto:${site.contato.email}`}
            onClick={fechar}
            className="flex items-center gap-3 font-mono text-sm text-maresia"
          >
            <IconeEmail />
            {site.contato.email}
          </a>
          <a
            href={`https://wa.me/${site.contato.whatsapp}`}
            onClick={fechar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-mono text-sm text-maresia"
          >
            <IconeWhatsApp />
            {site.contato.telefone}
          </a>

          {redes.length > 0 && (
            <div className="mt-2 flex gap-3">
              {redes.map((r) => (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  onClick={fechar}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cal transition-colors hover:border-sinal hover:text-sinal"
                >
                  <SocialIcon nome={r.label} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

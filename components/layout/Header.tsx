"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { publicados } from "@/lib/placeholder";
import { SocialIcon, IconeEmail, IconeWhatsApp } from "@/components/ui/SocialIcon";
import { Logo } from "@/components/ui/Logo";

const NAV: readonly { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [noTopo, setNoTopo] = useState(true);
  const caminho = usePathname();
  const redes = publicados(site.redes);

  // O menu some quando a página desce e volta assim que sobe.
  useEffect(() => {
    let ultimo = window.scrollY;
    setNoTopo(ultimo < 80);
    const aoRolar = () => {
      const y = window.scrollY;
      const delta = y - ultimo;
      setNoTopo(y < 80);
      if (y < 80) setEscondido(false);
      else if (delta > 6) setEscondido(true);
      else if (delta < -6) setEscondido(false);
      if (Math.abs(delta) > 6) ultimo = y;
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Trava o scroll da página por trás enquanto o menu em tela cheia
  // está aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  // No topo da Home e do Contato o menu fica preto; no resto, amarelo.
  const escuro = noTopo && !aberto && (caminho === "/" || caminho === "/contato");
  const cores = (escuro
    ? { "--h-bg": "var(--color-idv-preto)", "--h-fg": "var(--color-idv-off)" }
    : { "--h-bg": "var(--color-idv-amarelo)", "--h-fg": "var(--color-idv-preto)" }) as React.CSSProperties;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--h-fg)]/15 bg-[var(--h-bg)] text-[var(--h-fg)] transition-[transform,background-color,color] duration-300 ease-out"
        style={{ ...cores, transform: escondido && !aberto ? "translateY(-100%)" : "none" }}
      >
      <div className="flex items-center justify-between px-6 py-4 md:px-[clamp(1.5rem,5vw,6rem)]">
        <Link href="/" className="flex items-baseline gap-2" onClick={fechar}>
          <Logo className="h-5 w-auto text-[var(--h-fg)] md:h-6" />
          <span className="font-mono text-xs tabular-nums text-[var(--h-fg)]/60">
            {site.numero}
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden gap-5 md:flex lg:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--h-fg)]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--h-fg)] transition-[width] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Chamada principal: cores invertidas em relação ao menu, visível
            em todas as páginas e tamanhos de tela. */}
        <Link
          href="/orcamento"
          onClick={fechar}
          className="ml-auto hidden shrink-0 items-center whitespace-nowrap border border-[var(--h-fg)] bg-[var(--h-fg)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--h-bg)] transition-colors duration-200 hover:bg-transparent hover:text-[var(--h-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--h-fg)] md:ml-6 md:inline-flex lg:ml-8 lg:px-4 lg:text-xs"
        >
          <span className="hidden lg:inline">Pedir&nbsp;</span>
          <span className="lg:hidden">Orçamento</span>
          <span className="hidden lg:inline">orçamento</span>
        </Link>

        <button
          type="button"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
          className="relative z-[60] flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            aria-hidden="true"
            className="h-px w-6 bg-[var(--h-fg)] transition-transform duration-300"
            style={{
              transform: aberto ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            aria-hidden="true"
            className="h-px w-6 bg-[var(--h-fg)] transition-opacity duration-200"
            style={{ opacity: aberto ? 0 : 1 }}
          />
          <span
            aria-hidden="true"
            className="h-px w-6 bg-[var(--h-fg)] transition-transform duration-300"
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
        className="fixed inset-0 z-40 flex flex-col bg-idv-amarelo text-idv-preto md:hidden"
        style={{
          opacity: aberto ? 1 : 0,
          visibility: aberto ? "visible" : "hidden",
          transition: "opacity 280ms ease, visibility 0s linear " + (aberto ? "0s" : "280ms"),
        }}
      >
        <div className="h-[65px] shrink-0 border-b border-idv-preto/15" />

        <nav
          aria-label="Navegação principal (mobile)"
          className="flex flex-1 flex-col justify-center px-6"
        >
          {NAV.map((item, i) => {
            const ativo = item.href === caminho;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={fechar}
                aria-current={ativo ? "page" : undefined}
                className="group flex items-center justify-between border-b border-idv-preto/20 py-[clamp(0.75rem,2.6vh,1.5rem)] first:border-t"
                style={{
                  opacity: aberto ? 1 : 0,
                  transform: aberto ? "none" : "translateY(28px)",
                  transition: `opacity 420ms ease ${aberto ? 120 + i * 60 : 0}ms, transform 520ms cubic-bezier(0.22,1,0.36,1) ${aberto ? 120 + i * 60 : 0}ms`,
                }}
              >
                <span className="flex items-center gap-3 font-display text-[clamp(2.25rem,11.5vw,3.75rem)] uppercase leading-none tracking-tight text-idv-preto transition-transform duration-300 group-active:translate-x-2">
                  {ativo && (
                    <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-idv-preto" />
                  )}
                  {item.label}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-7 w-7 shrink-0 text-idv-preto transition-transform duration-300 group-active:translate-x-1 group-active:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 18 18 6M8 6h10v10" />
                </svg>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-5 bg-idv-preto px-6 pb-8 pt-6 text-idv-off">
          <Link
            href="/orcamento"
            onClick={fechar}
            className="flex items-center justify-between bg-idv-amarelo px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-preto"
          >
            Pedir orçamento
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4 12h16M14 6l6 6-6 6" />
            </svg>
          </Link>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${site.contato.email}`}
                onClick={fechar}
                className="flex items-center gap-3 font-mono text-sm"
              >
                <IconeEmail />
                {site.contato.email}
              </a>
              <a
                href={`https://wa.me/${site.contato.whatsapp}`}
                onClick={fechar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-sm"
              >
                <IconeWhatsApp />
                {site.contato.telefone}
              </a>
            </div>

            {redes.length > 0 && (
              <div className="flex gap-3">
                {redes.map((r) => (
                  <a
                    key={r.label}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.label}
                    onClick={fechar}
                    className="flex h-10 w-10 items-center justify-center transition-transform duration-200 hover:scale-110"
                  >
                    <SocialIcon nome={r.label} className="h-8 w-8" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

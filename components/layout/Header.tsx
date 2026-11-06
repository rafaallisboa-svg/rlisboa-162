"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { publicados } from "@/lib/placeholder";
import { SocialIcon, IconeEmail, IconeWhatsApp } from "@/components/ui/SocialIcon";
import { Logo } from "@/components/ui/Logo";
import { IconeMenu, type NomeIconeMenu } from "@/components/ui/IconeMenu";

const NAV: readonly { label: string; href: string; icone: NomeIconeMenu }[] = [
  { label: "Home", href: "/", icone: "home" },
  { label: "Projetos", href: "/#projetos", icone: "projetos" },
  { label: "Sobre", href: "/sobre", icone: "sobre" },
  { label: "Serviços", href: "/servicos", icone: "servicos" },
  { label: "Contato", href: "/contato", icone: "contato" },
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

        <nav aria-label="Navegação principal" className="hidden gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--h-fg)]"
            >
              <IconeMenu nome={item.icone} className="h-3 w-3 text-[var(--h-fg)] transition-transform duration-200 group-hover:scale-125" />
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--h-fg)] transition-[width] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
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
          className="flex flex-1 flex-col justify-center gap-1 px-6"
        >
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={fechar}
              className="group flex items-baseline gap-4 border-b border-idv-preto/20 py-5"
            >
              <span className="font-mono text-xs tabular-nums text-idv-preto/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-3 font-display text-4xl uppercase tracking-tight text-idv-preto transition-transform group-hover:translate-x-2">
                <IconeMenu nome={item.icone} className="h-6 w-6 text-idv-preto" />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t border-idv-preto/20 px-6 py-8">
          <a
            href={`mailto:${site.contato.email}`}
            onClick={fechar}
            className="flex items-center gap-3 font-mono text-sm text-idv-preto"
          >
            <IconeEmail />
            {site.contato.email}
          </a>
          <a
            href={`https://wa.me/${site.contato.whatsapp}`}
            onClick={fechar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-mono text-sm text-idv-preto"
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-idv-preto/40 text-idv-preto transition-colors hover:border-idv-preto hover:bg-idv-preto hover:text-idv-amarelo"
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

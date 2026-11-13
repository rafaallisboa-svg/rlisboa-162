"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EVENTO_CONSENTIMENTO, gravarEscolha, lerEscolha } from "@/lib/consentimento";

/**
 * Aviso discreto de cookies (LGPD). Aparece até a pessoa escolher.
 * Enquanto está na tela, o atalho de WhatsApp do celular fica escondido
 * (html[data-cookies="pendente"]) para os dois não se sobreporem.
 */
export function AvisoCookies() {
  // Começa visível já no HTML do servidor (aparece junto com a página, sem atraso).
  // Quem já escolheu não vê: um script no <head> marca html[data-cookie-ok] antes da pintura.
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    const atualizar = () => setMostrar(lerEscolha() === null);
    atualizar();
    window.addEventListener(EVENTO_CONSENTIMENTO, atualizar);
    return () => window.removeEventListener(EVENTO_CONSENTIMENTO, atualizar);
  }, []);

  useEffect(() => {
    if (mostrar) document.documentElement.dataset.cookies = "pendente";
    else delete document.documentElement.dataset.cookies;
  }, [mostrar]);

  if (!mostrar) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="aviso-cookies fixed bottom-4 left-4 right-4 z-[60] border border-idv-off/10 bg-idv-preto p-5 text-idv-off shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:bottom-6 md:left-6 md:right-auto md:max-w-[400px]"
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-idv-off/50">Cookies</p>
      <p className="mt-2 text-sm leading-relaxed text-idv-off/85">
        Uso cookies do Google Analytics para entender quantas pessoas visitam o site. Você
        decide se aceita.{" "}
        <Link href="/privacidade" className="underline underline-offset-4 hover:text-idv-amarelo">
          Política de privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => gravarEscolha("aceito")}
          className="bg-idv-amarelo px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-preto transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-idv-amarelo"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => gravarEscolha("recusado")}
          className="border border-idv-off/30 px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-idv-off transition-colors hover:border-idv-off focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-idv-off"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}

/** Botão da página de privacidade para rever a escolha (o aviso volta). */
export function ReverEscolhaCookies() {
  return (
    <button
      type="button"
      onClick={() => {
        gravarEscolha(null);
        // Se o Analytics já tinha carregado, recarregar garante que ele saia.
        window.location.reload();
      }}
      className="mt-2 border border-cal/30 px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-cal transition-colors hover:border-cal"
    >
      Rever minha escolha de cookies
    </button>
  );
}

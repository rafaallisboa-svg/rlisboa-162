"use client";

import { useEffect, useRef, useState } from "react";
import { Cruz } from "@/components/ui/IdvElementos";
import capas from "@/content/capas.json";

type Capa = { arquivo: string; titulo: string; autor: string };
const ITENS = capas.itens as Capa[];
const N = ITENS.length;
const INTERVALO = 1100; // ms entre uma capa e outra (corte seco, como na referência)

// Fundo da seção (campo "fundo" em content/capas.json) e as três manchas desfocadas de cada um.
const FUNDOS = {
  off: { secao: "bg-idv-off", manchas: ["bg-idv-amarelo/55", "bg-idv-laranja/30", "bg-idv-amarelo-claro"] },
  pedra: { secao: "bg-idv-pedra", manchas: ["bg-idv-off/60", "bg-idv-off/80", "bg-idv-off/50"] },
  amarelo: { secao: "bg-idv-amarelo", manchas: ["bg-idv-laranja/45", "bg-idv-off/70", "bg-idv-amarelo-claro"] },
} as const;
const FUNDO = FUNDOS[(capas.fundo as keyof typeof FUNDOS) ?? "amarelo"] ?? FUNDOS.amarelo;

/**
 * Um livro só, de frente, com as capas trocando sozinhas (referência: bloco
 * "The New Rules of Branding" do Red Antler). Título enorme atrás, manchas de cor
 * desfocadas no fundo. Para quando o mouse está em cima ou a seção sai da tela;
 * com movimento reduzido não troca sozinho, só no clique.
 */
export function CapasLivros() {
  const secaoRef = useRef<HTMLElement>(null);
  const [ativo, setAtivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [reduzido, setReduzido] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setReduzido(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    const el = secaoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (pausado || !visivel || reduzido) return;
    const t = window.setInterval(() => setAtivo((a) => (a + 1) % N), INTERVALO);
    return () => window.clearInterval(t);
  }, [pausado, visivel, reduzido]);

  const atual = ITENS[ativo];

  return (
    <section
      ref={secaoRef}
      id="capas-de-livros"
      aria-label="Capas de livros criadas pelo estúdio"
      className={`relative overflow-hidden ${FUNDO.secao} px-6 py-20 text-idv-preto md:px-[clamp(1.5rem,5vw,6rem)] md:py-28`}
    >
      {/* Manchas de cor desfocadas. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className={`mancha-flutua absolute left-[8%] top-[22%] h-[42vw] max-h-[560px] w-[42vw] max-w-[560px] rounded-full ${FUNDO.manchas[0]} blur-[90px]`} />
        <div
          className={`mancha-flutua absolute right-[6%] top-[38%] h-[38vw] max-h-[520px] w-[38vw] max-w-[520px] rounded-full ${FUNDO.manchas[1]} blur-[90px]`}
          style={{ animationDelay: "-6s", animationDuration: "22s" }}
        />
        <div
          className={`mancha-flutua absolute bottom-[4%] left-[34%] h-[30vw] max-h-[420px] w-[30vw] max-w-[420px] rounded-full ${FUNDO.manchas[2]} blur-[80px]`}
          style={{ animationDelay: "-11s", animationDuration: "26s" }}
        />
      </div>

      <Cruz className="absolute right-6 top-8 h-5 w-5 text-idv-preto/40 md:right-[clamp(1.5rem,5vw,6rem)] md:top-12" />
      <p className="relative font-mono text-xs uppercase tracking-[0.12em] text-idv-preto/60">
        {capas.rotulo}
        <span className="text-idv-laranja">.</span>
      </p>

      <div className="relative mt-10 flex flex-col items-center">
        <h2 className="text-center font-display uppercase leading-[0.86] text-[clamp(3.25rem,13vw,11rem)]">
          {capas.titulo.map((linha) => (
            <span key={linha} className="block">
              {linha}
            </span>
          ))}
        </h2>

        {/* O livro: sobe por cima da segunda linha do título. */}
        <button
          type="button"
          onClick={() => setAtivo((a) => (a + 1) % N)}
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onFocus={() => setPausado(true)}
          onBlur={() => setPausado(false)}
          aria-label={`Capa do livro ${atual.titulo}, de ${atual.autor}. Mostrar a próxima capa`}
          className="relative z-10 mt-6 md:-mt-[clamp(3rem,7.5vw,7rem)] aspect-[148/210] w-[clamp(200px,24vw,340px)] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-idv-preto"
          style={{
            boxShadow:
              "0 40px 70px -28px rgb(14 14 13 / 0.6), 0 14px 24px -10px rgb(14 14 13 / 0.35)",
          }}
        >
          {/* Borda das páginas, à direita. */}
          <span
            aria-hidden="true"
            className="absolute -right-[5px] bottom-[1.2%] top-[1.2%] w-[5px]"
            style={{
              background:
                "repeating-linear-gradient(90deg, #f1f0eb 0 1px, #c9c8c2 1px 2px), #f1f0eb",
            }}
          />
          {ITENS.map((c, i) => (
            <img
              key={c.arquivo}
              src={`/capas/${c.arquivo}.webp`}
              alt=""
              width={720}
              height={1024}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: i === ativo ? 1 : 0 }}
            />
          ))}
          {/* Vinco da lombada e um brilho leve na capa. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgb(14 14 13 / 0.22) 0%, rgb(241 240 235 / 0.22) 1.6%, rgb(14 14 13 / 0.14) 3.4%, transparent 7%), linear-gradient(120deg, rgb(241 240 235 / 0.14) 0%, transparent 45%)",
            }}
          />
        </button>

        <p className="relative mt-8 text-center font-mono text-xs uppercase tracking-[0.12em] text-idv-preto/70" aria-live="off">
          <span className="tabular-nums">
            {String(ativo + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <span className="mx-2 text-idv-preto/40">·</span>
          {atual.autor}
        </p>

        <p className="relative mt-10 max-w-[34rem] text-center text-base leading-relaxed md:text-lg">{capas.frase}</p>

        <div className="relative mt-6 flex items-center gap-8">
          {capas.logos.map((l) => (
            <img key={l.nome} src={l.arquivo} alt={l.nome} style={{ height: l.altura }} className="w-auto" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

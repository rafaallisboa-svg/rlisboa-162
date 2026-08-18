"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TrajetoriaEra } from "@/content/trajetoria";

const SPACING = 60;
const AUTOPLAY_MS = 6000;
const LOCK_MS = 500;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Trajetoria({ itens }: { itens: TrajetoriaEra[] }) {
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [autoplayOn, setAutoplayOn] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const touchStartY = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const advance = useCallback((next: number) => {
    setIndex(next);
    setLocked(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLocked(false), LOCK_MS);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (locked || next === index || next < 0 || next >= itens.length) return;
      setAutoplayOn(false);
      advance(next);
    },
    [advance, index, itens.length, locked],
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Avanço automático — pausa ao passar o mouse/focar e para de vez assim
  // que a pessoa navega manualmente, pra não competir com quem já está
  // lendo por conta própria.
  useEffect(() => {
    if (reduced || !autoplayOn || paused || locked) return;
    const id = setTimeout(() => {
      advance((index + 1) % itens.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [reduced, autoplayOn, paused, locked, index, itens.length, advance]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        goTo(index + 1);
      } else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(itens.length - 1);
      }
    },
    [goTo, index, itens.length],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goTo(index + 1);
    else goTo(index - 1);
  };

  const atual = itens[index];
  const resumoAtual = atual.papeis.map((p) => `${p.role}, ${p.org}`).join("; ");
  const transitionT = reduced ? "200ms ease" : "500ms cubic-bezier(0.22,1,0.36,1)";

  return (
    <div
      ref={stageRef}
      role="group"
      aria-roledescription="stepper"
      aria-label="Trajetória"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      className="relative min-h-[70vh] w-full overflow-hidden bg-blueprint outline-none md:min-h-[560px]"
    >
      {/* Camada 0 — fundo. Transição contínua de dois estados, sem keyframe. */}
      {itens.map((item, i) => {
        const ativo = i === index;
        return (
          <div
            key={item.id}
            aria-hidden="true"
            className="absolute inset-0"
            style={{ opacity: ativo ? 1 : 0, transition: reduced ? "opacity 200ms ease" : "opacity 700ms ease" }}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{
                  transform: ativo ? "scale(1)" : "scale(1.06)",
                  transition: reduced ? "none" : "transform 700ms ease-out",
                }}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blueprint via-concreto to-concreto" />
            )}
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-concreto/90 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* Contador + setas */}
      <div className="absolute left-6 top-4 z-20 flex items-center gap-4 md:left-16">
        <button
          type="button"
          aria-label="Entrada anterior"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
          className="text-maresia transition-colors hover:text-sinal disabled:opacity-20"
        >
          ←
        </button>
        <span className="font-mono text-xs tabular-nums text-maresia">
          {pad(index + 1)} / {pad(itens.length)}
        </span>
        <button
          type="button"
          aria-label="Próxima entrada"
          disabled={index === itens.length - 1}
          onClick={() => goTo(index + 1)}
          className="text-maresia transition-colors hover:text-sinal disabled:opacity-20"
        >
          →
        </button>
      </div>

      <div aria-live="polite" className="sr-only">
        {atual.year} — {resumoAtual}
      </div>

      {/* Corpo: coluna de anos (a linha do tempo) + painel de conteúdo */}
      <div className="relative z-10 flex h-full min-h-[70vh] items-center gap-3 px-4 pt-14 md:min-h-[560px] md:gap-12 md:px-16 md:pt-0">
        {/* Coluna dos anos — cada um é ao mesmo tempo o indicador e a
            navegação. A posição, o tamanho e a opacidade de cada ano são
            função contínua da distância até o índice ativo — por isso o
            item "de baixo" cresce e sobe suavemente ao virar o ativo, e o
            que era ativo encolhe e sai, sem precisar de keyframes: é só
            transition normal reagindo à troca de estado. */}
        <div className="relative h-[220px] w-[168px] shrink-0 md:h-[320px] md:w-[320px]">
          <div className="absolute inset-y-0 right-[7px] w-px bg-white/15 md:right-[9px]" />
          {itens.map((item, i) => {
            const distancia = i - index;
            const abs = Math.abs(distancia);
            const ativo = distancia === 0;
            if (abs > 3) return null;

            const fontSize = ativo
              ? "clamp(1.4rem, 8vw, 3rem)"
              : abs === 1
                ? "0.85rem"
                : "0.75rem";
            const opacity = ativo ? 1 : abs === 1 ? 0.6 : 0.28;

            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Ver ${item.year}`}
                aria-current={ativo ? "true" : undefined}
                onClick={() => goTo(i)}
                className="absolute right-0 flex flex-row-reverse items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sinal"
                style={{
                  top: "50%",
                  transform: `translateY(calc(-50% + ${distancia * SPACING}px))`,
                  transition: `transform ${transitionT}`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="block shrink-0 rounded-full"
                  style={{
                    width: ativo ? 10 : 6,
                    height: ativo ? 10 : 6,
                    backgroundColor: ativo ? "var(--color-sinal)" : "rgba(240,239,234,0.4)",
                    transition: `width ${transitionT}, height ${transitionT}, background-color ${transitionT}`,
                  }}
                />
                <span
                  className="whitespace-nowrap text-right font-display leading-none tracking-tight text-cal"
                  style={{
                    fontSize,
                    opacity,
                    fontWeight: ativo ? 700 : 500,
                    transition: `font-size ${transitionT}, opacity ${transitionT}`,
                  }}
                >
                  {item.year}
                </span>
              </button>
            );
          })}
        </div>

        {/* Painel de conteúdo — crossfade simples da entrada ativa. */}
        <div className="relative min-h-[220px] flex-1 md:min-h-0">
          {itens.map((item, i) => {
            const ativo = i === index;
            return (
              <div
                key={item.id}
                aria-hidden={!ativo}
                className={
                  ativo
                    ? "relative flex max-w-lg flex-col gap-4"
                    : "pointer-events-none absolute inset-0 flex max-w-lg flex-col gap-4"
                }
                style={{
                  opacity: ativo ? 1 : 0,
                  transform: ativo ? "translateY(0)" : "translateY(10px)",
                  transition: ativo
                    ? `opacity 450ms ease-out 120ms, transform 450ms ease-out 120ms`
                    : `opacity 250ms ease`,
                }}
              >
                {item.papeis.map((papel) => (
                  <div key={`${papel.org}-${papel.role}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-lg font-medium text-cal md:text-xl">{papel.role}</span>
                      <span className="font-mono text-sm uppercase tracking-[0.1em] text-sinal">
                        {papel.org}
                      </span>
                      {papel.tag && (
                        <span className="inline-block border border-white/20 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-maresia">
                          {papel.tag}
                        </span>
                      )}
                    </div>
                    {papel.description && (
                      <p className="mt-1 max-w-[420px] text-[15px] leading-relaxed text-maresia">
                        {papel.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

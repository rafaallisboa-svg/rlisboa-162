"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Props = {
  label: string;
  valor: string;
  href: string;
};

/**
 * Duas "peças" (rótulo e valor) soltas numa pista, cada uma com sua
 * velocidade — batem nas bordas da linha e batem uma na outra (colisão
 * elástica simples, estilo DVD screensaver / pong). Para no hover.
 */
export function ChannelRow({ label, valor, href }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const valorRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const labelEl = labelRef.current;
    const valorEl = valorRef.current;
    if (!track || !labelEl || !valorEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dir = () => (Math.random() < 0.5 ? -1 : 1);
    const speed = () => 0.9 + Math.random() * 0.6;

    const state = {
      label: { x: 0, v: dir() * speed() },
      valor: { x: 0, v: dir() * speed() },
    };

    let trackW = track.clientWidth;
    const labelW = () => labelEl.offsetWidth;
    const valorW = () => valorEl.offsetWidth;

    state.label.x = Math.random() * Math.max(0, trackW - labelW() - valorW() - 24);
    state.valor.x = Math.min(
      trackW - valorW(),
      state.label.x + labelW() + 24 + Math.random() * 60,
    );

    const onResize = () => {
      trackW = track.clientWidth;
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      if (!pausedRef.current) {
        const lw = labelW();
        const vw = valorW();

        state.label.x += state.label.v;
        state.valor.x += state.valor.v;

        if (state.label.x <= 0) {
          state.label.x = 0;
          state.label.v = Math.abs(state.label.v);
        } else if (state.label.x + lw >= trackW) {
          state.label.x = trackW - lw;
          state.label.v = -Math.abs(state.label.v);
        }

        if (state.valor.x <= 0) {
          state.valor.x = 0;
          state.valor.v = Math.abs(state.valor.v);
        } else if (state.valor.x + vw >= trackW) {
          state.valor.x = trackW - vw;
          state.valor.v = -Math.abs(state.valor.v);
        }

        // colisão entre os dois — a peça da esquerda passa a ir pra
        // esquerda, a da direita pra direita, com separação mínima pra
        // não ficarem grudados disparando toda hora.
        const labelIsLeft = state.label.x < state.valor.x;
        const overlap = labelIsLeft
          ? state.label.x + lw - state.valor.x
          : state.valor.x + vw - state.label.x;

        if (overlap > 0) {
          const left = labelIsLeft ? state.label : state.valor;
          const right = labelIsLeft ? state.valor : state.label;
          left.v = -Math.abs(left.v);
          right.v = Math.abs(right.v);
          left.x -= overlap / 2 + 1;
          right.x += overlap / 2 + 1;
        }

        labelEl.style.transform = `translateX(${state.label.x}px)`;
        valorEl.style.transform = `translateX(${state.valor.x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const externo = href.startsWith("http");

  return (
    <Link
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-6 border-b border-white/10 py-10"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div ref={trackRef} className="relative h-10 flex-1 overflow-hidden">
        <span
          ref={labelRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-2xl uppercase tracking-tight transition-colors group-hover:text-sinal md:text-3xl"
        >
          {label}
        </span>
        <span
          ref={valorRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-sm text-maresia"
        >
          {valor}
        </span>
      </div>
      <span
        aria-hidden="true"
        className="inline-block shrink-0 font-mono text-xl text-maresia opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sinal group-hover:opacity-100"
      >
        ↗
      </span>
    </Link>
  );
}

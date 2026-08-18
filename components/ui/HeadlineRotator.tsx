"use client";

import { useEffect, useState } from "react";

const INTERVALO_MS = 2400;

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

export function HeadlineRotator({ palavras }: { palavras: string[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % palavras.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [reduced, palavras.length]);

  return (
    <span aria-live="polite" className="relative inline-grid overflow-hidden align-bottom text-left">
      {palavras.map((palavra, i) => {
        const distancia = i - index;
        return (
          <span
            key={palavra}
            aria-hidden={i !== index}
            className="col-start-1 row-start-1 block text-left"
            style={{
              transform: reduced
                ? "translateY(0) scale(1)"
                : `translateY(${distancia * 100}%) scale(${distancia === 0 ? 1 : 0.85})`,
              opacity: reduced ? (distancia === 0 ? 1 : 0) : distancia === 0 ? 1 : 0,
              transition: reduced
                ? "opacity 200ms ease"
                : "transform 550ms cubic-bezier(0.34,1.56,0.64,1), opacity 350ms ease",
            }}
          >
            {palavra}
          </span>
        );
      })}
    </span>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const INTERVALO_MS = 2600;
const SCRAMBLE_MS = 650;
const TICK_MS = 35;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
  const [display, setDisplay] = useState(palavras[0]);
  const reduced = useReducedMotion();
  const scrambleRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Efeito de decodificação: as letras embaralham e vão travando na
  // posição certa, da esquerda pra direita, até formar a palavra —
  // looping contínuo entre as três frases.
  useEffect(() => {
    const alvo = palavras[index];
    if (reduced) {
      setDisplay(alvo);
      return;
    }
    const inicio = Date.now();
    clearInterval(scrambleRef.current);
    scrambleRef.current = setInterval(() => {
      const progresso = Math.min((Date.now() - inicio) / SCRAMBLE_MS, 1);
      const revelado = Math.floor(progresso * alvo.length);
      let saida = "";
      for (let i = 0; i < alvo.length; i++) {
        if (alvo[i] === " ") saida += " ";
        else if (i < revelado) saida += alvo[i];
        else saida += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(saida);
      if (progresso >= 1) {
        setDisplay(alvo);
        clearInterval(scrambleRef.current);
      }
    }, TICK_MS);
    return () => clearInterval(scrambleRef.current);
  }, [index, palavras, reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % palavras.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [reduced, palavras.length]);

  return (
    <span aria-live="polite" className="inline-block whitespace-nowrap tabular-nums">
      {display}
    </span>
  );
}

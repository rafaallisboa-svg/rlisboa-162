"use client";

import { createContext, useContext, useState } from "react";
import type { DirecaoId } from "./direcoes";

const DirecaoContext = createContext<{
  direcao: DirecaoId;
  setDirecao: (d: DirecaoId) => void;
} | null>(null);

export function DirecaoProvider({ children }: { children: React.ReactNode }) {
  const [direcao, setDirecao] = useState<DirecaoId>("a");
  return (
    <DirecaoContext.Provider value={{ direcao, setDirecao }}>
      {children}
    </DirecaoContext.Provider>
  );
}

export function useDirecao() {
  const ctx = useContext(DirecaoContext);
  if (!ctx) throw new Error("useDirecao precisa estar dentro de DirecaoProvider");
  return ctx;
}

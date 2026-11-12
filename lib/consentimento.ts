/**
 * Escolha do visitante sobre os cookies de medição (Google Analytics).
 * Fica só no navegador dele. Sem escolha = Analytics desligado.
 */
export const CHAVE_CONSENTIMENTO = "rl-cookies";
export const EVENTO_CONSENTIMENTO = "rl-consentimento";

export type Escolha = "aceito" | "recusado" | null;

export function lerEscolha(): Escolha {
  try {
    const v = window.localStorage.getItem(CHAVE_CONSENTIMENTO);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

export function gravarEscolha(v: Exclude<Escolha, null> | null) {
  try {
    if (v) window.localStorage.setItem(CHAVE_CONSENTIMENTO, v);
    else window.localStorage.removeItem(CHAVE_CONSENTIMENTO);
  } catch {
    /* navegador sem armazenamento: a escolha vale só nesta visita */
  }
  window.dispatchEvent(new Event(EVENTO_CONSENTIMENTO));
}

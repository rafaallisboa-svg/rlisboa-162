"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { DIRECOES } from "./direcoes";
import { CONTAINER, ACENTO, TINTA_SUAVE, LINHA } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

const CANAIS = ["LinkedIn", "Feiras", "Associações", "Papelaria", "Apresentações", "Outro"];

const ATRIBUTOS = [
  "Estratégica",
  "Confiável",
  "Acessível",
  "Sofisticada",
  "Direta",
  "Acolhedora",
  "Experiente",
  "Moderna",
  "Sólida",
  "Transparente",
  "Ousada",
  "Serena",
  "Ágil",
  "Humana",
  "Rigorosa",
  "Inspiradora",
];

const ACOES = [
  "Agendar conversa estratégica",
  "Baixar material",
  "Seguir no LinkedIn",
  "Outro",
];

type FormState = {
  atributos: string[];
  atributoOutro: string;
  clienteIdeal: string;
  canais: string[];
  canalOutro: string;
  cores: string;
  diferencial: string;
  acao: string;
  evitar: string;
  evitarLogo: string;
};

const ESTADO_INICIAL: FormState = {
  atributos: [],
  atributoOutro: "",
  clienteIdeal: "",
  canais: [],
  canalOutro: "",
  cores: "",
  diferencial: "",
  acao: ACOES[0],
  evitar: "",
  evitarLogo: "",
};

const PERGUNTAS: { rotulo: string; campo: keyof FormState }[] = [
  { rotulo: "4. Alguma cor que você ama ou rejeita, além de evitar tons cítricos?", campo: "cores" },
  { rotulo: "5. Qual é o principal diferencial da Prosperista que a marca precisa deixar claro?", campo: "diferencial" },
];

function montarTexto(form: FormState) {
  const canaisTexto =
    form.canais.length > 0
      ? form.canais.map((c) => (c === "Outro" && form.canalOutro ? `Outro: ${form.canalOutro}` : c)).join(", ")
      : "—";

  const atributosTexto =
    form.atributos.length > 0
      ? [...form.atributos, form.atributoOutro].filter(Boolean).join(", ")
      : form.atributoOutro || "—";

  return `Mini-briefing — Prosperista Consultoria

1. Como quer ser percebida (atributos escolhidos):
${atributosTexto}

2. Cliente ideal:
${form.clienteIdeal || "—"}

3. Onde mais a marca vai aparecer além do site:
${canaisTexto}

4. Cor que ama ou rejeita (além de tons cítricos):
${form.cores || "—"}

5. Principal diferencial a deixar claro:
${form.diferencial || "—"}

6. Ação principal do visitante do site:
${form.acao || "—"}

7. Palavra/conceito a evitar:
${form.evitar || "—"}

8. Algo que não quer no desenho do logo:
${form.evitarLogo || "—"}`;
}

export function BriefingForm() {
  const [form, setForm] = useState<FormState>(ESTADO_INICIAL);
  const [enviado, setEnviado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const a = DIRECOES.a;

  const setCampo = (campo: keyof FormState, valor: string) =>
    setForm((f) => ({ ...f, [campo]: valor }));

  const alternarCanal = (canal: string) =>
    setForm((f) => ({
      ...f,
      canais: f.canais.includes(canal)
        ? f.canais.filter((c) => c !== canal)
        : [...f.canais, canal],
    }));

  const alternarAtributo = (atributo: string) =>
    setForm((f) => ({
      ...f,
      atributos: f.atributos.includes(atributo)
        ? f.atributos.filter((a) => a !== atributo)
        : [...f.atributos, atributo],
    }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const corpo = montarTexto(form);
    const assunto = "Mini-briefing — Prosperista Consultoria";
    const mailto = `mailto:${site.contato.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = mailto;
    setEnviado(true);
  };

  const copiarRespostas = async () => {
    try {
      await navigator.clipboard.writeText(montarTexto(form));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Clipboard indisponível (ex: contexto sem permissão) — sem fallback
      // adicional aqui, o mailto: continua funcionando normalmente.
    }
  };

  return (
    <section className="textura-cinza relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative max-w-3xl`}>
        <GhostNumber numero="07" />
        <SectionLabel numero="07" categoria="Próximo passo" />
        <h2
          className="relative mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Mini-briefing
        </h2>
        <p className="relative mt-4 text-base leading-relaxed" style={{ color: TINTA_SUAVE }}>
          Suas respostas aqui ajudam a fechar o Conceito com precisão. Ao
          enviar, seu cliente de e-mail abre com tudo já formatado — ou, se
          preferir, copie as respostas e cole onde quiser.
        </p>

        <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-10">
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm text-[#221F1D]">
              1. Escolha os atributos que combinam com a Prosperista (3 a 5)
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {ATRIBUTOS.map((atributo) => {
                const selecionado = form.atributos.includes(atributo);
                return (
                  <button
                    key={atributo}
                    type="button"
                    aria-pressed={selecionado}
                    onClick={() => alternarAtributo(atributo)}
                    className="rounded-full border px-4 py-2 text-sm transition-colors"
                    style={{
                      borderColor: selecionado ? ACENTO : LINHA,
                      backgroundColor: selecionado ? ACENTO : "transparent",
                      color: selecionado ? "#FFFDF9" : "#221F1D",
                    }}
                  >
                    {atributo}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              value={form.atributoOutro}
              onChange={(e) => setCampo("atributoOutro", e.target.value)}
              placeholder="Alguma outra palavra que não está na lista?"
              className="mt-1 border bg-transparent px-4 py-3 text-sm text-[#221F1D] outline-none"
              style={{ borderColor: LINHA }}
            />
          </fieldset>

          <label className="flex flex-col gap-3">
            <span className="text-sm text-[#221F1D]">
              2. Quem é o cliente ideal (porte da empresa, setor, momento do negócio)?
            </span>
            <textarea
              value={form.clienteIdeal}
              onChange={(e) => setCampo("clienteIdeal", e.target.value)}
              rows={2}
              className="border bg-transparent px-4 py-3 text-sm text-[#221F1D] outline-none"
              style={{ borderColor: LINHA }}
            />
          </label>

          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm text-[#221F1D]">
              3. Além do site, onde mais a marca vai aparecer?
            </legend>
            <div className="flex flex-wrap gap-3">
              {CANAIS.map((canal) => (
                <label
                  key={canal}
                  className="flex cursor-pointer items-center gap-2 border px-3 py-2 text-sm text-[#221F1D]"
                  style={{
                    borderColor: form.canais.includes(canal) ? ACENTO : LINHA,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.canais.includes(canal)}
                    onChange={() => alternarCanal(canal)}
                    style={{ accentColor: ACENTO }}
                  />
                  {canal}
                </label>
              ))}
            </div>
            {form.canais.includes("Outro") && (
              <input
                type="text"
                value={form.canalOutro}
                onChange={(e) => setCampo("canalOutro", e.target.value)}
                placeholder="Qual?"
                className="mt-1 border bg-transparent px-4 py-3 text-sm text-[#221F1D] outline-none"
                style={{ borderColor: LINHA }}
              />
            )}
          </fieldset>

          {PERGUNTAS.map((p) => (
            <label key={p.campo} className="flex flex-col gap-3">
              <span className="text-sm text-[#221F1D]">{p.rotulo}</span>
              <textarea
                value={form[p.campo] as string}
                onChange={(e) => setCampo(p.campo, e.target.value)}
                rows={2}
                className="border bg-transparent px-4 py-3 text-sm text-[#221F1D] outline-none"
                style={{ borderColor: LINHA }}
              />
            </label>
          ))}

          <label className="flex flex-col gap-3">
            <span className="text-sm text-[#221F1D]">
              6. Qual ação você quer que quem visita o site tome?
            </span>
            <select
              value={form.acao}
              onChange={(e) => setCampo("acao", e.target.value)}
              className="border bg-[#FAF8F3] px-4 py-3 text-sm text-[#221F1D] outline-none"
              style={{ borderColor: LINHA }}
            >
              {ACOES.map((acao) => (
                <option key={acao} value={acao}>
                  {acao}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-sm text-[#221F1D]">
              7. Alguma palavra ou conceito que você NÃO quer associado à marca?
            </span>
            <textarea
              value={form.evitar}
              onChange={(e) => setCampo("evitar", e.target.value)}
              rows={2}
              className="border bg-transparent px-4 py-3 text-sm text-[#221F1D] outline-none"
              style={{ borderColor: LINHA }}
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="text-sm text-[#221F1D]">
              8. Há alguma coisa que você NÃO queira no desenho do seu logo?
            </span>
            <textarea
              value={form.evitarLogo}
              onChange={(e) => setCampo("evitarLogo", e.target.value)}
              rows={2}
              className="border bg-transparent px-4 py-3 text-sm text-[#221F1D] outline-none"
              style={{ borderColor: LINHA }}
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="border border-[#221F1D] px-7 py-3 text-sm text-[#221F1D] transition-colors hover:bg-[#221F1D] hover:text-[#F3EFE6]"
            >
              Enviar por e-mail
            </button>
            <button
              type="button"
              onClick={copiarRespostas}
              className="text-sm underline decoration-black/20 underline-offset-4 transition-colors hover:text-black"
              style={{ color: TINTA_SUAVE }}
            >
              {copiado ? "Copiado!" : "Copiar respostas"}
            </button>
          </div>

          {enviado && (
            <p role="status" className="text-sm" style={{ color: ACENTO }}>
              Abrimos seu cliente de e-mail com as respostas prontas — é só
              conferir e enviar.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

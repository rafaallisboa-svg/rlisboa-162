"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { DIRECOES } from "./direcoes";
import { CONTAINER, ACENTO, TINTA_SUAVE, LINHA } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";

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

const EIXOS = [
  { id: "estilo", esquerda: "Clássico", direita: "Moderno" },
  { id: "tom", esquerda: "Sério", direita: "Descontraído" },
  { id: "registro", esquerda: "Formal", direita: "Informal" },
  { id: "idade", esquerda: "Maduro", direita: "Jovem" },
  { id: "alcance", esquerda: "Exclusivo", direita: "Acessível" },
  { id: "genero", esquerda: "Feminina", direita: "Masculina" },
  { id: "postura", esquerda: "Discreta", direita: "Ousada" },
  { id: "abordagem", esquerda: "Técnica", direita: "Intuitiva" },
];
const POSICOES = 7;
const POSICAO_NEUTRA = 3;

type FormState = {
  atributos: string[];
  atributoOutro: string;
  termometro: Record<string, number>;
  clienteIdeal: string;
  cores: string;
  diferencial: string;
  acao: string;
  evitar: string;
  evitarLogo: string;
};

const ESTADO_INICIAL: FormState = {
  atributos: [],
  atributoOutro: "",
  termometro: Object.fromEntries(EIXOS.map((e) => [e.id, POSICAO_NEUTRA])),
  clienteIdeal: "",
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

function descreverEixo(eixo: (typeof EIXOS)[number], valor: number) {
  const meio = Math.floor(POSICOES / 2);
  if (valor === meio) return `Neutro entre ${eixo.esquerda} e ${eixo.direita}`;
  const lado = valor < meio ? eixo.esquerda : eixo.direita;
  const distancia = Math.abs(valor - meio);
  const intensidade = distancia === meio ? "Totalmente" : distancia >= 2 ? "Bastante" : "Levemente";
  return `${intensidade} para ${lado}`;
}

function montarTexto(form: FormState) {
  const atributosTexto =
    form.atributos.length > 0
      ? [...form.atributos, form.atributoOutro].filter(Boolean).join(", ")
      : form.atributoOutro || "—";

  const termometroTexto = EIXOS.map(
    (eixo) => `${eixo.esquerda} ↔ ${eixo.direita}: ${descreverEixo(eixo, form.termometro[eixo.id])}`,
  ).join("\n");

  return `Mini-briefing — Prosperista Consultoria

1. Como quer ser percebida (atributos escolhidos):
${atributosTexto}

2. Termômetro de posicionamento:
${termometroTexto}

3. Cliente ideal:
${form.clienteIdeal || "—"}

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

const WEB3FORMS_ACCESS_KEY = "773d3207-d2e2-4ecf-8b70-e0b87d8355e4";

type StatusEnvio = "ocioso" | "enviando" | "enviado" | "erro";

export function BriefingForm() {
  const [form, setForm] = useState<FormState>(ESTADO_INICIAL);
  const [status, setStatus] = useState<StatusEnvio>("ocioso");
  const [copiado, setCopiado] = useState(false);
  const a = DIRECOES.a;

  const setCampo = (campo: keyof FormState, valor: string) =>
    setForm((f) => ({ ...f, [campo]: valor }));

  const alternarAtributo = (atributo: string) =>
    setForm((f) => ({
      ...f,
      atributos: f.atributos.includes(atributo)
        ? f.atributos.filter((a) => a !== atributo)
        : [...f.atributos, atributo],
    }));

  const ajustarEixo = (eixoId: string, posicao: number) =>
    setForm((f) => ({ ...f, termometro: { ...f.termometro, [eixoId]: posicao } }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("enviando");
    try {
      const resposta = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Mini-briefing — Prosperista Consultoria",
          from_name: "Mini-briefing — Prosperista",
          email: site.contato.email,
          message: montarTexto(form),
        }),
      });
      const dados = await resposta.json();
      setStatus(dados.success ? "enviado" : "erro");
    } catch {
      setStatus("erro");
    }
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
        <GhostNumber numero="09" />
        <SectionLabel numero="09" categoria="Próximo passo" />
        <h2
          className="relative mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Mini-briefing
        </h2>
        <p className="relative mt-4 text-base leading-relaxed" style={{ color: TINTA_SUAVE }}>
          Suas respostas aqui ajudam a fechar o Conceito com precisão. Ao
          enviar, as respostas chegam direto pra gente — ou, se preferir,
          copie e cole onde quiser.
        </p>

        <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-10">
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-5 text-sm text-[#221F1D]">
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

          <fieldset className="flex flex-col gap-6">
            <legend className="mb-5 text-sm text-[#221F1D]">
              2. Termômetro de posicionamento — clique onde a Prosperista fica em cada eixo
            </legend>
            {EIXOS.map((eixo) => {
              const posicao = form.termometro[eixo.id];
              return (
                <div key={eixo.id} className="grid grid-cols-[5.5rem_1fr_5.5rem] items-center gap-3 md:grid-cols-[6.5rem_1fr_6.5rem]">
                  <span className="text-right text-sm text-[#221F1D]">{eixo.esquerda}</span>
                  <div className="relative flex h-6 items-center">
                    <div className="absolute inset-x-0 h-px" style={{ backgroundColor: LINHA }} aria-hidden="true" />
                    <div className="relative flex w-full justify-between">
                      {Array.from({ length: POSICOES }, (_, i) => i).map((i) => {
                        const ativo = i === posicao;
                        return (
                          <button
                            key={i}
                            type="button"
                            aria-label={`${eixo.esquerda} – ${eixo.direita}, posição ${i + 1} de ${POSICOES}`}
                            aria-pressed={ativo}
                            onClick={() => ajustarEixo(eixo.id, i)}
                            className="flex h-6 w-6 items-center justify-center"
                          >
                            <span
                              className="block rounded-full transition-all"
                              style={{
                                width: ativo ? 16 : 2,
                                height: ativo ? 16 : 16,
                                backgroundColor: ativo ? ACENTO : "rgba(34,31,29,0.25)",
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <span className="text-sm text-[#221F1D]">{eixo.direita}</span>
                </div>
              );
            })}
          </fieldset>

          <label className="flex flex-col gap-3">
            <span className="text-sm text-[#221F1D]">
              3. Quem é o cliente ideal (porte da empresa, setor, momento do negócio)?
            </span>
            <textarea
              value={form.clienteIdeal}
              onChange={(e) => setCampo("clienteIdeal", e.target.value)}
              rows={2}
              className="border bg-transparent px-4 py-3 text-sm text-[#221F1D] outline-none"
              style={{ borderColor: LINHA }}
            />
          </label>

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
              disabled={status === "enviando"}
              className="border border-[#221F1D] px-7 py-3 text-sm text-[#221F1D] transition-colors hover:bg-[#221F1D] hover:text-[#F3EFE6] disabled:opacity-50"
            >
              {status === "enviando" ? "Enviando…" : "Enviar respostas"}
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

          {status === "enviado" && (
            <p role="status" className="text-sm" style={{ color: ACENTO }}>
              Respostas enviadas — obrigado! Vamos usar isso pra fechar o
              Conceito.
            </p>
          )}
          {status === "erro" && (
            <p role="status" className="text-sm text-red-700">
              Não conseguimos enviar agora. Tente de novo em instantes ou
              clique em &ldquo;Copiar respostas&rdquo; e envie por WhatsApp
              ou e-mail.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

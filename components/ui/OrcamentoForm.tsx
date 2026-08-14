"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { site } from "@/site.config";

const SERVICOS_OPCOES = [
  "Identidade Visual",
  "Website",
  "Apresentação",
  "Social Media Kit",
  "Outro",
];

const campoClasse =
  "mt-2 w-full border-b border-white/15 bg-transparent py-2 text-body text-cal outline-none focus:border-sinal";
const labelClasse = "font-mono text-xs uppercase tracking-[0.12em] text-maresia";

export function OrcamentoForm() {
  const params = useSearchParams();
  const servicoInicial = params.get("servico") ?? "";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState(
    SERVICOS_OPCOES.includes(servicoInicial) ? servicoInicial : SERVICOS_OPCOES[0],
  );
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const assunto = `Orçamento — ${servico}`;
    const corpo = [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      telefone && `Telefone: ${telefone}`,
      `Serviço: ${servico}`,
      "",
      mensagem,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.contato.email}?subject=${encodeURIComponent(
      assunto,
    )}&body=${encodeURIComponent(corpo)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
      <div>
        <label className={labelClasse} htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={campoClasse}
        />
      </div>

      <div>
        <label className={labelClasse} htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={campoClasse}
        />
      </div>

      <div>
        <label className={labelClasse} htmlFor="telefone">
          Telefone / WhatsApp (opcional)
        </label>
        <input
          id="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className={campoClasse}
        />
      </div>

      <div>
        <label className={labelClasse} htmlFor="servico">
          Serviço
        </label>
        <select
          id="servico"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
          className={campoClasse}
        >
          {SERVICOS_OPCOES.map((s) => (
            <option key={s} value={s} className="bg-concreto">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasse} htmlFor="mensagem">
          Conte sobre o projeto
        </label>
        <textarea
          id="mensagem"
          required
          rows={5}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className={campoClasse}
        />
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex w-fit items-center justify-center bg-sinal px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5"
      >
        Enviar
      </button>
    </form>
  );
}

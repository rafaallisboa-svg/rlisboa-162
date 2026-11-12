"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { site } from "@/site.config";

const SERVICOS_OPCOES = [
  "Identidade Visual",
  "Website",
  "Apresentação",
  "Social Media Kit",
  "Vídeo & Motion Graphics",
  "Eventos",
  "Materiais Gráficos",
  "Outro",
];

// Chave pública do Web3Forms (pode ficar no código): o envio chega por e-mail, sem abrir o programa de e-mail.
const WEB3FORMS_ACCESS_KEY = "773d3207-d2e2-4ecf-8b70-e0b87d8355e4";

type StatusEnvio = "ocioso" | "enviando" | "enviado" | "erro";

const campoClasse =
  "mt-2 w-full border-b border-white/15 bg-transparent py-2 text-body text-cal outline-none focus:border-sinal";
const labelClasse = "font-mono text-xs uppercase tracking-[0.12em] text-maresia";

export function OrcamentoForm() {
  const params = useSearchParams();
  const router = useRouter();
  const servicoInicial = params.get("servico") ?? "";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState(
    SERVICOS_OPCOES.includes(servicoInicial) ? servicoInicial : SERVICOS_OPCOES[0],
  );
  const [mensagem, setMensagem] = useState("");

  const [status, setStatus] = useState<StatusEnvio>("ocioso");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("enviando");
    const corpo = [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      telefone && `Telefone / WhatsApp: ${telefone}`,
      `Serviço: ${servico}`,
      "",
      mensagem,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const resposta = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Orçamento — ${servico}`,
          from_name: nome,
          email,
          replyto: email,
          message: corpo,
          botcheck: "",
        }),
      });
      const dados = await resposta.json();
      if (dados.success) {
        setStatus("enviado");
        // Página própria de agradecimento: dá pra medir os pedidos no Analytics.
        router.push("/orcamento/obrigado");
      } else {
        setStatus("erro");
      }
    } catch {
      setStatus("erro");
    }
  }

  if (status === "enviado") {
    return (
      <div className="mt-12" role="status">
        <p className="font-display text-2xl uppercase tracking-tight text-sinal md:text-3xl">
          Mensagem enviada
        </p>
        <p className="mt-4 max-w-md text-body text-maresia">
          Recebi o seu pedido e respondo por e-mail {site.contato.prazoResposta}. Obrigado!
        </p>
      </div>
    );
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
          Conta sobre o projeto
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
        disabled={status === "enviando"}
        className="mt-4 inline-flex w-fit items-center justify-center bg-sinal px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "enviando" ? "Enviando…" : "Enviar"}
      </button>

      <p className="-mt-2 font-mono text-xs text-maresia">
        Respondo {site.contato.prazoResposta}. Ao enviar, você concorda com a{" "}
        <Link href="/privacidade" className="underline underline-offset-4 hover:text-sinal">
          política de privacidade
        </Link>
        .
      </p>

      {status === "erro" && (
        <p role="alert" className="text-sm text-maresia">
          Não consegui enviar agora. Tente de novo ou escreva direto para{" "}
          <a className="text-sinal underline" href={`mailto:${site.contato.email}`}>
            {site.contato.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}

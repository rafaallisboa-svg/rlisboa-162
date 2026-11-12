import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import { ReverEscolhaCookies } from "@/components/ui/AvisoCookies";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como o site do estúdio R. Lisboa trata os seus dados: formulário de orçamento, cookies de medição e os seus direitos pela LGPD.",
  alternates: { canonical: "/privacidade" },
};

const ATUALIZADA = "12 de novembro de 2026";

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-8">
      <h2 className="font-display text-2xl uppercase leading-tight text-cal md:text-3xl">{titulo}</h2>
      <div className="mt-4 flex flex-col gap-4 text-body leading-relaxed text-cal/80">{children}</div>
    </section>
  );
}

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-28 pt-40 md:px-0">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Privacidade<span className="text-idv-laranja">.</span>
      </p>
      <h1 className="mt-2 font-display uppercase leading-none text-h1">Política de privacidade</h1>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Atualizada em {ATUALIZADA}
      </p>
      <p className="mt-6 text-body leading-relaxed text-cal/80">
        Este site coleta o mínimo de dados possível. Aqui está, em linguagem simples, o que é coletado,
        para quê, e como você pode pedir para ver ou apagar os seus dados, de acordo com a Lei Geral de
        Proteção de Dados (LGPD, Lei 13.709/2018).
      </p>

      <div className="mt-12 flex flex-col gap-10">
        <Bloco titulo="Quem é o responsável">
          <p>
            {site.nomeCompleto}, CNPJ <span className="font-mono tabular-nums">{site.cadastro.cnpj}</span>,
            com sede fiscal em {site.cadastro.sedeFiscal.cidade} ({site.cadastro.sedeFiscal.estado}) e atendimento
            a partir de {site.local.cidade} ({site.local.estado}).
          </p>
          <p>
            Para qualquer assunto sobre os seus dados, escreva para{" "}
            <a href={`mailto:${site.contato.email}`} className="text-cal underline underline-offset-4 hover:text-sinal">
              {site.contato.email}
            </a>
            .
          </p>
        </Bloco>

        <Bloco titulo="O que é coletado">
          <p>
            <strong className="font-medium text-cal">Formulário de orçamento:</strong> nome, e-mail, telefone (se você
            informar), o serviço escolhido e a mensagem. Esses dados chegam por e-mail e são usados só para responder
            ao seu pedido.
          </p>
          <p>
            <strong className="font-medium text-cal">Visitas ao site:</strong> se você aceitar os cookies, o Google
            Analytics registra dados de navegação de forma agregada (páginas vistas, tempo no site, cidade aproximada,
            tipo de aparelho e de onde você veio). Nada disso identifica você pelo nome.
          </p>
          <p>
            <strong className="font-medium text-cal">WhatsApp, e-mail e redes:</strong> quando você clica nesses links,
            a conversa acontece no aplicativo de cada um, com as regras de privacidade dele.
          </p>
        </Bloco>

        <Bloco titulo="Cookies">
          <p>
            O site só usa cookies de medição do Google Analytics, e só depois que você clica em
            &ldquo;Aceitar&rdquo; no aviso. Se você recusar, nenhum cookie de medição é gravado. A sua escolha fica
            guardada apenas no seu navegador.
          </p>
          <ReverEscolhaCookies />
        </Bloco>

        <Bloco titulo="Com quem os dados são compartilhados">
          <p>
            Apenas com os serviços que fazem o site funcionar: a Vercel (hospedagem), o Web3Forms (envio do formulário
            por e-mail) e o Google (Analytics, se aceito). Os dados não são vendidos nem usados para propaganda.
          </p>
        </Bloco>

        <Bloco titulo="Por quanto tempo">
          <p>
            Pedidos de orçamento ficam guardados enquanto houver conversa sobre o projeto e, depois, por até 2 anos.
            Os dados do Google Analytics seguem o prazo configurado na ferramenta, de até 14 meses.
          </p>
        </Bloco>

        <Bloco titulo="Os seus direitos">
          <p>
            Você pode, a qualquer momento, pedir para saber quais dados seus existem, corrigir, apagar ou retirar o seu
            consentimento. É só escrever para{" "}
            <a href={`mailto:${site.contato.email}`} className="text-cal underline underline-offset-4 hover:text-sinal">
              {site.contato.email}
            </a>
            . A resposta vem em até 15 dias.
          </p>
        </Bloco>
      </div>

      <p className="mt-16">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.12em] text-maresia transition-colors hover:text-sinal">
          ← Voltar para a home
        </Link>
      </p>
    </div>
  );
}

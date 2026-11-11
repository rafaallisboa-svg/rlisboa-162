import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import { getProjetos } from "@/lib/projetos";
import { publicados } from "@/lib/placeholder";
import { OutrosProjetos } from "@/components/sections/OutrosProjetos";
import { StickerRafa } from "@/components/ui/IdvElementos";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { EventoPedidoOrcamento } from "@/components/seo/EventoPedidoOrcamento";

// Só faz sentido para quem acabou de enviar o formulário: fora do Google.
export const metadata: Metadata = {
  title: "Pedido de orçamento enviado",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  const instagram = publicados(site.redes).find((r) => r.label === "Instagram");

  return (
    <>
      <EventoPedidoOrcamento />
      <div className="relative mx-auto max-w-2xl px-6 pb-20 pt-40 md:px-0">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
              Orçamento enviado<span className="text-idv-laranja">.</span>
            </p>
            <h1 className="mt-2 font-display uppercase leading-none text-h1">Obrigado</h1>
          </div>
          <StickerRafa className="hidden h-28 w-auto shrink-0 md:block" />
        </div>

        <p className="mt-8 max-w-md text-body text-cal" role="status">
          Recebi o seu pedido e respondo por e-mail{" "}
          <strong className="font-bold text-cal">{site.contato.prazoResposta}</strong>.
        </p>
        <p className="mt-3 max-w-md text-sm text-cal">
          Se for urgente, me chama no{" "}
          <a
            href={`https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(
              site.contato.whatsappMensagem,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-4 hover:text-idv-amarelo"
          >
            WhatsApp
          </a>
          .
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/#projetos"
            className="inline-flex items-center bg-sinal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sinal"
          >
            Ver projetos
          </Link>
          {instagram && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-cal transition-colors hover:text-idv-amarelo"
            >
              <SocialIcon nome="Instagram" className="h-4 w-4" />
              Siga no Instagram
            </a>
          )}
        </div>
      </div>

      <OutrosProjetos
        titulo="Enquanto isso, alguns projetos"
        projetos={getProjetos()
          .filter((p) => !p.pendente)
          .map((p) => ({
            slug: p.slug,
            titulo: p.titulo,
            subtitulo: p.subtitulo,
            imagem: p.thumb ?? p.capa,
          }))}
      />
    </>
  );
}

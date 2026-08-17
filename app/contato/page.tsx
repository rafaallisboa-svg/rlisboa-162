import { publicados } from "@/lib/placeholder";
import { site } from "@/site.config";
import { ChannelRow } from "@/components/ui/ChannelRow";

export default function ContatoPage() {
  const redes = publicados(site.redes).filter((r) => r.label !== "Behance");
  const whatsappUrl = `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(
    site.contato.whatsappMensagem,
  )}`;

  const redeValor = (r: (typeof redes)[number]) => {
    const identificador = r.url.replace(/\/$/, "").split("/").pop() ?? r.label;
    return r.label === "LinkedIn" ? `in/${identificador}` : `@${identificador}`;
  };

  const canais = [
    { label: "E-mail", valor: site.contato.email, href: `mailto:${site.contato.email}` },
    { label: "WhatsApp", valor: site.contato.telefone, href: whatsappUrl },
    ...redes.map((r) => ({ label: r.label, valor: redeValor(r), href: r.url })),
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 pb-28 pt-40 md:px-16 lg:px-0">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-maresia">
        Contato
      </p>
      <h1 className="mt-2 max-w-2xl font-display uppercase leading-none text-h1">
        Vamos conversar sobre o seu projeto.
      </h1>
      <p className="mt-6 max-w-sm text-body text-maresia">
        Conte a ideia e o prazo — respondo pelo canal que for melhor pra
        você.
      </p>

      <div className="mt-16 border-t border-white/10">
        {canais.map((c) => (
          <ChannelRow key={c.label} label={c.label} valor={c.valor} href={c.href} />
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 text-center">
        <p className="whitespace-nowrap text-2xl text-cal">
          Quais são seus desafios?
        </p>
        <a
          href="/orcamento"
          className="inline-flex items-center justify-center rounded-full bg-sinal px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5"
        >
          Solicitar orçamento
        </a>
      </div>
    </div>
  );
}

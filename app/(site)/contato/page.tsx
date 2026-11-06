import { publicados } from "@/lib/placeholder";
import { site } from "@/site.config";
import { ChannelRow } from "@/components/ui/ChannelRow";
import { Cruz, SeloRegua } from "@/components/ui/IdvElementos";
import { GrafismoParallax } from "@/components/motion/GrafismoParallax";

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
    <>
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-40 md:px-16 lg:px-0">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        {/* Retrato de perfil, à direita. Some na base, no mesmo fundo do site. */}
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:mx-0 lg:max-w-none lg:-mt-6">
          <Cruz className="absolute right-0 top-4 h-5 w-5 text-idv-grafite" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/contato/perfil.webp"
            alt="Rafael Lisboa, de perfil"
            className="relative block w-full"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, #000 68%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, #000 68%, transparent 100%)",
            }}
          />
        </div>

        <div className="order-2 lg:order-1">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-maresia">
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-idv-amarelo" />
            Contato
          </p>
          <h1 className="mt-2 max-w-2xl font-display uppercase leading-none text-h1">
            Vamos conversar sobre o seu projeto<span className="text-idv-laranja">.</span>
          </h1>
          <span aria-hidden="true" className="mt-6 block h-[3px] w-24 bg-idv-amarelo" />
          <p className="mt-5 max-w-sm text-body text-maresia">
            Conte a ideia e o prazo — respondo pelo canal que for melhor pra
            você.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-x-12 border-t border-white/10 sm:grid-cols-2">
        {canais.map((c) => (
          <ChannelRow key={c.label} label={c.label} valor={c.valor} href={c.href} />
        ))}
      </div>

      <div className="relative mx-auto mt-20 flex h-[22rem] w-[22rem] items-center justify-center md:h-[30rem] md:w-[30rem]">
        <SeloRegua tinta="var(--color-idv-off)" numero={false} className="absolute inset-0 h-full w-full" />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-maresia">
              Quais são seus desafios?
            </p>
            <p className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-cal md:text-5xl">
              Chame
              <br />o Rafa<span className="text-idv-laranja">.</span>
            </p>
          </div>
          <a
            href="/orcamento"
            className="inline-flex items-center justify-center rounded-full bg-sinal px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-concreto transition-transform hover:-translate-y-0.5"
          >
            Solicitar orçamento
          </a>
        </div>
      </div>
    </div>
    <GrafismoParallax tipo="aneis" />
    </>
  );
}

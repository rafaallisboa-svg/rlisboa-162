import Image from "next/image";
import { DIRECOES } from "./direcoes";

export function HeroProposta() {
  const a = DIRECOES.a;
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/propostas/prosperista/textura-tecido.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/78" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center md:min-h-[80vh] md:px-16">
        <p className="inline-block border border-[#221F1D]/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#A9694F]">
          Proposta de identidade visual &amp; landing page
        </p>
        <h1
          className="mt-8 text-[clamp(3.5rem,9vw,7.5rem)] font-bold uppercase leading-[0.95] text-[#221F1D]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Prosperista
        </h1>
        <p
          className="mt-3 text-base font-bold uppercase tracking-[0.35em] text-[#221F1D] md:text-lg"
          style={{ fontFamily: a.fontTitulo }}
        >
          Consultoria
        </p>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#221F1D]/70 md:text-xl">
          Uma marca para uma consultoria que atua como copiloto estratégico —
          fortalecendo a gestão de pequenas e médias empresas sem tirar o
          empresário do comando.
        </p>
        <div className="mt-10 flex flex-col gap-1 border-t border-[#221F1D]/12 pt-6 text-sm text-[#221F1D]/55">
          <p>Preparado para Sandra Lia Morassutti, fundadora da Prosperista</p>
          <p>Por Rafael Lisboa — R. Lisboa Estúdio 162</p>
        </div>
      </div>
    </section>
  );
}

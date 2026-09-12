import Image from "next/image";
import { DIRECOES } from "./direcoes";
import { CONTAINER, TINTA_SUAVE } from "./chrome";
import { SectionLabel } from "./SectionLabel";
import { GhostNumber } from "./GhostNumber";
import manifest from "../../../public/propostas/prosperista/moodboard/manifest.json";

export function MoodboardSection() {
  const a = DIRECOES.a;
  return (
    <section className="textura-cinza relative overflow-hidden px-6 py-20 md:px-16 md:py-28">
      <div className={`${CONTAINER} relative`}>
        <GhostNumber numero="04" />
        <SectionLabel numero="04" categoria="Moodboard" />
        <h2
          className="relative mt-6 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08]"
          style={{ fontFamily: a.fontTitulo }}
        >
          Território visual que exploramos
        </h2>
        <p className="relative mt-4 max-w-xl text-base leading-relaxed" style={{ color: TINTA_SUAVE }}>
          Referências de aplicação, materiais e símbolos que ajudam a
          calibrar o tom antes de partir para o Conceito — não é o
          resultado final, é o mapa de onde estamos olhando.
        </p>

        <div className="relative mt-12 columns-2 gap-4 md:columns-3 md:gap-5">
          {manifest.map((img) => (
            <div key={img.file} className="mb-4 break-inside-avoid overflow-hidden md:mb-5">
              <Image
                src={`/propostas/prosperista/moodboard/${img.file}`}
                alt=""
                width={img.w}
                height={img.h}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

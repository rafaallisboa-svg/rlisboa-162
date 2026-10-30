import { site } from "@/site.config";
import { LinhasFundo } from "@/components/ui/LinhasFundo";
import { HeadlineRotator } from "@/components/ui/HeadlineRotator";
import { TextoRevelar, type Segmento } from "@/components/motion/TextoRevelar";
import { FotoParallax } from "@/components/motion/FotoParallax";

const PARAGRAFOS: Segmento[][] = [
  [
    { t: "R. Lisboa Estúdio 162 é um estúdio de design que " },
    { t: "une estratégia e criação para conectar marcas a pessoas", d: true },
    {
      t: ". Cada projeto começa pelo entendimento do negócio e ganha forma em identidades visuais para marcas e eventos, peças gráficas, sites, apresentações, projetos editoriais, audiovisual e motion graphics.",
    },
  ],
  [
    {
      t: "À frente do estúdio está Rafael Lisboa, designer com mais de 15 anos de experiência e Diretor de Criação da Inovativos, empresa de planejamento estratégico de conteúdo, inteligência e networking.",
    },
  ],
  [
    { t: "Entre as parcerias mais longas está o " },
    { t: "Security Leaders", d: true },
    {
      t: ", o maior e mais qualificado evento de Segurança da Informação do Brasil. Desde 2010, o conceito criativo de cada edição nasce aqui e chega a tudo o que o público vê, das campanhas de divulgação à cenografia animada em painéis de LED.",
    },
  ],
  [
    { t: "O portfólio inclui ainda a " },
    { t: "Rede Líderes", d: true },
    {
      t: ", que transforma diálogos e inteligência de dados em decisões de negócios, e a Z1 Boutique de Imóveis, de São Paulo, além de marcas de diferentes segmentos.",
    },
  ],
];

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-28 pt-40 md:px-16 lg:px-0">
      <div className="relative flex flex-col items-center border-b border-white/10 pb-24 text-center">
        <LinhasFundo />
        <p className="relative font-mono text-xs uppercase tracking-[0.12em] text-maresia">
          Estúdio 162 — desde {site.anoFundacao}
        </p>
        <h2 className="relative mt-6 max-w-2xl font-display uppercase leading-[0.95] text-h1">
          <HeadlineRotator palavras={["Design Gráfico", "Web Design", "Motion Design"]} />
        </h2>
      </div>

      <TextoRevelar
        paragrafos={PARAGRAFOS}
        className="mt-24 flex flex-col gap-8 text-[clamp(1.375rem,2.5vw,2.375rem)] font-medium leading-[1.25] tracking-tight text-cal"
      />

      <div className="mt-24">
        <FotoParallax
          src="/api/ph?w=1600&h=900&label=Foto Rafael Lisboa"
          alt="Rafael Lisboa"
        />
        <p className="mt-4 font-display text-base uppercase tracking-tight text-cal">
          Rafael Lisboa
        </p>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-maresia">
          Designer e diretor de arte
        </p>
      </div>
    </div>
  );
}

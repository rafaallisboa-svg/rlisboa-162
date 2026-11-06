import { site } from "@/site.config";
import { HeadlineRotator } from "@/components/ui/HeadlineRotator";
import { TextoRevelar, type Segmento } from "@/components/motion/TextoRevelar";
import { RetratoFixo } from "@/components/motion/RetratoFixo";
import { AneisIntersecao, Cruz, Pavimento, SeloAneis } from "@/components/ui/IdvElementos";
import { Logo } from "@/components/ui/Logo";

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
    <div className="relative text-idv-off">
      {/* Retrato fixo no topo: some aos poucos enquanto o texto sobe por cima, no mesmo fundo. */}
      <RetratoFixo
        src="/sobre/sobre-horizontal.webp"
        srcMobile="/sobre/sobre-vertical.webp"
        alt="Rafael Lisboa sorrindo, ao lado do sticker 162"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[65px]">
          <Cruz className="absolute bottom-8 right-6 hidden h-5 w-5 text-idv-grafite md:right-[clamp(1.5rem,5vw,6rem)] md:block" />
          <Cruz className="absolute left-6 top-6 hidden h-5 w-5 text-idv-grafite md:left-[clamp(1.5rem,5vw,6rem)] md:block" />

          <div className="absolute hidden left-6 md:bottom-1/2 md:block md:left-[clamp(1.5rem,5vw,6rem)] md:translate-y-1/2">
            <Pavimento className="entra mb-6 hidden h-12 w-auto md:block" style={{ animationDelay: "0.1s" }} />
            <Logo className="entra h-9 w-auto text-idv-off md:h-14 lg:h-20" atraso={1.4} />
            <span
              aria-hidden="true"
              className="regua-cresce mt-4 block h-[3px] w-24 bg-idv-amarelo md:mt-6 md:w-32"
              style={{ animationDelay: "0.7s" }}
            />
            <p
              className="entra mt-3 font-display text-lg tracking-tight text-idv-cinza md:mt-4 md:text-3xl"
              style={{ animationDelay: "0.9s" }}
            >
              Estúdio 162
            </p>
            <p
              className="entra mt-6 hidden font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-idv-cinza md:block"
              style={{ animationDelay: "1.1s" }}
            >
              Identidade visual · websites
              <br />
              motion · social · impressos
            </p>
          </div>
        </div>
      </RetratoFixo>

      <div className="relative z-10 -mt-[18svh]">
        <div className="relative overflow-hidden">
          <Cruz className="absolute left-6 top-32 h-5 w-5 text-idv-grafite md:left-16" />
          <Cruz className="absolute right-6 top-32 hidden h-5 w-5 text-idv-grafite md:right-16 md:block" />

          <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-32 md:px-16 lg:px-0">
            <div className="relative flex flex-col items-center border-b border-idv-grafite pb-24 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-idv-cinza">
                Estúdio 162 — desde <span className="text-idv-amarelo">{site.anoFundacao}</span>
              </p>
              <h2 className="mt-6 max-w-2xl font-display uppercase leading-[0.95] text-h1 text-idv-off">
                <HeadlineRotator palavras={["Design Gráfico", "Web Design", "Motion Design"]} />
              </h2>
            </div>

            <TextoRevelar
              paragrafos={PARAGRAFOS}
              destaque="text-idv-amarelo"
              className="mt-24 flex flex-col gap-8 text-[clamp(1.375rem,2.5vw,2.375rem)] font-medium leading-[1.25] tracking-tight text-idv-off"
            />

            <div className="mt-28 flex flex-col items-center border-t border-idv-grafite pt-14">
              <a
                href="/orcamento"
                className="inline-flex items-center justify-center bg-idv-amarelo px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-preto transition-transform hover:-translate-y-0.5"
              >
                Solicitar orçamento
              </a>
            </div>
          </div>

          {/* Dois anéis que se cruzam, cortados pela borda de baixo, logo acima do rodapé. */}
          <AneisIntersecao className="mx-auto mt-16 block w-full max-w-3xl px-6 md:px-0" />

          {/* O selo fica na extremidade da página, cortado ao meio. */}
          <SeloAneis className="absolute bottom-[10rem] right-0 h-36 w-36 translate-x-1/2 md:bottom-[12.75rem] md:h-56 md:w-56 lg:bottom-[10.75rem] lg:h-72 lg:w-72" />
        </div>
      </div>
    </div>
  );
}

import { site } from "@/site.config";
import { HeadlineRotator } from "@/components/ui/HeadlineRotator";
import { TextoRevelar, type Segmento } from "@/components/motion/TextoRevelar";
import { RetratoFixo } from "@/components/motion/RetratoFixo";
import { AnelMeio, Cruz } from "@/components/ui/IdvElementos";

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
        <div className="absolute bottom-10 left-6 md:bottom-14 md:left-16">
          <p className="font-display text-base uppercase tracking-tight text-idv-off">
            Rafael Lisboa
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-idv-cinza">
            Designer e diretor de criação
          </p>
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

            <div className="mt-28 flex min-h-64 items-center border-t border-idv-grafite pt-14 md:min-h-80">
              <a
                href="/orcamento"
                className="inline-flex items-center justify-center bg-idv-amarelo px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-idv-preto transition-transform hover:-translate-y-0.5"
              >
                Solicitar orçamento
              </a>
            </div>
          </div>

          {/* O anel fica na extremidade da página, parte dele sai da tela. */}
          <AnelMeio className="absolute bottom-12 right-0 h-64 w-64 translate-x-[30%] md:h-80 md:w-80" />
        </div>
      </div>
    </div>
  );
}

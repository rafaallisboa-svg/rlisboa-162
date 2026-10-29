import { site } from "@/site.config";
import { LinhasFundo } from "@/components/ui/LinhasFundo";
import { HeadlineRotator } from "@/components/ui/HeadlineRotator";

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

      <div className="mt-24 grid gap-12 md:grid-cols-[360px_1fr] md:gap-16">
        <div>
          <div className="aspect-[3/5] w-full overflow-hidden bg-blueprint">
            <img
              src="/api/ph?w=800&h=1000&label=Foto Rafael Lisboa"
              alt="Rafael Lisboa"
              className="h-full w-full object-cover opacity-70"
            />
          </div>
          <p className="mt-4 font-display text-base uppercase tracking-tight text-cal">
            Rafael Lisboa
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-maresia">
            Designer e diretor de arte
          </p>
        </div>

        <div className="flex max-w-md flex-col gap-6">
          <p className="text-body text-cal">
            R. Lisboa Estúdio 162 é um estúdio de design que une estratégia e
            criação para conectar marcas a pessoas. Cada projeto começa pelo
            entendimento do negócio e ganha forma em identidades visuais para
            marcas e eventos, peças gráficas, sites, apresentações, projetos
            editoriais, audiovisual e motion&nbsp;graphics.
          </p>

          <p className="text-body text-cal">
            À frente do estúdio está Rafael Lisboa, designer com mais de 15
            anos de experiência e Diretor de Criação da Inovativos, empresa de
            planejamento estratégico de conteúdo, inteligência
            e&nbsp;networking.
          </p>

          <p className="text-body text-cal">
            Entre as parcerias mais longas está o Security Leaders, o maior e
            mais qualificado evento de Segurança da Informação do Brasil.
            Desde 2010, o conceito criativo de cada edição nasce aqui e chega
            a tudo o que o público vê, das campanhas de divulgação à
            cenografia do palco e aos conteúdos animados nos painéis
            de&nbsp;LED.
          </p>

          <p className="text-body text-cal">
            O portfólio inclui ainda a Rede Líderes, que transforma diálogos
            e inteligência de dados em decisões de negócios, e a Z1 Boutique
            de Imóveis, de São Paulo, além de marcas de
            diferentes&nbsp;segmentos.
          </p>
        </div>
      </div>
    </div>
  );
}

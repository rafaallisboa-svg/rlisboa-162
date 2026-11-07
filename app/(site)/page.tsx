import type { Metadata } from "next";
import { site } from "@/site.config";
import { SEO } from "@/lib/seo";
import { Clientes } from "@/components/sections/Clientes";
import { ServicosHomeCelular } from "@/components/servicos/ServicosHomeCelular";
import { ServicosHomeGrande } from "@/components/servicos/ServicosHomeGrande";
import { ServicosPalavras } from "@/components/sections/ServicosPalavras";
import { DesafiosRelogio } from "@/components/sections/DesafiosRelogio";
import { GrafismoParallax } from "@/components/motion/GrafismoParallax";
import { ProjetosDestaque } from "@/components/sections/ProjetosDestaque";

export const metadata: Metadata = {
  title: { absolute: SEO.tituloPadrao },
  description: SEO.descricao,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        {site.nomeCompleto}: estúdio de design em {site.local.cidade}, {site.local.estado}. Identidade
        visual, sites, apresentações, redes sociais e motion graphics.
      </h1>
      <ServicosHomeCelular />
      <ServicosPalavras />
      <ProjetosDestaque />
      <ServicosHomeGrande />
      <section className="bg-concreto px-6 pb-24 pt-24">
        <DesafiosRelogio />
      </section>
      <Clientes />
      <GrafismoParallax tipo="aneis" />
    </>
  );
}

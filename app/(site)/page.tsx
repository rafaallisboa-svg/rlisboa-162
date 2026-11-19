import type { Metadata } from "next";
import { site } from "@/site.config";
import { SEO } from "@/lib/seo";
import { Clientes } from "@/components/sections/Clientes";
import { ServicosHomeCelular } from "@/components/servicos/ServicosHomeCelular";
import { ServicosHomeGrande } from "@/components/servicos/ServicosHomeGrande";
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
      {/* Respiro entre o menu e os projetos: 300 px abaixo do menu no desktop (80 px de padding do bloco + este espaço). */}
      <div aria-hidden="true" className="h-12 bg-concreto md:h-[285px]" />
      <ProjetosDestaque />
      {/* O relógio para na tela (sticky) e o bloco amarelo seguinte sobe por cima dele, como uma cortina. */}
      <section className="sticky top-0 z-0 flex h-[100svh] items-center justify-center bg-concreto px-6">
        <DesafiosRelogio />
      </section>
      <div className="relative z-10">
        <Clientes />
        <ServicosHomeCelular />
        <ServicosHomeGrande />
        <GrafismoParallax tipo="aneis" className="bg-concreto" />
      </div>
    </>
  );
}

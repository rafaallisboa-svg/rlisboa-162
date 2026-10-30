import { site } from "@/site.config";
import { Clientes } from "@/components/sections/Clientes";
import { ServicosPalavras } from "@/components/sections/ServicosPalavras";
import { ProjetosDestaque } from "@/components/sections/ProjetosDestaque";

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">{site.nomeCompleto}</h1>
      <ServicosPalavras />
      <ProjetosDestaque />
      <Clientes />
    </>
  );
}

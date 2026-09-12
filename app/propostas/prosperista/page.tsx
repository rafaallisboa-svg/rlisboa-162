import { DirecaoProvider } from "./DirecaoContext";
import { HeroProposta } from "./HeroProposta";
import { EntendimentoSection } from "./EntendimentoSection";
import { EscopoSection } from "./EscopoSection";
import { ProcessoTimeline } from "./ProcessoTimeline";
import { MoodboardSection } from "./MoodboardSection";
import { DirecoesToggle } from "./DirecoesToggle";
import { EstruturaPreview } from "./EstruturaPreview";
import { InvestimentoSection } from "./InvestimentoSection";
import { BriefingForm } from "./BriefingForm";
import { PropostaFooter } from "./PropostaFooter";

export default function PropostaProsperistaPage() {
  return (
    <DirecaoProvider>
      <main>
        <HeroProposta />
        <EntendimentoSection />
        <EscopoSection />
        <ProcessoTimeline />
        <MoodboardSection />
        <DirecoesToggle />
        <EstruturaPreview />
        <InvestimentoSection />
        <BriefingForm />
        <PropostaFooter />
      </main>
    </DirecaoProvider>
  );
}

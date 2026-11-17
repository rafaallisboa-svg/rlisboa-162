"use client";

import { useEffect, useRef, useState } from "react";
import { Cruz } from "@/components/ui/IdvElementos";

// Security Leaders, depois Inovativos, depois Prêmio Inovativos. Cada slide tem uma cópia
// pré-desfocada (-blur) usada no efeito de foco.
const SLIDES = [
  { src: "sl-nacional-1", alt: "Slide de divulgação do Prêmio Security Leaders 2026, SL Nacional" },
  { src: "sl-nacional-2", alt: "Slide com os números do Prêmio Security Leaders: 17 anos de história, 230 líderes homenageados e 77 cases premiados" },
  { src: "sl-nacional-3", alt: "Slide: um só reconhecimento, dois caminhos, Prêmio Líder e Prêmio Case do Ano" },
  { src: "roadmap-2027", alt: "Slide com o roadmap 2027 das jornadas do Security Leaders no mapa do Brasil" },
  { src: "cidade-brasilia", alt: "Slide de finalistas do Prêmio Líder em Brasília" },
  { src: "cidade-rio", alt: "Slide de finalistas do Prêmio Líder no Rio de Janeiro" },
  { src: "cidade-curitiba", alt: "Slide de finalistas do Prêmio Líder em Curitiba" },
  { src: "business-room", alt: "Slide de abertura do Business Room, Security Leaders" },
  { src: "cyber-tech", alt: "Slide de abertura do Espaço Cyber Tech, Security Leaders" },
  { src: "insper", alt: "Slide de palestra: o código do ROI em IA, com o Insper" },
  { src: "pesquisa", alt: "Slide de pesquisa sobre a gestão de tokens de IA na empresa" },
  { src: "prof-andre", alt: "Slide de palestra: agentes de IA e a gestão da nova força de trabalho digital" },
  { src: "linha-do-tempo", alt: "Slide do Prêmio Inovativos: a evolução da inovação, linha do tempo 2022 a 2025" },
  { src: "numeros", alt: "Slide com os números do Prêmio Inovativos: 142 cases, 14 categorias, 48 finalistas e 42 vencedores" },
  { src: "finalistas", alt: "Slide com os logos das empresas finalistas de 2026" },
  { src: "vencedor", alt: "Slide de vencedor do Prêmio Inovativos na categoria Aprendizagem Inteligente" },
  { src: "inscricoes", alt: "Slide de comunicado: inscrições prorrogadas até 10/09" },
];

const N = SLIDES.length;
const VISIVEIS = 3; // quantos slides de cada lado do central aparecem
const LARGURA = 640; // px, comprimento do arco de um slide (escala com o container)
const ALTURA = LARGURA * 0.5625;
const RAIO = 1500; // raio do cilindro
const ARCO = LARGURA / RAIO; // radianos que um slide ocupa
const PASSO = (ARCO * 1.045 * 180) / Math.PI; // graus entre um slide e o vizinho (com uma folga)
const FATIAS = 14; // cada slide é cortado em fatias verticais dispostas em arco, o que o deixa curvo
const ARCO_FATIA = ARCO / FATIAS;
const LARGURA_FATIA = RAIO * ARCO_FATIA + 1.5; // +1,5 px de sobreposição pra não aparecer fresta
const FATIAS_LISTA = Array.from({ length: FATIAS }, (_, k) => k);

/**
 * Carrossel curvo em 3D que gira conforme a página rola: a seção fica fixa na tela
 * enquanto a rolagem passa por todos os slides, depois a página segue normalmente.
 * Cada slide é curvo (parte de um cilindro), não um painel reto.
 */
export function ApresentacoesCarrossel() {
  const secaoRef = useRef<HTMLElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [escala, setEscala] = useState(1);
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alvo = 0;
    let pos = 0;
    let vel = 0;
    let ativoAtual = -1;
    let raf = 0;
    let ultimo = performance.now();
    let ultimaRolagem = 0;

    const lerRolagem = () => {
      const s = secaoRef.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      alvo = p * (N - 1);
      ultimaRolagem = performance.now();
    };

    const desenhar = () => {
      for (let i = 0; i < N; i++) {
        const el = slidesRef.current[i];
        if (!el) continue;
        const d = i - pos;
        const ad = Math.abs(d);
        if (ad > VISIVEIS + 0.6) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        el.style.transform = `rotateY(${-d * PASSO}deg)`;
        // Zona morta perto do centro: foca rápido assim que o slide se aproxima.
        const t = Math.min(1, Math.max(0, (ad - 0.3) / 0.45));
        const desfoque = reduzido ? 0 : t * t * (3 - 2 * t);
        el.style.setProperty("--b", desfoque.toFixed(3));
        el.style.setProperty("--o", String(Math.max(0, 1 - Math.max(0, ad - 2.2) * 1.6)));
      }
    };

    const passo = (t: number) => {
      const dt = Math.min(0.05, (t - ultimo) / 1000);
      ultimo = t;
      // Parou de rolar: encaixa no slide mais próximo, que fica nítido.
      const meta = t - ultimaRolagem > 250 ? Math.round(alvo) : alvo;
      const antes = pos;
      pos += (meta - pos) * (1 - Math.exp(-dt * 4.5));
      vel = dt > 0 ? (pos - antes) / dt : 0;
      if (Math.abs(meta - pos) < 0.0005) pos = meta;
      desenhar();
      const a = Math.min(N - 1, Math.max(0, Math.round(pos)));
      if (a !== ativoAtual) {
        ativoAtual = a;
        setAtivo(a);
      }
      raf = requestAnimationFrame(passo);
    };

    lerRolagem();
    pos = alvo;
    window.addEventListener("scroll", lerRolagem, { passive: true });
    window.addEventListener("resize", lerRolagem);
    raf = requestAnimationFrame(passo);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", lerRolagem);
      window.removeEventListener("resize", lerRolagem);
    };
  }, []);

  // Escala o palco conforme a largura disponível.
  useEffect(() => {
    const el = palcoRef.current;
    if (!el) return;
    // O tamanho segue a altura da tela (slide central com ~60% dela), limitado pela largura.
    const calcular = () => {
      const porAltura = (window.innerHeight * 0.6) / ALTURA;
      const porLargura = (el.clientWidth * 0.62) / LARGURA;
      setEscala(Math.max(0.5, Math.min(porAltura, porLargura)));
    };
    calcular();
    const ro = new ResizeObserver(calcular);
    ro.observe(el);
    window.addEventListener("resize", calcular);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calcular);
    };
  }, []);

  return (
    <section
      ref={secaoRef}
      id="apresentacoes"
      aria-label="Apresentações criadas pelo estúdio"
      className="relative bg-idv-amarelo text-idv-preto md:h-[var(--altura-secao)]"
      style={{ ["--altura-secao" as string]: `${100 + (N - 1) * 47}vh` }}
    >
      <div className="relative overflow-x-clip px-6 py-20 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:py-0 md:px-[clamp(1.5rem,5vw,6rem)]">
        <Cruz className="absolute right-6 top-8 h-5 w-5 text-idv-preto/40 md:right-[clamp(1.5rem,5vw,6rem)] md:top-24" />
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-idv-preto/60 md:absolute md:left-[clamp(1.5rem,5vw,6rem)] md:top-24">
          Apresentações<span className="text-idv-laranja">.</span>
        </p>

        {/* Celular: carrossel simples, deslizando de lado. */}
        <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SLIDES.map((s) => (
            <img
              key={s.src}
              src={`/apresentacoes/${s.src}.webp`}
              alt={s.alt}
              loading="lazy"
              width={1440}
              height={810}
              className="aspect-video w-[82%] shrink-0 snap-center object-cover"
            />
          ))}
        </div>

        {/* Tablet e desktop: carrossel curvo em 3D, girando com a rolagem. */}
        <div ref={palcoRef} className="relative hidden select-none md:block" style={{ height: ALTURA * escala + 40 }}>
          <div className="absolute inset-0 flex items-center justify-center [perspective:1000px]">
            <div
              className="relative [transform-style:preserve-3d]"
              style={{ width: LARGURA, height: ALTURA, transform: `scale(${escala}) translateZ(${RAIO}px)` }}
            >
              {SLIDES.map((s, i) => (
                <div
                  key={s.src}
                  ref={(el) => {
                    slidesRef.current[i] = el;
                  }}
                  role="img"
                  aria-label={s.alt}
                  className="absolute inset-0 [transform-style:preserve-3d]"
                  style={{ visibility: "hidden" }}
                >
                  {FATIAS_LISTA.map((k) => {
                    const ang = -(k - (FATIAS - 1) / 2) * ARCO_FATIA;
                    const posBg = `${(k / (FATIAS - 1)) * 100}% 0`;
                    const tamBg = `${FATIAS * 100}% 100%`;
                    return (
                      <div
                        key={k}
                        aria-hidden="true"
                        className="absolute top-0 [backface-visibility:hidden]"
                        style={{
                          left: "50%",
                          width: LARGURA_FATIA,
                          height: ALTURA,
                          marginLeft: -LARGURA_FATIA / 2,
                          transform: `rotateY(${(ang * 180) / Math.PI}deg) translateZ(${-RAIO}px)`,
                          opacity: "var(--o)",
                          backgroundImage: `url(/apresentacoes/${s.src}.webp)`,
                          backgroundSize: tamBg,
                          backgroundPosition: posBg,
                        }}
                      >
                        {/* Cópia desfocada por cima: a opacidade dela é o "quanto está fora de foco". */}
                        <div
                          className="absolute inset-0"
                          style={{
                            opacity: "var(--b)",
                            backgroundImage: `url(/apresentacoes/${s.src}-blur.webp)`,
                            backgroundSize: tamBg,
                            backgroundPosition: posBg,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 hidden font-mono text-xs tabular-nums text-idv-preto/60 md:block" aria-live="off">
          {String(ativo + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}

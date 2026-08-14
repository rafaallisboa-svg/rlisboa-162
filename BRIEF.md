# R. LISBOA — ESTÚDIO 162
### Brief de projeto do website · v1.0

> Documento-fonte para desenvolvimento no Claude Code.
> Salvar na raiz do repositório como `BRIEF.md` e referenciar no `CLAUDE.md`.

---

## 1. Contexto

| | |
|---|---|
| **Estúdio** | R. Lisboa — Estúdio 162 |
| **Titular** | Rafael Lisboa, designer |
| **Base** | Itapema / SC (operação) · São Paulo / SP (carteira atual) |
| **CNPJ** | 18.019.277/0001-21 |
| **Serviços** | Identidade visual · Websites · Motion & vídeo · Social media · Materiais gráficos · Ambientação de imóveis com IA |
| **Alvo primário** | Construtoras e incorporadoras do litoral norte de SC (Itapema, Meia Praia, Porto Belo, Bombinhas, Balneário Camboriú, Itajaí) |
| **Alvo secundário** | Empresas de médio porte da região + manutenção da carteira SP |
| **Objetivo do site** | Gerar reunião qualificada. Não é vitrine — é ferramenta de prospecção. |

### Tensão a resolver
O site precisa provar duas coisas ao mesmo tempo, sem parecer esquizofrênico:
1. **Padrão São Paulo.** Repertório de agência grande, não de freela de cidade praiana.
2. **Presença local.** Está aqui, atende presencialmente, entende o mercado da orla.

A resolução: nível de execução nacional, vocabulário local. O site é impecável; o texto fala de Itapema com naturalidade.

---

## 2. Conceito criativo: **O ENDEREÇO**

O nome do estúdio já é um endereço: **R. Lisboa, 162**.

Construtora não vende metro quadrado — vende endereço. Ancorar a marca aí cria ponte direta com o público-alvo e dá ao site um sistema estrutural inteiro, sem precisar inventar metáfora.

**Desdobramentos:**

- **Marca**: `R. LISBOA` em display expandido + `162` em mono, tratado como numeração predial (placa, plaqueta de latão, número pintado em concreto).
- **Navegação**: cada seção é um **pavimento**. Indicador lateral fixo em mono conta o andar conforme o scroll (`PAV. 03 / 08`). É o elemento-assinatura do site.
- **Portfólio**: cada projeto é uma **unidade**, apresentada com ficha técnica no lugar de legenda decorativa.
- **Vocabulário**: memorial descritivo (processo), planta (sitemap do case), cota, escala, entrega, prumo, fachada.
- **Rodapé**: bloco de endereço real — Itapema/SC, coordenadas, CNPJ, e-mail. Fecha o conceito.

**Regra de contenção:** o conceito vive na estrutura e no vocabulário. Nada de textura de tijolo, capacete de obra ou ícone de martelo. A referência é arquitetura contemporânea, não canteiro de obras.

---

## 3. Direção visual

### 3.1 Paleta

```css
--concreto:  #1A1C1B;  /* base escura, esverdeada — fundo dominante */
--cal:       #F0EFEA;  /* off-white frio — texto sobre escuro, fundos claros */
--maresia:   #7A8B85;  /* verde-cinza — texto secundário, bordas, estados inativos */
--blueprint: #16324F;  /* azul de planta — profundidade, hover, blocos alternados */
--sinal:     #FFC300;  /* amarelo de sinalização — ÚNICO acento */
```

**Uso do acento:** `--sinal` aparece no máximo 3 vezes por viewport. Indicador de pavimento, hover de link, CTA primário. Em nenhuma hipótese como fundo de seção inteira.

**Proporção-alvo:** 70% concreto · 20% cal · 10% resto.

### 3.2 Tipografia

| Papel | Fonte | Onde |
|---|---|---|
| Display | **Archivo Expanded** (Google, variável) | Headlines, nome do estúdio, títulos de pavimento |
| Texto | **Satoshi** (Fontshare) | Parágrafos, descrições, UI |
| Utilitária | **JetBrains Mono** (Google) | Números, fichas técnicas, indicador de pavimento, labels, timecode |

**Escala** (base 16px, clamp fluido):

```css
--t-hero:  clamp(3.5rem, 11vw, 11rem);   /* Archivo Expanded 700, tracking -0.03em */
--t-h1:    clamp(2.5rem, 6vw, 5rem);
--t-h2:    clamp(1.75rem, 3.5vw, 3rem);
--t-body:  clamp(1rem, 1.1vw, 1.125rem); /* Satoshi 400, line-height 1.6 */
--t-mono:  0.75rem;                       /* JetBrains Mono 500, tracking 0.12em, uppercase */
```

**Detalhe de assinatura:** todo número no site (ano, área, quantidade, numeração de seção) vai em mono com `font-variant-numeric: tabular-nums`. Isso cria coerência silenciosa entre portfólio, processo e ficha técnica.

### 3.3 Grid e layout

- Grid de 12 colunas, gutter 24px, margem lateral `clamp(1.5rem, 5vw, 6rem)`.
- **Border-radius: 0.** Tudo reto. É arquitetura.
- Divisores em hairline `1px solid rgba(240,239,234,0.12)`.
- Seções alternam entre `--concreto` e `--blueprint`; blocos claros em `--cal` usados com parcimônia (máx. 2 no site inteiro), para dar respiro.

### 3.4 Movimento

**Princípio:** um gesto orquestrado vale mais que dez efeitos espalhados. Motion aqui é seu portfólio funcionando — se ficar amador, derruba a credibilidade do serviço de motion que você vende.

| Momento | Comportamento |
|---|---|
| **Load** | Sequência única de abertura: `162` grande no centro em mono, os dígitos se separam e assumem posições — 1 vira o indicador de pavimento (canto), 6 e 2 se dissolvem, o hero entra por baixo. ~1.8s, roda uma vez por sessão (sessionStorage). |
| **Scroll** | Lenis para inércia. Indicador de pavimento atualiza com contagem de dígito rolante (efeito display de elevador). |
| **Revelação** | Máscara horizontal — o conteúdo é revelado por uma cortina que sobe (`clip-path` animado). Nunca fade genérico. |
| **Cards de projeto** | Vídeo em loop mudo, autoplay quando entra em viewport. No hover: escala 1.02, o restante da grade cai para 40% de opacidade. |
| **Hover de link** | Sublinhado em `--sinal` que cresce da esquerda, 240ms `cubic-bezier(0.22, 1, 0.36, 1)`. |
| **Cursor** | Cursor customizado apenas sobre mídia (círculo com label mono: `VER CASE` / `PLAY`). Desativado em touch. |

**Obrigatório:** `@media (prefers-reduced-motion: reduce)` desliga tudo exceto opacidade. Foco de teclado sempre visível em `--sinal`.

---

## 4. Arquitetura de informação

### 4.1 Sitemap

```
/                          Home — os 8 pavimentos
/projetos                  Índice com filtro por disciplina
/projetos/[slug]           Case study
/construtoras              Landing dedicada à vertical  ← peça de prospecção
/estudio                   Rafael + processo + o 162
/servicos                  Escopos e faixas de investimento
/contato                   Formulário + WhatsApp + agenda
/notas                     (Fase 2) SEO local e conteúdo
```

### 4.2 Home — estrutura por pavimento

| Pav. | Seção | Conteúdo |
|---|---|---|
| **00** | Hero | Reel de 20s em loop mudo em fundo total + headline. Sem slider, sem carrossel. |
| **01** | Posicionamento | Uma frase de tese + os 5 serviços em lista mono numerada. |
| **02** | Projetos em destaque | 4 unidades. Grid assimétrico (2 grandes, 2 médias). |
| **03** | Vertical construtoras | Bloco em `--blueprint`. Comparador antes/depois de ambientação (§15.3), ao vivo. CTA para `/construtoras`. |
| **04** | Clientes | Marquee infinito de logos, monocromático em `--maresia`, cor no hover. |
| **05** | Memorial descritivo | Processo em 6 etapas. Numeração aqui é legítima — é sequência real. |
| **06** | O estúdio | Foto de Rafael + texto curto. Menciona SP e Itapema explicitamente. |
| **07** | Depoimentos | 3 depoimentos. Sem estrelinha, sem card com sombra. Citação em display. |
| **08** | Contato | Formulário + WhatsApp + bloco de endereço. |

### 4.3 Case study — template

Estrutura fixa para todos os projetos. Consistência aqui é o que faz o portfólio parecer estúdio e não pasta de arquivos.

```
1. Capa           Imagem/vídeo full-bleed + nome do cliente
2. Ficha técnica  Cliente · Setor · Ano · Escopo · Entregas (tudo em mono)
3. O contexto     2 parágrafos. O problema real do cliente.
4. A direção      1 parágrafo + paleta e tipografia aplicadas
5. Aplicações     Galeria — respira, imagem grande, sem grid apertado
6. Motion         (quando houver) player de vídeo com controles próprios
7. Resultado      1 frase. Se tiver número, número em display.
8. Próximo        Link para a próxima unidade
```

### 4.4 Disciplinas do portfólio (filtros)

```
IDENTIDADE VISUAL · WEBSITES · MOTION & VÍDEO · AMBIENTAÇÃO · SOCIAL · IMPRESSOS
```

Filtro por query string (`/projetos?d=motion`) para permitir link direto — útil para mandar a construtora só para os cases de identidade.

---

## 5. A landing `/construtoras`

Página mais importante do site para o objetivo de negócio. É o que você manda por WhatsApp depois da primeira conversa.

**Estrutura:**

1. **Hero** — comparador antes/depois de ambientação em largura total (§15.3) + headline específica do setor. Ex.: *"O empreendimento está de pé. A marca dele também precisa estar."*
2. **O problema** — 3 falhas que você resolve: lançamento sem identidade própria, material de venda inconsistente entre corretores, stand e digital falando línguas diferentes.
3. **O que entregamos** — pacote por fase do empreendimento:
   - Pré-lançamento: naming, identidade, teaser em motion
   - Lançamento: hotsite, book de vendas, campanha social, vídeo de fachada, **ambientação das tipologias** (§15)
   - Obra: registro mensal, timelapse, conteúdo de andamento
   - Entrega: material de repasse, vídeo institucional, comunicação do condomínio
4. **Cases aplicáveis** — mesmo que não sejam de construtora ainda, mostrar os 3 mais próximos em porte e sofisticação.
5. **Como funciona** — prazo, formato de contrato, atendimento presencial na região.
6. **CTA** — reunião de 30 min. Botão de WhatsApp com mensagem pré-preenchida.

---

## 6. Stack técnica

```
Framework      Next.js 15 (App Router) + TypeScript
Estilo         Tailwind CSS v4 (tokens via @theme)
Animação       GSAP 3 + ScrollTrigger
Scroll         Lenis
Conteúdo       MDX local (Fase 1) → Sanity (Fase 2, se o volume justificar)
Imagens        next/image + AVIF/WebP
Vídeo          Loops curtos (<3MB) self-hosted · peças completas via Mux ou Cloudinary
Formulário     Server Action + Zod + Resend
Analytics      Vercel Analytics + Google Search Console
Deploy         Vercel
Domínio        rlisboa.studio  ou  estudio162.com.br
```

**Decisões justificadas:**
- **MDX local na Fase 1** — conteúdo versionado no Git, zero custo, zero configuração, e o Claude Code edita direto. CMS só quando houver alguém além de você publicando.
- **GSAP em vez de Framer Motion** — ScrollTrigger não tem equivalente à altura para as sequências orquestradas descritas na seção 3.4.
- **Server Action em vez de serviço externo de form** — controle total do payload e do e-mail, sem branding de terceiro.

### 6.1 Estrutura do repositório

```
rlisboa-162/
├─ CLAUDE.md                    ← instruções permanentes para o Claude Code
├─ BRIEF.md                     ← este documento
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                  Home
│  ├─ globals.css               tokens @theme + reset
│  ├─ projetos/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ construtoras/page.tsx
│  ├─ estudio/page.tsx
│  ├─ servicos/page.tsx
│  ├─ contato/page.tsx
│  ├─ opengraph-image.tsx
│  └─ api/contato/route.ts
├─ components/
│  ├─ layout/                   Header, Footer, PavimentoIndicator
│  ├─ motion/                   RevealMask, ScrollCounter, SmoothScroll, Cursor
│  ├─ sections/                 Hero, Projetos, Construtoras, Clientes, Processo, Depoimentos
│  └─ ui/                       Botao, FichaTecnica, VideoPlayer, Marquee
├─ content/
│  ├─ projetos/                 *.mdx — um por case
│  ├─ clientes.json
│  ├─ servicos.json
│  └─ depoimentos.json
├─ lib/
│  ├─ mdx.ts
│  ├─ schema.ts                 validação Zod do conteúdo
│  └─ utils.ts
├─ public/
│  ├─ fonts/
│  ├─ videos/
│  └─ og/
└─ types/
```

### 6.2 Schema de um projeto (`content/projetos/*.mdx`)

```yaml
---
slug: "nome-do-cliente"
titulo: "Nome do Cliente"
subtitulo: "Identidade visual e lançamento digital"
disciplinas: ["identidade", "website", "motion"]
setor: "Incorporação"
ano: 2025
local: "Itapema, SC"
escopo: ["Naming", "Identidade visual", "Hotsite", "Vídeo de lançamento"]
destaque: true
ordem: 1
capa: "/projetos/cliente/capa.jpg"
capaVideo: "/videos/cliente-loop.mp4"
cores: ["#1A1C1B", "#FFC300", "#F0EFEA"]
resultado: "Tabela esgotada em 45 dias."
---
```

---

## 7. SEO local

O site precisa aparecer para quem busca em Itapema. Isso é metade da prospecção.

- **Schema.org** `LocalBusiness` + `ProfessionalService` com endereço, área de atendimento (Itapema, Porto Belo, Bombinhas, Balneário Camboriú, Itajaí) e coordenadas.

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "R. Lisboa — Estúdio 162",
  "founder": { "@type": "Person", "name": "Rafael Lisboa" },
  "taxID": "18.019.277/0001-21",
  "vatID": "18019277000121",
  "email": "contato@[dominio]",
  "telephone": "+55...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Itapema",
    "addressRegion": "SC",
    "addressCountry": "BR"
  },
  "areaServed": [
    "Itapema", "Porto Belo", "Bombinhas",
    "Balneário Camboriú", "Itajaí", "São Paulo"
  ],
  "knowsAbout": [
    "Identidade visual", "Design de marca", "Motion design",
    "Ambientação virtual de imóveis", "Comunicação para incorporadoras"
  ],
  "priceRange": "$$$"
}
```

Renderizar via `app/layout.tsx` em `<script type="application/ld+json">`. O `taxID` reforça entidade real para o Google e ajuda no ranqueamento local.
- **Títulos** com intenção local nas páginas de serviço: *"Identidade visual para construtoras em Itapema e Balneário Camboriú"*.
- **Google Business Profile** — cadastrar como serviço com área de atendimento (sem endereço público, se preferir).
- **`/notas`** (Fase 2) — 1 post/mês sobre branding de empreendimento. É o que sustenta o ranqueamento no longo prazo.
- OG image dinâmica por case, gerada via `opengraph-image.tsx`.

---

## 8. Roadmap

| Sprint | Entrega | Critério de pronto |
|---|---|---|
| **1** | Fundação | Repo, Next.js, tokens, fontes, Header/Footer, Lenis rodando |
| **2** | Home estática | Os 8 pavimentos com conteúdo real, sem animação |
| **3** | Portfólio | Índice, filtros, template de case, 3 cases publicados |
| **4** | Motion | Sequência de load, indicador de pavimento, máscaras, hovers |
| **5** | Conversão | `/construtoras`, formulário, WhatsApp, SEO, OG images |
| **6** | Acabamento | Lighthouse >90, acessibilidade, mobile, deploy, domínio |

**Não pule a ordem.** Animação antes de conteúdo real é o erro clássico — você acaba animando lorem ipsum e refazendo tudo.

---

## 9. Checklist de assets (você produz, o Claude Code não inventa)

**Bloqueadores da Sprint 2:**
- [ ] Logo em SVG (versão completa, reduzida e só o `162`)
- [ ] Foto sua — retrato, em ambiente, não de fundo branco
- [ ] Texto do "sobre" — 2 parágrafos, primeira pessoa
- [ ] Lista de clientes autorizados + logos em SVG

**Bloqueadores da Sprint 3:**
- [ ] 6 a 8 projetos selecionados (qualidade > quantidade)
- [ ] Por projeto: capa, 4-8 imagens de aplicação, texto de contexto
- [ ] Loops de vídeo de 6-10s, mudos, <3MB, para os cards
- [ ] 3 depoimentos com nome, cargo e empresa

**Bloqueadores da Sprint 5:**
- [ ] Reel de abertura — 20s (roteiro na seção 10)
- [ ] Faixas de investimento por serviço
- [ ] Número de WhatsApp comercial + e-mail no domínio
- [ ] **Par antes/depois de ambientação** para o comparador — mesmo enquadramento, mesma resolução, alinhamento pixel a pixel
- [ ] **3 variações de estilo** do mesmo ambiente para o seletor (§15.3)

---

## 10. Roteiro — Reel de abertura do hero (20s)

Loop mudo, cortes secos, sem trilha no site (o áudio é para as versões de redes sociais).

| TC | VÍDEO | ÁUDIO (versão social) |
|---|---|---|
| 00:00 | Preto. `162` em JetBrains Mono branco, pequeno, centro. Contagem rolante rápida dos dígitos, como display de elevador estabilizando. | Silêncio. Um clique metálico seco no frame 1. |
| 00:02 | Corte seco. Macro de superfície de concreto, luz raspante lateral. Câmera desliza lentamente para a direita. | Textura grave, sub-bass entrando. |
| 00:05 | Corte. Time-lapse vertical de fachada de prédio da orla — a câmera sobe. Sobreposição em mono no canto: `PAV. 01 → PAV. 24`. | Beat entra. 90 BPM, seco, percussão minimalista. |
| 00:08 | Corte. Grid de identidade visual se montando sobre fundo `--concreto` — linhas de construção aparecendo antes da forma final. | Pulsos curtos sincronizados com cada linha. |
| 00:11 | Corte. Três peças de portfólio em sequência rápida (3 frames cada), transição por máscara horizontal. | Beat mantém. Filtro abrindo. |
| 00:14 | Corte. Pôr do sol na Meia Praia, câmera baixa, silhueta dos prédios. Único momento de cor quente do reel. | Beat abre para o registro completo. |
| 00:17 | Máscara horizontal sobe revelando fundo `--concreto` liso. `R. LISBOA` em Archivo Expanded entra por baixo. `162` em mono se posiciona à direita. | Beat corta. Fica só uma reverberação. |
| 00:19 | Trava 1s. Placa de endereço estática. | Silêncio. |

**Loop:** o corte de 00:19 para 00:00 deve ser invisível — mesma luminância nos dois frames.

---

## 11. Prompts de IA para geração de assets

### 11.1 Imagem — texturas e ambientação
*(Midjourney / Flux / Firefly)*

```
Fair-faced concrete wall, raking side light at golden hour, subtle formwork
tie-holes visible, shallow depth of field, muted green-grey cast, editorial
architecture photography, medium format, no people, no text --ar 16:9 --style raw
```

```
Contemporary residential tower on Brazilian coastline, seen from below,
clean vertical lines, overcast diffused light, desaturated palette,
architectural photography, Fernando Guerra style composition, no people
--ar 4:5 --style raw
```

```
Brass building number plaque mounted on rough concrete, oblique lighting,
extreme macro, patina and surface detail, cold neutral white balance,
single yellow reflection --ar 3:2 --style raw
```

### 11.2 Vídeo — clipes de transição
*(Runway Gen-3 / Kling / Luma)*

```
Slow vertical camera rise along a concrete building facade, static subject,
locked exposure, overcast light, no camera shake, 5 seconds, cinematic,
desaturated cool grade
```

```
Extreme close-up of light slowly raking across a rough concrete surface,
almost imperceptible camera drift to the right, no cuts, 5 seconds,
moody, high contrast shadows
```

### 11.3 Mockups de aplicação

```
Minimal brand identity mockup flat lay on concrete surface, business cards,
folder and signage plate, top-down, single hard light source casting sharp
shadows, colour palette limited to off-white, dark green-grey and one
signal yellow accent, no logo, no text --ar 1:1 --style raw
```

**Atenção:** imagem de IA entra apenas como textura de fundo e ambientação. Nenhum case do portfólio pode ter mockup gerado por IA — construtora reconhece renderização falsa na hora e isso queima a credibilidade inteira.

---

## 12. Prompt inicial para o Claude Code

Cole no primeiro turno da sessão:

```
Vamos construir o site do estúdio R. Lisboa — Estúdio 162, um estúdio de
design em Itapema/SC focado em construtoras e incorporadoras.

O brief completo está em BRIEF.md na raiz. Leia antes de qualquer coisa e
siga exatamente a direção visual descrita — paleta, tipografia, conceito do
endereço e comportamento de motion. Não substitua nenhuma decisão de design
por padrão seu.

Leia também PLACEHOLDERS.md. Todo o conteúdo do site já existe em
site.config.ts e content/, marcado com [[ TODO ]], pendente: true e imagens
em /api/ph. Construa a estrutura completa lendo desses arquivos.
NUNCA preencha um [[ TODO ]] com texto inventado, lorem ipsum ou exemplo.
NUNCA troque /api/ph por imagem de stock ou gerada por IA.
Se faltar informação, mantenha o placeholder e siga em frente.

Sprint 1 apenas. Não avance para as próximas.

Entregas desta sprint:
1. Projeto Next.js 15 com App Router e TypeScript
2. Tailwind v4 com os tokens da seção 3 declarados via @theme em globals.css
3. Archivo Expanded, Satoshi e JetBrains Mono carregadas via next/font, com
   fallback e display swap
4. Header e Footer conforme o conceito (rodapé como bloco de endereço real)
5. Componente PavimentoIndicator — indicador fixo na lateral direita, em mono,
   formato PAV. 00 / 08, ainda estático
6. Lenis integrado com scroll suave, respeitando prefers-reduced-motion
7. Reset de CSS, border-radius global zero, foco de teclado visível em --sinal

Não crie conteúdo de página ainda. Não crie animações ainda.

IMPORTANTE — modo local:
- Não conecte a Vercel, não configure deploy, não sugira publicar.
- Mantenha NEXT_PUBLIC_SITE_LIVE=false. app/robots.ts já bloqueia buscadores.
- Não adicione o check estrito como prebuild — travaria a build local.
- Leia LOCAL.md antes de rodar qualquer comando.

Ao terminar, rode pnpm build, depois pnpm start, e me mostre a árvore de
arquivos. Confirme que abre em localhost:3000 sem erro no console.

Confirme que leu o BRIEF.md e me diga o plano antes de escrever código.
```

---

## 13. `CLAUDE.md` sugerido

```markdown
# R. LISBOA — ESTÚDIO 162

Site do estúdio. Leia BRIEF.md antes de qualquer alteração.

## Regras invioláveis
- Paleta: apenas os 5 tokens de BRIEF.md §3.1. Nenhuma cor nova.
- --sinal (#FFC300) no máximo 3 vezes por viewport. Nunca como fundo de seção.
- border-radius: 0 em todo o site. Sem exceção.
- Todo número renderiza em JetBrains Mono com tabular-nums.
- Nenhuma animação sem tratamento de prefers-reduced-motion.
- Todo texto de interface em português do Brasil, sentence case.
- Conteúdo vem de content/. Nunca hardcode texto de projeto em componente.

## Voz
Direta e técnica, sem jargão de agência. Nada de "soluções inovadoras",
"experiências únicas" ou "paixão por design". Fala como arquiteto descrevendo
uma obra: preciso, concreto, sem adjetivo gratuito.

## Comandos
pnpm dev · pnpm build · pnpm lint

## Antes de dar tarefa por concluída
- Build passa sem erro
- Testado em 375px, 768px e 1440px
- Foco de teclado visível em todo elemento interativo
```

---

## 14. Riscos e decisões em aberto

| Ponto | Situação |
|---|---|
| **Portfólio para construtoras** | Você provavelmente ainda não tem case do setor. Solução para o lançamento: apresente os cases mais próximos em porte e crie 1 projeto conceitual de identidade para um empreendimento fictício da região — marcado claramente como estudo. Melhor isso do que uma vertical vazia. |
| **Nome longo** | "R. Lisboa — Estúdio 162" tem três partes. Definir agora a hierarquia oficial: `R. LISBOA` é a marca, `ESTÚDIO 162` é o descritor. No site, o header usa só `R. LISBOA` + `162`. |
| **Domínio** | Verificar disponibilidade de `rlisboa.studio` e `estudio162.com.br` antes da Sprint 1 — o domínio afeta OG, e-mail e schema. |
| **Peso do reel no hero** | Loop de 20s em fundo total é caro em LCP. Definir: poster em AVIF + vídeo carregado após o load, ou reduzir para 12s. Decidir na Sprint 6 com dado do Lighthouse. |

---

## 15. Serviço: Ambientação de imóveis com IA

### 15.1 Posicionamento

**Promessa:** *ambientação que respeita o memorial descritivo.*

O diferencial não é usar IA — qualquer um usa. É a disciplina de não deixar a IA reinventar o imóvel. Piso, esquadria, bancada, pé-direito e vista permanecem exatamente como a construtora entrega. Só o mobiliário é gerado.

**Dor que resolve:** apartamento decorado físico custa caro e só existe para uma tipologia. Ambientação virtual cobre todas as plantas, em múltiplos estilos, por uma fração do custo — e serve para stand, portal, social e book de vendas.

**Contra quem você compete:** ferramentas de staging por assinatura (US$ 15–30 por foto). Elas erram em sombra de contato, coerência de luz e consistência entre ambientes da mesma unidade. Seu processo corrige os três — e é isso que se vende.

### 15.2 Pipeline de produção

| Etapa | O que acontece | Ferramenta |
|---|---|---|
| **01 · Captação** | Foto do imóvel vazio: grande angular no tripé, HDR, altura de 1,5m, verticais no prumo. Ou render/planta quando na planta. | Câmera + tripé |
| **02 · Base** | Correção de perspectiva, distorção de lente e balanço de branco. Verticais retas são pré-requisito. | Camera Raw / Lightroom |
| **03 · Trava estrutural** | ControlNet depth + canny sobre a foto base, para fixar geometria, aberturas e piso. | Flux / SDXL |
| **04 · Geração** | img2img, denoise 0.55–0.68. Três variações por ambiente. | Flux / Firefly |
| **05 · Composição** | Máscaras, sombra de contato sob cada objeto, reflexo no piso, coerência com a luz real da janela. **Etapa inegociável** — sem ela o móvel flutua. | Photoshop |
| **06 · Grade** | Cor alinhada à identidade do empreendimento, não ao preset da IA. | Photoshop / Lightroom |
| **07 · Coerência de unidade** | Mesma paleta e mobiliário logicamente consistente entre todos os ambientes do mesmo apartamento. | Curadoria manual |
| **08 · Selagem** | Selo `IMAGEM ILUSTRATIVA` embutido no arquivo + linha de rodapé sobre mobiliário não incluso. | Photoshop |

**Estilos padrão do pacote** (definidos por perfil de comprador, não por gosto):
- `CONTEMPORÂNEO` — casal jovem, primeira aquisição
- `PRAIA` — segunda residência, linho, madeira clara, fibra natural
- `INVESTIDOR` — locação por temporada, neutro, resistente, fácil de fotografar

### 15.3 Comparador antes/depois — componente do site

Elemento-assinatura da vertical construtoras. Aparece no pavimento 03 da home e no hero da `/construtoras`.

**Comportamento:**
- Divisor vertical arrastável em `--sinal`, 2px, handle quadrado com label mono `ARRASTE`
- Suporte a mouse, toque e teclado (setas movem 5% por vez)
- Ao entrar em viewport pela primeira vez: animação automática de 0% → 65% → 50%, uma vez, 1.2s, easing `cubic-bezier(0.22, 1, 0.36, 1)`
- Abaixo, três chips em mono trocam o estilo do lado "depois" com crossfade de 300ms
- Label persistente no canto inferior direito: `IMAGEM ILUSTRATIVA`
- `prefers-reduced-motion`: sem animação de entrada, divisor inicia em 50%

**Requisito de asset:** os dois arquivos precisam ter enquadramento idêntico e alinhamento pixel a pixel. Qualquer deslocamento destrói o efeito.

```tsx
// components/ui/ComparadorAmbientacao.tsx
type Props = {
  antes: string
  estilos: { id: string; label: string; src: string }[]
  alt: string
}
```

### 15.4 Schema do case de ambientação

Extensão do frontmatter da §6.2:

```yaml
disciplinas: ["ambientacao"]
ambientacao:
  tipologia: "2 dormitórios, 68m²"
  ambientes: ["Sala", "Cozinha", "Suíte", "Varanda"]
  estilos: ["Contemporâneo", "Praia", "Investidor"]
  pares:
    - antes: "/projetos/cliente/sala-antes.jpg"
      depois:
        - { id: "contemporaneo", label: "Contemporâneo", src: "/projetos/cliente/sala-01.jpg" }
        - { id: "praia", label: "Praia", src: "/projetos/cliente/sala-02.jpg" }
  ilustrativa: true
```

O campo `ilustrativa: true` renderiza o selo automaticamente. Deve ser obrigatório no schema Zod para qualquer projeto da disciplina `ambientacao`.

### 15.5 Prompts

**Base — img2img sobre foto do imóvel vazio:**

```
Same room, same architecture, same window position, same flooring material
and same ceiling height — unchanged. Furnish only.
Contemporary Brazilian coastal interior: low linen sofa in warm sand, solid
wood coffee table, woven rug, large potted plant near window, minimal art.
Natural daylight from existing window, soft contact shadows under every
object, warm neutral grade.
Photorealistic interior photography, 24mm, f/8, tripod, no fisheye.
--negative: extra windows, changed floor, distorted perspective, floating
furniture, warped straight lines, fisheye, oversaturated
```

Denoise **0.55–0.68**. Acima disso a IA mexe na arquitetura e o material perde validade comercial e legal.

**Variação "praia":**
```
...natural fiber furniture, light oak, off-white linen, rattan pendant lamp,
ceramic vases, sheer curtains moving slightly, sun-washed palette...
```

**Variação "investidor":**
```
...neutral durable furniture, grey upholstery, compact dining set for four,
minimal decor, no personal objects, bright even lighting, rental-ready...
```

**Quarto:**
```
Same room, same architecture, unchanged. Furnish only. Queen bed with layered
white and sand bedding, two bedside tables with matching lamps, low dresser,
framed abstract print above bed, sheer curtain diffusing window light,
soft contact shadows. Photorealistic, 24mm, f/8, tripod.
```

### 15.6 Comercial

**Unidade de venda:** por ambiente ambientado, por estilo.

| Pacote | Escopo |
|---|---|
| **Avulso** | 1 ambiente, 1 estilo, 2 rodadas de ajuste |
| **Unidade** | 1 tipologia completa (4–5 ambientes), 1 estilo |
| **Lançamento** | 3 tipologias × 4 ambientes × 2 estilos = 24 imagens |
| **Recorrente** | Pacote mensal de ambientes, para carteira de imóveis de imobiliária |

Vender a **selagem e a conformidade** como parte do valor, não como detalhe técnico. É o que protege a construtora e o que o concorrente barato não entrega.

### 15.7 Conformidade — regra fixa de entrega

Publicidade imobiliária precisa deixar claro o que é ilustração. Padronizar em 100% das entregas:

- Selo `IMAGEM ILUSTRATIVA` embutido no arquivo entregue, não apenas na publicação
- Linha de rodapé: mobiliário e decoração não integram a unidade
- **Nunca** alterar acabamento contratual: piso, bancada, esquadria, metais, revestimento
- **Nunca** alterar vista de janela para algo que não existe
- Arquivo original vazio arquivado, para comprovação

No site, o componente da §15.3 renderiza o selo por padrão — não pode ser desligado por prop.

### 15.8 Roteiro — reel de venda do serviço (15s)

| TC | VÍDEO | ÁUDIO |
|---|---|---|
| 00:00 | Sala vazia, luz dura. Estático. | Reverb de ambiente vazio. |
| 00:03 | Linha vertical em `--sinal` varre da esquerda. Onde passa, o ambiente aparece mobiliado. | Sub-bass sobe com a varredura. |
| 00:07 | Varredura completa. Push-in lento de 5%. | Beat entra, seco, 90 BPM. |
| 00:09 | Três estilos do mesmo ambiente, 0,6s cada, transição por máscara horizontal. | Três pulsos sincronizados. |
| 00:13 | Fecha em `--concreto`. Mono: `MESMA PLANTA. TRÊS PÚBLICOS.` | Beat corta. |
| 00:15 | Placa `R. LISBOA · 162`. | Reverberação. |

Versão vertical 9:16 para Reels, com o mesmo timing. Selo `IMAGEM ILUSTRATIVA` presente do frame 00:03 em diante.

---

## 16. Dados cadastrais e rodapé

### 16.1 Bloco de endereço (rodapé)

O rodapé fecha o conceito "O Endereço" — é onde a marca deixa de ser metáfora e vira entidade real. Tudo em JetBrains Mono, `--maresia`, alinhado à esquerda em três colunas.

**Versão de lançamento** — só com o que já existe:

```
R. LISBOA · ESTÚDIO 162          CONTATO                    SIGA
CNPJ 18.019.277/0001-21           contato@[dominio]          Instagram
Atendimento Itapema · SC          +55 (47) 0 0000-0000       Behance
                                  WhatsApp                   LinkedIn

                                              © 2026 · Todos os direitos reservados
```

O CNPJ sozinho já identifica a entidade — para rodapé e política de privacidade é suficiente. Razão social entra depois, quando você tiver o cartão em mãos, sem alterar layout.

**Regra de honestidade:** o site não declara endereço fiscal em Itapema. A cidade aparece como base de atendimento, o que é verdade e é o que interessa ao cliente local. A separação entre `sedeFiscal` e `local` no `site.config.ts` existe para isso.

### 16.2 Onde o CNPJ precisa aparecer

| Local | Formato |
|---|---|
| Rodapé de todas as páginas | `CNPJ 18.019.277/0001-21` |
| JSON-LD `taxID` | com pontuação |
| Página de política de privacidade (LGPD) | identificação do controlador de dados |
| E-mail automático de resposta do formulário | assinatura |
| Propostas e contratos | cabeçalho |

### 16.3 Fase 2 — cadastral e fiscal

**Nada nesta lista bloqueia o site.** A operação segue com nota de São Paulo, que é regular para serviços de design e publicidade. Revisitar com contador quando houver volume que justifique.

- [ ] **Razão social completa** — entra no rodapé quando disponível
- [ ] **Nome fantasia registrado** — verificar se "R. Lisboa Estúdio 162" está cadastrado
- [ ] **CNAEs ativos** — confirmar design (7410-2/02), audiovisual (5911-1/99) e publicidade (7311-4/00). O único item com chance real de travar nota para construtora.
- [ ] **Retenção de ISS na fonte** — perguntar ao financeiro do primeiro cliente de SC se o município exige cadastro de prestador de fora. Afeta líquido, não legalidade.
- [ ] **Regime tributário** — Anexo III ou V do Simples muda alíquota conforme fator R. Conversa com contador antes de fechar a tabela de preços da §15.6.
- [ ] **Certidão negativa** — construtora de porte pede na homologação de fornecedor.

**Gatilho para reavaliar a sede:** faturamento de SC passar de ~50% do total, ou construtora condicionar contrato a fornecedor local. Antes disso, mexer em CNPJ é custo sem retorno.

**O que realmente é necessário agora:** e-mail no domínio e número de WhatsApp comercial. Só isso.

### 16.4 LGPD

O formulário de contato coleta dado pessoal. Requisitos mínimos:

- Checkbox de consentimento, não pré-marcado, com link para a política
- Página `/privacidade` identificando o controlador pelo CNPJ acima
- Retenção declarada e canal para exclusão de dados
- Nada de dado pessoal em query string

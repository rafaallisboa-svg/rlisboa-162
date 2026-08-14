# R. LISBOA - ESTUDIO 162

Site do estudio. Leia BRIEF.md, PLACEHOLDERS.md e LOCAL.md antes de qualquer alteracao.

## Modo local
- Projeto NAO publicado. Nao conectar Vercel, nao configurar deploy, nao sugerir publicar.
- NEXT_PUBLIC_SITE_LIVE permanece false. app/robots.ts bloqueia buscadores.
- Nao adicionar check estrito como prebuild - trava a build local.

## Regras inviolaveis
- Paleta: apenas os 5 tokens da secao 3.1 do BRIEF. Nenhuma cor nova.
- --sinal (#FFC300) no maximo 3 vezes por viewport. Nunca como fundo de secao.
- border-radius: 0 em todo o site. Sem excecao.
- Todo numero renderiza em JetBrains Mono com tabular-nums.
- Nenhuma animacao sem tratamento de prefers-reduced-motion.
- Todo texto de interface em portugues do Brasil, sentence case.
- Conteudo vem de content/ e site.config.ts. Nunca hardcode texto em componente.

## Placeholders
- NUNCA preencher [[ TODO ]] com texto inventado, lorem ipsum ou exemplo.
- NUNCA trocar /api/ph por imagem de stock ou gerada por IA.
- NUNCA mudar pendente: true para false. So o Rafael muda.
- Faltando informacao: mantenha o placeholder e siga.

## Comandos
pnpm dev - pnpm build - pnpm start - pnpm check - pnpm lint

## Antes de dar tarefa por concluida
- pnpm build passa sem erro
- pnpm start roda e navega sem erro no console
- Testado em 375px, 768px e 1440px
- Foco de teclado visivel em todo elemento interativo

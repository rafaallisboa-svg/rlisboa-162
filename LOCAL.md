# Rodar localmente — R. Lisboa · 162

Nada vai ao ar antes de estar aprovado na sua tela. Este documento é o modo local.

---

## 1. Pré-requisitos

```bash
node -v     # 22.x  (use nvm: nvm use)
pnpm -v     # 9.x   (npm i -g pnpm)
```

O arquivo `.nvmrc` fixa a versão. `nvm use` na raiz já resolve.

---

## 2. Primeira execução

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abre em `http://localhost:3000`.

`NEXT_PUBLIC_SITE_LIVE=false` no `.env.local` mantém o site em modo rascunho:
buscadores bloqueados, faixa de rascunho visível, analytics desligado.

---

## 3. Ver no celular (mesma rede Wi-Fi)

Essencial para um site com esse peso de motion — emulador de navegador mente
sobre performance de scroll.

```bash
pnpm dev --hostname 0.0.0.0
```

Descubra seu IP local:

```bash
ipconfig getifaddr en0        # macOS
hostname -I | awk '{print $1}' # Linux
```

No celular, abra `http://SEU_IP:3000`.

---

## 4. Comandos

| Comando | O que faz |
|---|---|
| `pnpm dev` | servidor local com hot reload |
| `pnpm check` | lista pendências de conteúdo |
| `pnpm build` | build de produção, local |
| `pnpm start` | serve o build local em `:3000` — teste real de performance |
| `pnpm lint` | lint |

> `pnpm dev` mente sobre performance. Antes de aprovar qualquer animação,
> rode `pnpm build && pnpm start` e teste nesse.

---

## 5. Git — modo privado

```bash
git init
git branch -M main
git add .
git commit -m "estrutura inicial"
```

No GitHub, criar o repositório como **privado**. Não conectar à Vercel ainda —
a Vercel publica automaticamente a cada push, e é assim que site com placeholder
vaza para o Google.

Trabalhe em branch por sprint:

```bash
git checkout -b sprint/01-fundacao
```

---

## 6. Checklist antes do primeiro deploy

Nenhum item pode ficar em aberto.

**Conteúdo**
- [ ] `pnpm check` retorna zero pendências
- [ ] Nenhuma imagem apontando para `/api/ph`
- [ ] Nenhum `pendente: true` restante
- [ ] Textos revisados — sem lorem, sem texto de exemplo

**Técnico**
- [ ] `pnpm build` passa sem erro nem warning
- [ ] `pnpm start` roda e navega inteiro sem erro no console
- [ ] Testado em 375px, 768px, 1440px e em celular real
- [ ] Foco de teclado visível em todo elemento interativo
- [ ] `prefers-reduced-motion` testado (macOS: Acessibilidade → Reduzir movimento)
- [ ] Lighthouse local: Performance e Acessibilidade acima de 90

**Legal e marca**
- [ ] Rodapé com razão social e CNPJ corretos
- [ ] Selo `IMAGEM ILUSTRATIVA` em toda peça de ambientação
- [ ] Política de privacidade publicada e linkada no formulário
- [ ] Consentimento LGPD no formulário, não pré-marcado

**Publicação**
- [ ] Domínio comprado e apontado
- [ ] `NEXT_PUBLIC_SITE_URL` com o domínio final
- [ ] `NEXT_PUBLIC_SITE_LIVE=true` **apenas** nas variáveis da Vercel
- [ ] `.env.local` continua com `false` na sua máquina
- [ ] Formulário testado com envio real
- [ ] OG image conferida no compartilhamento do WhatsApp

---

## 7. Lighthouse local

```bash
pnpm build && pnpm start
# em outro terminal:
npx lighthouse http://localhost:3000 --view
```

Ponto de atenção: o reel do hero é o maior risco de LCP. Se a Performance
cair abaixo de 90, reduza o vídeo ou carregue-o depois do load.

---

## 8. Ordem de aprovação

1. Estrutura navegável com placeholder → você aprova a arquitetura
2. Conteúdo real entrando aos poucos → você aprova o texto
3. Motion aplicado → você aprova o movimento no celular
4. `pnpm build && pnpm start` → você aprova a performance
5. Só então: repositório conectado à Vercel e `SITE_LIVE=true`

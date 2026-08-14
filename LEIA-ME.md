# Scaffold de conteúdo — R. Lisboa · Estúdio 162

Estrutura completa com placeholders. O site fica navegável desde o primeiro dia
e você preenche no seu ritmo, sem tocar em código.

## Como instalar

1. Copie tudo para a raiz do projeto Next.js, respeitando os caminhos.
2. Adicione ao `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "check": "node scripts/check-conteudo.mjs",
    "check:strict": "node scripts/check-conteudo.mjs --strict"
  }
}
```

> `check:strict` sai com erro se houver pendência. Use como gate manual antes
> do deploy. Só transforme em `prebuild` quando o conteúdo estiver completo —
> antes disso ele trava sua build local.

3. `cp .env.example .env.local` e mantenha `NEXT_PUBLIC_SITE_LIVE=false`.

## Estrutura

```
site.config.ts              dados do estúdio, contato, cadastro, redes
content/
  clientes.json             6 slots de cliente
  servicos.json             6 serviços, ambientação já preenchida
  depoimentos.json          3 slots
  processo.json             6 etapas do memorial descritivo
  ambientacao.json          par antes/depois do comparador
  projetos/
    _MODELO.mdx             template — duplique para criar case novo
    projeto-01..06.mdx      6 slots, 01 e 02 marcados como destaque
                            06 pré-configurado como case de ambientação
app/api/ph/route.ts         gerador de imagem placeholder na paleta
lib/placeholder.ts          helpers: publicados(), isTodo(), real()
scripts/check-conteudo.mjs  relatório de pendências
```

## Uso diário

```bash
pnpm check     # o que ainda falta, por arquivo e por linha
```

Estado inicial: **179 pendências** — 127 de texto, 10 itens, 42 imagens.
O número cai conforme você preenche. É o seu painel de progresso.

## Regras

- Substitua `[[ TODO: ... ]]` pelo conteúdo real. Nunca por texto de exemplo.
- Troque `pendente: true` para `false` quando o item estiver completo.
- Troque `/api/ph?...` pelo caminho real do arquivo em `/public`.
- Itens com `pendente: true` somem na build de produção e aparecem em dev.

Convenção completa em `PLACEHOLDERS.md`.
Execução local e checklist de pré-deploy em `LOCAL.md`.

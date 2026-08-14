# Convenção de placeholders — R. Lisboa · Estúdio 162

Este projeto é construído com a estrutura completa e o conteúdo entrando aos poucos.
Nada pode ser inventado. Tudo que falta fica **visivelmente marcado**.

---

## 1. As três marcas

### `[[ TODO: descrição ]]` — texto pendente

Em qualquer string de conteúdo.

```json
"titulo": "[[ TODO: nome do cliente ]]"
```

Em desenvolvimento, renderiza com fundo `--sinal` e texto em `--concreto`.
Em produção, o build **falha** se sobrar algum. É intencional — impede publicar pela metade.

### `pendente: true` — item incompleto

No frontmatter ou no objeto JSON.

```yaml
pendente: true
```

O item existe na estrutura, é ignorado na build de produção e aparece em dev com faixa diagonal.
Trocar para `false` quando o conteúdo estiver pronto.

### `/api/ph` — imagem pendente

Gera SVG na hora, na paleta do estúdio, com dimensão e rótulo.

```
/api/ph?w=1600&h=900&label=Capa do projeto
```

Substituir pelo caminho real quando tiver o arquivo. Nada de baixar imagem de banco.

---

## 2. Regras para o Claude Code

- **Nunca** preencher um `[[ TODO ]]` com texto inventado, lorem ipsum ou exemplo genérico.
- **Nunca** trocar `/api/ph` por imagem de stock ou gerada por IA.
- Se faltar informação para construir um componente, criar o placeholder e seguir.
- `pendente: true` nunca vira `false` automaticamente. Só o Rafael muda.
- Todo conteúdo vem de `content/` ou `site.config.ts`. Zero texto hardcoded em componente.

---

## 3. Verificar o que falta

```bash
pnpm check
```

Lista todas as pendências agrupadas por arquivo, com contagem por tipo.
Rodar antes de cada deploy.

---

## 4. Ordem sugerida de preenchimento

| # | O que | Desbloqueia |
|---|---|---|
| 1 | `site.config.ts` — contato, razão social, redes | Header, rodapé, schema, formulário |
| 2 | `content/clientes.json` — logos | Pavimento 04 |
| 3 | `content/servicos.json` — escopos e faixas | `/servicos` e pavimento 01 |
| 4 | 3 projetos em `content/projetos/` | `/projetos` e pavimento 02 |
| 5 | `content/ambientacao.json` — par antes/depois | Comparador, `/construtoras` |
| 6 | `content/depoimentos.json` | Pavimento 07 |
| 7 | Reel do hero | Pavimento 00 |

O site fica navegável desde o item 1. Cada item acrescenta, nenhum quebra.

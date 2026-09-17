# Fase 2 — Fundação (atual, aprofundada)

**Status:** feita em 16 set 2026 (spec + código + conferência no browser).  
**Código:** limitado ao que este documento descreve.  
**Não fazer a partir daqui:** Fase 3 só depois de aprofundar `03-profile-block.md`.

## Objetivo

Ter um app web local onde o único usuário:

1. Completa um perfil (onboarding).
2. Vê um dashboard que já fala a língua do produto (módulos, “não medido”, próximo passo).
3. Edita o perfil depois.
4. Deixa no código o **contrato de avaliação** que as fases 3+ são obrigadas a respeitar.

A primeira **nota de verdade** não nasce aqui. Nasce na Fase 3.

## Por quê esta fase existe

Sem perfil, a análise de CV não sabe a stack nem o mercado. Sem contrato de avaliação, a Fase 3 inventa um JSON ad hoc. Sem dashboard, não há lugar para a nota aparecer. Auth e pagamento foram cortados (D-001, D-008).

## Experiência (o que a pessoa faz)

### Primeira visita

1. Abre `http://localhost:3000`.
2. Não há perfil → cai em `/onboarding`.
3. Preenche: nome, anos de experiência, stack (texto, separado por vírgula), mercados-alvo, tipos de contrato, idioma da UI, idioma preferido da transcrição futura.
4. Senioridade aparece explicada e **fixa em pleno** (D-003) — não é combo aberto.
5. Envia → grava `data/profile.json` → vai para `/`.

### Painel (`/`)

- Saudação com o nome.
- Card **Profile Score**: estado `não medido` (nunca `0`). Texto: a nota sai na Fase 3, depois do CV e do LinkedIn.
- Lista dos módulos futuros com estado `não medido` ou `em breve`, sem botão que finja que a análise existe.
- Próximo passo único: “Na próxima fase: enviar CV e LinkedIn” (ou “completar perfil” se ainda incompleto).
- Nav: Painel | Perfil.

### Perfil (`/profile`)

Mesmo formulário do onboarding, valores atuais, botão salvar, volta ao painel.

### Idioma da UI

`uiLocale` no perfil. Default `pt-BR`. Troca no formulário e vale na hora (após salvar). Entrevista continua EN-US no futuro; aqui só há chrome do app.

## Telas — inventário fechado

| Rota | Função |
| --- | --- |
| `/` | Dashboard. Redirect para `/onboarding` se não houver perfil. |
| `/onboarding` | Primeiro perfil. Redirect para `/` se já houver perfil. |
| `/profile` | Editar. Redirect para onboarding se não houver perfil. |

Sem `/login`, `/settings` extra, `/evaluations`, `/cv`. Sem modal de upgrade.

## Dados

Arquivos locais (D-009), gitignored:

```
data/profile.json
data/evaluations.json
```

### Profile

```ts
{
  displayName: string
  yearsExperience: number        // 3–12 aceito; persona é pleno
  seniority: "pleno"             // literal
  stack: string[]                // ["React", "Node.js"]
  targetMarkets: Array<"us"|"uk"|"ca"|"eu"|"au">
  contractTypes: Array<"short"|"long"|"freelance">
  uiLocale: "pt-BR" | "en-US"
  transcriptLocale: "pt-BR" | "en-US"
  updatedAt: string              // ISO
}
```

Um único perfil. Sem `id` de usuário.

### Evaluation (contrato — lista começa vazia)

```ts
{
  id: string
  module: "cv" | "linkedin" | "rh" | "tech_vibe" | "fit" | "challenge"
  score: number                  // inteiro 0–100
  strengths: Array<{ claim: string; evidence: string }>  // length 3
  improvements: Array<{ claim: string; example: string; rank: 1|2|3 }>  // length 3
  nextStep: string
  createdAt: string
}
```

`evaluations.json` = `{ "items": Evaluation[] }`. Fase 2 nunca dá `push` nisso, só lê.

Regras de escrita (para a Fase 3 obedecer): recusar avaliação com `strengths.length !== 3` ou `improvements.length !== 3` ou score fora de 0–100. A função `assertEvaluation` já existe agora.

## Stack técnica (só o necessário)

| Escolha | Por quê |
| --- | --- |
| Next.js 16 App Router + TS | D-002, create-next-app atual |
| Tailwind 4 | Já vem no template; UI simples |
| Server Actions para salvar perfil | Formulário nativo, sem API REST de um recurso |
| `fs` + JSON em `data/` | D-009, Windows, zero native addon |
| Dicionários `pt-BR` / `en-US` em código | Duas telas; next-intl é cedo |
| Sem Prisma, Drizzle, next-auth, OpenAI SDK, shadcn | Fora do objetivo |

Camadas:

```
src/lib/domain/     tipos + assertEvaluation + catálogo de módulos (IDs)
src/lib/storage/    read/write JSON (server-only)
src/lib/i18n/       strings da UI
src/app/actions/    saveProfile
src/app/            rotas
src/components/     form, shell, dashboard
```

`storage` só pode ser importado em Server Components / Server Actions.

## UI — tom

Papel quente, tinta, acento ferrugem. Não é dashboard SaaS roxo. Sem ilustração genérica, sem “Deploy Now”, sem logo Next.

Acessível: label em todo input, foco visível, contraste.

## Critério de saída da Fase 2

Tudo isto verdadeiro:

1. Primeira visita obriga onboarding e persiste JSON.
2. Recarregar o browser mantém o perfil.
3. Dashboard mostra Profile Score como não medido e os 6 módulos sem fingir nota.
4. Editar perfil atualiza o JSON.
5. Trocar UI para English troca os textos do chrome após salvar.
6. `src/lib/domain` exporta `Evaluation` e `assertEvaluation`.
7. Não há upload de CV, chamada de LLM, nem permissão de microfone.
8. `docs/STATUS.md` reflete a realidade.

Quando passar: marcar Fase 2 como **feita** no STATUS e só então aprofundar a Fase 3.

## Fora desta fase (lista de recusa)

- Auth, OAuth, cookies de sessão, multi-user
- Upload/parse de PDF ou texto de LinkedIn
- Qualquer prompt / SDK de modelo
- MediaRecorder, TTS, STT, timer de entrevista
- Banco SQLite/Postgres
- Testes E2E (opcional depois; não bloqueia)
- Deploy Vercel (ferramenta local)
- Nome comercial definitivo
- Telas de módulos `cv`, `linkedin`, `rh`, …

## Riscos conhecidos

- `data/` na máquina do autor: backup = copiar a pasta. Sem nuvem de propósito.
- `fs` no Next em produção serverless quebraria — irrelevante enquanto for `next dev` / `next start` local. Não deployar isto na Vercel sem migrar storage (exigiria ADR).
- create-next-app já fez o commit inicial do template; o trabalho desta fase fica uncommitted até o autor pedir commit.

## Mapa de arquivos desta fase

Ver o repo. Qualquer arquivo de “análise de currículo” ou “recorder” criado agora está errado e deve ser apagado.

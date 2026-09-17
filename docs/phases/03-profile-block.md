# Fase 3 — Bloco de perfil (atual, aprofundada)

**Status:** código e spec no repo (17 set 2026). Pontuação com API ainda depende de `.env.local`.  
**Código:** permitido, limitado a CV + LinkedIn + Profile Score.  
**Não fazer:** entrevistas, áudio, matching, live code, OAuth LinkedIn, reescrever o PDF por você.

## Objetivo

A pessoa sai com a **primeira nota útil** do produto:

1. Avalia o currículo (texto colado e/ou PDF).
2. Avalia o LinkedIn (Headline, About, Experiências colados — sem OAuth).
3. Vê, para cada um: nota 0–100, 3 acertos com evidência, 3 melhorias com exemplo reescrito, 1 próximo passo.
4. Quando os dois existem, o dashboard mostra o **Profile Score** (CV 57 + LinkedIn 43). Um módulo sozinho nunca puxa o composto para baixo como se o outro fosse zero.

## Por quê

D-006: ATS e busca passiva acontecem antes da call. Sem esta nota, o restante do produto treina a pessoa com o perfil escrito ainda no padrão BR.

## Experiência

### Entrada

- Precisa de perfil (Fase 2). Sem perfil → `/onboarding`.
- Painel: Currículo e LinkedIn viram links (não mais “em breve”).
- `/cv` e `/linkedin` são as duas rotas desta fase.

### Currículo (`/cv`)

1. Cola o texto do CV **ou** envia um PDF (extraímos o texto; se o PDF for imagem/scan, pedimos para colar).
2. Envia → Anthropic avalia contra a rubrica, no idioma da UI.
3. Persistimos o texto-fonte + a avaliação.
4. A página mostra a última nota e o formulário para reavaliar.

### LinkedIn (`/linkedin`)

1. Cola Headline, About e o bloco de experiências (texto). Sem URL scraping, sem OAuth.
2. Mesmo contrato de avaliação.
3. Reavaliar substitui a “última” (histórico fica em `evaluations.json`).

### Painel

- Profile Score: número só com CV **e** LinkedIn medidos. Senão: “Não medido” ou “Parcial” (um dos dois).
- Próximo passo: o módulo que falta; se os dois existem, o texto aponta para a Fase 4 (ainda não implementada).

## Rubrica — CV (100)

Usada no prompt. O modelo devolve um único `score`; os pesos guiam, não viram 6 notas na UI nesta fase.

| Critério | Peso |  Alto | Baixo |
| --- | --- | --- | --- |
| Formato ATS | 25 | 1 coluna, sem foto/CPF/estado civil, contato + LinkedIn/GitHub, PDF texto | Duas colunas, tabela de layout, foto, documento BR |
| Inglês | 20 | Inglês natural de resume, action verbs | Português, calques, “I have responsibility for” |
| Impacto | 25 | Métricas, resultado, escopo | Lista de tarefas / “responsible for” |
| Fit com o perfil | 15 | Stack e mercados do perfil aparecem com evidência | CV genérico, stack sumida |
| Estrutura | 15 | ~1 página se <10 anos, seções claras, datas | 3+ páginas, buracos, ordem caótica |

O CV é julgado no **padrão internacional para pleno remoto**, não contra uma vaga colada (anti-escopo VagaNaGringa).

## Rubrica — LinkedIn (100)

| Critério | Peso | Alto | Baixo |
| --- | --- | --- | --- |
| Headline | 25 | Papel + stack + sinal internacional/remoto | Só “Software Developer” / cargo BR |
| About | 25 | Inglês, história, keywords de busca | Vazio, português, clichê |
| Experiências | 30 | Mesma lógica do CV: métricas, inglês | Copiar-colar pobre ou só título |
| Busca do recrutador | 20 | Keywords da stack do perfil, consistência CV↔LI | Perfil em PT, headline sem stack |

## Contrato de saída (obrigatório)

Cada avaliação passa em `assertEvaluation` **antes** de gravar. Se o modelo devolver JSON inválido, tentamos uma correção curta; se falhar, não gravamos nota falsa — erro visível.

`claim`/`evidence`/`example`/`nextStep` saem no `uiLocale`. A evidência cita trecho real do texto enviado.

## Stack desta fase

| Escolha | Por quê |
| --- | --- |
| Anthropic Messages API (`claude-sonnet-4-6` default, override `ANTHROPIC_MODEL`) | D-017. Sonnet 4 aposentou em jun/2026; 4-6 é o sucessor estável para JSON estruturado. |
| `ANTHROPIC_API_KEY` em `.env.local` | Nunca no git. |
| `unpdf` para PDF | WASM, Windows-friendly. |
| JSON em `data/` continua | D-009. Novos: `evaluations.json` (append), `artifacts.json` (último CV/LI). |

## Dados

`artifacts.json` (gitignored):

```ts
{
  cvText?: string
  cvSource?: "paste" | "pdf"
  cvFileName?: string
  linkedinHeadline?: string
  linkedinAbout?: string
  linkedinExperience?: string
  updatedAt: string
}
```

`evaluations.json.items[]` ganha entradas `module: "cv" | "linkedin"`. Histórico por append; UI usa `latestByModule`.

Profile Score (só UI, não é um `module`):

`round((cv.score * 20 + linkedin.score * 15) / 35)`

## Fora desta fase

- Gerar/reescrever o PDF final para a pessoa (prepara.cv)
- Fit Score contra uma job description
- Scraping de URL do LinkedIn / OAuth
- Entrevistas, timer, áudio
- Auth, deploy, mobile
- Mostrar Readiness Score completo (faltam dimensões de fala)

## Critério de saída

1. Sem API key: erro claro, sem nota inventada.
2. Com key: CV colado gera avaliação válida no contrato.
3. LinkedIn colado gera avaliação válida.
4. Dashboard: notas nos módulos; Profile Score só com os dois.
5. Reavaliar atualiza a última nota e guarda histórico.
6. PDF de texto extraível funciona; PDF-imagem falha com pedido para colar.
7. Docs (STATUS, CHANGELOG, DECISIONS, este arquivo) atualizados.
8. Nenhuma rota de entrevista.

## Riscos

- Sem `ANTHROPIC_API_KEY` o módulo não pontua — esperado.
- Modelo pode alucinar evidência: o prompt exige citação literal; não dá para garantir 100%.
- PDF escaneado não tem texto.
- Custo: ~1–2 calls por reavaliação. Ferramenta pessoal, ok.

# Prontidão (dev na gringa)

Ferramenta pessoal web para capacitação de dev pleno brasileiro no processo seletivo internacional.

**Memória do projeto:** comece por [docs/README.md](docs/README.md). Sem isso, o contexto se perde.

## Estado atual

Fase 3 — bloco de perfil (CV + LinkedIn). Ver [docs/STATUS.md](docs/STATUS.md).

Não é startup e não tem login. Análise usa Anthropic (`ANTHROPIC_API_KEY` em `.env.local`).

```bash
cd C:\Daniel\Developer\dev-gringa
copy .env.example .env.local
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Na primeira visita: onboarding de perfil. Os dados ficam em `data/` (gitignored).

## O que este repo contém

- App Next.js 16 (perfil, dashboard, análise de CV/LinkedIn)
- Documentação permanente: decisões, porquês, fases, changelog
- Regras Cursor em `.cursor/rules/` para a próxima conversa não recomeçar do zero

## O que não contém (ainda)

Entrevistas (Fase 4), matching (Fase 5), áudio, mobile.

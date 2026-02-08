# 🚀 Desenvolvimento Multi-Agent com AI

> **Objetivo**: Workflow multi-agent de forma rápida, consistente e profissional.

---

## 📋 Índice

1. [Setup Inicial](#-setup-inicial)
2. [Workflow de Code Review](#-workflow-de-code-review)
3. [Workflow Multi-Agent para Issues Complexas](#-workflow-multi-agent-para-issues-complexas)
4. [Skills por Tipo de Mudança](#-skills-por-tipo-de-mudança)
5. [Checklist Final](#-checklist-final)

---

## 🛠️ Setup Inicial

```bash
# 1. Baixe a pasta .cursor/skills na raiz do projeto
# 2. Confirme a instalação
ls .cursor/skills/skills/
```

## 🤖 Workflow Multi-Agent para Issues Complexas

Configuração:
```bash
# Crie uma branch para a tarefa
git checkout -b feature/issue001
```

### **Fase 1: Planejamento** (Claude Sonnet 4.5/4.6) Mode: Plan

- Use MCP do Jira para importar a issue
- A IA cria um **plano de implementação em Markdown**
- Plano curto, direto e organizado
- **Sem código ainda, só estratégia**

Prompt 1:
```text
Crie um plano de implementação para a issue...
Entregáveis (conciso, sem enrolação):
- Decisões de UX
- Performance
Pare após o plano. Aguarde revisão antes de escrever qualquer código.
```
Prompt 2:
```text
Dentro da pasta plan, escreva este plano na raiz do projeto com o título plan_issue0001_claude em markdown.
```

**Escolha do modelo:**
- **Sonnet 4.5/4.6**: maioria dos casos (equilíbrio velocidade/qualidade)
- **Opus 4.5/4.6**: issues muito complexas que exigem raciocínio profundo

---

### **Fase 2: Revisão do Plano -Opcional** (GPT-5.2/5.3 Codex) Mode: Agent

- Outra IA revisa o plano
- Verifica:
  - Segurança de tipos (TypeScript)
  - Interação entre componentes
  - Possíveis melhorias
- Sugere ajustes **antes de codar**

👉 Evita erros de arquitetura

Prompt 1: Nova janela de contexto
```text
Revise @plan_issue0001_claude.md de forma aprofundada.
Indique o que está sólido, possíveis riscos e oportunidades claras de melhoria.
Seja objetivo, crítico e não escreva código.
```

Prompt 2: 
```text
Por favor, aplique isso e o restante do seu feedback ao arquivo do plano @plan_issue0001_claude.md
Não escreva código.
```

---

---

### **Fase 3: Segunda Opinião - Opcional** (Claude Opus 4.6) Mode: Agent

- Claude revisa o plano **já corrigido**
- Confirma se está **pronto para produção**
- Valida arquitetura e decisões técnicas

Prompt 1: Nova janela de contexto
```text
Fiz alterações no plano @plan_issue0001_claude.md.
Você pode revisar as mudanças que fiz e fornecer feedback?
```
Prompt 2: 
```text
Aplique todo o feedback diretamente no plano
@plan_issue0001_claude.md.
Não escreva código.
```
---

### **Fase 4: Build** (Composer / Codex / Sonnet 4.6) Mode: Agent

Escolha conforme a necessidade:

| Modelo | Quando Usar | Velocidade | Qualidade |
|--------|-------------|------------|-----------|
| **Composer** | Prototipagem rápida | ⚡ < 90s | ⭐⭐⭐ |
| **GPT-5 Codex** | Build de produção | 🐢 Lento | ⭐⭐⭐⭐⭐ |
| **Sonnet 4.6** | Equilíbrio | 🚀 Médio | ⭐⭐⭐⭐ |

Prompt 1: Nova janela de contexto
```text
Implemente o plano @plan_issue0001_claude.md. 
Vocẽ não deve utilizar comentários no arquivo.
```

---

### **Fase 5: Revisão manual** 

- Revisar o que foi inserido
- Aprovar o código 

---

### **Fase 6: Code Review com IA** (GPT-5 Codex ou Opus 4.6) Mode: Agent

- Commit realizado
- Codex revisa o código gerado
- Fase 0: Detecção de Bugs: Encontra bugs **antes de rodar o projeto**
- Fase 1: Review Geral: Valida padrões e boas práticas

Prompt 1: Nova janela de contexto
```text
Acabei de implementar este plano  @plan_issue0001_claude.md.

@find-bugs

Nesta Branch feature/issue001, encontre bugs, vulnerabilidades e problemas de qualidade no branch atual. 
Priorize por severidade:
1. Crítico - Bloqueia merge
2. Alto - Deve ser corrigido
3. Médio - Recomendado corrigir
4. Baixo - Sugestão
```

Prompt 1.1: Caso tenha encontrado algo
```text
Atualize o código com base no seu feedback, escolhendo a melhor solução para a questão em aberto.
```

Prompt 2:
```text
@code-reviewer
Revise o trabalho do Composer e forneça seu feedback.
Revise esta Branch feature/issue001 focando em:
- Qualidade do código
- Bugs
- Segurança
- Performance
- Testes
```

Prompt 2.1: Caso tenha encontrado algo
```text
Atualize o código com base no seu feedback, escolhendo a melhor solução para a questão em aberto.
```

🔥 Grande vantagem: menos bugs em dev


### **Fase 6: Pull Request** 

- Em construção : push
- SonarCloud analisa o PR
- Dev corrige os issues do SonarCloud
- PR sai de Draft → Ready for Review
- Code Review (revisão humana)
- Quality Gate aprovado → Merge

---

## 🎯 Modelos Recomendados por Fase

| Fase | Modelo Principal | Alternativa | Quando Usar |
|------|-----------------|-------------|-------------|
| **Planejamento** | Sonnet 4.6 | Opus 4.6 | Issues complexas |
| **Revisão do plano** | GPT-5 Codex | Opus 4.5/4.6 | Validação técnica |
| **Segunda opinião** | Opus 4.6 | Sonnet 4.6 | Validação final |
| **Build rápido** | Composer | Sonnet 4.6 | Prototipagem |
| **Build produção** | GPT-5 Codex | Opus/Sonnet 4.6 | Código final |
| **Code Review** | GPT-5 Codex | Opus 4.6 | Revisão final |


---

## 🔍 Workflow de Code Review **Fase 5: Code Review**

### Fluxo Básico (80% dos casos)

#### **Fase 0: Detecção de Bugs** (opcional, 5 min)

```text
@find-bugs

Encontre bugs, vulnerabilidades e problemas de qualidade no branch atual:
- Branch: [nome do branch]
- Arquivos modificados: [listar ou usar git diff]

Priorize por severidade:
1. Crítico - Bloqueia merge
2. Alto - Deve ser corrigido
3. Médio - Recomendado corrigir
4. Baixo - Sugestão
```

#### **Fase 1: Review Geral** (obrigatório)

```text
@code-reviewer

Revise esta PR focando em:
- Qualidade do código
- Bugs
- Segurança
- Performance
- Testes
```

#### **Fase 2: Checklist Final**

```text
@code-review-checklist
```

✅ **Se passou aqui → PR quase pronta**

---

## 🎯 Skills por Tipo de Mudança

| Tipo de Mudança | Skills Recomendadas |
|-----------------|---------------------|
| 🆕 Nova Feature | `@code-reviewer` + `@architect-review` |
| 🐛 Bug Fix | `@find-bugs` + `@debugger` + `@code-reviewer` |
| 🔒 Código Sensível | `@security-auditor` + `@code-reviewer` |
| ♻️ Refatoração | `@code-refactoring-refactor-clean` + `@architect-review` |
| 📦 Atualização de Deps | `@dependency-upgrade` + `@codebase-cleanup-deps-audit` |
| 🚀 Migration | `@framework-migration-code-migrate` + `@legacy-modernizer` |
| 🔍 Buscar Bugs | `@find-bugs` + `@error-detective` |


---

## ✅ Checklist Final de Aprovação

Antes de aprovar, confirme:

- ✔ Código funciona
- ✔ Não quebrou nada
- ✔ Não criou risco de segurança
- ✔ Dá pra manter daqui a 6 meses
- ✔ Testes fazem sentido
- ✔ PR está bem explicada

**Se alguma resposta for "não" → não aprove.**

---

## 🧪 Exemplo Prático  de um Code Review para PR

### Code Review Rápido (15 min)

```text
@code-reviewer

Revise esta PR:
- Feature: criação de usuário
- Stack: Node + Prisma
- Arquivos: controller, service, repository
```

Depois:

```text
@security-auditor
```

Depois:

```text
@comprehensive-review-pr-enhance
```

⏱️ **Tempo total**: ~15 minutos  
📈 **Qualidade**: sênior

---

### Issue Complexa (Multi-Agent)

1. **Planejamento** (Sonnet 4.6): importar issue do Jira e criar plano
2. **Revisão** (GPT-5 Codex): validar plano
3. **Segunda opinião** (Opus 4.6): confirmar arquitetura
4. **Build** (Composer/Codex): implementar código
5. **Code Review** (GPT-5 Codex): revisar implementação

---

## 💡 Dicas Práticas

### Para Code Review
- Use `@find-bugs` antes de revisar para detectar problemas automaticamente
- Sempre classifique issues por severidade
- Não aprove se algum item do checklist falhar

### Para Workflow Multi-Agent
- Peça planos **"concise"** para o Claude
- Use Composer para iterar rápido
- Use Codex para builds finais
- Marque arquivos ao trocar de agente
- Use o botão de copiar para passar contexto
- Browser Mode no Cursor: `Ctrl + Shift + P → Cursor Open Browser`
- Opus 4.6: reserve para arquiteturas críticas e code reviews finais

---

## 📊 Quando Usar Cada Modelo Claude

### Sonnet 4.5/4.6
- Issues de complexidade média
- Prototipagem rápida
- Refatorações
- Implementações com padrões estabelecidos

### Opus 4.5/4.6
- Arquiteturas complexas
- Decisões críticas de design
- Otimizações de performance
- Revisões finais de segurança

---

## 🚀 Benefícios

✅ Menos bugs em dev  
✅ Menos testes manuais  
✅ Código mais limpo  
✅ Iteração muito mais rápida  
✅ Cada IA usada no que faz melhor  
✅ Code review de nível sênior consistente  

---

## 🧠 Lembre-se

👉 **AI Skills não substituem você.**

Elas:
- Ampliam visão
- Reduzem esquecimento
- Aceleram análise

**A decisão final é sempre sua.**


Fonte: https://github.com/sickn33/antigravity-awesome-skills
# Plano de Implementação: API Node Express com Rota Hello World

## Objetivo
Criar uma API Node.js Express mínima com uma única rota GET que retorna uma resposta JSON. Este é um projeto greenfield sem código existente, então o plano abrange inicialização do projeto, configuração da estrutura básica e implementação do endpoint introdutório.

---

## Etapas de Implementação

### 1. Inicializar Projeto Node.js
- Criar arquivo `package.json` com configuração básica
- Instalar dependência Express via npm
- Definir versão do Node.js recomendada (v18+ ou v20+)
- Criar `.gitignore` alinhado ao ecossistema Node e preparar `.env.example` caso variáveis sejam usadas

### 2. Criar Estrutura de Projeto
- Criar pasta `src/` na raiz do projeto
- Criar arquivo `src/app.js` que exporta a instância Express configurada (rotas, middlewares)
- Criar arquivo `src/server.js` que importa `app.js` e faz o listen na porta — separação necessária para que o supertest consiga testar sem conflito de porta
- Criar pasta `tests/` para os testes automatizados
- Garantir que arquivos de configuração (`.gitignore`, `.env.example`) estejam versionados corretamente
- Estrutura recomendada para escalabilidade do projeto TCC

### 3. Implementar Servidor Express
- Em `src/app.js`: inicializar instância Express, registrar middlewares e rotas, e exportar a instância
- Em `src/server.js`: importar app e configurar servidor para escutar em porta (padrão: 3000 ou via `process.env.PORT`)
- Adicionar middleware de tratamento de erros que retorna resposta JSON padronizada: `{ error: "Internal Server Error" }` com status 500
- Incluir log de inicialização no console em `server.js`

### 4. Definir Rota GET /hello
- Criar rota GET `/hello` que retorna resposta JSON
- Formato esperado: `{ message: "Hello World" }`
- Status HTTP: 200 OK

### 5. Adicionar Scripts NPM
- Script `start`: iniciar servidor em produção
- Script `dev`: iniciar servidor com nodemon para auto-reload em desenvolvimento
- Script `test`: executar suíte automatizada básica (ex.: jest + supertest)

### 6. Configurar Testes Automatizados
- Instalar dependências de teste: jest e supertest
- Criar cenários na pasta `tests/` para a rota `/hello`
- Importar a instância de `src/app.js` nos testes (sem iniciar o listen) para evitar conflito de porta
- Garantir que o script `npm test` valide a resposta HTTP esperada (JSON correto e status 200)

### 7. Testar Implementação Manualmente
- Verificar se servidor inicia sem erros
- Testar rota `/hello` via curl ou cliente HTTP (Postman, Thunder Client, etc.)
- Confirmar resposta JSON correta

### 8. Configurar Qualidade de Código
- Instalar e configurar ESLint para padronização de estilo e detecção de problemas
- Instalar e configurar Prettier para formatação automática
- Adicionar script `lint` ao `package.json`

---

## Decisões de Arquitetura

### Linguagem
- **JavaScript puro** (não TypeScript) nesta fase
- TypeScript pode ser adicionado em iterações futuras

### Estrutura de Pastas
```
projeto/
├── src/
│   ├── app.js
│   └── server.js
├── tests/
│   └── hello.test.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### Porta e Ambiente
- Usar `process.env.PORT || 3000` para flexibilidade
- Permitir configuração via variáveis de ambiente

### Middleware
- Incluir tratamento básico de erros
- Middleware de CORS opcional (considerar adicionar em próximas fases)
- JSON parser padrão do Express

### Dependências
- **express**: framework web principal
- **nodemon**: dev dependency para auto-reload (opcional, mas recomendado)
- **jest** e **supertest**: dev dependencies para testes automatizados da rota `/hello`
- **eslint** e **prettier**: dev dependencies para padronização e formatação de código

---

## Considerações Adicionais

### Segurança
- Middleware de erros retorna JSON padronizado (`{ error: "Internal Server Error" }`, status 500) sem expor stack traces em produção
- Validar entrada (para próximas rotas)
- Usar HTTPS em produção

### Performance
- Estrutura mínima garante início rápido
- Possibilidade de adicionar compressão gzip em iterações futuras

### Maintainabilidade
- Código sem comentários conforme workflow
- Separação `app.js` / `server.js` facilita testes e futuras integrações
- Estrutura `src/` preparada para crescimento do projeto
- Fácil de expandir com novas rotas e funcionalidades
- ESLint e Prettier configurados na etapa 8 para padronização desde o início
- Definir padrão de logs (ex.: usar `console` estruturado ou integrar biblioteca dedicada em fases futuras)

---

## Próximas Fases (Pós-implementação)
- Fase 2: Revisão do plano por outra IA
- Fase 3: Segunda opinião técnica
- Fase 4: Implementação do código
- Fase 5: Revisão manual
- Fase 6: Code review com detecção de bugs
- Fase 7: Pull Request e SonarCloud

---

## Status
✅ Plano revisado e pronto para implementação

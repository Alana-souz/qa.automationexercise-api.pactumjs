🧩 QA - AutomationExercise API com PactumJS

Projeto de automação de testes de API REST usando PactumJS, Joi e Mochawesome, cobrindo testes funcionais e de contrato de API.

🚀 Tecnologias
Node.js 18+
PactumJS – Framework de testes de API
Joi – Validação de contrato
Mochawesome – Relatórios HTML
GitHub Actions – Integração contínua

📂 Estrutura
qa-automationexercise-api-pactumjs/
├── test/
│   ├── api/         # Testes funcionais
│   ├── contrato/    # Testes de contrato (Joi)
├── helpers/         # Setup, token e dados dinâmicos
├── schemas/         # Schemas Joi
├── pactum.config.js
├── package.json
└── .github/workflows/ci.yml

⚙️ Instalação
git clone https://github.com/<seu-usuario>/qa-automationexercise-api-pactumjs.git
cd qa-automationexercise-api-pactumjs
npm install

🧪 Scripts
Script	Descrição
npm run test:functional	Executa testes funcionais
npm run test:contract	Executa testes de contrato
npm run test:all	Executa todos os testes
npm test	Alias para npm run test:all

📊 Relatórios
Gerados automaticamente em:
/mochawesome-report/index.html

🔄 Pipeline (CI)
Pipeline configurada no GitHub Actions para:
Fazer checkout do código
Instalar dependências
Executar testes (npm run test:all)
Enviar relatório como artefato
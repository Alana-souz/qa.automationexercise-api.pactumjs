// generate-readme.js
import fs from "fs";

const content = `# 🧩 QA -Projeto de automação de testes de **API REST** usando **PactumJS**, **Joi** e **Mochawesome**, cobrindo testes **funcionais** e de **contrato**.
  

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PactumJS](https://img.shields.io/badge/Tested%20with-PactumJS-blue)](https://pactumjs.github.io/)
[![Joi](https://img.shields.io/badge/Schema-Joi-yellow)](https://joi.dev/)
[![Mochawesome](https://img.shields.io/badge/Report-Mochawesome-orange)](https://www.npmjs.com/package/mochawesome)
[![CI - GitHub Actions](https://github.com/alana-reis/exercise-Api/actions/workflows/ci.yml/badge.svg)](https://github.com/alana-reis/exercise-Api/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)


## 🎯 Objetivo do Projeto

Demonstrar a criação de **testes de API automatizados**, focando em:

✅ Testes Funcionais  
✅ Testes de Contrato  
✅ Boas práticas de código e estrutura de projeto  
✅ Integração com Pipeline CI/CD (GitHub Actions)  
✅ Relatórios de execução  


---

## 🚀 Tecnologias

- **Node.js 18+**
- **npm**
- **PactumJS** – Framework de testes de API  
- **Joi** – Validação de contrato  
- **Mochawesome** – Relatórios HTML interativos  
- **GitHub Actions** – Integração contínua (CI/CD)

---

## 📂 Estrutura do Projeto
qa-automationexercise-api-pactumjs/
```bash
├── test/
│   ├── api/           # Testes funcionais
│   ├── contrato/      # Testes de contrato (Joi)
│
├── helpers/           # Setup, tokens e dados dinâmicos
├── schemas/           # Schemas Joi
├── pactum.config.js   # Configurações do PactumJS
├── package.json       # Dependências e scripts
└── .github/
    └── workflows/
        └── ci.yml     # Pipeline do GitHub Actions
        
```

## ⚙️ Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/ricardo-zip/qa.automationexercise-api.pactumjs
cd qa.automationexercise-api.pactumjs
```

2. **Instale as dependências:**
```
npm install
```
```bash
✅ Executar todos os testes Funcionais + Contrato:
npm test
```
```bash
✅ Executar e gerar relatório Mochawesome:
npm run test:report
```

```bash
## 📊 Relatórios
Os relatórios **Mochawesome** são gerados automaticamente após a execução dos testes:
👉 O relatório será salvo em:
mochawesome-report/mochawesome.html

---

## 🧪 Scripts

| Comando | Descrição |
|----------|------------|
| \`npm run test:functional\` | Executa os testes funcionais |
| \`npm run test:contract\` | Executa os testes de contrato |
| \`npm run test:all\` | Executa todos os testes |
| \`npm test\` | Alias para \`npm run test:all\` |

---

Para abrir o relatório:
npx mochawesome-report-generator mochawesome-report/mochawesome.json

---

## 🔄 Pipeline (CI)
A pipeline está configurada no **GitHub Actions** para:
1. Fazer checkout do código  
2. Instalar dependências  
3. Executar os testes (\`npm run test:all\`)  
4. Gerar e enviar o relatório como artefato  

---

Nota: Este projeto é apenas para fins de avaliação técnica.

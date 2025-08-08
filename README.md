# ServeRest UI Tests

Este projeto contém a automação de testes **End-to-End (E2E)** da aplicação **ServeRest**, utilizando o framework [Cypress](https://www.cypress.io/) para execução e [Page Objects](https://martinfowler.com/bliki/PageObject.html) para organização dos cenários.

## 📌 Visão geral

O objetivo deste repositório é fornecer uma suíte de testes confiável, escalável e de fácil manutenção, permitindo validar fluxos essenciais da aplicação ServeRest com rapidez e clareza.

A arquitetura foi planejada para:

- **Separar responsabilidades** (PageObjects, fixtures, comandos customizados, utilitários de API);
- **Facilitar a manutenção** ao isolar seletores e ações em classes de PageObject;
- **Otimizar a execução** utilizando comunicação direta com a API para preparar e manipular dados antes dos testes;
- **Utilizar fixtures** para dados mockados, reduzindo dependências de ambiente e aumentando a previsibilidade dos testes.

---

## 📂 Estrutura de pastas

serveRest-ui-tests/
├── cypress.config.js # Configuração principal do Cypress
├── package.json # Dependências e scripts do projeto
├── README.md # Documentação do projeto
└── cypress/
├── downloads/ # Downloads gerados durante a execução
├── e2e/ # Cenários de teste E2E
│ ├── login.cy.js
│ ├── purchase-product.cy.js
│ └── page-objects/ # Page Objects para organização de elementos e ações
│ ├── login.js
│ └── purchase-product.js
├── fixtures/ # Dados mockados para os testes
│ └── product.json
└── support/ # Suporte e utilitários do Cypress
├── api-helpers.js # Funções para comunicação com a API
├── commands.js # Comandos customizados do Cypress
└── e2e.js # Configuração global dos testes E2E

## 🏗 Arquitetura

O projeto adota o padrão **Page Objects**, encapsulando seletores e interações da interface em arquivos dedicados dentro de `cypress/e2e/page-objects/`. Isso garante:

- Centralização de seletores;
- Reuso de ações em diferentes testes;
- Redução de código duplicado.

Além disso:

- **Comunicação direta com a API** através do arquivo `api-helpers.js` para criar, limpar ou manipular dados necessários aos testes — acelerando a execução e evitando depender apenas da interface.
- **Fixtures** como `product.json` para armazenar dados mockados reutilizáveis.

## 🚀 Execução

### Instalar dependências

```bash
npm install
# ou
yarn install

npx cypress open

npx cypress run
```

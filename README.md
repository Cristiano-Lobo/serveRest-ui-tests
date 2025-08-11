# ServeRest UI Tests

Este projeto contém a automação de testes **End-to-End (E2E)** da aplicação **ServeRest**, utilizando o framework [Cypress](https://www.cypress.io/) para execução e [Page Objects] para organização dos cenários.

## 📌 Visão geral

O objetivo deste repositório é fornecer uma suíte de testes confiável, escalável e de fácil manutenção, permitindo validar fluxos essenciais da aplicação ServeRest com rapidez e clareza.

A arquitetura foi planejada para:

- **Separar responsabilidades** (PageObjects, fixtures, comandos customizados, utilitários de API);
- **Facilitar a manutenção** ao isolar seletores e ações em classes de PageObject;
- **Otimizar a execução** utilizando comunicação direta com a API para preparar e manipular dados antes dos testes;
- **Utilizar fixtures** para dados mockados, reduzindo dependências de ambiente e aumentando a previsibilidade dos testes.

---

## 📂 Estrutura de pastas

```bash
serveRest-ui-tests/
├── cypress.config.js # Configuração principal do Cypress
├── package.json # Dependências e scripts do projeto
├── README.md # Documentação do projeto
├── cypress.env.example.json # Modelo das variáveis de ambiente
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
```

## 🏗 Arquitetura

O projeto adota o padrão **Page Objects**, encapsulando seletores e interações da interface em arquivos dedicados dentro de `cypress/e2e/page-objects/`. Isso garante:

- Centralização de seletores;
- Reuso de ações em diferentes testes;
- Redução de código duplicado.

Além disso:

- **Comunicação direta com a API** através do arquivo `api-helpers.js` para criar, limpar ou manipular dados necessários aos testes — acelerando a execução e evitando depender apenas da interface.
- **Fixtures** como `product.json` para armazenar dados mockados reutilizáveis.

## 🔐 Variáveis de ambiente

O projeto utiliza variáveis de ambiente para armazenar informações sensíveis, como credenciais de teste.

O arquivo cypress.env.example.json é versionado e serve como modelo para indicar quais variáveis são necessárias para executar os testes.

O arquivo cypress.env.json não deve ser versionado (ele deve estar no .gitignore) e conterá os valores reais utilizados localmente ou no CI.

Exemplo (cypress.env.example.json)

```bash
{
  "API_BASE": "https://serverest.dev",
  "API_PASSWORD": "coloque_sua_senha_aqui"
}
```

## 🚀 Execução

### Instalar dependências

```bash
npm install
# ou
yarn install

```

### Execução no modo (GUI) ou headless

```
#Executar os testes em modo interface (GUI):
npx cypress open

#Executar os testes em modo headless:
npx cypress run
```

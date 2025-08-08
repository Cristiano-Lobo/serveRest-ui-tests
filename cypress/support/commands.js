// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { createUser, loginAndGetToken } from './api-helpers'

// Cria usuário e injeta USERNAME/PASSWORD no env
Cypress.Commands.add('provisionUser', (opts = { admin: true, alias: 'DEFAULT' }) => {
  const { admin = true, alias = 'DEFAULT' } = opts

  return createUser({ admin }).then(({ email, password, id }) => {
    // guarda credenciais para testes de UI
    Cypress.env(`${alias}_USERNAME`, email)
    Cypress.env(`${alias}_PASSWORD`, password)
    Cypress.env(`${alias}_USER_ID`, id)
    return { email, password, id }
  })
})

// Faz login e guarda token sob um alias (permite “diferenciar” tokens)
Cypress.Commands.add('getToken', (alias = 'DEFAULT') => {
  const email = Cypress.env(`${alias}_USERNAME`)
  const password = Cypress.env(`${alias}_PASSWORD`)
  expect(email, `env ${alias}_USERNAME`).to.be.a('string').and.not.be.empty
  expect(password, `env ${alias}_PASSWORD`).to.be.a('string').and.not.be.empty

  return loginAndGetToken({ email, password }).then(({ token }) => {
    Cypress.env(`${alias}_TOKEN`, token)
    return token
  })
})

Cypress.Commands.add('loginUI', (email, password) => {
  expect(email, 'email').to.be.a('string').and.not.be.empty;
  expect(password, 'password').to.be.a('string').and.not.be.empty;

  cy.visit('/login'); // baseUrl do front
  cy.get('input[data-testid="email"]').should('be.visible').clear().type(email);
  cy.get('input[data-testid="senha"]').clear().type(password);
  cy.get('button[data-testid="entrar"]').click();
  cy.contains('Serverest Store', { timeout: 15000 }).should('be.visible');
});


Cypress.Commands.add('loginUIOnce', (email, password) => {
  cy.session([email, password], () => {
    cy.loginUI(email, password);
  }, { cacheAcrossSpecs: true });
});
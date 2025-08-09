import { createUser, loginAndGetToken } from './api-helpers';

Cypress.Commands.add('provisionUser', ({ admin = true, alias = 'DEFAULT' } = {}) => {
  return createUser({ admin }).then(({ email, password, id }) => {
    Cypress.env(`${alias}_USERNAME`, email);
    Cypress.env(`${alias}_PASSWORD`, password);
    Cypress.env(`${alias}_USER_ID`, id);
    return { email, password, id };
  });
});

Cypress.Commands.add('getToken', (alias = 'DEFAULT') => {
  const email = Cypress.env(`${alias}_USERNAME`);
  const password = Cypress.env(`${alias}_PASSWORD`);

  return loginAndGetToken({ email, password }).then(({ token }) => {
    Cypress.env(`${alias}_TOKEN`, token);
    Cypress.env('DEFAULT_TOKEN', token); // token padrão para api-helpers
    return token;
  });
});

Cypress.Commands.add('loginUI', (email, password) => {
  cy.visit('/login');
  cy.get('input[data-testid="email"]').clear().type(email);
  cy.get('input[data-testid="senha"]').clear().type(password);
  cy.get('button[data-testid="entrar"]').click();
  cy.contains('Serverest Store', { timeout: 15000 }).should('be.visible');
});

// Login pela interface usando cache de sessão
Cypress.Commands.add('loginUIOnce', (email, password) => {
  cy.session([email, password], () => {
    cy.loginUI(email, password);
  }, { cacheAcrossSpecs: true });
});

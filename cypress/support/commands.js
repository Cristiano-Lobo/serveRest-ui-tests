import { createUser, loginUser } from './api-helpers';

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
  expect(email, `${alias}_USERNAME`).to.be.a('string').and.not.be.empty;
  expect(password, `${alias}_PASSWORD`).to.be.a('string').and.not.be.empty;

  return loginUser({ email, password }).then(({ token }) => {
    Cypress.env(`${alias}_TOKEN`, token);
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

Cypress.Commands.add('loginUIOnce', (email, password) => {
  cy.session([email, password], () => {
    cy.loginUI(email, password);
  }, { cacheAcrossSpecs: true });
});

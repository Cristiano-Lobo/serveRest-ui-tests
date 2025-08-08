import { login as loginPage } from '../e2e/page-objects/login'

describe('Login scenarios', () => {

  before(() => {
    // Cria usuário admin e guarda credenciais no env (USERNAME/PASSWORD “DEFAULT”)
    cy.provisionUser({ admin: true, alias: 'DEFAULT' })
  })

  it('Logs in successfully', () => {
    loginPage.visit()
    loginPage.fillFormAndSubmit(
      Cypress.env('DEFAULT_USERNAME'),
      Cypress.env('DEFAULT_PASSWORD')
    )
    cy.contains('QA Serverest', { timeout: 20000 }).should('be.visible');
  })

  it('Incorrect password login attempt', () => {
    loginPage.visit()
    loginPage.fillFormAndSubmit(
      Cypress.env('DEFAULT_USERNAME'),
      'Lobo@'
    )
    cy.contains('Email e/ou senha inválidos', { timeout: 20000 }).should('be.visible');
  })
  it('Incorrect username login attempt', () => {
    loginPage.visit()
    loginPage.fillFormAndSubmit(
      'xxxx@uorak.com',
      Cypress.env('DEFAULT_PASSWORD')
    )
    cy.contains('Email e/ou senha inválidos', { timeout: 20000 }).should('be.visible');
  })

})
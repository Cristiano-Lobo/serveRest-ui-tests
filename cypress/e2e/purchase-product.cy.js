// cypress/e2e/purchase-product.cy.js
import product from '../fixtures/product.json';
import { purchasePage } from './page-objects/purchase-product';

describe('Purchasing product', () => {
  before(() => {
    // garante usuário válido sempre
    cy.provisionUser({ alias: 'BUYER', admin: false });
  });

  beforeEach(() => {
    cy.loginUIOnce(Cypress.env('BUYER_USERNAME'), Cypress.env('BUYER_PASSWORD'));
    cy.visit('/home');
  });

  it('Add product to shopping list', () => {
    purchasePage.searchProducts(product.nome);
    purchasePage.addProductToList(product.nome);
    cy.contains(product.nome).should('be.visible');
    cy.contains('Lista de Compras').should('be.visible');
  });
});

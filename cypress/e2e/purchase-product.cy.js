// cypress/e2e/purchase-product.cy.js
import product from '../fixtures/product.json';
import { purchasePage } from './page-objects/purchase-product'; // mantém seus POs de tela

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
    purchasePage.searchProducts(product.name);
    purchasePage.addProductToList(product.name);
    cy.contains(product.name).should('be.visible');
  });
});

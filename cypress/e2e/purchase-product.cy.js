// cypress/e2e/purchase-product.cy.js
import { purchasePage } from './page-objects/purchase-product';
import { createProductWithAdmin, createUser, deleteProduct } from '../support/api-helpers';

describe('Purchasing product', () => {
  let productName;
  let adminToken;
  let productId;

  before(() => {
    createProductWithAdmin('product').then(({ id, nome, token }) => {
      productId = id;
      productName = nome;
      adminToken = token;
    });

    return createUser({ admin: false }).then(({ email, password }) => {
      Cypress.env('BUYER_USERNAME', email);
      Cypress.env('BUYER_PASSWORD', password);
    });
  });

  beforeEach(() => {
    cy.loginUIOnce(Cypress.env('BUYER_USERNAME'), Cypress.env('BUYER_PASSWORD'));
    cy.visit('/home');
  });

  it('Add product to shopping list', () => {
    purchasePage.searchProducts(productName);
    purchasePage.addProductToList(productName);
    cy.contains(productName).should('be.visible');
    cy.contains('Lista de Compras').should('be.visible');
  });

  after(() => {
    if (productId) {
      deleteProduct(productId, adminToken);
    }
  });
});

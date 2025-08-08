export const purchasePage = {

    visit() {
        cy.visit('/home')
    },

    searchProducts(productName) {
        cy.get('input[data-testid="pesquisar"]')
            .clear()
            .type(productName)
        cy.get('button[data-testid="botaoPesquisar"]').click()
    },

    addProductToList(productName) {
        cy.get('button[data-testid="adicionarNaLista"]').click()
    }
}





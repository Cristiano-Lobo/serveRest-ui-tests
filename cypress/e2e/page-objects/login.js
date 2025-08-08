export const login = {

    visit() {
        cy.visit('/')
    },

    fillFormAndSubmit(
        username = Cypress.env('USERNAME'),
        password = Cypress.env('PASSWORD')
    ) {

        cy.get('input[data-testid="email"]').type(username)
        cy.get('input[data-testid="senha"]').type(password)
        cy.get('button[data-testid="entrar"]').click()   
    }
}
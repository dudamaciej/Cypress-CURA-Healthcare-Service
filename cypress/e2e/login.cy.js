describe('Login', () => {

    beforeEach(() => {
        cy.visit('/profile.php')
    })

    it('verifies demo account credentials', () => {
        cy.get('.alert-info').contains('Demo account').should('be.visible')      
    })

    it('verifies correct login attempt', () => {
        cy.fixture('demo_account').then((user) => {
           cy.login(user.username,user.password)
        })
        cy.url().should('include','#appointment')
        cy.logout()
    })
    
    it('verifies incorrect login attempt', () => {      
        cy.login("test","password")
        cy.contains('Login failed! Please ensure the username and password are valid.').should('be.visible')      
    })
})

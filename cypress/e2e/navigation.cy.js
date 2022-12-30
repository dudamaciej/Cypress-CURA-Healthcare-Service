describe('Navigation', () => {

    beforeEach(() => {
        cy.visit('/');
    })

    it('verifies navigation toggle', () => {
        cy.get('#menu-toggle').click()
        cy.get('#sidebar-wrapper').should('have.class', 'active')
        cy.get('#menu-toggle').click()
        cy.get('#sidebar-wrapper').should('not.have.class', 'active')
    })

    it('verifies navigation without logging', () => {
        cy.fixture('nav_options').then((menuOptions) => {
            cy.verifyNavigationOptions(menuOptions.anonymusUserOptions)
        })
    })

    it('verifies navigation after logging', () => {
        cy.visit('/profile.php')
        cy.fixture('demo_account').then((user) => {
            cy.login(user.username, user.password)
        })
        cy.fixture('nav_options').then((menuOptions) => {
            cy.verifyNavigationOptions(menuOptions.loggedUserOptions)
        })

    })
})
describe('History', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('#btn-make-appointment').click();
        cy.fixture('demo_account').then((user) => {
            cy.login(user.username, user.password)
        })
    })

    it('verifies empty history', () => {
        cy.visit('/history.php')
        cy.get('#history').should('be.visible').then((history) => {
            cy.get(history).find('h2').should('have.text', 'History')
            cy.get(history).contains('No appointment.')
            cy.get(history).find('a').should("have.attr", "href", "https://katalon-demo-cura.herokuapp.com/").and('have.text', 'Go to Homepage');
        })
    })

    it('verifies history after appointment', () => {
        cy.fixture('appointments').then((appointment) => {
            const testCaseNumber = Cypress._.random(appointment.length - 1)
            cy.makeAppointment(appointment[testCaseNumber], "string")
            cy.visit("/history.php")
            cy.verifyHistory(appointment[testCaseNumber])
        })
    })

    afterEach(() => {
        cy.logout()
    })
})
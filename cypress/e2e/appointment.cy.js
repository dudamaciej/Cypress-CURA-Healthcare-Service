describe('Appointment', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('verifies appointment form', () => {
        cy.get('#btn-make-appointment').click()
        cy.fixture('demo_account').then((user) => {
            cy.login(user.username,user.password)
        })  
        cy.get('#appointment').should('be.visible').then((form)=>{
            cy.get(form).find('#combo_facility').find('option').should('have.length', 3)
            cy.get(form).find('#chk_hospotal_readmission').should('be.visible')
            cy.get(form).find('.col-sm-4').find('input[name=programs]').should('have.length', 3)
            cy.get(form).find('.date').should('be.visible')
            cy.get(form).find('#txt_comment').should('be.visible')
            cy.get(form).find('#btn-book-appointment').should('be.visible')
        })        
    })
})
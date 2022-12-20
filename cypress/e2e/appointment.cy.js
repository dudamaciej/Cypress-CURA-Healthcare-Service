describe('Appointment', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('#btn-make-appointment').click();
        cy.fixture('demo_account').then((user) => {
            cy.login(user.username,user.password)
        })  
    })

    it('verifies appointment form', () => {
        cy.get('#appointment').should('be.visible').then((form)=>{
            cy.get(form).find('#combo_facility').find('option').should('have.length', 3)
            cy.get(form).find('#chk_hospotal_readmission').should('be.visible')
            cy.get(form).find('.col-sm-4').find('input[name=programs]').should('have.length', 3)
            cy.get(form).find('.date').should('be.visible')
            cy.get(form).find('#txt_comment').should('be.visible')
            cy.get(form).find('#btn-book-appointment').should('be.visible')
        })        
    })

    it('makes appointment by date picker', () => {
        cy.fixture('appointments').then((appointment) => {   
            const testCaseNumber = Cypress._.random(appointment.length - 1)
            cy.makeAppointment(appointment[testCaseNumber],"picker")
            cy.verifyConfirmation(appointment[testCaseNumber].facility,appointment[testCaseNumber].hospitalReadmission,appointment[testCaseNumber].healtcareProgram,appointment[testCaseNumber].visitDate,appointment[testCaseNumber].comment)
        })    
    })

    it('makes appointment by date string', () => {
        cy.fixture('appointments').then((appointment) => {   
            const testCaseNumber = Cypress._.random(appointment.length - 1)
            cy.makeAppointment(appointment[testCaseNumber],"string")
            cy.verifyConfirmation(appointment[testCaseNumber].facility,appointment[testCaseNumber].hospitalReadmission,appointment[testCaseNumber].healtcareProgram,appointment[testCaseNumber].visitDate,appointment[testCaseNumber].comment)
        })    
    })

    afterEach(() => {
        cy.logout()
    })
})
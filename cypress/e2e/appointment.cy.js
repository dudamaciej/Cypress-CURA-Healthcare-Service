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

    it.only('makes appointment by date picker', () => {
        cy.fixture('appointments').then((appointment) => {   
            cy.facilityPick(appointment.facility)
            cy.applyHospitalReadmission(appointment.hospitalReadmission)
            cy.chooseHealthProgram(appointment.healtcareProgram)
            cy.readDate(appointment.visitDate).then(dateObj =>{
            let day = dateObj.day
            let month = dateObj.month
            let year = dateObj.year
            cy.insertDate(day,month,year)
            })  
            cy.addComment(appointment.comment)
            cy.submitAppointment()
            cy.verifyConfirmation(appointment.facility,appointment.hospitalReadmission,appointment.healtcareProgram,appointment.visitDate,appointment.comment)
        })    
    })

    afterEach(() => {
        cy.logout()
    })
})
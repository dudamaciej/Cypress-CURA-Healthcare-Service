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
    it('makes appointment', () => {
       
        cy.facilityPick('Hongkong CURA Healthcare Center')
        cy.applyCheck('N')
        cy.chooseHealthProgram('None')
        cy.readDate('10/07/1999').then(dateObj =>{
           var day = dateObj.day
           var month = dateObj.month
           var year = dateObj.year
           cy.log(day,month,year)
        })
    
          
    })

    afterEach(() => {
        cy.logout()
    })
})
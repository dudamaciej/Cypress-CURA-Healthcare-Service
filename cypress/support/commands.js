// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.get('input[id="txt-username"]').type(username)
    cy.get('input[id="txt-password"]').type(password)
    cy.get('#btn-login').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('#menu-toggle').click()
    cy.get('a[href="authenticate.php?logout"]').click()
})

Cypress.Commands.add('facilityPick', (facility) => {
    cy.get('#combo_facility').select(facility)
})

Cypress.Commands.add('applyHospitalReadmission', (check) => {
    if(check == "Yes" ){
        cy.get('#chk_hospotal_readmission').check()
    }else if(check == "No" ){
        cy.get('#chk_hospotal_readmission').uncheck()
    }
})

Cypress.Commands.add('chooseHealthProgram', (program) => {
    cy.get('#appointment').find('.col-sm-4').find('input[name=programs]').check(program)
})

Cypress.Commands.add('readDate', (date) => {
    const dateBox = date.split('/') 
    var dateObj ={
        day: dateBox[0].toString(),
        month: dateBox[1].toString(),
        year:dateBox[2].toString()
    }
    return dateObj
})

Cypress.Commands.add('insertFullDateByText', (date) => {
    cy.get('.date').type(date + '{esc}')
})

Cypress.Commands.add('insertYear', (year) => {
    cy.get('.date').click()
    cy.get('.datepicker-days').find('.datepicker-switch').click()  
    year = parseInt(year)
   
    cy.get('.datepicker-months').find('.datepicker-switch').then( text =>{
        let activeYear = parseInt(text.text())   
        const whileLoop = (wantedYear,actYear) =>{
            if(wantedYear == actYear){
                return
            }
            if( wantedYear < actYear) {
                cy.get('.datepicker-months').find('.prev').click()
                actYear --
            }
            if( wantedYear > actYear ) {
                cy.get('.datepicker-months').find('.next').click()
                actYear ++
            }
            whileLoop(wantedYear,actYear);
        }
        if(activeYear != year)
        {
            whileLoop(year,activeYear)
        }
    })
})

Cypress.Commands.add('insertMonth', (month) => {
    cy.get('.month').eq(month-1).click()
})

Cypress.Commands.add('insertDay', (day) => {
    cy.get('.day').not('.old').not('.new').each((element) =>{
        if(element.text()== day){
            element.click()
            return
        }
    })
})

Cypress.Commands.add('insertDate', (day,month,year) => {
    cy.insertYear(year)
    cy.insertMonth(month)
    cy.insertDay(day)
    cy.get('.date').type('{esc}')
})

Cypress.Commands.add('addComment', (comment) => {
    if(comment.length != 0){
        cy.get('#txt_comment').type(comment)
    }
})

Cypress.Commands.add('submitAppointment', () => {
    cy.get('#btn-book-appointment').click()
    cy.location('href').should('include', '#summary')
    cy.get('#summary').find('h2').should('have.text','Appointment Confirmation');
})

Cypress.Commands.add('verifyConfirmation', (facility, hospital_readmission, program, date, comment) => {
    cy.get('#summary').should('be.visible').then( () => {
        cy.get('#facility').should('have.text',facility)
        cy.get('#hospital_readmission').should('have.text',hospital_readmission)
        cy.get('#program').should('have.text',program)
        cy.get('#visit_date').should('have.text',date)
        cy.get('#comment').should('have.text',comment)
    }) 
})


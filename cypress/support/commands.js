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

Cypress.Commands.add('applyCheck', (check) => {
    if(check == "Y" ){
        cy.get('#chk_hospotal_readmission').check()
    }else if(check == "N" ){
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



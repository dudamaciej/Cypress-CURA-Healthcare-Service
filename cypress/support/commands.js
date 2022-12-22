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
    if (check == "Yes") {
        cy.get('#chk_hospotal_readmission').check()
    } else if (check == "No") {
        cy.get('#chk_hospotal_readmission').uncheck()
    }
})

Cypress.Commands.add('chooseHealthProgram', (program) => {
    cy.get('#appointment').find('.col-sm-4').find('input[name=programs]').check(program)
})

Cypress.Commands.add('readDate', (date) => {
    const dateBox = date.split('/')
    const dateObj = {
        day: dateBox[0].toString(),
        month: dateBox[1].toString(),
        year: dateBox[2].toString()
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

    cy.get('.datepicker-months').find('.datepicker-switch').then(text => {
        let activeYear = parseInt(text.text())
        const whileLoop = (wantedYear, actYear) => {
            if (wantedYear == actYear) {
                return
            }
            if (wantedYear < actYear) {
                cy.get('.datepicker-months').find('.prev').click()
                actYear--
            }
            if (wantedYear > actYear) {
                cy.get('.datepicker-months').find('.next').click()
                actYear++
            }
            whileLoop(wantedYear, actYear);
        }
        if (activeYear != year) {
            whileLoop(year, activeYear)
        }
    })
})

Cypress.Commands.add('insertMonth', (month) => {
    cy.get('.month').eq(month - 1).click()
})

Cypress.Commands.add('insertDay', (day) => {
    cy.get('.day').not('.old').not('.new').each((element) => {
        if (element.text() == day) {
            element.click()
            return
        }
    })
})

Cypress.Commands.add('insertDate', (date) => {
    cy.readDate(date).then(dateObj => {
        const day = dateObj.day
        const month = dateObj.month
        const year = dateObj.year
        cy.insertYear(year)
        cy.insertMonth(month)
        cy.insertDay(day)
    })
    cy.get('.date').type('{esc}')
})

Cypress.Commands.add('addComment', (comment) => {
    if (comment.length != 0) {
        cy.get('#txt_comment').type(comment)
    }
})

Cypress.Commands.add('submitAppointment', () => {
    cy.get('#btn-book-appointment').click()
    cy.location('href').should('include', '#summary')
    cy.get('#summary').find('h2').should('have.text', 'Appointment Confirmation');
})

Cypress.Commands.add('makeAppointment', (data, type) => {
    cy.facilityPick(data.facility)
    cy.applyHospitalReadmission(data.hospitalReadmission)
    cy.chooseHealthProgram(data.healtcareProgram)
    if (type == "string") {
        cy.insertFullDateByText(data.visitDate)
    } else if (type == "picker") {
        cy.insertDate(data.visitDate)
    }
    cy.addComment(data.comment)
    cy.submitAppointment()
})

Cypress.Commands.add('verifyConfirmation', (appointment) => {
    cy.get('#summary').should('be.visible').then(() => {
        cy.get('#facility').should('have.text', appointment.facility)
        cy.get('#hospital_readmission').should('have.text', appointment.hospitalReadmission)
        cy.get('#program').should('have.text', appointment.healtcareProgram)
        cy.get('#visit_date').should('have.text', appointment.visitDate)
        cy.get('#comment').should('have.text', appointment.comment)
    })
})

Cypress.Commands.add('verifyHistory', (appointment) => {
    cy.get('.panel-info').should('be.visible').then((historyPanel) => {
        cy.get(historyPanel).find('.panel-heading').should('have.text', appointment.visitDate)
        cy.get(historyPanel).find('#facility').should('have.text', appointment.facility)
        cy.get(historyPanel).find('#hospital_readmission').should('have.text', appointment.hospitalReadmission)
        cy.get(historyPanel).find('#program').should('have.text', appointment.healtcareProgram)
        cy.get(historyPanel).find('#comment').should('have.text', appointment.comment)
    })
})

# Cypress CURA Healthcare Service

This repo contains e2e tests written in Cypress for https://katalon-demo-cura.herokuapp.com/ site.

## Installation

It is assumed you have nothing installed except for node + git.

### 1. Install Cypress
[Follow these instructions to install Cypress.](https://on.cypress.io/installing-cypress)

### 2. Clone this repo
  ```bash
    ## clone this repo to a local directory
    git clone https://github.com/dudamaciej/Cypress-healthcare.git

    ## install the node_modules
    npm i

    ## start the cypress
    npx cypress open
  ```
  The `npx cypress open` script will open Cypress window.

## Tests repository

Element | Test cases | Description
| :- | :- | :-
[login.cy.js](https://github.com/dudamaciej/Cypress-healthcare/blob/master/cypress/e2e/login.cy.js)  | - verifies demo account credentials </br>- verifies correct login attempt </br>- verifies incorrect login attempt  | Tests verify the login page. 
[navigation.cy.js](https://github.com/dudamaciej/Cypress-healthcare/blob/master/cypress/e2e/navigation.cy.js)  | - verifies navigation toggle</br>- verifies navigation without logging </br>- verifies navigation after logging | Tests verify navigation options.
[footer.cy.js](https://github.com/dudamaciej/Cypress-healthcare/blob/master/cypress/e2e/footer.cy.js)  | - verifies footer elements |Tests verify footer elements. 
[appointment.cy.js](https://github.com/dudamaciej/Cypress-healthcare/blob/master/cypress/e2e/appointment.cy.js)  | - verifies appointment form </br>- makes appointment by date picker </br>- makes appointment by date string | Tests verify the process of making an appointment. Test data is randomly selected from `fixtures/appointments.json`. You can add new test data there. 
[history.cy.js](https://github.com/dudamaciej/Cypress-healthcare/blob/master/cypress/e2e/history.cy.js) |  - verifies empty history </br>- verifies history after appointment | Tests verify history page content before and after making appointment.

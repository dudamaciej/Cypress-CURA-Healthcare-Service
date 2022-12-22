describe('Navigation', () => {
   
    beforeEach(() => {
        cy.visit('/');
    })

    it('verifies navigation toggle', () => {
        cy.get('#menu-toggle').click()
        cy.get('#sidebar-wrapper').should('have.class','active')
        cy.get('#menu-toggle').click()
        cy.get('#sidebar-wrapper').should('not.have.class','active')
    })

    it('verifies navigation without log in', () => {
        cy.fixture('nav_options').then((menuOptions) => {
            cy.get('#menu-toggle').click()
			cy.get('ul[class="sidebar-nav"]').find('li').should('have.length',menuOptions.anonymusUserOptions.length)
			menuOptions.anonymusUserOptions.forEach((option) => {
				cy.get('ul[class="sidebar-nav"]').find('li').should('contain',option)
			})
		})
    })

    it('verifies navigation after log in', () => {
        cy.visit('/profile.php')
        cy.fixture('demo_account').then((user) => {
            cy.login(user.username,user.password)
        })
        cy.fixture('nav_options').then((menuOptions) => {
            cy.get('#menu-toggle').click()
			cy.get('ul[class="sidebar-nav"]').find('li').should('have.length',menuOptions.loggedUserOptions.length)
			menuOptions.loggedUserOptions.forEach((option) => {
				cy.get('ul[class="sidebar-nav"]').find('li').should('contain',option)
			})
		})
       
    })
})
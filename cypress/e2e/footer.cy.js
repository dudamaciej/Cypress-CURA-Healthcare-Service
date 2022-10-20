describe('Footer', () => {
    it('verifies footer elements', () => {
        cy.visit('/')
        cy.get('footer').should('be.visible').then((footer)=>{
            expect(footer).to.contain('CURA Healthcare Service')
            expect(footer).to.contain('Atlanta 550 Pharr Road NE Suite 525')
            expect(footer).to.contain('Atlanta, GA 30305')
            expect(footer).to.contain('Copyright © CURA Healthcare Service 2022')
            cy.get(footer).find('ul[class="list-unstyled"]').find('li').should('have.length', 2)
            cy.get(footer).find('ul[class="list-inline"]').find('li').should('have.length', 3)
        }) 
    })
})
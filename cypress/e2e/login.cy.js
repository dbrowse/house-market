describe('Open the main page', () => {
  it('should render the sign up page', () => {
    cy.visit('http://localhost:3000')

      .get('p').contains('Explore')
      .should('be.visible')
  })
})
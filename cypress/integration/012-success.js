describe('Success page directly', () => {
  it('should prevent access with a custom error message', () => {
    cy.visit('/success', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'Meat Bait Return complete');
  });
});

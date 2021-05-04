describe('no target species page directly', () => {
  it('should prevent access', () => {
    cy.visit('/no-target-species-success', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'Meat Bait Return complete');
  });
});

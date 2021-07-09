describe('no target species page directly', function () {
  it('should prevent access', function () {
    cy.visit('/no-target-species-success', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'Meat Bait Return complete');
  });
});

describe('Start page', function () {
  it('should be accessible', function () {
    cy.visit('/start');
    cy.injectAxe();
    cy.checkA11y();
  });
});

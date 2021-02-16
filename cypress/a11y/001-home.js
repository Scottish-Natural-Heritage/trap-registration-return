describe('Home page', function () {
  it('should be accessible', function () {
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y();
  });
});

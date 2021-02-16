describe('usage page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');
    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/usage`~
  });

  it('should be accessible', function () {
    cy.visit('/usage');
    cy.injectAxe();
    cy.checkA11y();
  });
});

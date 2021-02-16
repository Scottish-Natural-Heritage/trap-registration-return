describe('no usage page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');
    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/usage`~
    // Click no
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    // POST `/usage`
    cy.get('#main-content form button.naturescot-forward-button').click();
  });

  it('should be accessible', function () {
    cy.visit('/no-usage');
    cy.injectAxe();
    cy.checkA11y();
  });
});

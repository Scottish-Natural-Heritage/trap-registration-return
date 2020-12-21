describe('no usage page directly', function () {
  it('should prevent access', function () {
    cy.visit('/no-usage', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

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

  it('should allow access if the user visits all the pages in order', function () {
    // GET `/no-usage`
    cy.visit('/no-usage');
    // POST `/start`
    cy.get('h1').should('contain', 'Trap Return complete');
  });
});

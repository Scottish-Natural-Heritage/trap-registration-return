describe('Trap Registration Number page directly', function () {
  it('should prevent access', function () {
    cy.visit('/trap-registration-number', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Trap Registration Number page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');

    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/usage`~
    // POST `/usage`
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/trap-registration-number`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/trap-registration-number');
    cy.get('h1').should('contain', 'Trap Registration Number');
  });

  it('main button should navigate to postcode', function () {
    cy.visit('/trap-registration-number');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/postcode');
  });
});

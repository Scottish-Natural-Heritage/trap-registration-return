describe('Postcode page directly', function () {
  it('should prevent access', function () {
    cy.visit('/postcode', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Postcode page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');

    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/usage`~
    // POST `/usage`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/trap-registration-number`~
    // POST `/trap-registration-number`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/postcode`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/postcode');
    cy.get('h1').should('contain', 'Enter the postcode you used when completing your trap registration');
  });

  it('main button should navigate to verification success', function () {
    cy.visit('/postcode');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/verification-success');
  });
});

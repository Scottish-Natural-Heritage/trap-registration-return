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
    cy.get('h1').should('contain', 'What is your trap registration number?');
  });

  it('Valid input followed by continue button should navigate to postcode', function () {
    cy.visit('/trap-registration-number');
    cy.get('input').type('12345');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/postcode');
  });

  it('Valid input followed by continue button should navigate to postcode', function () {
    cy.visit('/trap-registration-number');
    cy.get('input').type('     12345     ');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/postcode');
  });

  it('Empty input followed by continue button should present an error and ask user to re-enter', function () {
    cy.visit('/trap-registration-number');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/trap-registration-number');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#registration-number-error').should('contain', 'Enter your trap registration number');
  });

  it('Whitespace input followed by continue button should present an error and ask user to re-enter', function () {
    cy.visit('/trap-registration-number');
    cy.get('input').type('     ');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/trap-registration-number');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#registration-number-error').should('contain', 'Enter your trap registration number');
  });

  it('Invalid input followed by continue button should present an error and ask user to re-enter', function () {
    cy.visit('/trap-registration-number');
    cy.get('input').type('123456');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/trap-registration-number');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#registration-number-error').should('contain', 'Enter your trap registration number');
  });

  it('Invalid input followed by continue button should present an error and ask user to re-enter', function () {
    cy.visit('/trap-registration-number');
    cy.get('input').type('abcde');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/trap-registration-number');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#registration-number-error').should('contain', 'Enter your trap registration number');
  });
});

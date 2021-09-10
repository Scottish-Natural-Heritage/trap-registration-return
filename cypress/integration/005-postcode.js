describe('Postcode page directly', () => {
  it('should prevent access', () => {
    cy.visit('/postcode', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Postcode page ', () => {
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
    cy.get('input').type('12345');
    // POST `/trap-registration-number`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/postcode`~
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/postcode');
    cy.get('h1').should('contain', 'What is your postcode?');
  });

  it('Valid input followed by continue button should navigate to postcode', () => {
    cy.visit('/postcode');
    cy.get('input').type('IV3 8NW');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/verification-success');
  });

  it('Valid, but whitespace padded, input followed by continue button should navigate to postcode', () => {
    cy.visit('/postcode');
    cy.get('input').type('   IV3 8NW   ');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/verification-success');
  });

  it('Empty input followed by continue button should present error and ask user to reenter', () => {
    cy.visit('/postcode');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/postcode');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#postcode-error').should('contain', 'Enter your postcode');
  });

  it('Whitespace input followed by continue button should present error and ask user to reenter', () => {
    cy.visit('/postcode');
    cy.get('input').type('      ');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/postcode');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#postcode-error').should('contain', 'Enter your postcode');
  });

  it('Invalid input followed by continue button should present error and ask user to reenter', () => {
    cy.visit('/postcode');
    cy.get('input').type('123');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/postcode');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('#postcode-error').should('contain', 'Enter your postcode');
  });
});

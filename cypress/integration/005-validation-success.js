describe('Verification Success page directly', () => {
  it('should prevent access', () => {
    cy.visit('/postcode', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Verification Success page ', () => {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');

    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/trap-registration-number`~
    // POST `/trap-registration-number`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/postcode`~
    // POST `/postcode`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/verification-success`
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/verification-success');
    cy.get('p').should('contain', 'We have sent you an email');
  });
});

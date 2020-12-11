describe('usage page directly', function () {
  it('should prevent access', function () {
    cy.visit('/usage', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('usage page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');
    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/usage`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/usage');
    cy.get('h1').should('contain', 'Trap Usage');
  });

  it('main button should navigate to trap registration number', function () {
    cy.visit('/usage');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/trap-registration-number');
  });
});

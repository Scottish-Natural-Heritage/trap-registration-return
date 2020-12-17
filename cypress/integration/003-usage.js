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
    cy.get('h1').should('contain', 'Did you use meat bait traps?');
  });

  it('main button should navigate to trap registration number', function () {
    cy.visit('/usage');
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/trap-registration-number');
  });

  it('no button should navigate to trap no-usage page', function () {
    cy.visit('/usage');
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/no-usage');
  });

  it('no input should navigate to usage page', function () {
    cy.visit('/usage');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/usage');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('.govuk-error-summary ul li a').should('contain', 'You must select whether you used meat based traps or not');
  });


});

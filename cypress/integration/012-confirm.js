describe('confirm page directly', function () {
  it('should prevent access', function () {
    cy.visit('/confirm', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('confirm page ', function () {
  beforeEach(() => {
    // GET `/login`
    cy.visit('/login');
    // POST `/login`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/target-species`~
    // POST `/target-species`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/details-list`~
    // POST `/details-lis`
    cy.get('#main-content form button.continue').click();
    // ~GET `/confirm`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/confirm');
    cy.get('h1').should('contain', 'Confirm details of return');
  });

  it('main button should navigate to success page', function () {
    cy.visit('/confirm');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/success');
  });
});

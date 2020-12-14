describe('details list page directly', function () {
  it('should prevent access', function () {
    cy.visit('/details-edit', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('details edit page ', function () {
  beforeEach(() => {
    // GET `/login`
    cy.visit('/login');
    // POST `/login`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/target-species`~
    // POST `/target-species`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/details-list`~
    cy.get('#main-content form button.edit').click();
    // ~GET `/details-edit`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/details-edit');
    cy.get('h1').should('contain', 'Edit Details of non target species');
  });

  it('main button should navigate to details-list page', function () {
    cy.visit('/details-edit');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');
  });
});

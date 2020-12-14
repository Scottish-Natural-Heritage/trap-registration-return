describe('details list page directly', function () {
  it('should prevent access', function () {
    cy.visit('/details-add', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('details add page ', function () {
  beforeEach(() => {
    // GET `/login`
    cy.visit('/login');
    // POST `/login`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/target-species`~
    // POST `/target-species`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/details-list`~
    cy.get('#main-content form button.add').click();
    // ~GET `/details-add`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/details-add');
    cy.get('h1').should('contain', 'Add Details of non target species');
  });

  it('main button should navigate to details-list page', function () {
    cy.visit('/details-add');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');
  });
});

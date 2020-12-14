describe('details list page directly', function () {
  it('should prevent access', function () {
    cy.visit('/details-list', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('details list page ', function () {
  beforeEach(() => {
    // GET `/login`
    cy.visit('/login');
    // POST `/login`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/target-species`~
    // POST `/target-species`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/details-list`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/details-list');
    cy.get('h1').should('contain', 'Details of non target species');
  });

  it('add button should navigate to details-add page', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.add').click();
    cy.url().should('include', '/details-add');
  });

  it('edit button should navigate to details-edit page', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.edit').click();
    cy.url().should('include', '/details-edit');
  });

  it('main button should navigate to confirm page', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.continue').click();
    cy.url().should('include', '/confirm');
  });
});

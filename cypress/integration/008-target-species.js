describe('target species page directly', function () {
  it('should prevent access', function () {
    cy.visit('/target-species', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('target species page ', function () {
  beforeEach(() => {
    // GET `/login`
    cy.visit('/login');
    // POST `/login`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/target-species`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/target-species');
    cy.get('h1').should('contain', 'Did you catch any non target species?');
  });

  it('main button should navigate to trap details list page', function () {
    cy.visit('/target-species');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');
  });
});

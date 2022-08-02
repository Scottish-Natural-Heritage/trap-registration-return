describe('target species page directly', () => {
  it('should prevent access', () => {
    cy.visit('/target-species', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('target species page ', () => {
  beforeEach(() => {
    // GET `/login`
    cy.visit(
      '/login?token=' +
        'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjQ3Njc2NzQ1NTgsInN1YiI6Ii0xIn0.' +
        'XSHX6QB8robVaEuXVeHKbBed13uAdWvLBaNeGCYPAWWlw7Fm7bafXMPUQQE69TNc8DbjUgaRDxKvS2ju5uZziw'
    );
    // POST `/login`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/year`~
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/meat-baits-in-traps`~
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/how-many-traps-used`~
    cy.get('#main-content form button.naturescot-forward-button').click();
    // CLICK yes
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    // POST `/target-species`
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/target-species');
    cy.get('h1').should('contain', 'Did you catch any non-target species?');
  });

  it('main button should navigate to the same page with errors', () => {
    cy.visit('/target-species');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/target-species');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('.govuk-error-summary ul li a').should('contain', 'Select yes if you have caught any non-target species');
  });

  it('main button should navigate to details page', () => {
    cy.visit('/target-species');
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');
  });
});

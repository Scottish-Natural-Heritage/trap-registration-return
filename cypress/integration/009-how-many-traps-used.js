describe('how many traps used page directly', () => {
  it('should prevent access', () => {
    cy.visit('/how-many-traps-used', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('how-many-traps-used page ', () => {
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
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/how-many-traps-used`~
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/how-many-traps-used');
    cy.get('h1').should('contain', 'How many traps did you use meat baits in?');
  });

  it('main button should navigate to the same page with errors', () => {
    cy.visit('/how-many-traps-used');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/how-many-traps-used');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter amount of larsen mates, between 0-999');
    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter amount of larsen pods, between 0-999');
  });

  it('main button should navigate to target species page', () => {
    cy.visit('/how-many-traps-used');
    cy.get('input[type=text][name=numberLarsenPodCaught]').type('0');
    cy.get('input[type=text][name=numberLarsenMateCaught]').type('1');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/target-species');
    cy.get('h1').should('contain', 'Did you catch any non-target species?');
  });
});

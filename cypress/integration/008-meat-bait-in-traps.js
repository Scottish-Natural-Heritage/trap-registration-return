describe('meat bait in traps page directly', () => {
  it('should prevent access', () => {
    cy.visit('/meat-baits-in-traps', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('meat-baits-in-traps page ', () => {
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
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/year');
    cy.get('h1').should('contain', 'What year is your return for?');
  });

  it('main button should navigate to meat-baits-in-traps page', () => {
    cy.visit('/year');
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/meat-baits-in-traps`~
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/meat-baits-in-traps');
    cy.get('h1').should('contain', 'Did you use meat bait in your traps?');
  });

  it('main button should navigate to how many traps used page', () => {
    cy.visit('/meat-baits-in-traps');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/how-many-traps-used');
    cy.get('h1').should('contain', 'How many traps did you use meat baits in?');
  });
});

describe('check answers page directly', () => {
  it('should prevent access', () => {
    cy.visit('/check-answers', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('check-answers page ', () => {
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
    // ~GET `/check-answers`~
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/check-answers');
    cy.get('h1').should('contain', 'What year is your return for?');
  });

  it('main button should navigate to submitted a return page', () => {
    cy.visit('/check-answers');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/submitted-return-success');
    cy.get('h1').should('contain', 'You have submitted a return');
  });
});

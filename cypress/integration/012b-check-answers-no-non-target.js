describe('check-answers-no-non-target page directly', () => {
  it('should prevent access', () => {
    cy.visit('/check-answers-no-non-target', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('check-answers-no-non-target page ', () => {
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
    cy.get('input[type=text][name=numberLarsenPodCaught]').type('0');
    cy.get('input[type=text][name=numberLarsenMateCaught]').type('1');
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/target-species`~
    cy.get('#main-content form input[type="radio"][value="no"]').click();
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/check-answers-no-non-target');
    cy.get('h1').should('contain', 'Check your answers before sending (no non-target species)');
  });

  it('main button should navigate to submitted a return page', () => {
    cy.visit('/check-answers-no-non-target');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/submitted-return-success');
    cy.get('h1').should('contain', 'You have submitted a return');
  });
});

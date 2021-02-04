describe('no target species confirm page directly', function () {
  it('should prevent access', function () {
    cy.visit('/no-target-species-confirm', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('no target species confirm page ', function () {
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
    // ~GET `/target-species`~
    // CLICK no
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    // POST `/no-target-species-confirm`
    cy.get('#main-content form button.naturescot-forward-button').click();
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/no-target-species-confirm');
    cy.get('h1').should('contain', 'Confirm the details of return');
  });
});

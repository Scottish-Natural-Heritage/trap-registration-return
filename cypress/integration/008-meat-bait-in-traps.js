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
    cy.get('input').type('1913');
    cy.get('#main-content form button.naturescot-forward-button').click();
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/meat-baits-in-traps');
    cy.get('h1').should('contain', 'Did you use meat baits in your traps?');
  });

  it('if meat baits are not used main button should navigate to check answers page', () => {
    cy.visit('/meat-baits-in-traps');
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/check-answers-no-meat-baits');
  });

  it('if meat baits are used main button should navigate to how many traps used page', () => {
    cy.visit('/meat-baits-in-traps');
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/how-many-traps-used');
    cy.get('h1').should('contain', 'How many traps did you use meat baits in?');
  });

  it('should display error and reload page if no option chosen', () => {
    cy.visit('/meat-baits-in-traps');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('.govuk-error-summary__title').contains('problem', {matchCase: false});
    cy.get('.govuk-error-summary__body').contains('Select yes if you used meat baits in your traps', {
      matchCase: false
    });
    cy.url().should('include', '/meat-baits-in-traps');
    cy.get('h1').should('contain', 'Did you use meat baits in your traps?');
  });
});

describe('check-answers-non-target-species page directly', () => {
  it('should prevent access', () => {
    cy.visit('/check-answers-non-target-species', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('check-answers-non-target-species page ', () => {
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
    // ~GET `/meat-baits-in-traps`~
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/how-many-traps-used`~
    cy.get('input[type=text][name=numberLarsenPodCaught]').type('0');
    cy.get('input[type=text][name=numberLarsenMateCaught]').type('1');
    cy.get('#main-content form button.naturescot-forward-button').click();
    // CLICK yes
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    // POST `/target-species`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/details`~
    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('12', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});
    // POST `/details`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/details-list`~
    // POST `/details-list`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/check-answers`~
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/check-answers-non-target-species');
    cy.get('h1').should('contain', 'Check your answers before sending');
  });

  it('should navigate to success page if declaration confirmed', () => {
    cy.visit('/check-answers-non-target-species');
    cy.get('input[type=checkbox][name=confirm][value=confirm]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/submitted-return-success');
    cy.get('h1').should('contain', 'You have submitted a return');
  });

  it('should display error and reload page if declaration not confirmed', () => {
    cy.visit('/check-answers-non-target-species');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.get('.govuk-error-summary__title').contains('problem', {matchCase: false});
    cy.get('.govuk-error-summary__body').contains("You must confirm the information you've provided is up-to-date", {
      matchCase: false
    });
    cy.url().should('include', '/check-answers-non-target-species');
    cy.get('h1').should('contain', 'Check your answers before sending');
  });
});

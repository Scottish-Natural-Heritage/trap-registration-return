describe('details list page directly', function () {
  it('should prevent access', function () {
    cy.visit('/details-list', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('details list page ', function () {
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
    // CLICK yes
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    // POST `/target-species`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/details-list`~
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/details-list');
    cy.get('h1').should('contain', 'Details of non-target species');
  });

  it('add button should navigate to details-add page', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');
  });

  it('continue button should navigate to same page if nothing is added with errors', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');

    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('.govuk-error-summary ul li a').should('contain', 'Add at least one non-target species');
    cy.get('form .govuk-form-group--error').should('contain', 'Add at least one non-target species');
  });

  it('add button should navigate to add page enter empty form and see errors', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('.govuk-error-summary ul li a')
      .should('contain', 'Enter a grid reference')
      .and('contain', 'Select the type of non-target species caught')
      .and('contain', 'Enter the number of non-target species caught')
      .and('contain', 'Select the trap type that was used');
  });

  it('add button should navigate to add page enter a semi empty form (schedule1Birds) and see errors', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="schedule1Birds"]').click();
    cy.get('input[type="text"]#current-number-caught').type('12', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter the non-target species caught');
  });

  it('add button should navigate to add page enter a semi empty form (other species) and see errors', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-number-caught').type('12', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter the name of the non-target species caught');
  });

  it('add button should navigate to add page enter a semi empty form (other species) and see errors', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('0', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter the number of non-target species caught');
  });

  it('main button should navigate to confirm page', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('12', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/confirm');
  });
});

describe('details list page directly', function () {
  it('should prevent access', function () {
    cy.visit('/details-list', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('details list page ', function () {
  beforeEach(() => {
    // GET `/login`
    cy.visit('/login');
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
    cy.get('h1').should('contain', 'Details of non target species');
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
    cy.get('.govuk-error-summary ul li a').should('contain', 'Add at least one non target species');
    cy.get('form .govuk-form-group--error').should('contain', 'Add at least one non target species');
  });

  it('add button should navigate to add page enter empty form and see errors', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('.govuk-error-summary ul li a')
      .should('contain', 'Enter a Grid Reference')
      .and('contain', 'Select the category of Species Caught')
      .and('contain', 'Enter the Number Caught');
  });

  it('add button should navigate to add page enter a semi empty form (schedule1Birds) and see errors', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="schedule1Birds"]').click();
    cy.get('input[type="text"]#current-number-caught').type('12', {delay: 1});
    cy.get('select#current-trap-type').select('Larson pod', {delay: 1});
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter the Species Caught');
  });

  it('add button should navigate to add page enter a semi empty form (other species) and see errors', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-number-caught').type('12', {delay: 1});
    cy.get('select#current-trap-type').select('Larson pod', {delay: 1});
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('.govuk-error-summary ul li a').should('contain', 'Enter the name of the species caught');
  });

  it('main button should navigate to confirm page', function () {
    cy.visit('/details-list');
    cy.get('#main-content form button.naturescot-button--add').click();
    cy.url().should('include', '/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('12', {delay: 1});
    cy.get('select#current-trap-type').select('Larson pod', {delay: 1});
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/confirm');
  });
});

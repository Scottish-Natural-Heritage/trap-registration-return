describe('details page directly', () => {
  it('should prevent access', () => {
    cy.visit('/details', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('details page ', () => {
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
  });

  it('should allow access if the user visits all the pages in order', () => {
    cy.visit('/details');
    cy.get('h1').should('contain', 'What are the details of the non-target species you caught?');
  });

  it('completed details form and clicking forward should navigate to details list page', () => {
    cy.visit('/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('3', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.url().should('include', '/details-list');
  });

  it('add button on list page should navigate to add page and submit empty form and see errors', () => {
    cy.visit('/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('3', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');

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

  it('add button on list page should navigate to add page and submit semi-empty form (schedule1Birds) and see errors', () => {
    cy.visit('/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('3', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');

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

  it('add button on list page should navigate to add page and submit semi-empty form (other species) and see errors', () => {
    cy.visit('/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('3', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');

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

  it('main button on details-list page should navigate to check-answers-non-target-species page', () => {
    cy.visit('/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type('Test Species', {delay: 1});
    cy.get('input[type="text"]#current-number-caught').type('3', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('Test comment', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details-list');

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
    cy.url().should('include', '/check-answers-non-target-species');
  });

  it('forbidden characters on some inputs generate errors', () => {
    cy.visit('/details');

    cy.get('input[type="text"]#current-grid-reference').type('NO 08529 29128', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="otherSpecies"]').click();
    cy.get('input[type="text"]#current-other-species-caught').type(
      '<a href="https://duckduckgo.com">FakeNastyLink</a>',
      {delay: 1}
    );
    cy.get('input[type="text"]#current-number-caught').type('3', {delay: 1});
    cy.get('#main-content form input[type="radio"][value="Larsen pod"]').click();
    cy.get('textarea#current-comment').type('<a href="https://duckduckgo.com">FakeNastyLink</a>', {delay: 1});

    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/details');

    cy.get('.govuk-error-summary ul li a')
      .should(
        'contain',
        'Name of the non-target species caught must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      )
      .and(
        'contain',
        'More detail must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
      );
  });
});

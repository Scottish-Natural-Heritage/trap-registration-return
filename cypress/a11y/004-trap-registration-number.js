describe('Trap Registration Number page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');

    // POST `/start`
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/usage`~
    // POST `/usage`
    cy.get('#main-content form input[type="radio"][value="yes"]').click();
    cy.get('#main-content form button.naturescot-forward-button').click();
    // ~GET `/trap-registration-number`~
  });

  it('should be accessible', function () {
    cy.visit('/trap-registration-number');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Empty input error should be accessible', function () {
    cy.visit('/trap-registration-number');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.injectAxe();
    cy.checkA11y();
  });

  it('Whitespace input error should be accessible', function () {
    cy.visit('/trap-registration-number');
    cy.get('input').type('     ');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.injectAxe();
    cy.checkA11y();
  });

  it('Invalid input error should be accessible', function () {
    cy.visit('/trap-registration-number');
    cy.get('input').type('123456');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.injectAxe();
    cy.checkA11y();
  });

  it('Invalid input error should be accessible', function () {
    cy.visit('/trap-registration-number');
    cy.get('input').type('abcde');
    cy.get('#main-content form button.naturescot-forward-button').click();

    cy.injectAxe();
    cy.checkA11y();
  });
});

describe('Login page', function () {
  it('main button should navigate to usage', function () {
    cy.visit('/login');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/target-species');
  });
});

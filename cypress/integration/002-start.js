describe('Start page', () => {
  it('main button should navigate to usage', () => {
    cy.visit('/start');
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/trap-registration-number');
  });
});

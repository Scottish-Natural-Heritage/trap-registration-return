describe('Home page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('redirects to start', () => {
    cy.visit('/');
    cy.url().should('include', '/start');
  });
});

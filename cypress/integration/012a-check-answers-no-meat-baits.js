describe('check-answers-no-meat-baits page directly', () => {
  it('should prevent access', () => {
    cy.visit('/check-answers-no-meat-baits', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

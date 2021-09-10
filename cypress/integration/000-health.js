describe('Heart beat', () => {
  it('successfully ticks', () => {
    cy.request('/health').its('body').should('deep.equal', {message: 'OK'});
  });
});

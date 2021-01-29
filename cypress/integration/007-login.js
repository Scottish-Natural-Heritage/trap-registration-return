describe('Login page', function () {
  it('with a valid token then main button should navigate to usage', function () {
    cy.visit(
      '/login?token=' +
        'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJleHAiOjQ3Njc2NzQ1NTgsInN1YiI6Ii0xIn0.' +
        'XSHX6QB8robVaEuXVeHKbBed13uAdWvLBaNeGCYPAWWlw7Fm7bafXMPUQQE69TNc8DbjUgaRDxKvS2ju5uZziw'
    );
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/target-species');
  });

  it('with an unsigned token then main button should prevent access', function () {
    cy.visit(
      '/login?token=' +
        'ewogICJhbGciOiAibm9uZSIsCiAgInR5cCI6ICJKV1QiCn0.' +
        'ewogICJzdWIiOiAiMTIzNDUiLAogICJleHAiOiA0NzY3Njc0NTU4Cn0.'
    );
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/error-login');
  });

  it('with a tampered token then main button should prevent access', function () {
    cy.visit(
      '/login?token=' +
        'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'ewogICJzdWIiOiAiMTIzNDUiLAogICJleHAiOiA0NzY3Njc0NTU4Cn0.' +
        'XSHX6QB8robVaEuXVeHKbBed13uAdWvLBaNeGCYPAWWlw7Fm7bafXMPUQQE69TNc8DbjUgaRDxKvS2ju5uZziw'
    );
    cy.get('#main-content form button.naturescot-forward-button').click();
    cy.url().should('include', '/error-login');
  });
});

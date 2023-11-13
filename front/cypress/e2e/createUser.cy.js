describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('createUser', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:5173');
    cy.get('#name').clear('r');
    cy.get('#name').type('rodrigo');
    cy.get('#email').clear();
    cy.get('#email').type('rodrigo@teste.com');
    cy.get('#password').clear();
    cy.get('#password').type('12345678');
    cy.get('.el-col-10 > .el-button > span').click();
    cy.get('.el-col-10').click({force: true});
    cy.get('.el-col-10').click({force: true});
    cy.get('.el-col-10', { timeout: 30000 }).should('be.visible');
    cy.get('#channelName').clear('c');
    cy.get('#channelName').type('canal');
    cy.get('span').click({ multiple: true });
    cy.get('.el-col-20').click({force: true});
    cy.get('.el-col-20 > :nth-child(2)').should('have.text', 'Canal: canal');
  });
})
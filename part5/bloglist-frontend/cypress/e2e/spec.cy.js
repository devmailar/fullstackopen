/* eslint-disable linebreak-style */
describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.get('form').should('be.visible')
  })
})

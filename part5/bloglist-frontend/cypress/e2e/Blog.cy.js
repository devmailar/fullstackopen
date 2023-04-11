/* eslint-disable linebreak-style */
describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testuser',
      name: 'Test User',
      password: 'password',
    })
  })

  it('Login form is shown', () => {
    cy.contains('login').click()
    cy.get('form').should('be.visible')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('testuser')
      cy.get('input[name="Password"]').type('password')
      cy.get('button[type="submit"]').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('testuser')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('button[type="submit"]').click()
      cy.contains('Wrong username or password')
    })
  })
})

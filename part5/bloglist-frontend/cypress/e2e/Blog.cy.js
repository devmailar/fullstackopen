/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
describe('Blog app', () => {
  function resetDatabase() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  }

  function createUser() {
    const user = {
      username: 'mike',
      name: 'Mike',
      password: 'password',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
  }

  beforeEach(() => {
    resetDatabase()
    createUser()
    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.contains('login').click()
    cy.get('form').should('be.visible')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click()

      cy.get('input[name="Username"]').type('mike')
      cy.get('input[name="Password"]').type('password')
      cy.get('button[type="submit"]').click()

      cy.contains('Mike logged in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('login').click()

      cy.get('input[name="Username"]').type('mike')
      cy.get('input[name="Password"]').type('random')
      cy.get('button[type="submit"]').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('mike')
      cy.get('input[name="Password"]').type('password')
      cy.get('button[type="submit"]').click()
      cy.contains('Mike logged in')
    })

    it('A blog can be created', () => {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('This is test blog')
      cy.get('input[name="author"]').type('This is test blog author')
      cy.get('input[name="url"]').type('https://example.com/')
      cy.get('button[type="submit"]').click()
      cy.contains('This is test blog')
      cy.contains('This is test blog author')
    })

    it('A blog can be created and liked', () => {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('This is test blog')
      cy.get('input[name="author"]').type('This is test blog author')
      cy.get('input[name="url"]').type('https://example.com/')
      cy.get('button[type="submit"]').click()
      cy.contains('This is test blog')
      cy.contains('This is test blog author')
      cy.get('div.container').within(() => {
        cy.contains('button', 'view').click()
        cy.contains('button', 'like').click()
      })
      cy.contains('likes 1')
      cy.contains('https://example.com/')
    })

    it('A blog can be created and deleted', () => {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('This is test blog')
      cy.get('input[name="author"]').type('This is test blog author')
      cy.get('input[name="url"]').type('https://example.com/')
      cy.get('button[type="submit"]').click()
      cy.contains('This is test blog')
      cy.contains('This is test blog author')
      cy.get('div.container').within(() => {
        cy.contains('button', 'view').click()
        cy.contains('button', 'remove').click()
      })
      cy.get('html').should('not.contain', 'This is test blog')
      cy.get('html').should('not.contain', 'This is test blog author')
    })
  })
})

describe('Blog app', () => {
  function resetDatabase() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  }

  function createUser(user) {
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  }

  beforeEach(() => {
    const user = {
      name: 'Mike Dylan',
      username: 'mike',
      password: 'password',
    }

    resetDatabase()
    createUser(user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', () => {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
    cy.get('form').should('be.visible')
  })

  it('login succeeds with correct credentials', () => {
    cy.get('input[name="Username"]').type('mike')
    cy.get('input[name="Password"]').type('password')
    cy.get('button[type="submit"]').click()
    cy.contains('Mike Dylan logged in')
    console.log('Success Login')
  })

  it('login fails with wrong credentials', () => {
    cy.get('input[name="Username"]').type('mike')
    cy.get('input[name="Password"]').type('wrong')
    cy.get('button[type="submit"]').click()
    cy.contains('Wrong username or password')
    console.log('Failed Login')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.get('input[name="Username"]').type('mike')
      cy.get('input[name="Password"]').type('password')
      cy.get('button[type="submit"]').click()
      cy.login({ username: 'mike', password: 'password' })
    })

    it('user can log out', () => {
      cy.logout()
      cy.contains('log in to application')
      cy.contains('username')
      cy.contains('password')
    })

    it('blog can be created', () => {
      cy.contains('create new blog').click()

      cy.get('input[name="title"]').type('Flynome')
      cy.get('input[name="author"]').type('Kass')
      cy.get('input[name="url"]').type('https://example.com/')

      cy.get('button[type="submit"]').click()

      cy.contains('Flynome')
      cy.contains('Kass')
    })

    describe('existing', () => {
      beforeEach(() => {
        const blog = {
          title: 'Flynome',
          author: 'Kass',
          url: 'https://example.com',
          likes: 2,
        }

        cy.createBlog(blog)
      })

      it('blog can be liked', () => {
        cy.contains('Flynome')
          .parent()
          .within(() => {
            cy.contains('view').click()
            cy.contains('like').click()
          })
      })

      it('blog can be deleted', () => {
        cy.contains('Flynome')
          .parent()
          .within(() => {
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('remove').click()
          })
        cy.get('html').should('not.contain', 'Flynome')
        cy.get('html').should('not.contain', 'Kass')
        cy.contains('blog removed')
      })
    })
  })
})

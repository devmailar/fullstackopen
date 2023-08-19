let userOne
let userTwo

let userOneBlog
let userTwoBlog

describe('Blog app', () => {
  const resetDatabase = () => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  }

  const createUser = (user) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  }

  beforeEach(() => {
    resetDatabase()

    userOne = {
      name: 'Mike Dylan',
      username: 'mikedylan',
      password: 'test',
    }

    userTwo = {
      name: 'Dave Dylan',
      username: 'davedylan',
      password: 'test',
    }

    createUser(userOne)
    createUser(userTwo)

    cy.visit('http://localhost:3000')
  })

  describe('log in to application', () => {
    it('form shows', () => {
      cy.get('form').should('be.visible')
    })

    it('succeeds with correct credentials', () => {
      cy.get('input[name="Username"]').type(userOne.username)
      cy.get('input[name="Password"]').type(userOne.password)
      cy.get('button[type="submit"]').click()

      cy.contains(`${userOne.name} logged in`)
    })

    it('fails with wrong credentials', () => {
      cy.logout()

      cy.get('input[name="Username"]').type(userOne.username)
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('button[type="submit"]').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('logged in user', () => {
    beforeEach(() => {
      cy.login({ username: userOne.username, password: userOne.password })

      userOneBlog = {
        title: 'userOne Blog',
        author: 'John Doe',
        url: 'www.facebook.com',
      }

      cy.createBlog(userOneBlog)

      cy.login({ username: userTwo.username, password: userTwo.password })

      userTwoBlog = {
        title: 'userTwo Blog',
        author: 'John Doe',
        url: 'www.amazon.com',
      }

      cy.createBlog(userTwoBlog)
    })

    it('A user can log out', () => {
      cy.get('input[name="Username"]').type(userOne.username)
      cy.get('input[name="Password"]').type(userOne.password)
      cy.get('button[type="submit"]').click()

      cy.logout()
      cy.contains('log in to application')
      cy.contains('username')
      cy.contains('password')
    })

    it('A blog can be created', () => {
      cy.get('input[name="Username"]').type(userOne.username)
      cy.get('input[name="Password"]').type(userOne.password)
      cy.get('button[type="submit"]').click()

      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('Random Blog')
      cy.get('input[name="author"]').type('Random Author')
      cy.get('input[name="url"]').type('https://random.url.com')
      cy.get('button[type="submit"]').click()

      cy.contains('Random Blog')
    })

    it('A blog can be liked', () => {
      cy.get('input[name="Username"]').type(userOne.username)
      cy.get('input[name="Password"]').type(userOne.password)
      cy.get('button[type="submit"]').click()

      cy.contains(userOneBlog.title)
        .parent()
        .within(() => {
          cy.contains('view').click()
          cy.contains('like').click()
          cy.contains('like').click()
          cy.contains('likes 1')
        })
    })

    it('A user who didnt create the blog cant see remove button', () => {
      cy.get('input[name="Username"]').type(userOne.username)
      cy.get('input[name="Password"]').type(userOne.password)
      cy.get('button[type="submit"]').click()

      cy.contains('userTwo Blog')
        .parent()
        .within(() => {
          cy.contains('view').click()
          cy.contains('remove').should('not.exist')
        })
    })

    it('A user who created the blog can see remove button and delete it', () => {
      cy.get('input[name="Username"]').type(userOne.username)
      cy.get('input[name="Password"]').type(userOne.password)
      cy.get('button[type="submit"]').click()

      cy.contains(userOneBlog.title)
        .parent()
        .within(() => {
          cy.contains('view').click()
          cy.contains('remove').should('exist').click()
        })
    })

    it('A blogs are ordered based on likes', () => {
      cy.get('input[name="Username"]').type(userOne.username)
      cy.get('input[name="Password"]').type(userOne.password)
      cy.get('button[type="submit"]').click()

      cy.contains(userTwoBlog.title)
        .parent()
        .find('button')
        .contains('view')
        .click()
      cy.contains(userTwoBlog.title)
        .parent()
        .find('button')
        .contains('like')
        .click()

      cy.contains(userOneBlog.title)
        .parent()
        .find('button')
        .contains('view')
        .click()
      cy.contains(userOneBlog.title)
        .parent()
        .find('button')
        .contains('like')
        .click()
      cy.contains(userOneBlog.title)
        .parent()
        .find('button')
        .contains('like')
        .click()

      // Verify the order of blogs based on likes
      cy.get('.container').should(($blogs) => {
        expect($blogs).to.have.length(2)
        expect($blogs.eq(0)).to.contain(userOneBlog.title)
        expect($blogs.eq(1)).to.contain(userTwoBlog.title)
      })
    })
  })
})

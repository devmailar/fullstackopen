/* eslint-disable linebreak-style */
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Autonomia',
    author: 'Alex',
    url: 'http://example.com',
    likes: 0,
  }

  test('renders blog title and author without rendering likes and url', () => {
    render(<Blog blog={blog} />)

    const titleEl = screen.getByTestId('title')
    expect(titleEl).toHaveClass('blog-title')
    expect(titleEl).toHaveTextContent(blog.title)
    expect(titleEl).toBeDefined()

    const authorElement = screen.getByTestId('author')
    expect(authorElement).toHaveClass('blog-author')
    expect(authorElement).toHaveTextContent(blog.author)
    expect(authorElement).toBeDefined()

    expect(screen.queryByTestId('url')).not.toBeInTheDocument()
    expect(screen.queryByTestId('likes')).not.toBeInTheDocument()
  })

  test('checks if blogs url and number of likes are shown when details button is clicked', () => {
    const mockLikeBlog = jest.fn()

    render(
      <Blog blog={blog} likeBlog={mockLikeBlog} currentUser={{ id: '1' }} />
    )

    const detailsButton = screen.getByText('view')
    fireEvent.click(detailsButton)

    expect(screen.getByTestId('url')).toHaveTextContent(blog.url)
    expect(screen.getByTestId('likes')).toHaveTextContent(`likes ${blog.likes}`)
  })
})

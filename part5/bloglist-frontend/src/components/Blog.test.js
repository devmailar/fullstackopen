/* eslint-disable linebreak-style */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders blog title and author without rendering likes and url', () => {
    const blog = {
      title: 'Autonomia',
      author: 'Alex',
      url: 'http://example.com',
      likes: 0,
    }

    render(<Blog blog={blog} />)
    screen.debug()

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
})

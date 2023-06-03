/* eslint-disable linebreak-style */
import { jest } from '@jest/globals'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  const blog = {
    title: 'Autonomia',
    author: 'Alex',
    url: 'http://example.com',
  }

  test('calls the eventh handler with details when a blog is created', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByTestId('title')
    const authorInput = screen.getByTestId('author')
    const urlInput = screen.getByTestId('url')
    const submitButton = screen.getByText('create')

    fireEvent.change(titleInput, { target: { value: blog.title } })
    fireEvent.change(authorInput, { target: { value: blog.author } })
    fireEvent.change(urlInput, { target: { value: blog.url } })
    fireEvent.click(submitButton)

    expect(createBlog).toHaveBeenCalledWith({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    })
  })
})

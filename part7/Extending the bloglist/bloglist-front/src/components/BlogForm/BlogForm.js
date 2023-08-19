import { useState } from 'react'
import blogService from '../../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotificationContext }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async ({ title, author, url }) => {
    try {
      const createdBlog = await blogService.create({
        title,
        author,
        url,
        likes: 0,
      })

      setBlogs([...blogs, createdBlog])
      setNotificationContext({
        message: `a new blog ${title} by ${author}`,
        type: 'success',
      })

      setTimeout(() => {
        setNotificationContext({
          message: null,
          type: null,
        })
      }, 5000)
    } catch (error) {
      setNotificationContext({
        message: `failed to create new blog with title ${title}`,
        type: 'error',
      })

      setTimeout(() => {
        setNotificationContext({
          message: null,
          type: null,
        })
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()

    handleCreate({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            data-testid="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            data-testid="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            data-testid="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm

import { useState } from 'react'
import blogService from '../../services/blogs'

const BlogForm = ({ setBlogs, setNotificationContext }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleCreate = async ({ title, author, url }) => {
    try {
      const createdBlog = await blogService.create({
        title,
        author,
        url,
        likes: 0,
      })

      setBlogs((prev) => {
        return [...prev, createdBlog]
      })

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

  const handleChange = (e) => {
    setForm((prev) => {
      setForm({ ...prev, [e.target.name]: e.target.value })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleCreate({ title: form.title, author: form.author, url: form.url })
    setForm({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={form ? form.title : ''}
            name="title"
            data-testid="title"
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={form ? form.author : ''}
            name="author"
            data-testid="author"
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={form ? form.url : ''}
            name="url"
            data-testid="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm

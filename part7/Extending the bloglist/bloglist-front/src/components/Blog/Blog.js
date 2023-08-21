import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SET_NOTIFICATION } from '../../reducers/notification'
import blogService from '../../services/blogs'

const Blog = ({ blog, blogs, user, setBlogs }) => {
  const dispatch = useDispatch()

  const [view, setView] = useState(false)
  const [showRemoveButton, setShowRemoveButton] = useState(false)

  const handleLike = async ({ id, title, author, url, likes }) => {
    try {
      const updatedBlog = await blogService.update(id, {
        title,
        author,
        url,
        likes: likes + 1,
      })

      setBlogs(
        blogs.map((blog) => {
          return blog.id === updatedBlog.id ? updatedBlog : blog
        })
      )
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async ({ id, title, author }) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try {
        await blogService.remove(id)

        setBlogs(blogs.filter((blog) => blog.id !== id))
        dispatch(
          SET_NOTIFICATION({
            message: 'blog removed',
            type: 'success',
          })
        )

        setTimeout(() => {
          dispatch(SET_NOTIFICATION({ message: null, type: null }))
        }, 5000)
      } catch (err) {
        console.error(err)

        dispatch(
          SET_NOTIFICATION({
            message: 'failed to remove blog',
            type: 'error',
          })
        )

        setTimeout(() => {
          dispatch(SET_NOTIFICATION({ message: null, type: null }))
        }, 5000)
      }
    }
  }

  const userAddedBlog = () => {
    return user && user.id === blog.user.id
  }

  useEffect(() => {
    setShowRemoveButton(userAddedBlog())
  }, [user])

  return (
    <div
      className="container"
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
      }}
    >
      <div data-testid="title" className="blog-title">
        {blog.title}
      </div>
      <div data-testid="author" className="blog-author">
        by {blog.author}
      </div>
      <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      {view && (
        <>
          <div data-testid="url">{blog.url}</div>
          <div data-testid="likes">
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div data-testid="author">{blog.author}</div>
          {showRemoveButton && (
            <div>
              <button onClick={() => handleDelete(blog)}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Blog

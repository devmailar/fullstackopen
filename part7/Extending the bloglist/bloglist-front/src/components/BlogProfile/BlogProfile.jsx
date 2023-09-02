import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SET_BLOGS } from '../../reducers/blogs'
import { SET_NOTIFICATION } from '../../reducers/notification'
import blogService from '../../services/blogs'

export default function BlogProfile() {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { user } = useSelector((state) => state.user)
  const { blogs } = useSelector((state) => state.blogs)

  if (!id) return <p>Loading...</p>
  if (!blogs) return <p>Loading...</p>

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) return <p>Loading...</p>
  if (!user) return <p>Loading...</p>

  const handleLike = async function (blog) {
    try {
      const updatedBlog = await blogService.update(id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      })

      dispatch(
        SET_BLOGS(
          blogs.map((blog) => {
            return blog.id === id ? updatedBlog : blog
          })
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async function (blog) {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id)
        dispatch(SET_BLOGS(blogs.filter((blog) => blog.id !== id)))
        dispatch(
          SET_NOTIFICATION({
            message: 'blog removed',
            type: 'success',
          })
        )

        setTimeout(() => {
          dispatch(SET_NOTIFICATION({ message: null, type: null }))
        }, 5000)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleComment = async function (event) {
    event.preventDefault()

    try {
      const comment = event.target[0].value
      const updatedBlog = await blogService.update(id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        comments: [
          ...blog.comments,
          {
            text: comment,
          },
        ],
      })

      dispatch(
        SET_BLOGS(
          blogs.map((blog) => {
            return blog.id === id ? updatedBlog : blog
          })
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <button onClick={() => handleLike(blog)}>like</button>
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input type="text" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li
            style={{
              marginTop: '0.5rem',
              backgroundColor: 'lightblue',
              padding: '0.5rem',
              width: 'fit-content',
            }}
            key={comment}
          >
            {comment.text}
          </li>
        ))}
      </ul>
      {user.id === blog.user.id && (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )}
    </div>
  )
}

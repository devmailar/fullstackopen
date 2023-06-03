/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react'
import './App.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notify'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')

    //NOTE If the user JSON is found
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      //NOTE Set token
      blogService.setToken(user.token)

      //NOTE Set state
      setUser(user)
    }
  }, [])

  useEffect(() => {
    /* NOTE
      This is better since now we check if the  user is
      logged in then we only fetch the blogs from api
      It's bad practice to fetch a lot of blogs from api when user
      is not even logged in and can cause performance issues
    */
    if (user) {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs)
      })
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))

      blogService.setToken(user.token)
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={message} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (!user) {
    return LoginForm()
  }

  const newBlog = async (blog) => {
    const { title, author, url } = blog

    try {
      const createdBlog = await blogService.create({
        title,
        author,
        url,
        likes: 0,
      })

      setBlogs([...blogs, createdBlog])
      setMessage({
        message: `a new blog ${title} by ${author}`,
        type: 'success',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.error(exception)
      setMessage({
        message: `failed to create new blog with title ${title}`,
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async ({ id, title, author, url, likes }) => {
    try {
      const updatedBlog = await blogService.update(id, {
        title,
        author,
        url,
        likes: likes + 1,
      })

      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (exception) {
      console.error(exception)
    }
  }

  const sortBlogsByLikes = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  )

  const deleteBlog = async ({ id, title, author }) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        setMessage({
          message: 'blog removed',
          type: 'success',
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        console.error(exception)
        setMessage({
          message: 'failed to remove blog',
          type: 'error',
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <>
      <h2>Blogs</h2>
      <Notification message={message?.message} type={message?.type} />

      <p>
        {user.name} logged in
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogsappUser')
            setUser(null)
          }}
        >
          logout
        </button>
      </p>

      <Togglable createButton="create new blog" cancelButton="cancel">
        <BlogForm createBlog={newBlog} />
      </Togglable>

      {sortBlogsByLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user}
          likeBlog={() => likeBlog(blog)}
          deleteBlog={() => deleteBlog(blog)}
        />
      ))}
    </>
  )
}

export default App

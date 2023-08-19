import { useEffect, useState } from 'react'
import './App.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()

  const [notificationContext, setNotificationContext] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsappUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs)
      })
    }
  }, [user])

  if (!user) {
    return (
      <LoginForm
        notificationContext={notificationContext}
        setNotificationContext={setNotificationContext}
        setUser={setUser}
      />
    )
  }

  const sortBlogsByLikes = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  )

  return (
    <>
      <h2>Blogs</h2>
      <Notification
        message={notificationContext?.message}
        type={notificationContext?.type}
      />
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
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setNotificationContext={setNotificationContext}
        />
      </Togglable>

      {sortBlogsByLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          user={user}
          setBlogs={setBlogs}
          setNotificationContext={setNotificationContext}
        />
      ))}
    </>
  )
}

export default App

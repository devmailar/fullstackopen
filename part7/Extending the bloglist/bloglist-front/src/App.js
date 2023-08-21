import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { SET_BLOGS } from './reducers/blogs'
import BlogList from './components/BlogList/BlogList'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState()

  const { message, type } = useSelector((state) => state.notification)

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
        dispatch(SET_BLOGS(blogs))
      })
    }
  }, [user])

  if (!user) {
    return <LoginForm setUser={setUser} />
  }

  return (
    <>
      <h2>Blogs</h2>
      <Notification message={message} type={type} />

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
        <BlogForm />
      </Togglable>

      <BlogList user={user} />
    </>
  )
}

export default App

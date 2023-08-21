import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { SET_BLOGS } from './reducers/blogs'
import BlogList from './components/BlogList/BlogList'
import { SET_USER } from './reducers/user'

const App = () => {
  const dispatch = useDispatch()

  const { message, type } = useSelector((state) => state.notification)
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsappUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch(SET_USER(user))
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
    return <LoginForm />
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
            dispatch(SET_USER(null))
          }}
        >
          logout
        </button>
      </p>

      <Togglable createButton="create new blog" cancelButton="cancel">
        <BlogForm />
      </Togglable>

      <BlogList />
    </>
  )
}

export default App

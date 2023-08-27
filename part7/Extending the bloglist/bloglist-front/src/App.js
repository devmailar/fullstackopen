import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { SET_USER } from './reducers/user'
import blogService from './services/blogs'
import LoginView from './views/LoginView'
import UserView from './views/UserView'

const App = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)

  useEffect(function () {
    const loggedUser = window.localStorage.getItem('loggedBlogsappUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch(SET_USER(user))
    }
  }, [])

  return (
    <Router>
      {!user ? (
        <>
          <LoginView />
        </>
      ) : (
        <>
          <UserView />
        </>
      )}
    </Router>
  )
}

export default App

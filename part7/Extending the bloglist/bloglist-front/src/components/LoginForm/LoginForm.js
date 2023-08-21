import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_NOTIFICATION } from '../../reducers/notification'
import blogService from '../../services/blogs'
import loginService from '../../services/login'
import Notification from '../Notification/Notification'

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { message, type } = useSelector((state) => state.notification)

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
    } catch (err) {
      console.error(err)

      dispatch(
        SET_NOTIFICATION({
          message: 'Wrong username or password',
          type: 'error',
        })
      )

      setTimeout(() => {
        dispatch(SET_NOTIFICATION({ message: null, type: null }))
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>

      <Notification message={message} type={type} />

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
}

export default LoginForm

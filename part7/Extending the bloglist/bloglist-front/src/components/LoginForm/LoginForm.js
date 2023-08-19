import React, { useState } from 'react'
import blogService from '../../services/blogs'
import loginService from '../../services/login'
import Notification from '../Notification'

const LoginForm = ({
  notificationContext,
  setNotificationContext,
  setUser,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

      setNotificationContext({
        message: 'Wrong username or password',
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

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification
        message={notificationContext?.message}
        type={notificationContext?.type}
      />

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

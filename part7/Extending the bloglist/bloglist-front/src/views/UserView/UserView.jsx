import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import BlogForm from '../../components/BlogForm'
import BlogList from '../../components/BlogList'
import Notification from '../../components/Notification'
import Togglable from '../../components/Togglable'
import UserProfile from '../../components/UserProfile'
import { SET_BLOGS } from '../../reducers/blogs'
import { SET_USER } from '../../reducers/user'
import { SET_USERS } from '../../reducers/users'
import blogService from '../../services/blogs'
import usersService from '../../services/users'
import UsersList from '../../components/UsersList/UsersList'

export default function UserView() {
  const dispatch = useDispatch()

  const { message, type } = useSelector((state) => state.notification)
  const { user } = useSelector((state) => state.user)

  useEffect(
    function () {
      usersService.getAll().then((users) => dispatch(SET_USERS(users)))
      blogService.getAll().then((blogs) => dispatch(SET_BLOGS(blogs)))
    },
    [user, dispatch]
  )

  return (
    <div>
      <Notification message={message} type={type} />

      <h2>Blogs</h2>
      <p>{user.name} logged in</p>

      <button
        onClick={function () {
          window.localStorage.removeItem('loggedBlogsappUser')
          dispatch(SET_USER(null))
        }}
      >
        logout
      </button>

      <Routes>
        <Route
          index
          element={
            <>
              <Togglable createButton="create new blog" cancelButton="cancel">
                <BlogForm />
              </Togglable>

              <BlogList />
            </>
          }
        />

        <Route
          path="users"
          element={
            <>
              <UsersList />
            </>
          }
        />

        <Route
          path="users/:id"
          element={
            <>
              <UserProfile />
            </>
          }
        />
      </Routes>
    </div>
  )
}

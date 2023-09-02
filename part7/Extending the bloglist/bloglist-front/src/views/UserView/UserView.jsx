import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import BlogForm from '../../components/BlogForm'
import BlogList from '../../components/BlogList'
import BlogProfile from '../../components/BlogProfile'
import Notification from '../../components/Notification'
import Togglable from '../../components/Togglable'
import UserProfile from '../../components/UserProfile'
import UsersList from '../../components/UsersList'
import { SET_BLOGS } from '../../reducers/blogs'
import { SET_USER } from '../../reducers/user'
import { SET_USERS } from '../../reducers/users'
import blogService from '../../services/blogs'
import usersService from '../../services/users'

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
    <>
      <nav>
        <div
          style={{
            display: 'flex',
            gap: '0.6em',
          }}
        >
          <a href="/">Blogs</a>
          <a href="/users">Users</a>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '0.6em',
          }}
        >
          <p>{user.name} logged in</p>
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedBlogsappUser')
              dispatch(SET_USER(null))
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1000mm"
              height="1000mm"
              style={{
                maxWidth: '1.6em',
                height: 'auto',
              }}
              viewBox="0 0 1000 1000"
            >
              <path
                d="M250 200h125c15 0 25 10 25 25v50c0 15-10 25-25 25H250c-35 0-50 15-50 50v300c0 35 15 50 50 50h125c15 0 25 10 25 25v50c0 15-10 25-25 25H250c-100 0-150-50-150-150l-1-302c0-100 51-148 151-148m400 46c12 0 29 8 50 29l175 175c35 35 35 66 0 100L700 725c-50 50-75 25-75 0V600H475c-31 0-50-12-50-50V450c0-35 17-49 50-50h150V275c0-14 8-29 25-29m-338 754h188-188"
                style={{
                  opacity: 1,
                  vectorEffect: 'none',
                  fill: '#000',
                  fillOpacity: 1,
                }}
              />
            </svg>
          </button>
        </div>
      </nav>

      <Notification message={message} type={type} />

      <h2>Blogs</h2>

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
          path="blogs/:id"
          element={
            <>
              <BlogProfile />
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
    </>
  )
}

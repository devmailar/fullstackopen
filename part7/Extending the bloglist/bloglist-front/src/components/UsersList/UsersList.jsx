import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function UsersList() {
  const { users } = useSelector((state) => state.users)

  if (!users?.length) {
    return <p>loading...</p>
  }

  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              width: 'max-content',
            }}
          >
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            <span>{user.blogs.length} blogs</span>
          </li>
        ))}
      </ul>
    </>
  )
}

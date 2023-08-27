import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function UserProfile() {
  const { id } = useParams()

  const { users } = useSelector((state) => state.users)

  const user = users.find((user) => user.id === id)

  return (
    <div>
      <h2>User Profile</h2>
      <h3>{user.name}</h3>
      <ul>
        {user.blogs.map(function (blog) {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

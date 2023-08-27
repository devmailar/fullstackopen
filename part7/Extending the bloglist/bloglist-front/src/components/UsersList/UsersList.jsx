import { useSelector } from 'react-redux'
import User from '../User/User'

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
          <User key={user.id} user={user} />
        ))}
      </ul>
    </>
  )
}

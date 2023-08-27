export default function User({ user }) {
  return (
    <li
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        width: 'max-content',
      }}
    >
      <p>{user.name}</p>
      <span>{user.blogs.length} blogs</span>
    </li>
  )
}

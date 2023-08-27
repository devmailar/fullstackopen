import { useSelector } from 'react-redux'
import Blog from '../Blog/Blog'

export default function BlogList() {
  const { blogs } = useSelector((state) => state.blogs)

  if (!blogs?.length) {
    return <p>loading...</p>
  }

  const filterBlogs = [...blogs].sort((blogA, blogB) => {
    return blogB.likes - blogA.likes
  })

  return (
    <div>
      {filterBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

const Blog = ({ blog }) => {
  return (
    <div
      className="container"
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
      }}
    >
      <a href={`blogs/${blog.id}`} data-testid="title" className="blog-title">
        {blog.title}
      </a>
    </div>
  )
}

export default Blog

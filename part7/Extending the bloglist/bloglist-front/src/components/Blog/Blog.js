import React, { useEffect, useState } from 'react'

const Blog = ({ blog, currentUser, likeBlog, deleteBlog }) => {
  const [view, setView] = useState(false)
  const [showRemoveButton, setShowRemoveButton] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const userAddedBlog = () => {
    return currentUser && currentUser.id === blog.user.id
  }

  useEffect(() => {
    setShowRemoveButton(userAddedBlog())
  }, [currentUser])

  return (
    <div className="container" style={blogStyle}>
      <div data-testid="title" className="blog-title">
        {blog.title}
      </div>
      <div data-testid="author" className="blog-author">
        by {blog.author}
      </div>
      <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      {view && (
        <>
          <div data-testid="url">{blog.url}</div>
          <div data-testid="likes">
            likes {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.author}</div>
          {showRemoveButton && (
            <div>
              <button onClick={deleteBlog}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Blog

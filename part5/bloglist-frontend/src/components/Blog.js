import React, { useState } from 'react';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      {view && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.author}</div>
          <div>
            <button onClick={deleteBlog}>remove</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;

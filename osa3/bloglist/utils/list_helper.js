const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listWithOneBlog) => {
  return listWithOneBlog.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return null;
  }

  const reducer = (previous, current) =>
    current.likes > previous.likes ? current : previous;

  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  const topBlogger = blogs.reduce((prev, current) => {
    return prev.blogs > current.blogs ? prev : current;
  });

  return topBlogger.author;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};

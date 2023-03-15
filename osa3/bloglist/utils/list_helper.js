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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

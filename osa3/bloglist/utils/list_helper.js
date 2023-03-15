const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listWithOneBlog) => {
  return listWithOneBlog.reduce((total, blog) => {
    total + blog.likes, 0;
  });
};

module.exports = {
  dummy,
  totalLikes,
};

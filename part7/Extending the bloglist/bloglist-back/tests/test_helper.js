const Blog = require("../models/blogModel");

const initialBlogs = [
  {
    title: "First blog",
    author: "Mailar Malard",
    url: "https://example.com/blogs/1",
    likes: 510,
  },
  {
    title: "Second blog",
    author: "Martin Curve",
    url: "https://example.com/blogs/2",
    likes: 225,
  },
  {
    title: "Second blog",
    author: "Kurv Noob",
    url: "https://example.com/blogs/3",
    likes: 325,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    content: "willremovethissoon",
  });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};

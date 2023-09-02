const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  try {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "missing or invalid token" });
    }

    if (!body.title || !body.author || !body.url) {
      return response.status(401).json({
        error: "missing title or author or url",
      });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (exception) {
    if (exception.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "invalid token" });
    } else {
      response.status(500).json({ error: "couldnt save blog" });
    }
  }
});

blogsRouter.post("/:id/comment", async (request, response) => {
  try {
    const body = request.body;

    const comment = {
      text: body.text,
    };

    if (!comment.text) {
      return response.status(400).json({
        error: "missing text from body",
      });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({
        error: "blog not found",
      });
    }

    blog.comments = blog.comments.concat(comment);

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });

    response.json(updatedBlog);
  } catch (error) {}
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;

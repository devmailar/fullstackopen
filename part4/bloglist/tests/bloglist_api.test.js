const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blogModel');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('bloglist', () => {
  test('all json blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toBeDefined();
  });

  test('correct amount of json blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs');
    const body = response.body;
    body.forEach(blog => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });

  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Jack Ryan',
      url: 'https://example.com/blogs/newBlog',
      likes: 612,
    };

    await api.post('/api/blogs').send(newBlog).expect(201);

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

    const title = response.body.map(data => data.title);
    const author = response.body.map(data => data.author);

    expect(title).toContain('New blog');
    expect(author).toContain('Jack Ryan');
  });

  test('deletes a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(b => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('updates a blog post', async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToUpdate = initialBlogs[0];

    const updatedBlog = {
      title: 'Updated blog',
      author: 'Michael Maik',
      url: 'https://example.com/blogs/updatedBlog',
      likes: 100,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.body.map(blog => blog.title)).toContain(updatedBlog.title);
    expect(response.body.map(blog => blog.author)).toContain(updatedBlog.author);

    const blogsAfterUpdate = await helper.blogsInDb();
    const updatedBlogAfter = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id);

    expect(updatedBlogAfter.title).toBe(updatedBlog.title);
    expect(updatedBlogAfter.author).toBe(updatedBlog.author);
    expect(updatedBlogAfter.url).toBe(updatedBlog.url);
    expect(updatedBlogAfter.likes).toBe(updatedBlog.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

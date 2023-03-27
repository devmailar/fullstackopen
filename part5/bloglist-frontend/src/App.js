import { useEffect, useState } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      console.error(exception);
    }
  };

  const createBlog = async event => {
    event.preventDefault();
    try {
      await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        likes: 0,
      });

      console.log({ blogTitle, blogAuthor, blogUrl });

      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      setBlogs([...blogs, { title: blogTitle, author: blogAuthor, url: blogUrl }]);
    } catch (exception) {
      console.error(exception);
    }
  };

  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const BlogForm = () => (
    <form onSubmit={createBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input type="text" value={blogTitle} name="title" onChange={({ target }) => setBlogTitle(target.value)} />
      </div>
      <div>
        author:
        <input type="text" value={blogAuthor} name="author" onChange={({ target }) => setBlogAuthor(target.value)} />
      </div>
      <div>
        url:
        <input type="text" value={blogUrl} name="url" onChange={({ target }) => setBlogUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  );

  if (!user) {
    return LoginForm();
  }

  return (
    <>
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogsappUser');
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
      {BlogForm()}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;

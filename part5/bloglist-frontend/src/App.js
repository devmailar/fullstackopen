import { useEffect, useState } from 'react';
import './App.css';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      setErrorMessage(`wrong username or password`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <ErrorNotification message={errorMessage} />
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

  if (!user) {
    return LoginForm();
  }

  const newBlog = async blog => {
    const { title, author, url } = blog;

    try {
      const createdBlog = await blogService.create({
        title,
        author,
        url,
        likes: 0,
      });

      setBlogs([...blogs, createdBlog]);
      setSuccessMessage(`a new blog ${title} by ${author}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      console.error(exception);
      setErrorMessage(`failed to create new blog with title ${title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const likeBlog = async ({ id, title, author, url, likes }) => {
    try {
      const updatedBlog = await blogService.update(id, {
        title,
        author,
        url,
        likes: likes + 1,
      });

      setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)));
    } catch (exception) {
      console.error(exception);
    }
  };

  return (
    <>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

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

      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={newBlog} />
      </Togglable>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} likePost={() => likeBlog(blog)} />
      ))}
    </>
  );
};

export default App;

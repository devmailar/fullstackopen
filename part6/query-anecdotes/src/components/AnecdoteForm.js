import { useContext } from 'react';
import { useMutation } from 'react-query';
import { NotificationContext } from './NotificationContext';

const AnecdoteForm = () => {
  const { showNotification, hideNotification } = useContext(NotificationContext);

  const createAnecdote = async (content) => {
    const res = await fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, votes: 0 }),
    });
    return await res.json();
  };

  const { mutate } = useMutation(createAnecdote, {
    onSuccess: ({ content }) => {
      showNotification(`anecdote '${content}' created`);
      setTimeout(() => {
        hideNotification();
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    let content = event.target.anecdote.value;
    if (content.length >= 5) {
      mutate(content);
      content = '';
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

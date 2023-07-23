import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { NotificationContext } from './components/NotificationContext';

const App = () => {
  const { showNotification, hideNotification } = useContext(NotificationContext);

  const { data, status } = useQuery('anecdotes', async () => {
    try {
      const res = await fetch('http://localhost:3001/anecdotes');
      return await res.json();
    } catch (error) {
      throw new Error('An error occurred while fetching anecdotes');
    }
  });

  const updateAnecdote = async (anecdote) => {
    const res = await fetch(`http://localhost:3001/anecdotes/${anecdote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(anecdote),
    });
    return await res.json();
  };

  const { mutate } = useMutation(updateAnecdote, {
    onSuccess: ({ content }) => {
      showNotification(`anecdote '${content}' voted`);
      setTimeout(() => {
        hideNotification();
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    const vote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    mutate(vote);
  };

  switch (status) {
    case 'loading':
      return <div>Anecdotes are loading...</div>;
    case 'error':
      return <div>Anecdote service not available due to problems in server</div>;
    default:
      break;
  }

  const anecdotes = data || [];

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

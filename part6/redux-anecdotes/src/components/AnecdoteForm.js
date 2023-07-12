import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdote/anecdote.actions';
import {
  clearNotification,
  setNotification,
} from '../reducers/notification/notification.actions';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();

    let content = event.target.anecdote.value;
    const newAnecdote = await anecdoteService.create(content);

    dispatch(addAnecdote(newAnecdote));
    dispatch(setNotification(`you created a new anecdote '${content}'`, 10));

    content = '';

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

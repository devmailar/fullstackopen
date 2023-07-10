import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdote/anecdote.actions';
import {
  setNotification,
  removeNotification,
} from '../reducers/notification/notification.actions';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    return state.anecdote;
  });

  const filter = useSelector((state) => {
    return state.filter;
  });

  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    if (typeof anecdote.content === 'string') {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    }
    return false;
  });

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => {
      return anecdote.id === id;
    });

    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                vote(anecdote.id);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

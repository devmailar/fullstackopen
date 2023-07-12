import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdote/anecdote.actions';
import {
  clearNotification,
  setNotification,
} from '../reducers/notification/notification.actions';
import anecdoteService from '../services/anecdotes';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);

  const vote = async (id) => {
    const votedAnecdote = await anecdoteService.addVote(id);

    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 10));
  };

  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    if (typeof anecdote.content === 'string') {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    }
    return false;
  });

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

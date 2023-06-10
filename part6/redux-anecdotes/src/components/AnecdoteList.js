import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdote/anecdote.actions';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    return state.anecdote;
  });

  const filter = useSelector((state) => {
    return state.filter;
  });

  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  });

  const vote = (id) => {
    dispatch(voteAnecdote(id));
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

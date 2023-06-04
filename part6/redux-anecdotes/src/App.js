import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    return state;
  });

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const addNewAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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

export default App;

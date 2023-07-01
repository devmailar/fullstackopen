import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm.js';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter.js';
import Notification from './components/Notification.js';
import {
  initializeAnecdotes,
  createAnecdote,
} from './reducers/anecdote/anecdote.actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const addNewAnecdote = (content) => {
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm addNewAnecdote={addNewAnecdote} />
    </div>
  );
};

export default App;

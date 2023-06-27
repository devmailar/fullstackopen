import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm.js';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter.js';
import Notification from './components/Notification.js';
import { setAnecdotes } from './reducers/anecdote/anecdote.reducer';
import anecdoteService from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      return dispatch(setAnecdotes(anecdotes));
    });
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

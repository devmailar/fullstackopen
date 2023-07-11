import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm.js';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter.js';
import Notification from './components/Notification.js';
import { initializeAnecdotes } from './reducers/anecdote/anecdote.actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Each time the dispatch function is called, the useEffect will run again
     * to render the anecdotes from the server
     */
    dispatch(initializeAnecdotes());
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

import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import anecdoteReducer, {
  setAnecdotes,
} from './reducers/anecdote/anecdote.reducer';
import filterReducer from './reducers/filter/filter.reducer';
import notificationReducer from './reducers/notification/notification.reducer';
import anecdoteService from './services/anecdotes';

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

anecdoteService.getAll().then((anecdotes) => {
  return store.dispatch(setAnecdotes(anecdotes));
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

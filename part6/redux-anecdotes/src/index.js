import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import anecdoteReducer from './reducers/anecdote/anecdote.reducer';
import filterReducer from './reducers/filter/filter.reducer';
import notificationReducer from './reducers/notification/notification.reducer';

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './anecdote/anecdote.reducer';
import filterReducer from './filter/filter.reducer';
import notificationReducer from './notification/notification.reducer';

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;

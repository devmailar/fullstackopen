import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import App from './App';

import { anecdoteReducer } from './reducers/anecdote/anecdote.reducer';
import { filterReducer } from './reducers/filter/filter.reducer';

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  filter: filterReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

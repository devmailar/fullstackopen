import { createSlice } from '@reduxjs/toolkit';

const getId = () => {
  return (100000 * Math.random()).toFixed(0);
};

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const votedAnecdote = state.find((anecdote) => {
        return anecdote.id === action.payload;
      });

      if (votedAnecdote) {
        votedAnecdote.votes += 1;
        state.sort((a, b) => b.votes - a.votes);
      }
    },
    addAnecdote: (state, action) => {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      };

      state.push(newAnecdote);
    },
    setAnecdotes(_state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

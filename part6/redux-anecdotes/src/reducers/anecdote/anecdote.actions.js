import { createAction } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdotes';

export const voteAnecdote = createAction('anecdote/voteAnecdote');
export const addAnecdote = createAction('anecdote/addAnecdote');
export const setAnecdotes = createAction('anecdote/setAnecdotes');

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

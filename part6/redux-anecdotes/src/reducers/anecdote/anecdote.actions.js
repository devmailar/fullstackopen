export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id,
  };
};

export const addAnecdote = (content) => {
  return {
    type: 'ADD',
    content,
  };
};

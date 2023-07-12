import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: null,
  duration: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { text, duration } = action.payload;
      return { text, duration };
    },
    clearNotification: () => {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

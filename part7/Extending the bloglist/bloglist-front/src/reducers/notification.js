import { createSlice } from '@reduxjs/toolkit'

const options = {
  name: 'notification',
  initialState: { message: null, type: null },
  reducers: {
    SET_NOTIFICATION: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },
  },
}

const notificationSlice = createSlice(options)

export const { SET_NOTIFICATION } = notificationSlice.actions
export default notificationSlice.reducer

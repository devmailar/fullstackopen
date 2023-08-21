import { createSlice } from '@reduxjs/toolkit'

const options = {
  name: 'notification',
  initialState: { message: null, type: null },
  reducers: {
    SET_NOTIFICATION: (state, action) => {
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
      }
    },
  },
}

const notificationSlice = createSlice(options)

export const { SET_NOTIFICATION } = notificationSlice.actions
export default notificationSlice.reducer

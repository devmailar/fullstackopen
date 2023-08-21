import { createSlice } from '@reduxjs/toolkit'

const options = {
  name: 'user',
  initialState: {},
  reducers: {
    SET_USER: (state, action) => {
      return { ...state, user: action.payload }
    },
  },
}

const userSlice = createSlice(options)

export const { SET_USER } = userSlice.actions
export default userSlice.reducer

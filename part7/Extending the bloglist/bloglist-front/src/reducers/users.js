import { createSlice } from '@reduxjs/toolkit'

const options = {
  name: 'users',
  initialState: {},
  reducers: {
    SET_USERS: (state, action) => {
      return { ...state, users: action.payload }
    },
  },
}

const usersSlice = createSlice(options)

export const { SET_USERS } = usersSlice.actions
export default usersSlice.reducer

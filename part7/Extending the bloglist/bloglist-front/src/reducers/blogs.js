import { createSlice } from '@reduxjs/toolkit'

const options = {
  name: 'blogs',
  initialState: [],
  reducers: {
    SET_BLOGS: (state, action) => {
      return { ...state, blogs: action.payload }
    },
  },
}

const blogsSlice = createSlice(options)

export const { SET_BLOGS } = blogsSlice.actions
export default blogsSlice.reducer

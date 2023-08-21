import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import blogsReducer from './reducers/blogs'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
})

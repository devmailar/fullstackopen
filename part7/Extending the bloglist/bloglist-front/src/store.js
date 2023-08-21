import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

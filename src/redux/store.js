import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import authReducer from './authService/authSlice'
import tripsReducer from './tripsService/tripSlice'

export const store = configureStore({
  reducer: {
		[api.reducerPath]: api.reducer,
		auth: authReducer,
		trips: tripsReducer
  },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

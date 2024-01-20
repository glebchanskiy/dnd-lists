
import { configureStore } from '@reduxjs/toolkit'
import charactersSlice from './charactersSlice'
import userSlice from './userSlice'

// ...

export const store = configureStore({
 reducer: {
  charactersSlice: charactersSlice,
  userSlice
 }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import dropReducer from './dropSlice'

export const store = configureStore({
  reducer: {drop: dropReducer,},
})
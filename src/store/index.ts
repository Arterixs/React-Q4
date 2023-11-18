import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { searchSliceReducer } from './slice/search'

const rootReducer = combineReducers({
  search: searchSliceReducer,
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
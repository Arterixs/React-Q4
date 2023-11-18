import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { amountPlanetsSliceReducer } from './slice/amountElemPage';
import { searchSliceReducer } from './slice/search';

const rootReducer = combineReducers({
  search: searchSliceReducer,
  amountElemPage: amountPlanetsSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

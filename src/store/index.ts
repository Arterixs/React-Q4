import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { amountElemPageSliceReducer } from './slice/amountElemPage';
import { planetSliceReducer } from './slice/planet';
import { planetsSliceReducer } from './slice/planets';
import { searchSliceReducer } from './slice/search';

const rootReducer = combineReducers({
  search: searchSliceReducer,
  amountElemPage: amountElemPageSliceReducer,
  planets: planetsSliceReducer,
  planet: planetSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

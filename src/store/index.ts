import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { planetApi } from 'service/planetApi';
import { planetsApi } from 'service/planetsApi';

import { amountElemPageSliceReducer } from './slice/amountElemPage';
import { planetSliceReducer } from './slice/planet';
import { planetsSliceReducer } from './slice/planets';
import { searchSliceReducer } from './slice/search';

const rootReducer = combineReducers({
  search: searchSliceReducer,
  amountElemPage: amountElemPageSliceReducer,
  planets: planetsSliceReducer,
  planet: planetSliceReducer,
  [planetApi.reducerPath]: planetApi.reducer,
  [planetsApi.reducerPath]: planetsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([planetApi.middleware, planetsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

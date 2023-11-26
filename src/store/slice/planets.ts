import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Planet } from 'types/interface/api';

interface PlanetsState {
  value: Planet[];
  isLoading: boolean;
}

const initialState: PlanetsState = { value: [], isLoading: false };

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setPlanets(state, action: PayloadAction<Planet[]>) {
      state.value = action.payload;
    },
    updateLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { setPlanets, updateLoading } = planetsSlice.actions;
export const planetsSliceReducer = planetsSlice.reducer;

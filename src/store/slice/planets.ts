import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from 'types/interface/api';

interface PlanetsState {
  value: Planet[];
}

const initialState: PlanetsState = { value: [] };

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setPalnets(state, action: PayloadAction<Planet[]>) {
      state.value = action.payload;
    },
  },
});

export const { setPalnets } = planetsSlice.actions;
export const planetsSliceReducer = planetsSlice.reducer;

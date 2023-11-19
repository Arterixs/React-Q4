import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setPalnets(state, action: PayloadAction<Planet[]>) {
      state.value = action.payload;
    },
    updateLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setPalnets, updateLoading } = planetsSlice.actions;
export const planetsSliceReducer = planetsSlice.reducer;

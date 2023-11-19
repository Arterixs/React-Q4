import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from 'types/interface/api';

interface PlanetState {
  value: Planet | null;
  isLoading: boolean;
}

const initialState: PlanetState = { value: null, isLoading: false };

export const planetSlice = createSlice({
  name: 'planet',
  initialState,
  reducers: {
    setPlanet(state, action: PayloadAction<Planet>) {
      state.value = action.payload;
    },
    updatePlanetLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setPlanet, updatePlanetLoading } = planetSlice.actions;
export const planetSliceReducer = planetSlice.reducer;

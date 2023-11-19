import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from 'types/interface/api';

interface PlanetState {
  value: Planet | null;
}

const initialState: PlanetState = { value: null };

export const planetSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setPalnet(state, action: PayloadAction<Planet>) {
      state.value = action.payload;
    },
  },
});

export const { setPalnet } = planetSlice.actions;
export const planetSliceReducer = planetSlice.reducer;

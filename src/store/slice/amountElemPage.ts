import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_AMOUNT_PLANET = '10';

const initialState = { amount: DEFAULT_AMOUNT_PLANET };

export const amountPlanetsSlice = createSlice({
  name: 'amountElemPage',
  initialState,
  reducers: {
    updateAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
  },
});

export const { updateAmount } = amountPlanetsSlice.actions;
export const amountPlanetsSliceReducer = amountPlanetsSlice.reducer;

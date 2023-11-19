import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_AMOUNT_PLANET = '10';

const initialState = { amount: DEFAULT_AMOUNT_PLANET };

export const amountElemPageSlice = createSlice({
  name: 'amountElemPage',
  initialState,
  reducers: {
    updateAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
  },
});

export const { updateAmount } = amountElemPageSlice.actions;
export const amountElemPageSliceReducer = amountElemPageSlice.reducer;

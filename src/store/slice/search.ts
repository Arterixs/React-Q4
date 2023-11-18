import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPrevRequestFromLocal } from 'service/localStorageApi';

const initialState = { value: getPrevRequestFromLocal(), valueRequest: getPrevRequestFromLocal() };

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setValueRequest(state, action: PayloadAction<string>) {
      state.valueRequest = action.payload;
    },
  },
});

export const { setValue, setValueRequest } = searchSlice.actions;
export const searchSliceReducer = searchSlice.reducer;

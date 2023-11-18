import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { getPrevRequestFromLocal } from 'service/localStorageApi'

const initialState = { searchValue: getPrevRequestFromLocal() } 

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const { setValue } = searchSlice.actions
export const searchSliceReducer = searchSlice.reducer
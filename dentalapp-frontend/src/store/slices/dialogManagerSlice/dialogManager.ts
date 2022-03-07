import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateDialogManager, DIALOG_MANAGER_KEY } from './constants';
import { DialogManagerState } from './models';

export const dialogManagerSlice = createSlice({
  name: DIALOG_MANAGER_KEY,
  initialState: initialStateDialogManager,
  reducers: {
    setVisibility(state: DialogManagerState, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
  },
  extraReducers: {},
});

export const dialogManagerReducer = dialogManagerSlice.reducer;

export const dialogManagerActions = {
  ...dialogManagerSlice.actions,
};

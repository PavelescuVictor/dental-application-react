import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateAlertManager, ALERT_MANAGER_KEY } from './constants';
import { AlertTypes, AlertManagerState } from './models';

export const alertManagerSlice = createSlice({
  name: ALERT_MANAGER_KEY,
  initialState: initialStateAlertManager,
  reducers: {
    setIsVisible(state: AlertManagerState, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
    setAlertData(
      state: AlertManagerState,
      action: PayloadAction<{ alertMessage: string; alertType: AlertTypes }>
    ) {
      state.type = action.payload.alertType;
      state.message = action.payload.alertMessage;
      state.isVisible = true;
    },
  },
  extraReducers: {},
});

export const alertManagerReducer = alertManagerSlice.reducer;

export const alertManagerActions = {
  ...alertManagerSlice.actions,
};

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
    resetAlert(state: AlertManagerState) {
      state.type = initialStateAlertManager.type;
      state.message = initialStateAlertManager.message;
      state.isVisible = initialStateAlertManager.isVisible;
    },
    setHideInterval(
      state: AlertManagerState,
      action: PayloadAction<{ hideIntervalId: ReturnType<typeof setTimeout> }>
    ) {
      state.hideIntervalId = action.payload.hideIntervalId;
    },
    clearHideInterval(state: AlertManagerState) {
      if (state.hideIntervalId) clearTimeout(state.hideIntervalId);
      state.hideIntervalId = null;
    },
    resetHideInterval(
      state: AlertManagerState,
      action: PayloadAction<{ hideIntervalId: ReturnType<typeof setTimeout> }>
    ) {
      state.hideIntervalId = action.payload.hideIntervalId;
    },
  },
  extraReducers: {},
});

export const alertManagerReducer = alertManagerSlice.reducer;

export const alertManagerActions = {
  ...alertManagerSlice.actions,
};

import { combineReducers } from '@reduxjs/toolkit';

import { userManagerReducer } from './slices/userManagerSlice/userManager';
import { themeManagerReducer } from './slices/themeManagerSlice/themeManager';
import { dialogManagerReducer } from './slices/dialogManagerSlice/dialogManager';
import { doctorManagerReducer } from './slices/doctorManagerSlice/doctorManager';
import { patientManagerReducer } from './slices/patientManagerSlice/patientManager';
import { alertManagerReducer } from './slices/alertManagerSlice/alertManager';
import { orderManagerReducer } from './slices/orderManagerSlice/orderManager';
import { orderTypeEntryManagerReducer } from './slices/orderTypeEntrySlice/orderTypeEntryManager';

const rootReducer = combineReducers({
  userManager: userManagerReducer,
  themeManager: themeManagerReducer,
  dialogManager: dialogManagerReducer,
  doctorManager: doctorManagerReducer,
  patientManager: patientManagerReducer,
  alertManager: alertManagerReducer,
  orderManager: orderManagerReducer,
  orderTypeEntryManager: orderTypeEntryManagerReducer,
});

export default rootReducer;

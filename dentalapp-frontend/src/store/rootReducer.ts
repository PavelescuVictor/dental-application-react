import { combineReducers } from '@reduxjs/toolkit';

import { exampleReducer } from './slices/exampleSlice/example';
import { userManagerReducer } from './slices/userManagerSlice/userManager';
import { themeManagerReducer } from './slices/themeManagerSlice/themeManager';
import { dialogManagerReducer } from './slices/dialogManagerSlice/dialogManager';
import { doctorManagerReducer } from './slices/doctorManagerSlice/doctorManager';
import { patientManagerReducer } from './slices/patientManagerSlice/patientManager';
import { alertManagerReducer } from './slices/alertManagerSlice/alertManager';

const rootReducer = combineReducers({
  example: exampleReducer,
  userManager: userManagerReducer,
  themeManager: themeManagerReducer,
  dialogManager: dialogManagerReducer,
  doctorManager: doctorManagerReducer,
  patientManager: patientManagerReducer,
  alertManager: alertManagerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

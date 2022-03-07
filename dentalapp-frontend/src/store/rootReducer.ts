import { combineReducers } from '@reduxjs/toolkit';

import { exampleReducer } from './slices/exampleSlice/example';
import { userManagerReducer } from './slices/userManagerSlice/userManager';
import { themeManagerReducer } from './slices/themeManagerSlice/themeManager';

const rootReducer = combineReducers({
  example: exampleReducer,
  userManager: userManagerReducer,
  themeManager: themeManagerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

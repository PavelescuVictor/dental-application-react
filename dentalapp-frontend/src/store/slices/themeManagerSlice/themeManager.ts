import { createSlice } from '@reduxjs/toolkit';
import { initialStateThemeManager, THEME_MANAGER_KEY } from './constants';

export const themeManagerSlice = createSlice({
  name: THEME_MANAGER_KEY,
  initialState: initialStateThemeManager,
  reducers: {},
  extraReducers: {},
});

export const themeManagerReducer = themeManagerSlice.reducer;

export const themeManagerActions = {
  ...themeManagerSlice.actions,
};

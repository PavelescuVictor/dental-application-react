import { ThemeManagerState, MainThemes } from './models';

export const initialStateThemeManager: ThemeManagerState = {
  appTheme: MainThemes.LIGHT,
  navbarTheme: '',
  scrollTopTheme: '',
};

export const THEME_MANAGER_KEY = 'themeManager';

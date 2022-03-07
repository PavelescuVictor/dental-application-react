import { RootState } from 'store/store';
import { ThemeManagerState, THEME_MANAGER_KEY } from './themeManager';

export const selectNavbarTheme = (state: ThemeManagerState) => state.navbarTheme;
export const selectScrollTopTheme = (state: ThemeManagerState) => state.scrollTopTheme;

const userManagerSelectors = {
  getThemeManagerState: (rootState: RootState): ThemeManagerState => rootState[THEME_MANAGER_KEY],
};

export default userManagerSelectors;

export interface ThemeManagerState {
  appTheme: MainThemes;
  navbarTheme: any;
  scrollTopTheme: any;
}

export enum MainThemes {
  DEFAULT = 'DEFAULT',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

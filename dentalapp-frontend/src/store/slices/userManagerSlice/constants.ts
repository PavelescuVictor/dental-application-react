import { UserManagerState, AuthStatus } from './models';

export const initialStateUserManager: UserManagerState = {
  authStatus: AuthStatus.DEFAULT,
  isLoggedIn: !!localStorage.getItem('userToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null,
  userToken: localStorage.getItem('userToken') || null,
  userTokenExpiry: localStorage.getItem('userTokenExpiry') || null,
  userProfile: localStorage.getItem('userProfile') || null,
  hasErrorLoggingIn: false,
  hasErrorLoggingOut: false,
  hasErrorRegistering: false,
  hasErrorRenewingToken: false,
  hasErrorRequestingProfile: false,
  hasErrorAddingProfile: false,
  hasErrorEditingProfile: false,
};

export const USER_MANAGER_KEY = 'userManager';

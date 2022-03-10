import { UserManagerState, AuthStatus } from './models';

export const initialStateUserManager: UserManagerState = {
  authStatus: AuthStatus.DEFAULT,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null,
  userToken: localStorage.getItem('userToken') || null,
  userTokenExpiry: localStorage.getItem('userTokenExpiry') || null,
  userProfile: localStorage.getItem('userProfile') || '',
  hasErrorLoggingIn: false,
  hasErrorRegistering: false,
  hasErrorRenewingToken: false,
  hasErrorRequestingProfile: false,
  hasErrorAddingProfile: false,
  hasErrorEditingProfile: false,
};

export const USER_MANAGER_KEY = 'userManager';

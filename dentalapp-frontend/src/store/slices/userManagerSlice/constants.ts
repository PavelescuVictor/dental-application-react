import { UserManagerState, AuthStatus } from './models';

export const initialStateUserManager: UserManagerState = {
  authStatus: AuthStatus.DEFAULT,
  isAdmin: false,
  user: localStorage.getItem('user') || '',
  userToken: localStorage.getItem('userToken') || '',
  userTokenExpiry: localStorage.getItem('userTokenExpiry') || '',
  userProfile: localStorage.getItem('userProfile') || '',
  hasErrorLoggingIn: false,
  hasErrorRegistering: false,
  hasErrorRenewingToken: false,
  hasErrorRequestingProfile: false,
  hasErrorAddingProfile: false,
  hasErrorEditingProfile: false,
};

export const USER_MANAGER_KEY = 'userManager';

export type LoginPayload = { email: string; password: string };

export type RegisterPayload = { email: string; password: string };

export type UserProfilePayload = { firstName: string; lastName: string; phone: string };

export type UserEditPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  updatedBy: string;
};

export type RenewTokenPayload = { id: string };

export interface User {
  id: string;
  email: string;
  isStaff: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserManagerState {
  authStatus: AuthStatus;
  isLoggedIn: boolean;
  user: User | null;
  userToken: string | null;
  userTokenExpiry: string | null;
  userProfile: string | null;
  hasErrorLoggingIn: boolean;
  hasErrorLoggingOut: boolean;
  hasErrorRegistering: boolean;
  hasErrorRenewingToken: boolean;
  hasErrorRequestingProfile: boolean;
  hasErrorAddingProfile: boolean;
  hasErrorEditingProfile: boolean;
}

export enum AuthStatus {
  DEFAULT = 'DEFAULT',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  FULFILLED = 'FULFILLED',
}

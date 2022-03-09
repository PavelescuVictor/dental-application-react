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

export interface UserManagerState {
  authStatus: AuthStatus;
  isAdmin: boolean;
  user: string;
  userToken: string;
  userTokenExpiry: string;
  userProfile: string;
  hasErrorLoggingIn: boolean;
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

import { RootState } from 'store/store';
import { UserManagerState } from './models';
import { USER_MANAGER_KEY } from './constants';

export const selectUser = (state: UserManagerState) => state.user;
export const selectUserToken = (state: UserManagerState) => state.userToken;
export const selectUserTokenExpiry = (state: UserManagerState) => state.userTokenExpiry;
export const selectUserId = (state: UserManagerState) => {
  if (state.user !== '') {
    if (typeof state.user === 'object') return state.user.id;

    return JSON.parse(state.user).id;
  }
  return -1;
};
export const selectUserProfile = (state: UserManagerState) => state.userProfile;
export const selectIsLoggedIn = (state: UserManagerState) => !!state.userToken;
export const selectIsAdmin = (state: UserManagerState) => {
  if (state.user !== '') {
    if (typeof state.user === 'object') return state.user.is_admin;

    return JSON.parse(state.user).is_admin;
  }
  return false;
};

const userManagerSelectors = {
  getUserManagerState: (rootState: RootState): UserManagerState => rootState[USER_MANAGER_KEY],
};

export default userManagerSelectors;

import { RootState } from 'store/store';
import { UserManagerState } from './models';
import { USER_MANAGER_KEY } from './constants';

export const selectUser = ({ userManager: state }: RootState) => state.user;
export const selectUserToken = ({ userManager: state }: RootState) => state.userToken;
export const selectUserTokenExpiry = ({ userManager: state }: RootState) => state.userTokenExpiry;
export const selectUserId = ({ userManager: state }: RootState) => {
  if (state.user) {
    if (typeof state.user === 'object') return state.user.id;

    return JSON.parse(state.user).id;
  }
  return -1;
};
export const selectUserProfile = ({ userManager: state }: RootState) => state.userProfile;
export const selectIsLoggedIn = ({ userManager: state }: RootState) => !!state.userToken;
export const selectIsAdmin = ({ userManager: state }: RootState) => {
  if (state.user) {
    if (typeof state.user === 'object') return state.user.isAdmin;

    return JSON.parse(state.user).isAdmin;
  }
  return false;
};

const userManagerSelectors = {
  getUserManagerState: (rootState: RootState): UserManagerState => rootState[USER_MANAGER_KEY],
};

export default userManagerSelectors;

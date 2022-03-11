/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { userManagerAPI } from 'api';
import {
  LoginPayload,
  RegisterPayload,
  RenewTokenPayload,
  UserProfilePayload,
  UserEditPayload,
  UserManagerState,
  AuthStatus,
  User,
} from './models';
import { initialStateUserManager, USER_MANAGER_KEY } from './constants';

import { transformLoginResponsePayload } from './helpers';

// export const userMangerMiddleware = (store) => (next) => (action) => {
//   if (userManagerSlice.actions.resetUserData.match(action)) {
//     localStorage.removeItem('user');
//     localStorage.removeItem('userToken');
//     localStorage.removeItem('userTokenExpiry');
//     localStorage.removeItem('userProfile');
//   }
//   return next(action);
// };

const login = createAsyncThunk(
  'userManager/login',
  async (loginPayload: LoginPayload, thunkAPI) => {
    try {
      const response = await userManagerAPI.userLogin(loginPayload);
      const { token: userToken, user, tokenExpiry: userTokenExpiry } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userToken', userToken);
      localStorage.setItem('userTokenExpiry', userTokenExpiry);
      return transformLoginResponsePayload(response.data);
    } catch (error: any) {
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userTokenExpiry');
      localStorage.removeItem('userProfile');

      thunkAPI.dispatch(userManagerSlice.actions.resetUserData());

      console.log('Login Error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const logout = createAsyncThunk('userManager/logout', async (_, thunkAPI) => {
  try {
    const { userToken } = (thunkAPI.getState() as RootState).userManager;
    const response = await userManagerAPI.userLogout(userToken);
    console.log(response);

    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userTokenExpiry');
    localStorage.removeItem('userProfile');

    return;
  } catch (error: any) {
    console.log('Login Error:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const register = createAsyncThunk(
  'userManager/register',
  async (registerPayload: RegisterPayload, thunkAPI) => {
    try {
      const response = await userManagerAPI.userRegister(registerPayload);
      const { token: userToken, user, userTokenExpiry } = response.data;

      localStorage.setItem('user', user);
      localStorage.setItem('userToken', userToken);

      localStorage.setItem('userTokenExpiry', userTokenExpiry);

      return response;
    } catch (error: any) {
      localStorage.removeItem('userToken');

      thunkAPI.dispatch(userManagerSlice.actions.resetUserData());

      console.log('Register Error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const requestProfile = createAsyncThunk('userManager/requestProfile', async (_, thunkAPI) => {
  try {
    const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
    const response = await userManagerAPI.userRequestProfile(user, userToken);
    const userProfile = response.data;
    if (typeof userProfile !== 'object') {
      localStorage.removeItem('userProfile');
      return initialStateUserManager.userProfile;
    }
    localStorage.setItem('userProfile', userProfile);
    return userProfile;
  } catch (error) {
    localStorage.removeItem('userProfile');

    thunkAPI.dispatch(userManagerSlice.actions.setProfile(initialStateUserManager.userProfile));

    console.log('Request Profile Error:', error);
    return thunkAPI.rejectWithValue(error);
  }
});

const addProfile = createAsyncThunk(
  'userManager/addProfile',
  async (userProfilePayload: UserProfilePayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await userManagerAPI.userAddProfile(user, userToken, userProfilePayload);

      const userProfile = response.data;
      if (typeof userProfile !== 'object') {
        localStorage.removeItem('userProfile');
        return initialStateUserManager.userProfile;
      }
      localStorage.setItem('userProfile', userProfile);
      return userProfile;
    } catch (error: any) {
      localStorage.removeItem('userProfile');

      thunkAPI.dispatch(userManagerSlice.actions.setProfile(initialStateUserManager.userProfile));

      console.log('Add Profile Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editProfile = createAsyncThunk(
  'userManager/editProfile',
  async (userEditPayload: UserEditPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await userManagerAPI.userEditProfile(user, userToken, userEditPayload);
      const userProfile = response.data;
      if (typeof userProfile !== 'object') {
        localStorage.removeItem('userProfile');
        return initialStateUserManager.userProfile;
      }
      localStorage.setItem('userProfile', userProfile);
      return userProfile;
    } catch (error) {
      console.log('Edit Profile Error:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const renewToken = createAsyncThunk(
  'userManager/renewToken',
  async (renewTokenPayload: RenewTokenPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await userManagerAPI.userRenewToken(userToken, renewTokenPayload);
      const { user, userToken: newUserToken, newUserTokenExpiry } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userToken', newUserToken);
      localStorage.setItem('userTokenExpiry', newUserTokenExpiry);

      return response;
    } catch (error) {
      thunkAPI.dispatch(userManagerSlice.actions.resetUserData());

      console.log('Renew Token Error:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userManagerSlice = createSlice({
  name: USER_MANAGER_KEY,
  initialState: initialStateUserManager,
  reducers: {
    setAuthStatue(state: UserManagerState, action: PayloadAction<AuthStatus>) {
      state.authStatus = action.payload;
    },

    setUser(state: UserManagerState, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    setUserToken(state: UserManagerState, action: PayloadAction<string>) {
      state.userToken = action.payload;
    },

    setUserTokenExpiry(state: UserManagerState, action: PayloadAction<string>) {
      state.userTokenExpiry = action.payload;
    },

    setProfile(state: UserManagerState, action: PayloadAction<string>) {
      state.userProfile = action.payload;
    },

    resetUserData(state: UserManagerState) {
      state.user = initialStateUserManager.user;
      state.userToken = initialStateUserManager.userToken;
      state.userTokenExpiry = initialStateUserManager.userTokenExpiry;
      state.userProfile = initialStateUserManager.userProfile;
    },
  },

  //   extraReducers: {
  //     [login.pending.type]: (state) => {
  //         state.authStatus =
  //       },
  //       [login.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
  //         state.loading = 'idle'
  //         state.value = state.value + payload
  //       },
  //       [login.rejected.type]: (state, { payload }) => {
  //         state.loading = 'idle'
  //         state.error = payload
  //       },
  //   }

  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state: UserManagerState) => {
      state.hasErrorLoggingIn = false;
    });

    builder.addCase(login.fulfilled, (state: UserManagerState, { payload }: PayloadAction<any>) => {
      const { user, userToken, userTokenExpiry } = payload;
      state.user = user;
      state.userToken = userToken;
      state.userTokenExpiry = userTokenExpiry;
      state.isLoggedIn = true;
    });

    builder.addCase(login.rejected, (state: UserManagerState) => {
      state.hasErrorLoggingIn = true;
      state.isLoggedIn = false;
    });

    // Logout
    builder.addCase(logout.pending, (state: UserManagerState) => {
      state.hasErrorLoggingOut = false;
    });

    builder.addCase(logout.fulfilled, (state: UserManagerState, _) => {
      state.user = initialStateUserManager.user;
      state.userToken = initialStateUserManager.userToken;
      state.userTokenExpiry = initialStateUserManager.userTokenExpiry;
      state.userProfile = initialStateUserManager.userProfile;
      state.isLoggedIn = false;
    });

    builder.addCase(logout.rejected, (state: UserManagerState) => {
      state.hasErrorLoggingOut = true;
    });

    // Register
    builder.addCase(register.pending, (state: UserManagerState) => {
      state.hasErrorRegistering = false;
    });

    builder.addCase(
      register.fulfilled,
      (state: UserManagerState, { payload }: PayloadAction<any>) => {
        const { user, userToken, userTokenExpiry } = payload;
        state.user = user;
        state.userToken = userToken;
        state.userTokenExpiry = userTokenExpiry;
      }
    );

    builder.addCase(register.rejected, (state: UserManagerState) => {
      state.hasErrorRegistering = true;
    });

    // Request Profiles
    builder.addCase(requestProfile.pending, (state: UserManagerState) => {
      state.hasErrorRequestingProfile = false;
    });

    builder.addCase(
      requestProfile.fulfilled,
      (state: UserManagerState, { payload }: PayloadAction<any>) => {
        state.userProfile = payload;
      }
    );

    builder.addCase(requestProfile.rejected, (state: UserManagerState) => {
      state.hasErrorRequestingProfile = true;
    });

    // Add Profile
    builder.addCase(addProfile.pending, (state: UserManagerState) => {
      state.hasErrorAddingProfile = false;
    });

    builder.addCase(
      addProfile.fulfilled,
      (state: UserManagerState, { payload }: PayloadAction<any>) => {
        state.userProfile = payload;
      }
    );

    builder.addCase(addProfile.rejected, (state: UserManagerState) => {
      state.hasErrorAddingProfile = true;
    });

    // Edit Profile
    builder.addCase(editProfile.pending, (state: UserManagerState) => {
      state.hasErrorEditingProfile = false;
    });

    builder.addCase(
      editProfile.fulfilled,
      (state: UserManagerState, { payload }: PayloadAction<any>) => {
        state.userProfile = payload;
      }
    );

    builder.addCase(editProfile.rejected, (state: UserManagerState) => {
      state.hasErrorEditingProfile = true;
    });

    // Renew Token
    builder.addCase(renewToken.pending, (state: UserManagerState) => {
      state.hasErrorRenewingToken = false;
    });

    builder.addCase(
      renewToken.fulfilled,
      (state: UserManagerState, { payload }: PayloadAction<any>) => {
        const { user, userToken, userTokenExpiry } = payload;
        state.user = user;
        state.userToken = userToken;
        state.userTokenExpiry = userTokenExpiry;
      }
    );

    builder.addCase(renewToken.rejected, (state: UserManagerState) => {
      state.hasErrorRenewingToken = true;
    });
  },
});

export const userManagerReducer = userManagerSlice.reducer;

export const userManagerActions = {
  ...userManagerSlice.actions,
};

export const userManagerAsyncThunks = {
  login,
  logout,
  register,
  requestProfile,
  addProfile,
  editProfile,
  renewToken,
};

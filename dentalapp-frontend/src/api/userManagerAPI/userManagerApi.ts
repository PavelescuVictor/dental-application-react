import axios from 'axios';
import {
  RegisterPayload,
  LoginPayload,
  UserProfilePayload,
  UserEditPayload,
  RenewTokenPayload,
} from 'store/slices/userManagerSlice/models';
import { REGISTER_URL, LOGIN_URL, LOGOUT_URL, PROFILE_URL, RENEW_TOKEN_URL } from './constants';

export const userRegister = async (registerPayload: RegisterPayload) =>
  axios({
    url: REGISTER_URL,
    data: registerPayload,
    method: 'POST',
  });

export const userLogout = async (userToken: string) =>
  axios({
    url: LOGOUT_URL,
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const userLogin = async (loginPayload: LoginPayload) =>
  axios({
    url: LOGIN_URL,
    data: loginPayload,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const userRequestProfile = async (userId: string, userToken: string) =>
  axios({
    url: `${PROFILE_URL}${userId}/profile/`,
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const userAddProfile = async (
  userId: string,
  userToken: string,
  userProfilePayload: UserProfilePayload
) =>
  axios({
    url: `${PROFILE_URL}${userId}/profile/`,
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      user: userId,
      firstName: userProfilePayload.firstName,
      lastName: userProfilePayload.lastName,
      phone: userProfilePayload.phone,
    },
  });

export const userEditProfile = async (
  userId: string,
  userToken: string,
  userEditPayload: UserEditPayload
) =>
  axios({
    url: `${PROFILE_URL}${userId}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      firstName: userEditPayload.firstName,
      lastName: userEditPayload.lastName,
      phone: userEditPayload.phone,
      updatedBy: userEditPayload.updatedBy,
    },
  });

export const userRenewToken = async (userToken: string, renewTokenPayload: RenewTokenPayload) =>
  axios({
    url: RENEW_TOKEN_URL,
    data: renewTokenPayload,
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

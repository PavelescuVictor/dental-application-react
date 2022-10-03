import axios from 'axios';
import {
  RequestDoctorDetailsPayload,
  RequestDoctorInfoPayload,
  AddDoctorPayload,
  RemoveDoctorDetailsPayload,
  RemoveDoctorInfoPayload,
  EditDoctorDetailsPayload,
  EditDoctorInfoPayload,
} from 'store/slices/doctorManagerSlice/models';
import { DOCTOR_URLS, DOCTORS_PATHS_TYPES, appendPath } from './constants';

export const requestDoctors = async (userToken: string) =>
  axios({
    url: DOCTOR_URLS[DOCTORS_PATHS_TYPES.LIST],
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const requestSelectedDoctorDetails = async (
  userToken: string,
  payload: RequestDoctorDetailsPayload
) =>
  axios({
    url: appendPath(DOCTOR_URLS[DOCTORS_PATHS_TYPES.DETAILS], `${payload.id}/`),
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const requestSelectedDoctorInfo = async (
  userToken: string,
  payload: RequestDoctorInfoPayload
) =>
  axios({
    url: appendPath(DOCTOR_URLS[DOCTORS_PATHS_TYPES.INFO], `?doctor=${payload.id}`),
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const addDoctor = async (userToken: string, payload: AddDoctorPayload, userId: string) =>
  axios({
    url: DOCTOR_URLS[DOCTORS_PATHS_TYPES.ADD],
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      createdBy: userId,
      updatedBy: userId,
    },
  });

export const editDoctorDetails = async (
  userToken: string,
  payload: EditDoctorDetailsPayload,
  userId: string
) =>
  axios({
    url: appendPath(DOCTOR_URLS[DOCTORS_PATHS_TYPES.EDIT_DETAILS], `${payload.id}/`),
    method: 'PATCH',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      updatedBy: userId,
    },
  });

export const editDoctorInfo = async (
  userToken: string,
  payload: EditDoctorInfoPayload,
  userId: string
) =>
  axios({
    url: appendPath(DOCTOR_URLS[DOCTORS_PATHS_TYPES.EDIT_INFO], `${payload.id}/`),
    method: 'PATCH',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      cabinet: payload.cabinet,
      phone: payload.phone,
      updatedBy: userId,
    },
  });

export const removeDoctorDetails = async (userToken: string, payload: RemoveDoctorDetailsPayload) =>
  axios({
    url: appendPath(DOCTOR_URLS[DOCTORS_PATHS_TYPES.DELETE_DETAILS], `${payload.id}/`),
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const removeDoctorInfo = async (userToken: string, payload: RemoveDoctorInfoPayload) =>
  axios({
    url: appendPath(DOCTOR_URLS[DOCTORS_PATHS_TYPES.DELETE_INFO], `?${payload.id}/`),
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

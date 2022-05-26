import axios from 'axios';
import {
  AddDoctorPayload,
  RemoveDoctorPayload,
  EditDoctorPayload,
} from 'store/slices/doctorManagerSlice/models';
import { DOCTOR_URL } from './constants';

export const requestDoctors = async (userToken: string) =>
  axios({
    url: DOCTOR_URL,
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const addDoctor = async (userToken: string, payload: AddDoctorPayload, userId: string) =>
  axios({
    url: `${DOCTOR_URL}`,
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

export const removeDoctor = async (userToken: string, payload: RemoveDoctorPayload) =>
  axios({
    url: `${DOCTOR_URL}${payload.id}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const editDoctor = async (userToken: string, payload: EditDoctorPayload, userId: string) =>
  axios({
    url: `${DOCTOR_URL}${payload.id}/`,
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

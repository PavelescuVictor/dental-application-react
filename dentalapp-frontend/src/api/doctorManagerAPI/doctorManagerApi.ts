import axios from 'axios';
import { DOCTOR_URL } from './constants';
import {} from 'store/slices/doctorManagerSlice/models';

export const requestDoctorList = async (userToken: string) =>
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
      firstName: payload.doctorFirstName,
      lastName: payload.doctorLastName,
      cabinet: payload.cabinet,
      phone: payload.phone,
      createdBy: userId,
      updatedBy: userId,
    },
  });

export const removeDoctor = async (userToken: string, payload: RemoveDoctorPayload) =>
  axios({
    url: `${DOCTOR_URL}${payload.doctorId}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const editDoctor = async (userToken: string, payload: EditDoctorPayload, userId: string) =>
  axios({
    url: `${DOCTOR_URL}${payload.doctorId}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      firstName: payload.doctorFirstName,
      lastName: payload.doctorLastName,
      cabinet: payload.cabinet,
      phone: payload.phone,
      updatedBy: userId,
    },
  });

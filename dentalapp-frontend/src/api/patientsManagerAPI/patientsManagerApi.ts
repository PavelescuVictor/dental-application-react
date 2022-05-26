import axios from 'axios';
import {
  AddPatientPayload,
  RemovePatientPayload,
  EditPatientPayload,
} from 'store/slices/patientManagerSlice/models';
import { PATIENT_URL } from './constants';

export const requestPatients = async (userToken: string) =>
  axios({
    url: PATIENT_URL,
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const addPatient = async (userToken: string, payload: AddPatientPayload, userId: string) =>
  axios({
    url: `${PATIENT_URL}`,
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      cabinet: payload.cabinet,
      phone: payload.phone,
      createdBy: userId,
      updatedBy: userId,
    },
  });

export const removePatient = async (userToken: string, payload: RemovePatientPayload) =>
  axios({
    url: `${PATIENT_URL}${payload.id}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const editPatient = async (userToken: string, payload: EditPatientPayload, userId: string) =>
  axios({
    url: `${PATIENT_URL}${payload.id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      cabinet: payload.cabinet,
      phone: payload.phone,
      updatedBy: userId,
    },
  });

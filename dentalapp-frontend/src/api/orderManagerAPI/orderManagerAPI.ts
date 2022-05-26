import axios from 'axios';
import {
  AddOrderPayload,
  RemoveOrderPayload,
  EditOrderPayload,
  ChangeOrderStatusPayload,
} from 'store/slices/orderManagerSlice/models';
import { ORDER_URL } from './constants';

export const requestOrders = async (userToken: string) =>
  axios({
    url: ORDER_URL,
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const addOrder = async (userToken: string, payload: AddOrderPayload, userId: string) =>
  axios({
    url: `${ORDER_URL}`,
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      doctor: payload.doctorId,
      patientName: payload.patientName,
      createdBy: userId,
      updatedBy: userId,
      redo: payload.redo,
    },
  });

export const removeOrder = async (userToken: string, payload: RemoveOrderPayload) =>
  axios({
    url: `${ORDER_URL}${payload.id}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const editOrder = async (userToken: string, payload: EditOrderPayload) =>
  axios({
    url: `${ORDER_URL}${payload.id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      patientName: payload.patientName,
      doctorId: payload.doctorId,
      paid: payload.paid,
      redo: payload.redo,
    },
  });

export const changeOrderStatus = async (userToken: string, payload: ChangeOrderStatusPayload) =>
  axios({
    url: `${ORDER_URL}${payload.id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      status: payload.status,
    },
  });

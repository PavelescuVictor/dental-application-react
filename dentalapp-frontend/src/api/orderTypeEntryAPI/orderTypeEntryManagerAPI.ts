import axios from 'axios';
import {
  AddOrderTypeEntryPayload,
  RemoveOrderTypeEntryPayload,
  EditOrderTypeEntryPayload,
} from 'store/slices/orderTypeEntrySlice/models';
import {
  ORDER_TYPE_ENTRY_URL,
  ORDER_TYPE_ENTRY_COLORS_URL,
  ORDER_TYPE_ENTRY_STATUS_URL,
} from './constants';

export const requestOrderTypeEntryColors = async (userToken: string) =>
  axios({
    url: ORDER_TYPE_ENTRY_COLORS_URL,
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const requestOrderTypeEntryStatus = async (userToken: string) =>
  axios({
    url: ORDER_TYPE_ENTRY_STATUS_URL,
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const requestOrderTypeEntries = async (userToken: string) =>
  axios({
    url: ORDER_TYPE_ENTRY_URL,
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const addOrderTypeEntry = async (
  userToken: string,
  payload: AddOrderTypeEntryPayload,
  userId: string
) =>
  axios({
    url: `${ORDER_TYPE_ENTRY_URL}`,
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      order: payload.orderId,
      color: payload.color,
      unitCount: payload.unitCount,
      warranty: payload.warranty,
      createdBy: userId,
      updatedBy: userId,
    },
  });

export const removeOrderTypeEntry = async (
  userToken: string,
  payload: RemoveOrderTypeEntryPayload
) =>
  axios({
    url: `${ORDER_TYPE_ENTRY_URL}${payload.id}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken}`,
    },
  });

export const editOrderTypeEntry = async (
  userToken: string,
  payload: EditOrderTypeEntryPayload,
  userId: string
) =>
  axios({
    url: `${ORDER_TYPE_ENTRY_URL}${payload.id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Token ${userToken}`,
    },
    data: {
      color: payload.color,
      type: payload.type,
      unitCount: payload.unitCount,
      warranty: payload.warranty,
      createdBy: userId,
      updatedBy: userId,
    },
  });

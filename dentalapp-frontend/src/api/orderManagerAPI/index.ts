import {
  requestOrders,
  requestOrderTypeEntryColors,
  requestOrderTypeEntryStatus,
  requestOrderTypeEntries,
  addOrder,
  addOrderTypeEntry,
  removeOrder,
  removeOrderTypeEntry,
  editOrder,
  editOrderTypeEntry,
  changeOrderStatus,
} from './orderManagerAPI';

const patientManagerAPI = {
  requestOrders,
  requestOrderTypeEntryColors,
  requestOrderTypeEntryStatus,
  requestOrderTypeEntries,
  addOrder,
  addOrderTypeEntry,
  removeOrder,
  removeOrderTypeEntry,
  editOrder,
  editOrderTypeEntry,
  changeOrderStatus,
};

export default patientManagerAPI;

import { AllAccessOrdersTabsTypes } from 'modules/ordersDashboard/models';
import { OrderManagerState } from './models';

export const initialStateOrderManager: OrderManagerState = {
  orders: [],
  isLoadingOrders: false,
  hasErrorLoadingOrders: false,
  hasErrorAddingOrder: false,
  hasErrorEditingOrder: false,
  hasErrorRemovingOrder: false,
  filteredOrders: [],
  selectedOrder: null,
  hasSelectedOrder: false,
  selectedDashboardTab: AllAccessOrdersTabsTypes.LIST,
};

export const ORDER_MANAGER_KEY = 'orderManager';

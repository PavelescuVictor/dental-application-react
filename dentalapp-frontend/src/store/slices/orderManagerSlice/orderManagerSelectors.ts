import { RootState } from 'store/rootReducer';
import { ORDER_MANAGER_KEY } from './constants';
import { OrderManagerState, Order } from './models';

export const selectOrders = ({ orderManager }: RootState) => orderManager.orders;
export const selectIsLoadingOrders = ({ orderManager }: RootState) => orderManager.isLoadingOrders;
export const selectHasErrorLoadingOrders = ({ orderManager }: RootState) =>
  orderManager.hasErrorLoadingOrders;
export const selectHasErrorAddingOrder = ({ orderManager }: RootState) =>
  orderManager.hasErrorAddingOrder;
export const selectHasErrorEditingOrder = ({ orderManager }: RootState) =>
  orderManager.hasErrorEditingOrder;
export const selectHasErrorRemovingOrder = ({ orderManager }: RootState) =>
  orderManager.hasErrorRemovingOrder;
export const selectFilteredOrders = ({ orderManager }: RootState) => orderManager.filteredOrders;
export const getSelectedOrder = ({ orderManager }: RootState) => orderManager.selectedOrder;
export const getSelectedOrderData = ({ orderManager }: RootState) =>
  orderManager.orders.find((order: Order) => order.id === orderManager.selectedOrder);
export const getHasSelectedOrder = ({ orderManager }: RootState) => orderManager.hasSelectedOrder;
export const getSelectedDashboardTab = ({ orderManager }: RootState) =>
  orderManager.selectedDashboardTab;
export const selectOrderTypeEntries = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.orderTypeEntries;
export const selectIsLoadingOrderTypeEntries = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.isLoadingOrderTypeEntries;
export const selectHasErrorLoadingOrderTypeEntries = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.hasErrorLoadingOrderTypeEntries;
export const selectHasErrorAddingOrderTypeEntry = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.hasErrorAddingOrderTypeEntry;
export const selectHasErrorEditingOrderTypeEntry = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.hasErrorEditingOrderTypeEntry;
export const selectHasErrorRemovingOrderTypeEntry = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.hasErrorRemovingOrder;
export const selectFilteredOrderTypeEntries = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.filteredOrderTypeEntries;
export const getSelectedOrderTypeEntry = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.selectedOrderTypeEntry;
export const getSelectedOrderData = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.orderTypeEntries.find(
    (orderTypeEntry: OrderTypeEntry) =>
      orderTypeEntry.id === orderTypeEntryManager.selectedOrderTypeEntry
  );
export const getHasSelectedOrderTypeEntry = ({ orderTypeEntryManager }: RootState) =>
  orderTypeEntryManager.hasSelectedOrderTypeEntry;

const OrderManagerSelectors = {
  getOrderManagerState: (rootState: RootState): OrderManagerState => rootState[ORDER_MANAGER_KEY],
};

export default OrderManagerSelectors;

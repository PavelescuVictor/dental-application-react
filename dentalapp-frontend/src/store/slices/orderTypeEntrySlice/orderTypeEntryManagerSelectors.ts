import { RootState } from 'store/rootReducer';
import { ORDER_TYPE_ENTRY_MANAGER_KEY } from './constants';
import { OrderTypeEntryManagerState, OrderTypeEntry } from './models';

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

const OrderTypeEntryManagerSelectors = {
  getOrderManagerState: (rootState: RootState): OrderTypeEntryManagerState =>
    rootState[ORDER_TYPE_ENTRY_MANAGER_KEY],
};

export default OrderTypeEntryManagerSelectors;

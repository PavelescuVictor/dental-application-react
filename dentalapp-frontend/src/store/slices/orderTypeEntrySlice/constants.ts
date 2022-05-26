import { OrderTypeEntryManagerState } from './models';

export const initialStateOrderTypeEntryManager: OrderTypeEntryManagerState = {
  orderTypeEntries: [],
  orderTypeEntryColors: [],
  orderTypeEntryStatus: [],
  isLoadingOrderTypeEntries: false,
  hasErrorLoadingOrderTypeEntries: false,
  hasErrorAddingOrderTypeEntry: false,
  hasErrorEditingOrderTypeEntry: false,
  hasErrorRemovingOrderTypeEntry: false,
  filteredOrderTypeEntries: [],
  selectedOrderTypeEntry: null,
  hasSelectedOrderTypeEntry: false,
};

export const ORDER_TYPE_ENTRY_MANAGER_KEY = 'orderTypeEntryManager';

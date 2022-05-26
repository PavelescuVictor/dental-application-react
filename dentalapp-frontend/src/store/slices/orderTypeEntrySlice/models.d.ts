export type AddOrderTypeEntryPayload = {
  orderId: number;
  color: string;
  type: string;
  unitCount: number;
  warranty: number;
};

export type EditOrderTypeEntryPayload = {
  id: string;
  color?: string;
  type?: string;
  unitCount?: number;
  warranty?: number;
};

export type RemoveOrderTypeEntryPayload = { id: string };

export interface OrderTypeEntry {
  id: number;
  orderId: number;
  color: string;
  type: string;
  unitCount: number;
  warranty: number;
  createdAt: string;
  createdBy: number;
  createdByName: string;
  updatedAt: string;
  updatedBy: string;
  updatedByName: string;
}

export interface OrderTypeEntryManagerState {
  orderTypeEntries: OrderTypeEntry[];
  orderTypeEntryColors: string[];
  orderTypeEntryStatus: string[];
  isLoadingOrderTypeEntries: boolean;
  hasErrorLoadingOrderTypeEntries: boolean;
  hasErrorAddingOrderTypeEntry: boolean;
  hasErrorEditingOrderTypeEntry: boolean;
  hasErrorRemovingOrderTypeEntry: boolean;
  filteredOrderTypeEntries: OrderTypeEntry[];
  selectedOrderTypeEntry: number | null;
  hasSelectedOrderTypeEntry: boolean;
}

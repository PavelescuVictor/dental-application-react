import { OrdersDashboardTabs } from 'modules/ordersDashboard/models';

export type AddOrderPayload = {
  doctorId: string;
  patientName: string;
  redo: boolean;
};

export type EditOrderPayload = {
  id: string;
  patientName?: string;
  doctorId?: string;
  redo?: boolean;
  paid?: boolean;
};

export type RemoveOrderPayload = { id: string };

export type ChangeOrderStatusPayload = {
  id: string;
  status: string;
};

export interface Order {
  id: number;
  doctorId: number;
  doctorName: string;
  patientName: string;
  createdAt: string;
  createdBy: number;
  createdByName: string;
  updatedAt: string;
  updatedBy: string;
  updatedByName: string;
  redo: boolean;
  paid: boolean;
}

export interface OrderManagerState {
  orders: Order[];
  isLoadingOrders: boolean;
  hasErrorLoadingOrders: boolean;
  hasErrorAddingOrder: boolean;
  hasErrorEditingOrder: boolean;
  hasErrorRemovingOrder: boolean;
  filteredOrders: Order[];
  selectedOrder: number | null;
  hasSelectedOrder: boolean;
  selectedDashboardTab: OrdersDashboardTabs;
}

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

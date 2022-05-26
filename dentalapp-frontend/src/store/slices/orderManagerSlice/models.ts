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

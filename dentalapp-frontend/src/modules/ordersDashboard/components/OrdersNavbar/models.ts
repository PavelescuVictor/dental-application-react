import { OrdersDashboardTabs } from '../../models';

export interface OrdersNavbarProps {
  handleTabChange: (newTab: OrdersDashboardTabs) => void;
}

export enum NavbarItemTypes {
  LIST = 'LIST',
  DETAILS = 'DETAILS',
  EDIT = 'EDIT',
  ADD = 'ADD',
}

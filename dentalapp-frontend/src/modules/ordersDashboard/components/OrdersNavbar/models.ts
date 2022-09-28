import { OrdersTabsTypes } from '../../models';

export interface OrdersNavbarProps {
  handleTabChange: (newTab: OrdersTabsTypes) => void;
}

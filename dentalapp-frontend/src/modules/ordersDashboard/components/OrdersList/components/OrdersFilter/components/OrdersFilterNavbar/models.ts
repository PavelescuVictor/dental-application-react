import { OrdersFilterTabs } from '../../models';

export interface OrdersFilterNavbarProps {
  handleTabChange: (newTab: OrdersFilterTabs) => void;
}

export enum NavbarItemTypes {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

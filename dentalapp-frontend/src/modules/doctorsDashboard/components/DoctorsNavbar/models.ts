import { DoctorsDashboardTabs } from '../../models';

export interface DoctorsNavbarProps {
  handleTabChange: (newTab: DoctorsDashboardTabs) => void;
}

export enum NavbarItemTypes {
  LIST = 'LIST',
  DETAILS = 'DETAILS',
  EDIT = 'EDIT',
  ADD = 'ADD',
}

import { ProfileDashboardTabs } from '../../models';

export interface ProfileNavbarProps {
  handleTabChange: (newTab: ProfileDashboardTabs) => void;
}

export enum NavbarItemTypes {
  DETAILS = 'DETAILS',
  EDIT = 'EDIT',
  ADD = 'ADD',
}

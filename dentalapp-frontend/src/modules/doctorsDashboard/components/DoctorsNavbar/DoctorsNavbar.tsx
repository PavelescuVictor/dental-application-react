import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components';
import { getSelectedDashboardTab } from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { RouteAccessTypes } from 'routes/models';
import StyledDoctorsNavbar from './DoctorsNavbar.style';
import { DoctorsDashboardTabs } from '../../models';
import { DoctorsNavbarProps } from './models';
import { withAccessControlNavbarTab } from 'hocs/index';

const DoctorsNavbar = ({ handleTabChange }: DoctorsNavbarProps) => {
  const currentTab = useSelector(getSelectedDashboardTab);
  const navbarItems = useMemo(
    () => ({
      [DoctorsDashboardTabs.LIST]: {
        action: () => {
          handleTabChange(DoctorsDashboardTabs.LIST);
        },
        icon: faList,
        itemName: 'List',
        accessLevel: RouteAccessTypes.ONLY_ADMINS,
      },
      [DoctorsDashboardTabs.DETAILS]: {
        action: () => {
          handleTabChange(DoctorsDashboardTabs.DETAILS);
        },
        icon: faUser,
        itemName: 'Details',
        accessLevel: RouteAccessTypes.ONLY_ADMINS,
      },
      [DoctorsDashboardTabs.EDIT]: {
        action: () => {
          handleTabChange(DoctorsDashboardTabs.EDIT);
        },
        icon: faEdit,
        itemName: 'Edit',
        accessLevel: RouteAccessTypes.ONLY_ADMINS,
      },
      [DoctorsDashboardTabs.ADD]: {
        action: () => {
          handleTabChange(DoctorsDashboardTabs.ADD);
        },
        icon: faPlus,
        itemName: 'Add',
        accessLevel: RouteAccessTypes.ONLY_ADMINS,
      },
    }),
    []
  );

  const renderNavbarItems = () => {
    const generatedNavbarItemKeys = [
      DoctorsDashboardTabs.LIST,
      DoctorsDashboardTabs.DETAILS,
      DoctorsDashboardTabs.EDIT,
      DoctorsDashboardTabs.ADD,
    ];
    return generatedNavbarItemKeys.map((navbarItemKey: DoctorsDashboardTabs) => {
      const tabItem = (
        <Button key={navbarItemKey} action={navbarItems[navbarItemKey].action}>
          <li className={currentTab === navbarItemKey ? 'focused' : ''}>
            <FontAwesomeIcon icon={navbarItems[navbarItemKey].icon} />
            <p>{navbarItems[navbarItemKey].itemName}</p>
          </li>
        </Button>
      );
      return withAccessControlNavbarTab(tabItem, navbarItems[navbarItemKey].accessLevel);
    });
  };

  return (
    <StyledDoctorsNavbar>
      <ul className="navbar-list">{renderNavbarItems()}</ul>
    </StyledDoctorsNavbar>
  );
};

export default DoctorsNavbar;

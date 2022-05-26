import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components';
import { getSelectedDashboardTab } from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import StyledDoctorsNavbar from './DoctorsNavbar.style';
import { DoctorsDashboardTabs } from '../../models';
import { DoctorsNavbarProps } from './models';

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
      },
      [DoctorsDashboardTabs.DETAILS]: {
        action: () => {
          handleTabChange(DoctorsDashboardTabs.DETAILS);
        },
        icon: faUser,
        itemName: 'Details',
      },
      [DoctorsDashboardTabs.EDIT]: {
        action: () => {
          handleTabChange(DoctorsDashboardTabs.EDIT);
        },
        icon: faEdit,
        itemName: 'Edit',
      },
      [DoctorsDashboardTabs.ADD]: {
        action: () => {
          handleTabChange(DoctorsDashboardTabs.ADD);
        },
        icon: faPlus,
        itemName: 'Add',
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
    return generatedNavbarItemKeys.map((navbarItemKey: DoctorsDashboardTabs) => (
      <Button key={navbarItemKey} action={navbarItems[navbarItemKey].action}>
        <li className={currentTab === navbarItemKey ? 'focused' : ''}>
          <FontAwesomeIcon icon={navbarItems[navbarItemKey].icon} />
          <p>{navbarItems[navbarItemKey].itemName}</p>
        </li>
      </Button>
    ));
  };

  return (
    <StyledDoctorsNavbar>
      <ul className="navbar-list">{renderNavbarItems()}</ul>
    </StyledDoctorsNavbar>
  );
};

export default DoctorsNavbar;

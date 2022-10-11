import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components';
import { getSelectedDashboardTab } from 'store/slices/profileManagerSlice/profileManagerSelectors';
import { RouteAccessTypes } from 'routes/models';
import { withAccessGuard } from 'hocs/index';
import StyledProfileNavbar from './ProfileNavbar.style';
import { ProfileDashboardTabs } from '../../models';
import { ProfileNavbarProps } from './models';

const ProfileNavbar = ({ handleTabChange }: ProfileNavbarProps) => {
  const currentTab = useSelector(getSelectedDashboardTab);
  const navbarItems = useMemo(
    () => ({
      [ProfileDashboardTabs.DETAILS]: {
        action: () => {
          handleTabChange(ProfileDashboardTabs.DETAILS);
        },
        icon: faUser,
        itemName: 'Details',
        accessLevel: RouteAccessTypes.ONLY_ADMINS,
      },
      [ProfileDashboardTabs.EDIT]: {
        action: () => {
          handleTabChange(ProfileDashboardTabs.EDIT);
        },
        icon: faEdit,
        itemName: 'Edit',
        accessLevel: RouteAccessTypes.ONLY_ADMINS,
      },
      [ProfileDashboardTabs.ADD]: {
        action: () => {
          handleTabChange(ProfileDashboardTabs.ADD);
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
      ProfileDashboardTabs.DETAILS,
      ProfileDashboardTabs.EDIT,
      ProfileDashboardTabs.ADD,
    ];
    return generatedNavbarItemKeys.map((navbarItemKey: ProfileDashboardTabs) => {
      const tabItem = (
        <Button key={navbarItemKey} action={navbarItems[navbarItemKey].action}>
          <li className={currentTab === navbarItemKey ? 'focused' : ''}>
            <FontAwesomeIcon icon={navbarItems[navbarItemKey].icon} />
            <p>{navbarItems[navbarItemKey].itemName}</p>
          </li>
        </Button>
      );
      const Tab = withAccessGuard(tabItem, navbarItems[navbarItemKey].accessLevel);
      return <Tab key={navbarItemKey} />;
    });
  };

  return (
    <StyledProfileNavbar>
      <ul className="navbar-list">{renderNavbarItems()}</ul>
    </StyledProfileNavbar>
  );
};

export default ProfileNavbar;

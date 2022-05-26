import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faPlus, faL } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components';
import { getSelectedDashboardTab } from 'store/slices/orderManagerSlice/orderManagerSelectors';
import StyledOrdersFilterNavbar from './OrdersFilterNavbar.style';
import { OrdersFilterTabs } from '../../models';
import { OrdersFilterNavbarProps } from './models';

const OrdersNavbar = ({ handleTabChange }: OrdersFilterNavbarProps) => {
  const currentTab = useSelector(getSelectedDashboardTab);
  const navbarItems = useMemo(
    () => ({
      [OrdersFilterTabs.DOCTOR]: {
        action: () => {
          handleTabChange(OrdersFilterTabs.DOCTOR);
        },
        icon: null,
        itemName: 'Doctor',
      },
      [OrdersFilterTabs.PATIENT]: {
        action: () => {
          handleTabChange(OrdersFilterTabs.PATIENT);
        },
        icon: null,
        itemName: 'Patient',
      },
    }),
    []
  );

  const renderNavbarItems = () => {
    const generatedNavbarItemKeys = [OrdersFilterTabs.DOCTOR, OrdersFilterTabs.PATIENT];
    return generatedNavbarItemKeys.map((navbarItemKey: OrdersFilterTabs) => (
      <Button key={navbarItemKey} action={navbarItems[navbarItemKey].action}>
        <li className={currentTab === navbarItemKey ? 'focused' : ''}>
          {navbarItems[navbarItemKey].icon && (
            <FontAwesomeIcon icon={navbarItems[navbarItemKey].icon} />
          )}
          <p>{navbarItems[navbarItemKey].itemName}</p>
        </li>
      </Button>
    ));
  };

  return (
    <StyledOrdersFilterNavbar>
      <ul className="navbar-list">{renderNavbarItems()}</ul>
    </StyledOrdersFilterNavbar>
  );
};

export default OrdersNavbar;

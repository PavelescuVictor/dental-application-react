import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components';
import { getSelectedDashboardTab } from 'store/slices/orderManagerSlice/orderManagerSelectors';
import StyledOrdersNavbar from './OrdersNavbar.style';
import { OrdersDashboardTabs } from '../../models';
import { OrdersNavbarProps } from './models';

const OrdersNavbar = ({ handleTabChange }: OrdersNavbarProps) => {
  const currentTab = useSelector(getSelectedDashboardTab);
  const navbarItems = useMemo(
    () => ({
      [OrdersDashboardTabs.LIST]: {
        action: () => {
          handleTabChange(OrdersDashboardTabs.LIST);
        },
        icon: faList,
        itemName: 'List',
      },
      [OrdersDashboardTabs.DETAILS]: {
        action: () => {
          handleTabChange(OrdersDashboardTabs.DETAILS);
        },
        icon: faUser,
        itemName: 'Details',
      },
      [OrdersDashboardTabs.EDIT]: {
        action: () => {
          handleTabChange(OrdersDashboardTabs.EDIT);
        },
        icon: faEdit,
        itemName: 'Edit',
      },
      [OrdersDashboardTabs.ADD]: {
        action: () => {
          handleTabChange(OrdersDashboardTabs.ADD);
        },
        icon: faPlus,
        itemName: 'Add',
      },
    }),
    []
  );

  const renderNavbarItems = () => {
    const generatedNavbarItemKeys = [
      OrdersDashboardTabs.LIST,
      OrdersDashboardTabs.DETAILS,
      OrdersDashboardTabs.EDIT,
      OrdersDashboardTabs.ADD,
    ];
    return generatedNavbarItemKeys.map((navbarItemKey: OrdersDashboardTabs) => (
      <Button key={navbarItemKey} action={navbarItems[navbarItemKey].action}>
        <li className={currentTab === navbarItemKey ? 'focused' : ''}>
          <FontAwesomeIcon icon={navbarItems[navbarItemKey].icon} />
          <p>{navbarItems[navbarItemKey].itemName}</p>
        </li>
      </Button>
    ));
  };

  return (
    <StyledOrdersNavbar>
      <ul className="navbar-list">{renderNavbarItems()}</ul>
    </StyledOrdersNavbar>
  );
};

export default OrdersNavbar;

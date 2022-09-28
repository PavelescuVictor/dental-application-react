import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUser, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components';
import { getSelectedDashboardTab } from 'store/slices/orderManagerSlice/orderManagerSelectors';
import { selectIsAdmin } from 'store/slices/userManagerSlice/userManagerSelectors';
import StyledOrdersNavbar from './OrdersNavbar.style';
import {
  AllAccessOrdersTabsTypes,
  OnlyAdminOrdersTabsTypes,
  ordersTabsDisplayNames,
  OrdersTabsTypes,
} from '../../models';
import { OrdersNavbarProps } from './models';

const OrdersNavbar = ({ handleTabChange }: OrdersNavbarProps) => {
  const currentTab = useSelector(getSelectedDashboardTab);
  const isAdmin = useSelector(selectIsAdmin);
  const navbarItems = useMemo(
    () => ({
      [AllAccessOrdersTabsTypes.LIST]: {
        action: () => {
          handleTabChange(AllAccessOrdersTabsTypes.LIST);
        },
        icon: faList,
        itemName: ordersTabsDisplayNames.LIST,
      },
      [AllAccessOrdersTabsTypes.DETAILS]: {
        action: () => {
          handleTabChange(AllAccessOrdersTabsTypes.DETAILS);
        },
        icon: faUser,
        itemName: ordersTabsDisplayNames.DETAILS,
      },
      [OnlyAdminOrdersTabsTypes.EDIT]: {
        action: () => {
          handleTabChange(OnlyAdminOrdersTabsTypes.EDIT);
        },
        icon: faEdit,
        itemName: ordersTabsDisplayNames.EDIT,
      },
      [OnlyAdminOrdersTabsTypes.ADD]: {
        action: () => {
          handleTabChange(OnlyAdminOrdersTabsTypes.ADD);
        },
        icon: faPlus,
        itemName: ordersTabsDisplayNames.ADD,
      },
    }),
    []
  );

  const generateMenuListItem = (navbarItemKey: OrdersTabsTypes): JSX.Element | null => {
    const menuItem = navbarItems[navbarItemKey];
    if (!menuItem) return null;
    return (
      <Button key={navbarItemKey} action={navbarItems[navbarItemKey].action}>
        <li className={currentTab === navbarItemKey ? 'focused' : ''}>
          <FontAwesomeIcon icon={navbarItems[navbarItemKey].icon} />
          <p>{navbarItems[navbarItemKey].itemName}</p>
        </li>
      </Button>
    );
  };

  const shouldTabBeRendered = (key: OrdersTabsTypes): boolean => {
    if (key in OnlyAdminOrdersTabsTypes && !isAdmin) return false;
    return true;
  };

  const renderNavbarItems = () => {
    const generatedList: JSX.Element[] = [];

    const allAccessNavbarItemKeys = [
      AllAccessOrdersTabsTypes.LIST,
      AllAccessOrdersTabsTypes.DETAILS,
    ];
    const onlyAdminNavbarItemKeys = [OnlyAdminOrdersTabsTypes.ADD, OnlyAdminOrdersTabsTypes.EDIT];

    const routesKeys = [...allAccessNavbarItemKeys, ...onlyAdminNavbarItemKeys];

    routesKeys.forEach((key: OrdersTabsTypes) => {
      if (!shouldTabBeRendered(key)) return;
      const menuItem = generateMenuListItem(key);
      if (!menuItem) return;
      generatedList.push(menuItem);
    });

    return generatedList;
  };

  return (
    <StyledOrdersNavbar>
      <ul className="navbar-list">{renderNavbarItems()}</ul>
    </StyledOrdersNavbar>
  );
};

export default OrdersNavbar;

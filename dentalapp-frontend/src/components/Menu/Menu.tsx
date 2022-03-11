import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'components';
import selectors, {
  selectIsLoggedIn,
  selectIsAdmin,
} from 'store/slices/userManagerSlice/userManagerSelectors';
import {
  routePaths,
  RouteTypes,
  AllAccessRoutesTypes,
  OnlyAuthenticatedRoutesTypes,
  OnlyAdminRoutesTypes,
} from 'routes/models';
import StyledMenu from './Menu.style';

type MenuItemsValue = {
  displayName: string;
  route: string;
};

type MenuItems = {
  [key in RouteTypes]: MenuItemsValue | null;
};

const menuItems: MenuItems = {
  [AllAccessRoutesTypes.DEFAULT]: null,
  [AllAccessRoutesTypes.HOME]: { displayName: 'Home', route: routePaths.HOME },
  [AllAccessRoutesTypes.LOGIN]: { displayName: 'Login', route: routePaths.LOGIN },
  [AllAccessRoutesTypes.NOT_FOUND_PAGE]: {
    displayName: 'Not Found Page',
    route: routePaths.NOT_FOUND_PAGE,
  },
  [OnlyAuthenticatedRoutesTypes.DOCTORS]: { displayName: 'Doctors', route: routePaths.DOCTORS },
  [OnlyAuthenticatedRoutesTypes.PATIENTS]: { displayName: 'Patients', route: routePaths.PATIENTS },
  [OnlyAuthenticatedRoutesTypes.ORDERS]: { displayName: 'Orders', route: routePaths.ORDERS },
  [OnlyAdminRoutesTypes.ADMIN_PAGE]: { displayName: 'Admin', route: routePaths.ADMIN_PAGE },
  [OnlyAuthenticatedRoutesTypes.LOGOUT]: { displayName: 'Logout', route: routePaths.LOGOUT },
  [OnlyAuthenticatedRoutesTypes.PROFILE]: { displayName: 'Profile', route: routePaths.PROFILE },
};

const Menu = (): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const navigate = useNavigate();

  const handleOnClickEvent = (redirectPath: string) => navigate(redirectPath);

  const generateMenuListItem = (menuItemKey: RouteTypes): JSX.Element | null => {
    const menuItem = menuItems[menuItemKey];
    if (!menuItem) return null;
    return (
      <li key={menuItemKey}>
        <Link to={menuItem.route} onClick={() => handleOnClickEvent(menuItem.route)}>
          {menuItem.displayName}
        </Link>
      </li>
    );
  };

  const generateMenuList = (): JSX.Element[] => {
    const generatedList: JSX.Element[] = [];
    const allAccessRoutesKeys = [AllAccessRoutesTypes.HOME, AllAccessRoutesTypes.LOGIN];
    const onlyAuthenticatedRoutesKeys = [
      OnlyAuthenticatedRoutesTypes.DOCTORS,
      OnlyAuthenticatedRoutesTypes.PATIENTS,
      OnlyAuthenticatedRoutesTypes.ORDERS,
      OnlyAuthenticatedRoutesTypes.LOGOUT,
      OnlyAuthenticatedRoutesTypes.PROFILE,
    ];

    const onlyAdminRoutesKeys = [OnlyAdminRoutesTypes.ADMIN_PAGE];

    allAccessRoutesKeys.forEach((key: RouteTypes) => {
      if (
        (key === AllAccessRoutesTypes.LOGIN && isLoggedIn) ||
        key === AllAccessRoutesTypes.DEFAULT
      )
        return '';
      const item = generateMenuListItem(key);
      if (!item) return '';
      return generatedList.push(item);
    });

    onlyAuthenticatedRoutesKeys.forEach((key: RouteTypes) => {
      if (
        (key === OnlyAuthenticatedRoutesTypes.LOGOUT ||
          key === OnlyAuthenticatedRoutesTypes.PROFILE) &&
        !isLoggedIn
      )
        return '';
      const item = generateMenuListItem(key);
      if (!item) return '';
      return generatedList.push(item);
    });

    onlyAdminRoutesKeys.forEach((key: RouteTypes) => {
      if (key === OnlyAdminRoutesTypes.ADMIN_PAGE && !isAdmin) return '';
      const item = generateMenuListItem(key);
      if (!item) return '';
      return generatedList.push(item);
    });
    return generatedList;
  };

  return (
    <StyledMenu>
      <ul className="menu__content">{generateMenuList().map((item: JSX.Element) => item)}</ul>
    </StyledMenu>
  );
};

export default Menu;

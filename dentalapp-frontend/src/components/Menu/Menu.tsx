import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'components';
import {
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
  [key in RouteTypes]: MenuItemsValue;
};

const menuItems: MenuItems = {
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
  // const isAdmin = useSelector(selectIsAdmin);
  const isAdmin = false;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const handleOnClickEvent = (redirectPath: string) => navigate(redirectPath);

  const generateMenuListItem = (menuItemKey: RouteTypes): JSX.Element => (
    <li key={menuItemKey}>
      <Link
        to={menuItems[menuItemKey].route}
        onClick={() => handleOnClickEvent(menuItems[menuItemKey].route)}
      >
        {menuItems[menuItemKey].displayName}
      </Link>
    </li>
  );

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
      if (key === AllAccessRoutesTypes.LOGIN && isLoggedIn) return '';
      return generatedList.push(generateMenuListItem(key));
    });

    onlyAuthenticatedRoutesKeys.forEach((key: RouteTypes) => {
      if (
        (key === OnlyAuthenticatedRoutesTypes.LOGOUT ||
          key === OnlyAuthenticatedRoutesTypes.PROFILE) &&
        !isLoggedIn
      )
        return '';
      return generatedList.push(generateMenuListItem(key));
    });

    onlyAdminRoutesKeys.forEach((key: RouteTypes) => {
      if (key === OnlyAdminRoutesTypes.ADMIN_PAGE && !isAdmin) return '';
      return generatedList.push(generateMenuListItem(key));
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

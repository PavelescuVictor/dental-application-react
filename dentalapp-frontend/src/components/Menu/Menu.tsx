import StyledMenu from './Menu.style';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from 'components';
import {
  selectIsLoggedIn,
  selectIsAdmin,
} from 'store/slices/userManagerSlice/userManagerSelectors';

enum MainMenuItems {
  HOME = 'HOME',
  DOCTORS = 'DOCTORS',
  PATIENTS = 'PATIENTS',
  ORDERS = 'ORDERS',
}

enum UserRelatedMenuItems {
  ADMIN_PAGE = 'ADMIN_PAGE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PROFILE = 'PROFILE',
}

enum MainRoutes {
  HOME = 'HOME',
  DOCTORS = 'DOCTORS',
  PATIENTS = 'PATIENTS',
  ORDERS = 'ORDERS',
}

type MainRoutePaths = {
  [key in keyof typeof MainRoutes]: string;
};

const mainRoutePaths: MainRoutePaths = {
  [MainRoutes.HOME]: '/home',
  [MainRoutes.DOCTORS]: '/doctors',
  [MainRoutes.PATIENTS]: '/patients',
  [MainRoutes.ORDERS]: '/orders',
};

enum UserRoutes {
  ADMIN_PAGE = 'ADMIN_PAGE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PROFILE = 'PROFILE',
}

type UserRoutePaths = {
  [key in keyof typeof UserRoutes]: string;
};

const userRoutePaths: UserRoutePaths = {
  [UserRoutes.ADMIN_PAGE]: '/admin-page',
  [UserRoutes.LOGIN]: '/login',
  [UserRoutes.LOGOUT]: '/logout',
  [UserRoutes.PROFILE]: '/profile',
};

type RoutePaths = MainRoutePaths & UserRoutePaths;

const routePaths: RoutePaths = {
  ...mainRoutePaths,
  ...userRoutePaths,
};

type MenuItemsValue = {
  displayName: string;
  route: string;
};

type MenuItems = {
  [key in keyof typeof MainMenuItems | keyof typeof UserRelatedMenuItems]: MenuItemsValue;
};

const menuItems: MenuItems = {
  [MainMenuItems.HOME]: { displayName: 'Home', route: routePaths.HOME },
  [MainMenuItems.DOCTORS]: { displayName: 'Doctors', route: routePaths.DOCTORS },
  [MainMenuItems.PATIENTS]: { displayName: 'Patients', route: routePaths.PATIENTS },
  [MainMenuItems.ORDERS]: { displayName: 'Orders', route: routePaths.ORDERS },
  [UserRelatedMenuItems.ADMIN_PAGE]: { displayName: 'Admin', route: routePaths.ADMIN_PAGE },
  [UserRelatedMenuItems.LOGIN]: { displayName: 'Login', route: routePaths.LOGIN },
  [UserRelatedMenuItems.LOGOUT]: { displayName: 'Logout', route: routePaths.LOGOUT },
  [UserRelatedMenuItems.PROFILE]: { displayName: 'Profile', route: routePaths.PROFILE },
};

const Menu = (): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isAdmin = useSelector(selectIsAdmin);
  const isAdmin = false;
  const navigate = useNavigate();

  const handleOnClickEvent = (redirectPath: string) => navigate(redirectPath);

  const generateMenuListItem = (menuItemKey: MainMenuItems | UserRelatedMenuItems): JSX.Element => {
    return (
      <li key={menuItemKey}>
        <Link
          to={menuItems[menuItemKey].route}
          onClick={() => handleOnClickEvent(menuItems[menuItemKey].route)}
        >
          {menuItems[menuItemKey].displayName}
        </Link>
      </li>
    );
  };

  const generateMenuList = (): JSX.Element[] => {
    let generatedList: JSX.Element[] = [];
    const mainMenuKeys = [
      MainMenuItems.HOME,
      MainMenuItems.DOCTORS,
      MainMenuItems.PATIENTS,
      MainMenuItems.ORDERS,
    ];
    const userRelatedMenuItems = [
      UserRelatedMenuItems.ADMIN_PAGE,
      UserRelatedMenuItems.LOGIN,
      UserRelatedMenuItems.LOGOUT,
      UserRelatedMenuItems.PROFILE,
    ];

    mainMenuKeys.forEach((key: MainMenuItems) => generatedList.push(generateMenuListItem(key)));

    userRelatedMenuItems.forEach((key: UserRelatedMenuItems) => {
      if (key === UserRelatedMenuItems.ADMIN_PAGE && !isAdmin) return '';
      if (key === UserRelatedMenuItems.LOGIN && isLoggedIn) return '';
      if (key === UserRelatedMenuItems.LOGOUT && !isLoggedIn) return '';
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

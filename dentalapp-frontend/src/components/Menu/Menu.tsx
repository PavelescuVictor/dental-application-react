import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'components';
import {
  selectIsLoggedIn,
  selectIsAdmin,
} from 'store/slices/userManagerSlice/userManagerSelectors';
import {
  RouteTypes,
  AllAccessRoutesTypes,
  OnlyAuthenticatedRoutesTypes,
  OnlyAdminRoutesTypes,
} from 'routes/models';
import { menuItems, preferredMenuOrder } from './models';
import StyledMenu from './Menu.style';

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

  const shouldKeyBeRendered = (key: RouteTypes): boolean => {
    if ((key === AllAccessRoutesTypes.LOGIN && isLoggedIn) || key === AllAccessRoutesTypes.DEFAULT)
      return false;
    if (key in OnlyAuthenticatedRoutesTypes && !isLoggedIn) return false;
    if (key in OnlyAdminRoutesTypes && !isAdmin) return false;
    return true;
  };

  const generateMenuList = (): JSX.Element[] => {
    const generatedList: JSX.Element[] = [];
    const allAccessRoutesKeys = [AllAccessRoutesTypes.HOME, AllAccessRoutesTypes.LOGIN];
    const onlyAuthenticatedRoutesKeys = [
      OnlyAuthenticatedRoutesTypes.ORDERS,
      OnlyAuthenticatedRoutesTypes.PROFILE,
      OnlyAuthenticatedRoutesTypes.LOGOUT,
    ];

    const onlyAdminRoutesKeys = [
      OnlyAdminRoutesTypes.ADMIN_PAGE,
      OnlyAdminRoutesTypes.DOCTORS,
      // OnlyAdminRoutesTypes.PATIENTS,
    ];

    const routesKeys = [
      ...allAccessRoutesKeys,
      ...onlyAuthenticatedRoutesKeys,
      ...onlyAdminRoutesKeys,
    ];

    const orderedRoutesKeys = routesKeys.sort(
      (firstKey: RouteTypes, secondKey: RouteTypes) =>
        preferredMenuOrder[firstKey] - preferredMenuOrder[secondKey]
    );

    orderedRoutesKeys.forEach((key: RouteTypes) => {
      if (!shouldKeyBeRendered(key)) return;
      const menuItem = generateMenuListItem(key);
      if (!menuItem) return;
      generatedList.push(menuItem);
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

import { Route, useNavigate } from 'react-router-dom';
import Login from 'modules/login';
import {
  selectIsAdmin,
  selectIsLoggedIn,
} from 'store/slices/userManagerSlice/userManagerSelectors';
import { useSelector } from 'react-redux';
import NotFoundPage from 'modules/notFoundPage';
import { ProtectedRouteProps, RouteAccessTypes, RouteAccesLevels, routePaths } from './models';

const ProtectedRoute = ({
  path,
  element,
  routeType,
  ...rest
}: ProtectedRouteProps): JSX.Element => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //   const isAdmin = useSelector(selectIsAdmin);
  const isAdmin = false;

  const getRedirectElement = () => {
    const routeAccessLevel = RouteAccesLevels[routeType];
    switch (routeAccessLevel) {
      case RouteAccessTypes.ALL_ACCESS:
        return element;
        break;
      case RouteAccessTypes.ONLY_ADMINS:
        if (isAdmin) return element;
        navigate(routePaths.HOME);
        break;
      case RouteAccessTypes.ONLY_AUTHENTICATED:
        if (isLoggedIn) return element;
        return <Login />;
        break;
      default:
        break;
    }
    return <NotFoundPage />;
  };

  return <Route path={path} element={getRedirectElement()} {...rest} />;
};

export default ProtectedRoute;

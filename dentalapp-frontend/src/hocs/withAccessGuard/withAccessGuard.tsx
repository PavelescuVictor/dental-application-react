import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RouteAccessTypes, routePaths } from 'routes/models';
import {
  selectIsLoggedIn,
  selectIsAdmin,
} from 'store/slices/userManagerSlice/userManagerSelectors';

const withAccessGuard = (
  Component: JSX.Element,
  accessLevel: RouteAccessTypes = RouteAccessTypes.ALL_ACCESS
): (() => JSX.Element) => {
  const ReturnedComponent = (): JSX.Element => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAdmin = useSelector(selectIsAdmin);

    switch (accessLevel) {
      case RouteAccessTypes.ALL_ACCESS:
        return Component;
        break;
      case RouteAccessTypes.ONLY_AUTHENTICATED:
        if (!isLoggedIn) <Navigate to={routePaths.LOGIN} />;
        return Component;
        break;
      case RouteAccessTypes.ONLY_ADMINS:
        if (!isLoggedIn) return <Navigate to={routePaths.LOGIN} />;
        if (!isAdmin) return <Navigate to={routePaths.HOME} />;
        return Component;
        break;
      default:
        break;
    }

    return <></>;
  };
  return ReturnedComponent;
};

withAccessGuard.displayName = 'withAccessGuard';

export default withAccessGuard;

import { ElementType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RouteAccessTypes, routePaths } from 'routes/models';
import {
  selectIsLoggedIn,
  selectIsAdmin,
} from 'store/slices/userManagerSlice/userManagerSelectors';

const withAccessControl = (
  Component: ElementType,
  accessLevel: RouteAccessTypes = RouteAccessTypes.ALL_ACCESS
) => {
  const ReturnedComponent = (props: Record<string, unknown>): JSX.Element => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAdmin = useSelector(selectIsAdmin);

    switch (accessLevel) {
      case RouteAccessTypes.ALL_ACCESS:
        return <Component {...props} />;
        break;
      case RouteAccessTypes.ONLY_AUTHENTICATED:
        if (!isLoggedIn) <Navigate to={routePaths.LOGIN} />;
        return <Component {...props} />;
        break;
      case RouteAccessTypes.ONLY_ADMINS:
        if (!isLoggedIn) return <Navigate to={routePaths.LOGIN} />;
        if (!isAdmin) return <Navigate to={routePaths.HOME} />;
        return <Component {...props} />;
        break;
      default:
        break;
    }

    return <></>;
  };
  return ReturnedComponent;
};

withAccessControl.displayName = 'WithAccessControl';

export default withAccessControl;

import { ElementType, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
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
        console.log(accessLevel, Component);
        return <Component {...props} />;
        break;
      case RouteAccessTypes.ONLY_AUTHENTICATED:
        console.log(accessLevel, Component);
        if (isLoggedIn) return <Component {...props} />;
        return <Navigate to={routePaths.LOGIN} />;
        break;
      case RouteAccessTypes.ONLY_ADMINS:
        console.log(accessLevel, Component);
        if (isAdmin) return <Component {...props} />;
        return <Navigate to={routePaths.HOME} />;
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

import { ElementType } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    switch (accessLevel) {
      case RouteAccessTypes.ALL_ACCESS:
        return <Component {...props} />;
        break;
      case RouteAccessTypes.ONLY_AUTHENTICATED:
        if (isLoggedIn) return <Component {...props} />;
        navigate(routePaths.LOGIN);
        break;
      case RouteAccessTypes.ONLY_ADMINS:
        if (isAdmin) return <Component {...props} />;
        navigate(routePaths.HOME);
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

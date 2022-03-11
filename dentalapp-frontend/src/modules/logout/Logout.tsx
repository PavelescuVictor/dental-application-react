import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes, routePaths } from 'routes/models';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { userManagerAsyncThunks } from 'store/slices/userManagerSlice/userManager';
import { selectIsLoggedIn } from 'store/slices/userManagerSlice/userManagerSelectors';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { useNavigate } from 'react-router';

const Logout = (): null => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(routePaths.HOME);
      return;
    }

    dispatch(userManagerAsyncThunks.logout())
      .unwrap()
      .then((response: any) => {
        const alertPayload = {
          alertMessage: 'You logged out successfully',
          alertType: AlertTypes.SUCCESS,
        };
        dispatch(alertManagerActions.setAlertData(alertPayload));
        navigate(routePaths.HOME);
      })
      .catch((error: any) => {
        const alertPayload = {
          alertMessage: error.message,
          alertType: AlertTypes.SUCCESS,
        };
        dispatch(alertManagerActions.setAlertData(alertPayload));
      });
  }, []);

  return null;
};

export default withAccessControl(Logout, RouteAccessTypes.ALL_ACCESS);

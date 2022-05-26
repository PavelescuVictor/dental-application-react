import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import {
  orderManagerActions,
  orderManagerAsyncThunk,
} from 'store/slices/orderManagerSlice/orderManager';
import {
  selectOrders,
  selectIsLoadingOrders,
  selectHasErrorLoadingOrders,
} from 'store/slices/orderManagerSlice/orderManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { ALERT_DEFAULT_TIME } from 'store/slices/alertManagerSlice/constants';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { Loader } from 'components';
import { useEffect } from 'react';
import { CustomTable, Toolbar } from './components';
import StyledOrdersList from './OrdersList.style';

const OrdersList = () => {
  const dispatch = useAppDispatch();
  const orders = useSelector(selectOrders);
  const isLoadingOrdersData = useSelector(selectIsLoadingOrders);
  const hasErrorLoadingOrders = useSelector(selectHasErrorLoadingOrders);

  useEffect(() => {
    dispatch(orderManagerActions.resetSelectedOrder());
    try {
      dispatch(orderManagerAsyncThunk.requestOrders());
      const alert = {
        alertMessage: 'Orders data received',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      setTimeout(() => dispatch(alertManagerActions.setIsVisible(false)), ALERT_DEFAULT_TIME);
    } catch (error: any) {
      const alert = {
        alertMessage: 'Error while loading orders data',
        alertType: AlertTypes.ERROR,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      setTimeout(() => dispatch(alertManagerActions.setIsVisible(false)), ALERT_DEFAULT_TIME);
    }
  }, []);

  useEffect(() => {
    // Handle Throw Error when request fails and catch it inside Error Boundary
  }, [hasErrorLoadingOrders]);

  return (
    <StyledOrdersList>
      {isLoadingOrdersData ? (
        <Loader />
      ) : (
        <div className="list__wrapper">
          <Toolbar />
          <CustomTable data={orders} />
        </div>
      )}
    </StyledOrdersList>
  );
};

export default OrdersList;

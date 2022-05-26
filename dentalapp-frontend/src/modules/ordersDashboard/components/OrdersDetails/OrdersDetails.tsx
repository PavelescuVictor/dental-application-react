import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getSelectedOrderData,
  getSelectedOrder,
} from 'store/slices/orderManagerSlice/orderManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import { useAppDispatch } from 'store/store';
import { Order } from 'store/slices/orderManagerSlice/models';
import { RootState } from 'store/models';
import StyledOrdersDetails from './OrdersDetails.style';

const OrdersDetails = () => {
  const dispatch = useAppDispatch();
  const orderData = useSelector<RootState, Order>(getSelectedOrderData);
  const selectedOrderId = useSelector(getSelectedOrder);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    if (selectedOrderId) {
      const alert = {
        alertMessage: 'Loaded details successfully',
        alertType: AlertTypes.SUCCESS,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      setShowDetails(true);
    } else {
      const alert = {
        alertMessage: 'No order selected',
        alertType: AlertTypes.WARNING,
      };
      dispatch(alertManagerActions.setAlertData(alert));
      setShowDetails(false);
    }
  }, []);

  return (
    <StyledOrdersDetails>
      {showDetails && (
        <div className="ordersDetails">
          <div className="content">
            <div className="card__wrapper">
              <div className="list__wrapper">
                <ul className="list__content">
                  <li>
                    <p>Doctor name</p>
                    <p>{orderData.doctorName}</p>
                  </li>
                  <li>
                    <p>Patient name</p>
                    <p>{orderData.patientName}</p>
                  </li>
                  <li>
                    <p>Paid</p>
                    <p>{orderData.paid}</p>
                  </li>
                  <li>
                    <p>Redo</p>
                    <p>{orderData.paid}</p>
                  </li>
                  <li>
                    <p>Created At</p>
                    <p>{new Date(orderData.createdAt).toLocaleString()}</p>
                  </li>
                  <li>
                    <p>Updated At</p>
                    <p>{new Date(orderData.updatedAt).toLocaleString()}</p>
                  </li>
                  <li>
                    <p>Created By</p>
                    <p>{orderData.createdBy}</p>
                  </li>
                  <li>
                    <p>Updated By</p>
                    <p>{orderData.updatedBy}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledOrdersDetails>
  );
};

export default withAccessControl(OrdersDetails, RouteAccessTypes.ONLY_ADMINS);

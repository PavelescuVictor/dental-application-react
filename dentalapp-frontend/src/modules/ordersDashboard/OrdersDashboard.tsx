import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes, routePaths } from 'routes/models';
import { orderManagerActions } from 'store/slices/orderManagerSlice/orderManager';
import { getSelectedDashboardTab } from 'store/slices/orderManagerSlice/orderManagerSelectors';
import { useAppDispatch } from 'store/store';
import { Background } from 'components';
import { OrdersList, OrdersEdit, OrdersDetails, OrdersNavbar } from './components';
import StyledOrdersDashboard from './OrdersDashboard.style';
import { AllAccessOrdersTabsTypes, OnlyAdminOrdersTabsTypes, OrdersTabsTypes } from './models';

const OrdersDashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeTab = useSelector(getSelectedDashboardTab);
  const navigate = useNavigate();
  const handleTabChange = (newTab: OrdersTabsTypes) => {
    dispatch(orderManagerActions.setSelectedDashboardTab(newTab));
  };

  useEffect(() => {
    dispatch(orderManagerActions.setSelectedDashboardTab(AllAccessOrdersTabsTypes.LIST));
    navigate(routePaths.ORDERS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = useCallback((currentTab: OrdersTabsTypes): JSX.Element => {
    let contentToRender = <></>;

    switch (currentTab) {
      case AllAccessOrdersTabsTypes.LIST:
        contentToRender = (
          <div className="dashboard__list">
            <OrdersList />
          </div>
        );
        break;
      case OnlyAdminOrdersTabsTypes.DETAILS:
        contentToRender = (
          <div className="dashboard__details">
            <OrdersDetails />
          </div>
        );
        break;
      case OnlyAdminOrdersTabsTypes.EDIT:
        contentToRender = (
          <div className="dashboard__edit">
            <OrdersEdit />
          </div>
        );
        break;
      case OnlyAdminOrdersTabsTypes.ADD:
        contentToRender = <Navigate to="/add-order" />;
        break;
      default:
        break;
    }
    return contentToRender;
  }, []);

  return (
    <StyledOrdersDashboard className="dashboard">
      <Background />
      <div className="dashboard__content">
        <OrdersNavbar handleTabChange={handleTabChange} />
        <div className="content__wrapper">{renderContent(activeTab)}</div>
      </div>
    </StyledOrdersDashboard>
  );
};

export default withAccessControl(OrdersDashboard, RouteAccessTypes.ONLY_AUTHENTICATED);

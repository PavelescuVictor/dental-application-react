import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes, routePaths } from 'routes/models';
import svgAssets from 'assets/images';
import { orderManagerActions } from 'store/slices/orderManagerSlice/orderManager';
import { getSelectedDashboardTab } from 'store/slices/orderManagerSlice/orderManagerSelectors';
import { useAppDispatch } from 'store/store';
import { OrdersFilterNavbar } from './components';
import StyledOrdersFilter from './OrdersFilter.style';
import { OrdersFilterTabs } from './models';

const { Background } = svgAssets;

const OrdersFilter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeTab = useSelector(getSelectedDashboardTab);
  const navigate = useNavigate();
  const handleTabChange = (newTab: OrdersFilterTabs) => {
    dispatch(orderManagerActions.setSelectedDashboardTab(newTab));
  };

  useEffect(() => {
    dispatch(orderManagerActions.setSelectedDashboardTab(OrdersFilterTabs.DOCTOR));
    navigate(routePaths.ORDERS);
  }, []);

  const renderContent = useCallback((currentTab: OrdersFilterTabs): JSX.Element => {
    let contentToRender = <></>;

    switch (currentTab) {
      case OrdersFilterTabs.LIST:
        contentToRender = (
          <div className="dashboard__list">
            <OrdersList />
          </div>
        );
        break;
      case OrdersFilterTabs.DETAILS:
        contentToRender = (
          <div className="dashboard__details">
            <OrdersDetails />
          </div>
        );
        break;
      case OrdersFilterTabs.EDIT:
        contentToRender = (
          <div className="dashboard__edit">
            <OrdersEdit />
          </div>
        );
        break;
      case OrdersFilterTabs.ADD:
        contentToRender = <Navigate to="/add-order" />;
        break;
      default:
        break;
    }
    return contentToRender;
  }, []);

  return (
    <StyledOrdersFilter className="dashboard">
      <Background className="background" />
      <div className="dashboard__content">
        <OrdersNavbar handleTabChange={handleTabChange} />
        <div className="content__wrapper">{renderContent(activeTab)}</div>
      </div>
    </StyledOrdersFilter>
  );
};

export default withAccessControl(OrdersFilter, RouteAccessTypes.ONLY_AUTHENTICATED);

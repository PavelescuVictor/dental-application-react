import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes, routePaths } from 'routes/models';
import { doctorManagerActions } from 'store/slices/doctorManagerSlice/doctorManager';
import { getSelectedDashboardTab } from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { useAppDispatch } from 'store/store';
import { Background } from 'components';
import { DoctorsList, DoctorsEdit, DoctorsDetails, DoctorsNavbar } from './components';
import StyledDoctorsDashboard from './DoctorsDashboard.style';
import { DoctorsDashboardTabs } from './models';

const DoctorsDashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeTab = useSelector(getSelectedDashboardTab);
  const navigate = useNavigate();
  const handleTabChange = (newTab: DoctorsDashboardTabs) => {
    dispatch(doctorManagerActions.setSelectedDashboardTab(newTab));
  };

  useEffect(() => {
    dispatch(doctorManagerActions.setSelectedDashboardTab(DoctorsDashboardTabs.LIST));
    navigate(routePaths.DOCTORS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = useCallback((currentTab: DoctorsDashboardTabs): JSX.Element => {
    let contentToRender = <></>;

    switch (currentTab) {
      case DoctorsDashboardTabs.LIST:
        contentToRender = (
          <div className="dashboard__list">
            <DoctorsList />
          </div>
        );
        break;
      case DoctorsDashboardTabs.DETAILS:
        contentToRender = (
          <div className="dashboard__details">
            <DoctorsDetails />
          </div>
        );
        break;
      case DoctorsDashboardTabs.EDIT:
        contentToRender = (
          <div className="dashboard__edit">
            <DoctorsEdit />
          </div>
        );
        break;
      case DoctorsDashboardTabs.ADD:
        contentToRender = <Navigate to="/add-doctor" />;
        break;
      default:
        break;
    }
    return contentToRender;
  }, []);

  return (
    <StyledDoctorsDashboard className="dashboard">
      <Background />
      <div className="dashboard__content">
        <DoctorsNavbar handleTabChange={handleTabChange} />
        <div className="content__wrapper">{renderContent(activeTab)}</div>
      </div>
    </StyledDoctorsDashboard>
  );
};

export default withAccessControl(DoctorsDashboard, RouteAccessTypes.ONLY_ADMINS);

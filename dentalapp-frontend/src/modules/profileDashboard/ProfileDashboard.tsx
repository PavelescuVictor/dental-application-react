import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes, routePaths } from 'routes/models';
import { getSelectedDashboardTab } from 'store/slices/profileManagerSlice/profileManagerSelectors';
import { profileManagerActions } from 'store/slices/profileManagerSlice/profileManager';
import { useAppDispatch } from 'store/store';
import { Background } from 'components';
import { ProfileList, ProfileEdit, ProfileDetails, ProfileNavbar } from './components';
import StyledProfileDashboard from './ProfileDashboard.style';
import { ProfileDashboardTabs } from './models';

const ProfileDashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector(getSelectedDashboardTab);
  const handleTabChange = (newTab: ProfileDashboardTabs) => {
    dispatch(profileManagerActions.setSelectedDashboardTab(newTab));
  };

  useEffect(() => {
    dispatch(profileManagerActions.setSelectedDashboardTab(ProfileDashboardTabs.DETAILS));
    navigate(routePaths.PROFILE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = useCallback((currentTab: ProfileDashboardTabs): JSX.Element => {
    let contentToRender = <></>;

    switch (currentTab) {
      case ProfileDashboardTabs.DETAILS:
        contentToRender = (
          <div className="dashboard__details">
            <ProfileDetails />
          </div>
        );
        break;
      case ProfileDashboardTabs.EDIT:
        contentToRender = (
          <div className="dashboard__edit">
            <ProfileEdit />
          </div>
        );
        break;
      case ProfileDashboardTabs.ADD:
        contentToRender = <Navigate to="/add-profile" />;
        break;
      default:
        break;
    }
    return contentToRender;
  }, []);

  return (
    <StyledProfileDashboard className="dashboard">
      <Background />
      <div className="dashboard__content">
        <ProfileNavbar handleTabChange={handleTabChange} />
        <div className="content__wrapper">{renderContent(activeTab)}</div>
      </div>
    </StyledProfileDashboard>
  );
};

export default withAccessControl(ProfileDashboard, RouteAccessTypes.ONLY_ADMINS);

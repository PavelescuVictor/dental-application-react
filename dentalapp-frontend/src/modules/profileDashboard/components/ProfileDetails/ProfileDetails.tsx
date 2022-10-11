import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProfileDetails } from 'store/slices/profileManagerSlice/profileManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { ALERT_DEFAULT_TIME } from 'store/slices/alertManagerSlice/constants';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { profileManagerAsyncThunk } from 'store/slices/profileManagerSlice/profileManager';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import { useAppDispatch } from 'store/store';
import { ProfileDetails } from 'store/slices/profileManagerSlice/models';
import { RootState } from 'store/models';
import StyledProfileDetails from './ProfileDetails.style';

const ProfileDetails = () => {
  const dispatch = useAppDispatch();
  const profileDetails = useSelector<RootState, ProfileDetails>(getProfileDetails);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleRequestProfileDetails = async () => {
    await dispatch(profileManagerAsyncThunk.requestProfileDetails());
    const alert = {
      alertMessage: 'Loaded details successfully',
      alertType: AlertTypes.SUCCESS,
    };
    dispatch(alertManagerActions.clearHideInterval());
    dispatch(alertManagerActions.setAlertData(alert));
    dispatch(
      alertManagerActions.setHideInterval({
        hideIntervalId: setTimeout(() => {
          dispatch(alertManagerActions.resetAlert());
        }, ALERT_DEFAULT_TIME),
      })
    );
    setShowDetails(true);
  };

  useEffect(() => {
    try {
      handleRequestProfileDetails();
    } catch (error: any) {
      const alert = {
        alertMessage: "Error while loading profile's info",
        alertType: AlertTypes.ERROR,
      };
      dispatch(alertManagerActions.clearHideInterval());
      dispatch(alertManagerActions.setAlertData(alert));
      dispatch(
        alertManagerActions.setHideInterval({
          hideIntervalId: setTimeout(() => {
            dispatch(alertManagerActions.resetAlert());
          }, ALERT_DEFAULT_TIME),
        })
      );
      setShowDetails(false);
    }
  }, []);

  const renderDetailsTable = () => {
    const rowsToRender = [
      { name: 'First Name', value: profileDetails.firstName },
      { name: 'Last Name', value: profileDetails.lastName },
      { name: 'Created At', value: new Date(profileDetails.createdAt).toLocaleString() },
      { name: 'Updated At', value: new Date(profileDetails.updatedAt).toLocaleString() },
      { name: 'Created By', value: profileDetails.createdByName },
      { name: 'Updated By', value: profileDetails.updatedByName },
    ];

    return rowsToRender.map((row) => (
      <li key={row.name}>
        <p>{row.name}</p>
        <p className={`${!row.value && 'no-data'}`}>
          {row.value ? row.value : 'No available data'}
        </p>
      </li>
    ));
  };

  return (
    <StyledProfileDetails>
      {showDetails && (
        <div className="profileDetails">
          <div className="content">
            <div className="card__wrapper">
              <div className="list__wrapper">
                <ul className="list__content">{renderDetailsTable()}</ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledProfileDetails>
  );
};

export default withAccessControl(ProfileDetails, RouteAccessTypes.ONLY_ADMINS);

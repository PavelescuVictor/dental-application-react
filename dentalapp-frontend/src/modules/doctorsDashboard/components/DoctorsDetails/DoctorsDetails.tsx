import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDoctorDetails,
  getDoctorInfo,
  getSelectedDoctor,
} from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { ALERT_DEFAULT_TIME } from 'store/slices/alertManagerSlice/constants';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { doctorManagerAsyncThunk } from 'store/slices/doctorManagerSlice/doctorManager';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import { useAppDispatch } from 'store/store';
import { DoctorDetails, DoctorInfo } from 'store/slices/doctorManagerSlice/models';
import { RootState } from 'store/models';
import StyledDoctorDetails from './DoctorsDetails.style';

const DoctorsDetails = () => {
  const dispatch = useAppDispatch();
  const doctorDetails = useSelector<RootState, DoctorDetails>(getDoctorDetails);
  const doctorInfo = useSelector<RootState, DoctorInfo>(getDoctorInfo);

  const selectedDoctorId = useSelector(getSelectedDoctor);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleRequestSelectedDoctorDetails = async () => {
    await dispatch(doctorManagerAsyncThunk.requestSelectedDoctorDetails({ id: selectedDoctorId }));
    await dispatch(doctorManagerAsyncThunk.requestSelectedDoctorInfo({ id: selectedDoctorId }));
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
    if (selectedDoctorId) {
      try {
        handleRequestSelectedDoctorDetails();
      } catch (error: any) {
        const alert = {
          alertMessage: "Error while loading doctor's info",
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
    } else {
      const alert = {
        alertMessage: 'No doctor selected',
        alertType: AlertTypes.WARNING,
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
      { name: 'First Name', value: doctorDetails.firstName },
      { name: 'Last Name', value: doctorDetails.lastName },
      { name: 'Cabinet', value: doctorInfo ? doctorInfo.cabinet : null },
      { name: 'Phone', value: doctorInfo ? doctorInfo.phone : null },
      { name: 'Created At', value: new Date(doctorDetails.createdAt).toLocaleString() },
      { name: 'Updated At', value: new Date(doctorDetails.updatedAt).toLocaleString() },
      { name: 'Created By', value: doctorDetails.createdByName },
      { name: 'Updated By', value: doctorDetails.updatedByName },
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
    <StyledDoctorDetails>
      {showDetails && (
        <div className="doctorDetails">
          <div className="content">
            <div className="card__wrapper">
              <div className="list__wrapper">
                <ul className="list__content">{renderDetailsTable()}</ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledDoctorDetails>
  );
};

export default withAccessControl(DoctorsDetails, RouteAccessTypes.ONLY_ADMINS);

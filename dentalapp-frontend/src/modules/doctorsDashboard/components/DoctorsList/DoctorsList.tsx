import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import {
  doctorManagerActions,
  doctorManagerAsyncThunk,
} from 'store/slices/doctorManagerSlice/doctorManager';
import {
  selectDoctors,
  selectIsLoadingDoctors,
  selectHasErrorLoadingDoctors,
} from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { ALERT_DEFAULT_TIME } from 'store/slices/alertManagerSlice/constants';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { Loader } from 'components';
import { useEffect } from 'react';
import { CustomTable, Toolbar } from './components';
import StyledDoctorsList from './DoctorsList.style';

const DoctorsList = () => {
  const dispatch = useAppDispatch();
  const doctors = useSelector(selectDoctors);
  const isLoadingDoctorsData = useSelector(selectIsLoadingDoctors);
  const hasErrorLoadingDoctors = useSelector(selectHasErrorLoadingDoctors);

  useEffect(() => {
    dispatch(doctorManagerActions.resetSelectedDoctor());
    try {
      dispatch(doctorManagerAsyncThunk.requestDoctors());
      const alert = {
        alertMessage: 'Doctors data received',
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
    } catch (error: any) {
      const alert = {
        alertMessage: 'Error while loading doctors data',
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
    }
  }, []);

  useEffect(() => {
    // Handle Throw Error when request fails and catch it inside Error Boundary
  }, [hasErrorLoadingDoctors]);

  return (
    <StyledDoctorsList>
      {isLoadingDoctorsData ? (
        <Loader />
      ) : (
        <div className="list__wrapper">
          <Toolbar />
          <CustomTable data={doctors} />
        </div>
      )}
    </StyledDoctorsList>
  );
};

export default DoctorsList;

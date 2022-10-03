import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store';
import {
  doctorManagerActions,
  doctorManagerAsyncThunk,
} from 'store/slices/doctorManagerSlice/doctorManager';
import {
  getDoctors,
  getIsLoadingDoctors,
  getHasErrorLoadingDoctors,
} from 'store/slices/doctorManagerSlice/doctorManagerSelectors';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { ALERT_DEFAULT_TIME } from 'store/slices/alertManagerSlice/constants';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import { transitionTypes, TransitionType } from 'components/TransitionController/models';
import { Loader, NoDataAvailable, TransitionController } from 'components';
import { CustomTable, Toolbar } from './components';
import StyledDoctorsList from './DoctorsList.style';

const DoctorsList = () => {
  const dispatch = useAppDispatch();
  const doctors = useSelector(getDoctors);
  // const isLoadingDoctors = useSelector<boolean>(getIsLoadingDoctors);
  const hasErrorLoadingDoctors = useSelector(getHasErrorLoadingDoctors);
  const [shouldRenderLoader, setShouldRenderLoader] = useState<boolean>(true);
  const [readyToUnmountLoader, setReadyToUnmountLoader] = useState<boolean>(false);
  const [readyForTransitionStart, setReadyForTranasitionStart] = useState<boolean>(false);

  const [showDoctors, setShowDoctors] = useState<boolean>(false);

  const handleRequestDoctor = async () => {
    await dispatch(doctorManagerAsyncThunk.requestDoctors());
  };

  useEffect(() => {
    dispatch(doctorManagerActions.resetSelectedDoctor());
    dispatch(doctorManagerActions.resetSelectedDoctorDetails());
    dispatch(doctorManagerActions.resetSelectedDoctorInfo());
    setReadyForTranasitionStart(true);
    try {
      handleRequestDoctor();
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
      setShowDoctors(true);
      setReadyToUnmountLoader(true);
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
      setShowDoctors(false);
      setReadyToUnmountLoader(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Handle Throw Error when request fails and catch it inside Error Boundary
  }, [hasErrorLoadingDoctors]);

  const onReadyToUnmountChild = useCallback(() => {
    setShouldRenderLoader(false);
  }, []);

  const renderLoading = () => {
    if (shouldRenderLoader)
      return (
        <TransitionController
          onReadyToUnmountChild={onReadyToUnmountChild}
          readyToUnmountChild={readyToUnmountLoader}
          readyForTransitionStart={readyForTransitionStart}
          transitionType={transitionTypes.LOADER as TransitionType}
        >
          <Loader />
        </TransitionController>
      );
    return null;
  };

  const renderNoData = () => {
    if (!doctors.length)
      return <NoDataAvailable message="There is no data available for doctors" />;
    return null;
  };

  const renderContent = () => {
    if (showDoctors && doctors.length) return <CustomTable data={doctors} />;
    return null;
  };

  return (
    <StyledDoctorsList>
      {renderLoading()}
      <div className="list__wrapper">
        <Toolbar />
        {renderNoData()}
        {renderContent()}
      </div>
    </StyledDoctorsList>
  );
};

export default DoctorsList;

import { useEffect } from 'react';
import { withAccessControl } from 'hocs';
import { RouteAccessTypes } from 'routes/models';
import { useAppDispatch } from 'store/store';
import { alertManagerActions } from 'store/slices/alertManagerSlice/alertManager';
import { AlertTypes } from 'store/slices/alertManagerSlice/models';
import svgAssets from 'assets/images';
import StyledDoctors from './DoctorsDashboard.style';

const { Background } = svgAssets;

const Doctors = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const alert = {
      alertMessage: 'Doctors Page Loaded',
      alertType: AlertTypes.INFO,
    };
    dispatch(alertManagerActions.setAlertData(alert));
  }, []);

  return (
    <StyledDoctors>
      <div className="doctors-page">
        <div className="background">
          <Background />
        </div>
      </div>
    </StyledDoctors>
  );
};

export default withAccessControl(Doctors, RouteAccessTypes.ONLY_AUTHENTICATED);
